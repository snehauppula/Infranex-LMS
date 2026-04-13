import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/admin";

/** POST { courseId: uuid, progress: 0–100 } — learner’s own enrollment only; never decreases server-side. */
export async function POST(req: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
  const db = supabase;

  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = user.id;

  const body = (await req.json()) as { courseId?: string; progress?: unknown };
  const courseId = typeof body.courseId === "string" ? body.courseId.trim() : "";
  const raw = Number(body.progress);
  if (!courseId || !Number.isFinite(raw)) {
    return NextResponse.json({ error: "courseId and progress required" }, { status: 400 });
  }

  const requested = Math.max(0, Math.min(100, Math.round(raw)));

  const svc = createServiceRoleClient();

  async function loadEnrollmentRow() {
    const { data: student, error: sErr } = await db
      .from("students")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (sErr || !student) {
      if (svc) {
        const { data: st2, error: s2Err } = await svc
          .from("students")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle();
        if (s2Err || !st2) return { row: null as null, studentError: true };
        const { data: row2, error: e2Err } = await svc
          .from("enrollments")
          .select("id, progress, status")
          .eq("student_id", st2.id)
          .eq("course_id", courseId)
          .maybeSingle();
        if (e2Err || !row2) return { row: null as null, studentError: false };
        return { row: row2, studentError: false };
      }
      return { row: null as null, studentError: true };
    }

    const { data: row, error: eErr } = await db
      .from("enrollments")
      .select("id, progress, status")
      .eq("student_id", student.id)
      .eq("course_id", courseId)
      .maybeSingle();

    if (!eErr && row) return { row, studentError: false };

    if (svc) {
      const { data: row2, error: e2Err } = await svc
        .from("enrollments")
        .select("id, progress, status")
        .eq("student_id", student.id)
        .eq("course_id", courseId)
        .maybeSingle();
      if (e2Err || !row2) return { row: null as null, studentError: false };
      return { row: row2, studentError: false };
    }

    return { row: null as null, studentError: false };
  }

  const { row, studentError } = await loadEnrollmentRow();

  if (studentError) {
    return NextResponse.json({ error: "No student profile" }, { status: 400 });
  }
  if (!row) {
    return NextResponse.json({ error: "Not enrolled in this course" }, { status: 404 });
  }

  const currentProgress = Number(row.progress);
  const safeCurrent = Number.isFinite(currentProgress) ? currentProgress : 0;
  const nextProgress = Math.max(safeCurrent, requested);
  const nextStatus =
    nextProgress >= 100 ? "completed" : row.status === "completed" ? "completed" : row.status;

  const writer = svc ?? db;
  const { error: uErr } = await writer
    .from("enrollments")
    .update({ progress: nextProgress, status: nextStatus })
    .eq("id", row.id);

  if (uErr) {
    return NextResponse.json({ error: uErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, progress: nextProgress, status: nextStatus });
}
