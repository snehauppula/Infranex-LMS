import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-seo";
import { getCourses } from "@/services/courses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/courses`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const courses = await getCourses();
  const courseRoutes: MetadataRoute.Sitemap = courses
    .filter((c) => (c.slug ?? "").trim().length > 0)
    .map((c) => ({
      url: `${SITE_URL}/courses/${encodeURIComponent(c.slug)}`,
      lastModified: c.created_at ? new Date(c.created_at) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...courseRoutes];
}

