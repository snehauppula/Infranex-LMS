import type { CourseRow, EnrollmentRow, EnrollmentStatus, StudentRow } from "@/types";
import { createServiceRoleClient } from "@/lib/supabase/admin";

/**
 * Admin lists need full-table reads. Prefer `SUPABASE_SERVICE_ROLE_KEY` so
 * queries bypass RLS. Without it, the signed-in user's JWT is used — that only
 * works if `public.users.role = 'admin'` for that user (not only app_metadata).
 */
async function adminDataClient() {
  const admin = createServiceRoleClient();
  if (admin) return admin;
  const { createClient } = await import("@/lib/supabase/server");
  return await createClient();
}

export type AdminEnrollmentView = Pick<
  EnrollmentRow,
  "id" | "progress" | "status" | "purchase_source"
> & {
  course: Pick<CourseRow, "id" | "title">;
};

export type AdminStudentRow = StudentRow & {
  email: string | null;
  enrollments: AdminEnrollmentView[];
};

/** Enrollment row shown under a course in admin (includes learner name). */
export type AdminCourseSeatRow = Pick<
  EnrollmentRow,
  "id" | "progress" | "status" | "student_id" | "purchase_source"
> & {
  studentName: string;
};

export type AdminCourseRow = CourseRow & {
  enrollments: AdminCourseSeatRow[];
};

export async function getAdminStudents(): Promise<AdminStudentRow[]> {
  const supabase = await adminDataClient();
  if (!supabase) return [];

  const { data: students, error: sErr } = await supabase
    .from("students")
    .select("id, user_id, name");

  if (sErr) {
    if (process.env.NODE_ENV === "development") {
      console.error("[getAdminStudents] students", sErr.message, sErr);
    }
    return [];
  }
  if (!students?.length) return [];

  const userIds = [...new Set(students.map((s) => s.user_id as string))];
  const { data: users, error: uErr } = await supabase
    .from("users")
    .select("id, email, role")
    .in("id", userIds);

  if (uErr && process.env.NODE_ENV === "development") {
    console.error("[getAdminStudents] users", uErr.message);
  }

  const adminUserIds = new Set(
    (users ?? [])
      .filter((u) => String(u.role ?? "").toLowerCase() === "admin")
      .map((u) => u.id as string)
  );

  const learners = students.filter(
    (s) => !adminUserIds.has(s.user_id as string)
  );

  const emailById = new Map(
    (users ?? []).map((u) => [u.id as string, u.email as string])
  );

  const studentIds = learners.map((s) => s.id as string);

  const attempt = await supabase
    .from("enrollments")
    .select("id, student_id, course_id, progress, status, purchase_source")
    .in("student_id", studentIds);

  const fallback =
    attempt.error &&
    /purchase_source/i.test(attempt.error.message) &&
    /schema cache/i.test(attempt.error.message)
      ? await supabase
          .from("enrollments")
          .select("id, student_id, course_id, progress, status")
          .in("student_id", studentIds)
      : null;

  const enrollmentsRaw = (fallback?.data ?? attempt.data) as
    | Array<Record<string, unknown>>
    | null
    | undefined;
  const enErr = fallback?.error ?? attempt.error;

  if (enErr && process.env.NODE_ENV === "development") {
    console.error("[getAdminStudents] enrollments", enErr.message);
  }

  const enrollmentRows = enrollmentsRaw ?? [];
  const courseIds = [
    ...new Set(enrollmentRows.map((e) => e.course_id as string)),
  ];

  const courseTitleById = new Map<string, string>();
  if (courseIds.length > 0) {
    const { data: courses, error: cErr } = await supabase
      .from("courses")
      .select("id, title")
      .in("id", courseIds);
    if (cErr && process.env.NODE_ENV === "development") {
      console.error("[getAdminStudents] courses", cErr.message);
    }
    for (const c of courses ?? []) {
      courseTitleById.set(c.id as string, c.title as string);
    }
  }

  const enrollmentsByStudent = new Map<string, AdminEnrollmentView[]>();
  for (const e of enrollmentRows) {
    const sid = e.student_id as string;
    const courseId = e.course_id as string;
    const view: AdminEnrollmentView = {
      id: e.id as string,
      progress: Number(e.progress),
      status: e.status as EnrollmentStatus,
      purchase_source: (e.purchase_source as "razorpay" | "coupon" | null) ?? undefined,
      course: {
        id: courseId,
        title: courseTitleById.get(courseId) ?? "Unknown course",
      },
    };
    const list = enrollmentsByStudent.get(sid) ?? [];
    list.push(view);
    enrollmentsByStudent.set(sid, list);
  }

  return learners.map((s) => ({
    id: s.id as string,
    user_id: s.user_id as string,
    name: s.name as string,
    email: emailById.get(s.user_id as string) ?? null,
    enrollments: enrollmentsByStudent.get(s.id as string) ?? [],
  }));
}

export async function getAdminCourses(): Promise<AdminCourseRow[]> {
  const supabase = await adminDataClient();
  if (!supabase) return [];

  const { data: courses, error: cErr } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (cErr) {
    if (process.env.NODE_ENV === "development") {
      console.error("[getAdminCourses] courses", cErr.message, cErr);
    }
    return [];
  }
  if (!courses?.length) return [];

  const courseIds = courses.map((c) => c.id as string);

  const attempt = await supabase
    .from("enrollments")
    .select("id, student_id, course_id, progress, status, purchase_source")
    .in("course_id", courseIds);

  const fallback =
    attempt.error &&
    /purchase_source/i.test(attempt.error.message) &&
    /schema cache/i.test(attempt.error.message)
      ? await supabase
          .from("enrollments")
          .select("id, student_id, course_id, progress, status")
          .in("course_id", courseIds)
      : null;

  const enrollmentsRaw = (fallback?.data ?? attempt.data) as
    | Array<Record<string, unknown>>
    | null
    | undefined;
  const enErr = fallback?.error ?? attempt.error;

  if (enErr && process.env.NODE_ENV === "development") {
    console.error("[getAdminCourses] enrollments", enErr.message);
  }

  const enrollmentRows = enrollmentsRaw ?? [];
  const studentIds = [
    ...new Set(enrollmentRows.map((e) => e.student_id as string)),
  ];

  const studentNameById = new Map<string, string>();
  if (studentIds.length > 0) {
    const { data: studs, error: stErr } = await supabase
      .from("students")
      .select("id, name")
      .in("id", studentIds);
    if (stErr && process.env.NODE_ENV === "development") {
      console.error("[getAdminCourses] students", stErr.message);
    }
    for (const st of studs ?? []) {
      studentNameById.set(st.id as string, st.name as string);
    }
  }

  const enrollmentsByCourse = new Map<string, AdminCourseSeatRow[]>();
  for (const e of enrollmentRows) {
    const cid = e.course_id as string;
    const sid = e.student_id as string;
    const row: AdminCourseSeatRow = {
      id: e.id as string,
      student_id: sid,
      progress: Number(e.progress),
      status: e.status as EnrollmentStatus,
      purchase_source: (e.purchase_source as "razorpay" | "coupon" | null) ?? undefined,
      studentName: studentNameById.get(sid) ?? "Learner",
    };
    const list = enrollmentsByCourse.get(cid) ?? [];
    list.push(row);
    enrollmentsByCourse.set(cid, list);
  }

  return courses.map((c) => {
    const row = c as CourseRow;
    return {
      ...row,
      enrollments: enrollmentsByCourse.get(row.id) ?? [],
    };
  });
}
