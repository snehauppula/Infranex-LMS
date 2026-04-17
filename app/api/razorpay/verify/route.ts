import { createHmac, timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { getCourseRowFromDatabase } from "@/services/courses";
import { getUserDisplayName } from "@/services/auth";

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export async function POST(req: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay is not configured" },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
    courseId?: string;
  };

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } =
    body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courseId) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const digest = createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (!safeEqual(digest, razorpay_signature)) {
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  const order = (await razorpay.orders.fetch(razorpay_order_id)) as {
    amount?: number;
    notes?: { courseId?: string; userId?: string };
  };

  if (order.notes?.userId !== user.id || order.notes?.courseId !== courseId) {
    return NextResponse.json({ error: "Order mismatch" }, { status: 400 });
  }

  const course = await getCourseRowFromDatabase(courseId);
  const orderAmount = Number(order.amount ?? 0);
  if (!course || orderAmount !== course.price) {
    return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
  }

  const admin = createServiceRoleClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Server cannot finalize enrollment" },
      { status: 503 }
    );
  }

  /* FK chain: students → users(auth). Triggers sometimes miss legacy accounts. */
  const email = user.email ?? "";
  const { data: existingUser } = await admin
    .from("users")
    .select("id,role")
    .eq("id", user.id)
    .maybeSingle();

  if (!existingUser) {
    const { error: uErr } = await admin.from("users").insert({
      id: user.id,
      email: email || "unknown@user.local",
      role: "student",
    });
    if (uErr) {
      return NextResponse.json(
        { error: `Could not create user profile: ${uErr.message}` },
        { status: 500 }
      );
    }
  }

  const { data: studentRow, error: sErr } = await admin
    .from("students")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (sErr) {
    return NextResponse.json({ error: sErr.message }, { status: 500 });
  }

  let student = studentRow;

  if (!student) {
    const display = getUserDisplayName(user);
    const name =
      display?.trim() ||
      (email.includes("@") ? email.split("@")[0] : "Learner") ||
      "Learner";
    const { data: created, error: cErr } = await admin
      .from("students")
      .insert({ user_id: user.id, name })
      .select("id")
      .single();
    if (cErr?.code === "23505") {
      const { data: again, error: rErr } = await admin
        .from("students")
        .select("id")
        .eq("user_id", user.id)
        .single();
      if (rErr || !again) {
        return NextResponse.json(
          { error: rErr?.message ?? "Student row race; try again" },
          { status: 409 }
        );
      }
      student = again;
    } else if (cErr || !created) {
      return NextResponse.json(
        {
          error: cErr?.message ?? "Could not create student profile for enrollment",
        },
        { status: 500 }
      );
    } else {
      student = created;
    }
  }

  const { error: eErr } = await admin.from("enrollments").upsert(
    {
      student_id: student.id,
      course_id: courseId,
      progress: 0,
      status: "active",
    },
    { onConflict: "student_id,course_id" }
  );

  if (eErr) {
    return NextResponse.json({ error: eErr.message }, { status: 500 });
  }

  revalidatePath("/dashboard");
  revalidatePath("/courses");
  revalidatePath(`/courses/${course.slug}`);

  return NextResponse.json({ ok: true });
}
