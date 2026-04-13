import type { CourseRow } from "@/types";

/** Catalog preview (Cloudinary) — same id as seed migration `11111111-…-101`. */
const COURSE_PREVIEW_VIDEO_URL =
  "https://res.cloudinary.com/dva2bnivt/video/upload/q_auto/f_auto/v1775913661/istockphoto-1916478171-640_adpp_is_jyydzf.mp4";

/** When Supabase rows omit `cloudinary_url`, still show known catalog media in UI. */
const DEFAULT_MEDIA_BY_COURSE_ID: Readonly<Record<string, string>> = {
  "11111111-1111-4111-8111-111111111101": COURSE_PREVIEW_VIDEO_URL,
};

function enrichCourseRow(c: CourseRow): CourseRow {
  const fallback = DEFAULT_MEDIA_BY_COURSE_ID[c.id];
  if (fallback && !c.cloudinary_url) {
    return { ...c, cloudinary_url: fallback };
  }
  return c;
}

export async function getCourses(): Promise<CourseRow[]> {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return ((data ?? []) as CourseRow[]).map(enrichCourseRow);
}

/**
 * Course row that actually exists in `public.courses` (required for enrollments FK).
 * Use in Razorpay create-order / verify — never use in-memory demo rows here.
 */
export async function getCourseRowFromDatabase(id: string): Promise<CourseRow | null> {
  const { createServiceRoleClient } = await import("@/lib/supabase/admin");
  const admin = createServiceRoleClient();
  if (admin) {
    const { data, error } = await admin
      .from("courses")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (!error && data) return enrichCourseRow(data as CourseRow);
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return enrichCourseRow(data as CourseRow);
}

/** Catalog / course detail: database only (no hardcoded fallback). */
export async function getCourseById(id: string): Promise<CourseRow | null> {
  return getCourseRowFromDatabase(id);
}
