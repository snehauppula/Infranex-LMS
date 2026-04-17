import type { CourseRow } from "@/types";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Stable slugs for seeded catalog rows. Used when `courses.slug` is not in the
 * database yet (migration not applied) so public URLs like /courses/applied-ml still resolve.
 */
const KNOWN_SLUG_TO_COURSE_ID: Readonly<Record<string, string>> = {
  "applied-ml": "00000000-0000-4000-8000-000000000011",
  "data-science": "00000000-0000-4000-8000-000000000012",
  "cloud-infra": "11111111-1111-4111-8111-111111111101",
  "security-eng": "11111111-1111-4111-8111-111111111102",
  "data-pipelines": "11111111-1111-4111-8111-111111111103",
};

/** Catalog preview video — same id as seed migration `11111111-…-101`. */
const COURSE_PREVIEW_VIDEO_URL =
  "https://res.cloudinary.com/dva2bnivt/video/upload/q_auto/f_auto/v1775913661/istockphoto-1916478171-640_adpp_is_jyydzf.mp4";

/** When Supabase rows omit `video_url`, still show known catalog media in UI. */
const DEFAULT_MEDIA_BY_COURSE_ID: Readonly<Record<string, string>> = {
  "11111111-1111-4111-8111-111111111101": COURSE_PREVIEW_VIDEO_URL,
};

function enrichCourseRow(c: CourseRow): CourseRow {
  const base: CourseRow = {
    ...c,
    highlights: Array.isArray(c.highlights) ? c.highlights : null,
    poster_url: c.poster_url ?? null,
  };
  const fallback = DEFAULT_MEDIA_BY_COURSE_ID[c.id];
  if (fallback && !base.video_url) {
    return { ...base, video_url: fallback };
  }
  return base;
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

async function getCourseRowBySlug(slug: string): Promise<CourseRow | null> {
  const key = slug.trim().toLowerCase();
  if (!key) return null;

  const { createServiceRoleClient } = await import("@/lib/supabase/admin");
  const admin = createServiceRoleClient();
  if (admin) {
    const { data, error } = await admin
      .from("courses")
      .select("*")
      .eq("slug", key)
      .maybeSingle();
    if (!error && data) return enrichCourseRow(data as CourseRow);
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", key)
    .maybeSingle();

  if (error || !data) return null;
  return enrichCourseRow(data as CourseRow);
}

/** Catalog / course detail: database only (no hardcoded fallback). */
export async function getCourseById(id: string): Promise<CourseRow | null> {
  return getCourseRowFromDatabase(id);
}

/**
 * Resolve course from the URL segment: canonical `slug`, or legacy UUID bookmarks.
 */
export async function getCourseForDetailPage(
  param: string
): Promise<CourseRow | null> {
  const trimmed = param.trim();
  if (!trimmed) return null;

  const bySlug = await getCourseRowBySlug(trimmed);
  if (bySlug) return bySlug;

  const fallbackId = KNOWN_SLUG_TO_COURSE_ID[trimmed.toLowerCase()];
  if (fallbackId) {
    const row = await getCourseRowFromDatabase(fallbackId);
    if (row) {
      const canonicalSlug =
        row.slug && row.slug.length > 0 ? row.slug : trimmed.toLowerCase();
      return enrichCourseRow({ ...row, slug: canonicalSlug });
    }
  }

  if (UUID_RE.test(trimmed)) {
    return getCourseRowFromDatabase(trimmed.toLowerCase());
  }

  return null;
}
