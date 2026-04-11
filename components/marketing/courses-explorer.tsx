"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { CourseRow } from "@/types";
import { Container } from "@/components/layout/container";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  INFRANEX_DOMAINS,
  inferCourseDomainSlug,
  getDomainBySlug,
} from "@/lib/infranex-domains";
import { cn } from "@/lib/utils";
import { CourseVideoThumb } from "@/components/courses/course-video-thumb";

function formatInrPaise(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function CoursesExplorer({ courses }: { courses: CourseRow[] }) {
  const [q, setQ] = useState("");
  const [domainSlug, setDomainSlug] = useState<string>("all");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const hay = `${c.title} ${c.description ?? ""}`.toLowerCase();
      const matchQ = !q.trim() || hay.includes(q.toLowerCase());
      const slug = inferCourseDomainSlug(c);
      const matchD = domainSlug === "all" || slug === domainSlug;
      return matchQ && matchD;
    });
  }, [courses, q, domainSlug]);

  return (
    <Container className="mt-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses…"
            className="pl-10"
            aria-label="Search courses"
          />
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 lg:w-auto">
          <label htmlFor="domain-filter" className="sr-only">
            Filter by domain
          </label>
          <select
            id="domain-filter"
            value={domainSlug}
            onChange={(e) => setDomainSlug(e.target.value)}
            className={cn(
              "h-11 w-full min-w-0 flex-1 rounded-xl border border-border bg-white px-4 text-sm font-medium text-deep shadow-sm transition-all",
              "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25",
              "disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[280px] lg:max-w-md"
            )}
          >
            <option value="all">All domains</option>
            {INFRANEX_DOMAINS.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.emoji} {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-border bg-white/60 px-8 py-16 text-center">
          <p className="text-lg font-medium text-deep">No courses match</p>
          <p className="mt-2 text-sm text-muted">
            Try another keyword, pick &quot;All domains&quot;, or clear filters.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-6"
            onClick={() => {
              setQ("");
              setDomainSlug("all");
            }}
          >
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => {
            const slug = inferCourseDomainSlug(c);
            const d = slug ? getDomainBySlug(slug) : null;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
              >
                <Link href={`/courses/${c.id}`}>
                  <Card className="h-full overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_22px_60px_-18px_rgba(10,31,68,0.18)]">
                    <div className="flex items-center justify-between gap-2 px-6 pt-6">
                      <span
                        className="inline-flex min-w-0 max-w-[85%] items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-deep"
                        title={d?.label ?? "General catalog"}
                      >
                        {d ? (
                          <>
                            <span aria-hidden>{d.emoji}</span>
                            <span className="truncate">{d.label}</span>
                          </>
                        ) : (
                          "Catalog"
                        )}
                      </span>
                      <span className="shrink-0 text-xs text-muted">
                        {c.duration}
                      </span>
                    </div>
                    <div className="relative mx-6 mt-4 h-28 overflow-hidden rounded-xl bg-deep ring-1 ring-white/10">
                      {c.cloudinary_url ? (
                        <>
                          <CourseVideoThumb
                            url={c.cloudinary_url}
                            title={c.title}
                            className="absolute inset-0"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep/70 via-deep/15 to-transparent" />
                          <span className="pointer-events-none absolute bottom-2 right-3 rounded-md bg-black/35 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/95 ring-1 ring-white/20 backdrop-blur-sm">
                            Preview
                          </span>
                        </>
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary/20 via-white to-deep/10" />
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{c.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {c.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center justify-between gap-2 gap-y-2 pb-6">
                      <span className="text-sm font-semibold text-deep">
                        {formatInrPaise(c.price)}
                      </span>
                      <span className="text-sm font-medium text-primary">
                        View details →
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
