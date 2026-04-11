import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import type { CourseRow, EnrollmentRow } from "@/types";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export type EnrollmentWithCourse = EnrollmentRow & { course: CourseRow };

async function enrollmentRowForCourse(
  client: SupabaseClient<Database>,
  userId: string,
  courseId: string
): Promise<EnrollmentRow | null> {
  const { data: student, error: sErr } = await client
    .from("students")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (sErr || !student) return null;

  const { data, error } = await client
    .from("enrollments")
    .select("*")
    .eq("student_id", student.id)
    .eq("course_id", courseId)
    .maybeSingle();

  if (error || !data) return null;
  return data as EnrollmentRow;
}

async function enrollmentsWithCourses(
  client: SupabaseClient<Database>,
  userId: string
): Promise<EnrollmentWithCourse[]> {
  const { data: student, error: sErr } = await client
    .from("students")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (sErr || !student) return [];

  const { data, error } = await client
    .from("enrollments")
    .select("*, course:courses(*)")
    .eq("student_id", student.id)
    .order("id", { ascending: false });

  if (error || !data) return [];
  return data as EnrollmentWithCourse[];
}

/** Whether this auth user has an enrollment row for the course (for gating video). */
export async function getEnrollmentForCourse(
  userId: string,
  courseId: string
): Promise<EnrollmentRow | null> {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  if (!supabase) return null;

  let row = await enrollmentRowForCourse(supabase, userId, courseId);
  if (row) return row;

  const admin = createServiceRoleClient();
  if (!admin) return null;
  row = await enrollmentRowForCourse(admin, userId, courseId);
  return row;
}

/**
 * Dashboard "My courses". Tries the session (anon) client first, then service role
 * scoped to the same `userId` so rows always show after payment even if RLS misbehaves.
 */
export async function getStudentEnrollments(
  userId: string
): Promise<EnrollmentWithCourse[]> {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  if (!supabase) return [];

  let rows = await enrollmentsWithCourses(supabase, userId);
  if (rows.length > 0) return rows;

  const admin = createServiceRoleClient();
  if (!admin) return [];

  rows = await enrollmentsWithCourses(admin, userId);
  return rows;
}
