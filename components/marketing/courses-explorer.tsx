"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock3, Search } from "lucide-react";
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
import { inferCourseDomainSlug, getDomainBySlug } from "@/lib/infranex-domains";
import { CourseVideoThumb } from "@/components/courses/course-video-thumb";
import { courseDetailPath } from "@/lib/course-path";
import { DURATION, transitionEase } from "@/lib/motion";

function formatInrPaise(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function CoursesExplorer({ courses }: { courses: CourseRow[] }) {
  const [q, setQ] = useState("");
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const hay = `${c.title} ${c.description ?? ""}`.toLowerCase();
      const matchQ = !q.trim() || hay.includes(q.toLowerCase());
      return matchQ;
    });
  }, [courses, q]);

  if (courses.length === 0) {
    return (
      <div className="mt-6">
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center shadow-sm sm:px-8 sm:py-16">
          <p className="text-lg font-medium text-deep">No courses yet</p>
          <p className="mt-2 text-sm text-muted">
            Add rows to the <span className="font-medium text-deep/80">courses</span>{" "}
            table in Supabase (or run your seed migration) to populate the catalog.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="relative w-full max-w-lg">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses…"
            className="pl-10"
            aria-label="Search courses"
          />
        </div>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {filtered.length} {filtered.length === 1 ? "Result" : "Results"}
          </p>
          {q.trim() ? (
            <Button type="button" size="sm" variant="outline" onClick={() => setQ("")}>
              Clear
            </Button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center shadow-sm sm:px-8 sm:py-16">
          <p className="text-lg font-medium text-deep">No courses match</p>
          <p className="mt-2 text-sm text-muted">
            Try another keyword or clear the search box.
          </p>
          <Button type="button" variant="outline" className="mt-6" onClick={() => setQ("")}>
            Clear search
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => {
            const slug = inferCourseDomainSlug(c);
            const d = slug ? getDomainBySlug(slug) : null;
            const DomainIcon = d?.icon;
            return (
              <motion.div
                key={c.id}
                initial={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...transitionEase(DURATION.md, reduceMotion),
                  delay: reduceMotion ? 0 : i * 0.04,
                }}
              >
                <Link href={courseDetailPath(c)}>
                  <Card className="group h-full overflow-hidden transition-[transform,box-shadow,border-color] duration-300 ease-brand-out motion-reduce:duration-150 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-sm">
                    {/* Media */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                      {c.video_url || c.poster_url ? (
                        <>
                          <CourseVideoThumb
                            url={c.video_url}
                            posterUrl={c.poster_url}
                            className="absolute inset-0"
                          />
                          <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep/55 via-deep/10 to-transparent opacity-80"
                            aria-hidden
                          />
                        </>
                      ) : (
                        <div className="h-full w-full bg-surface" />
                      )}

                      {/* Top row badges */}
                      <div className="absolute left-4 top-4 right-4 flex items-center justify-between gap-2">
                        <span
                          className="inline-flex min-w-0 max-w-[75%] items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-deep shadow-sm ring-1 ring-border backdrop-blur-sm"
                          title={d?.label ?? "General catalog"}
                        >
                          {d && DomainIcon ? (
                            <>
                              <DomainIcon
                                className="h-3.5 w-3.5 shrink-0 text-primary"
                                strokeWidth={2.25}
                                aria-hidden
                              />
                              <span className="truncate">{d.label}</span>
                            </>
                          ) : (
                            "Catalog"
                          )}
                        </span>
                        {c.duration ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-deep/80 shadow-sm ring-1 ring-border backdrop-blur-sm">
                            <Clock3 className="h-3.5 w-3.5 text-primary/90" aria-hidden />
                            <span className="tabular-nums">{c.duration}</span>
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Copy */}
                    <CardHeader className="p-5 pb-0">
                      <CardTitle className="text-[15px] leading-snug sm:text-base line-clamp-2">
                        {c.title}
                      </CardTitle>
                      <CardDescription className="mt-2 line-clamp-2 text-[13px] sm:text-sm">
                        {c.description}
                      </CardDescription>
                    </CardHeader>

                    {/* Action bar */}
                    <CardContent className="mt-auto p-5 pt-4">
                      <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                        <span className="text-base font-semibold tracking-tight text-deep">
                          {formatInrPaise(c.price)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform duration-300 ease-brand-out motion-reduce:duration-150 group-hover:translate-x-0.5">
                          View details
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
