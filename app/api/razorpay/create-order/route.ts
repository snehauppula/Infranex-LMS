import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";
import { getCourseRowFromDatabase } from "@/services/courses";

export async function POST(req: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay is not configured on the server" },
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

  const body = (await req.json()) as { courseId?: string };
  if (!body.courseId) {
    return NextResponse.json({ error: "courseId required" }, { status: 400 });
  }

  const course = await getCourseRowFromDatabase(body.courseId);
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  const order = await razorpay.orders.create({
    amount: course.price,
    currency: "INR",
    receipt: `course_${course.id}`.slice(0, 40),
    notes: {
      courseId: course.id,
      userId: user.id,
    },
  });

  return NextResponse.json({
    orderId: order.id,
    currency: order.currency ?? "INR",
  });
}
