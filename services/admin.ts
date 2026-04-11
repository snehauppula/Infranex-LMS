import type { CourseRow, EnrollmentRow, StudentRow } from "@/types";
import { createServiceRoleClient } from "@/lib/supabase/admin";

/**
 * Admin lists need full-table reads. RLS `admin_*` policies only pass when
 * `public.users.role` is `admin` — not when access is via `ADMIN_EMAILS` /
 * `app_metadata`. Service role bypasses RLS (server-only; admin layout already
 * gates `/admin`).
 */
async function adminDataClient() {
  const admin = createServiceRoleClient();
  if (admin) return admin;
  const { createClient } = await import("@/lib/supabase/server");
  return await createClient();
}

export type AdminEnrollmentView = Pick<
  EnrollmentRow,
  "id" | "progress" | "status"
> & {
  course: Pick<CourseRow, "id" | "title">;
};

export type AdminStudentRow = StudentRow & {
  email: string | null;
  enrollments: AdminEnrollmentView[];
};

export type AdminCourseRow = CourseRow & {
  enrollments: Pick<EnrollmentRow, "id" | "progress" | "status">[];
};

export async function getAdminStudents(): Promise<AdminStudentRow[]> {
  const supabase = await adminDataClient();
  if (!supabase) return [];

  const { data: students, error: e1 } = await supabase.from("students").select(
    `
      id,
      user_id,
      name,
      enrollments (
        id,
        progress,
        status,
        course:courses ( id, title )
      )
    `
  );

  if (e1) {
    if (process.env.NODE_ENV === "development") {
      console.error("[getAdminStudents]", e1.message, e1);
    }
    return [];
  }
  if (!students?.length) return [];

  const ids = students.map((s) => s.user_id as string);
  const { data: users, error: uErr } = await supabase
    .from("users")
    .select("id, email")
    .in("id", ids);

  if (uErr && process.env.NODE_ENV === "development") {
    console.error("[getAdminStudents] users join", uErr.message);
  }

  const emailById = new Map(
    (users ?? []).map((u) => [u.id as string, u.email as string])
  );

  return students.map((s) => {
    const row = s as unknown as StudentRow & {
      enrollments?: AdminEnrollmentView[];
    };
    return {
      ...row,
      email: emailById.get(row.user_id) ?? null,
      enrollments: row.enrollments ?? [],
    };
  });
}

export async function getAdminCourses(): Promise<AdminCourseRow[]> {
  const supabase = await adminDataClient();
  if (!supabase) return [];

  const { data, error } = await supabase.from("courses").select(`
      *,
      enrollments ( id, progress, status )
    `);

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[getAdminCourses]", error.message, error);
    }
    return [];
  }
  if (!data) return [];
  return data as AdminCourseRow[];
}
