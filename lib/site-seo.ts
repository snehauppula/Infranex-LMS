/** Canonical site origin for metadata, sitemap, robots, and JSON-LD. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.infranextech.in";

/** Legal entity name — use in titles, Organization schema, and Open Graph `siteName`. */
export const ORGANIZATION_LEGAL_NAME = "Infranex Technologies Pvt Ltd";

/** Shorter brand line for UI copy where the full legal name is not required. */
export const ORGANIZATION_SHORT_NAME = "Infranex Technologies";

export const DEFAULT_SITE_DESCRIPTION = `${ORGANIZATION_LEGAL_NAME} — placement-focused online courses, enrollments, and learning analytics in one calm platform.`;

/** Absolute URL for a path (leading slash optional). */
export function absoluteUrl(path = "/"): string {
  const base = SITE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
