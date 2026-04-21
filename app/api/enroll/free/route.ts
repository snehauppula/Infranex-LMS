import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { getCourseRowFromDatabase } from "@/services/courses";
import { getUserDisplayName } from "@/services/auth";

const COUPON_CODE = "INFRANEX100";

export async function POST(req: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { courseId?: string; couponCode?: string };
  const courseId = body.courseId?.trim();
  const couponCode = body.couponCode?.trim().toUpperCase();

  if (!courseId) {
    return NextResponse.json({ error: "courseId required" }, { status: 400 });
  }
  if (couponCode !== COUPON_CODE) {
    return NextResponse.json({ error: "Invalid coupon" }, { status: 400 });
  }

  const course = await getCourseRowFromDatabase(courseId);
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const admin = createServiceRoleClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Server cannot finalize enrollment" },
      { status: 503 }
    );
  }

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
        { error: cErr?.message ?? "Could not create student profile for enrollment" },
        { status: 500 }
      );
    } else {
      student = created;
    }
  }

  const attempt = await admin.from("enrollments").upsert(
    {
      student_id: student.id,
      course_id: courseId,
      progress: 0,
      status: "active",
      purchase_source: "coupon",
    },
    { onConflict: "student_id,course_id" }
  );

  // Backward-compat: if DB hasn’t been migrated yet, retry without the column.
  if (
    attempt.error &&
    /purchase_source/i.test(attempt.error.message) &&
    /column/i.test(attempt.error.message)
  ) {
    const fallback = await admin.from("enrollments").upsert(
      {
        student_id: student.id,
        course_id: courseId,
        progress: 0,
        status: "active",
      },
      { onConflict: "student_id,course_id" }
    );
    if (fallback.error) {
      return NextResponse.json({ error: fallback.error.message }, { status: 500 });
    }
  } else if (attempt.error) {
    return NextResponse.json({ error: attempt.error.message }, { status: 500 });
  }

  revalidatePath("/dashboard");
  revalidatePath("/courses");
  revalidatePath(`/courses/${course.slug}`);

  return NextResponse.json({ ok: true });
}

