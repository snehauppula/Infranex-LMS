import type { CourseRow } from "@/types";

/** Canonical marketing URL for a course detail page. */
export function courseDetailPath(course: Pick<CourseRow, "slug">): string {
  return `/courses/${course.slug}`;
}
