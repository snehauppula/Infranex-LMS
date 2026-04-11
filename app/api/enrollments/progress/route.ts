import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** POST { courseId: uuid, progress: 0–100 } — learner’s own enrollment only; never decreases server-side. */
export async function POST(req: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { courseId?: string; progress?: unknown };
  const courseId = typeof body.courseId === "string" ? body.courseId.trim() : "";
  const raw = Number(body.progress);
  if (!courseId || !Number.isFinite(raw)) {
    return NextResponse.json({ error: "courseId and progress required" }, { status: 400 });
  }

  const requested = Math.max(0, Math.min(100, Math.round(raw)));

  const { data: student, error: sErr } = await supabase
    .from("students")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (sErr || !student) {
    return NextResponse.json({ error: "No student profile" }, { status: 400 });
  }

  const { data: row, error: eErr } = await supabase
    .from("enrollments")
    .select("id, progress, status")
    .eq("student_id", student.id)
    .eq("course_id", courseId)
    .maybeSingle();

  if (eErr || !row) {
    return NextResponse.json({ error: "Not enrolled in this course" }, { status: 404 });
  }

  const nextProgress = Math.max(row.progress, requested);
  const nextStatus =
    nextProgress >= 100 ? "completed" : row.status === "completed" ? "completed" : row.status;

  const { error: uErr } = await supabase
    .from("enrollments")
    .update({ progress: nextProgress, status: nextStatus })
    .eq("id", row.id);

  if (uErr) {
    return NextResponse.json({ error: uErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, progress: nextProgress, status: nextStatus });
}
