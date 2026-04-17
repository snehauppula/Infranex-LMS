"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
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
      <Container className="mt-10">
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center shadow-sm">
          <p className="text-lg font-medium text-deep">No courses yet</p>
          <p className="mt-2 text-sm text-muted">
            Add rows to the <span className="font-medium text-deep/80">courses</span>{" "}
            table in Supabase (or run your seed migration) to populate the catalog.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-10">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search courses…"
          className="pl-10"
          aria-label="Search courses"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center shadow-sm">
          <p className="text-lg font-medium text-deep">No courses match</p>
          <p className="mt-2 text-sm text-muted">
            Try another keyword or clear the search box.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-6"
            onClick={() => setQ("")}
          >
            Clear search
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <Card className="h-full overflow-hidden transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-sm">
                    <div className="flex items-center justify-between gap-2 px-6 pt-6">
                      <span
                        className="inline-flex min-w-0 max-w-[85%] items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-deep"
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
                      <span className="shrink-0 text-xs text-muted">
                        {c.duration}
                      </span>
                    </div>
                    <div className="relative mx-6 mt-4 h-28 overflow-hidden rounded-xl border border-border bg-deep">
                      {c.video_url || c.poster_url ? (
                        <>
                          <CourseVideoThumb
                            url={c.video_url}
                            posterUrl={c.poster_url}
                            className="absolute inset-0"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep/70 via-deep/15 to-transparent" />
                        </>
                      ) : (
                        <div className="h-full w-full bg-surface" />
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
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        View details
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
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
