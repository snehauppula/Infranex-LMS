export type UserRole = "student" | "admin";

export type UserRow = {
  id: string;
  email: string;
  role: UserRole;
};

export type StudentRow = {
  id: string;
  user_id: string;
  name: string;
};

export type CourseRow = {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  price: number;
  cloudinary_url: string | null;
  created_at: string;
};

export type EnrollmentStatus = "active" | "completed" | "paused";

export type EnrollmentRow = {
  id: string;
  student_id: string;
  course_id: string;
  progress: number;
  status: EnrollmentStatus;
};

export type CourseWithMeta = CourseRow & {
  enrollmentCount?: number;
  avgProgress?: number;
};

export type StudentWithEnrollments = StudentRow & {
  enrollments: (EnrollmentRow & { course: CourseRow })[];
};
