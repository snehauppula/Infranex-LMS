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
  /** URL segment for `/courses/:slug` (short, human-readable). */
  slug: string;
  title: string;
  description: string | null;
  duration: string | null;
  price: number;
  /** Direct HTTPS URL to the lesson video (e.g. `.mp4`). Thumbnails use Cloudinary URLs when applicable. */
  video_url: string | null;
  /** Optional image URL for catalog cards / marketing when no Cloudinary thumbnail exists (e.g. MEGA embed). */
  poster_url: string | null;
  /** Optional bullet strings for the course detail page; when empty, a generic fallback is shown. */
  highlights: string[] | null;
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
