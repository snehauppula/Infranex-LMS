"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  Clock,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import type { CourseRow } from "@/types";
import { Button } from "@/components/ui/button";
import { CourseVideoThumb } from "@/components/courses/course-video-thumb";

const DEFAULT_COURSE: Pick<
  CourseRow,
  "id" | "title" | "duration" | "cloudinary_url"
> = {
  id: "11111111-1111-4111-8111-111111111101",
  title: "Cloud Infrastructure Fundamentals",
  duration: "12h",
  cloudinary_url: null,
};

function lessonPreviewTitle(courseTitle: string) {
  const short =
    courseTitle.length > 28 ? `${courseTitle.slice(0, 27)}…` : courseTitle;
  return `Next: ${short} · Module 4`;
}

export function HeroLmsPreview({ course }: { course: CourseRow | null }) {
  const reduceMotion = useReducedMotion();
  const c: Pick<CourseRow, "id" | "title" | "duration" | "cloudinary_url"> =
    course ?? DEFAULT_COURSE;
  const continueHref = `/courses/${c.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full min-w-0 max-w-md lg:mx-0 lg:max-w-none"
    >
      <div
        className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/[0.12] via-sky-100/40 to-transparent blur-2xl"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-3xl border border-deep/[0.06] bg-white/90 p-1 shadow-[0_32px_80px_-40px_rgba(10,31,68,0.18),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-white/80 backdrop-blur-xl">
        <div className="rounded-[1.35rem] bg-gradient-to-b from-white to-[#f4f8fc] p-5 sm:p-6">
          {/* Mini chrome bar */}
          <div className="mb-4 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/[0.08] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3 w-3" />
              Live progress
            </span>
            <span className="text-[11px] font-medium text-muted">Today</span>
          </div>

          {/* Course card */}
          <div className="overflow-hidden rounded-2xl border border-deep/[0.06] bg-white shadow-[0_12px_40px_-28px_rgba(10,31,68,0.15)]">
            <div className="relative aspect-[16/9] max-h-[140px] bg-gradient-to-br from-primary/[0.08] to-deep/[0.04] sm:max-h-[160px]">
              {c.cloudinary_url ? (
                <CourseVideoThumb
                  url={c.cloudinary_url}
                  title={c.title}
                  className="absolute inset-0"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-sky-50/80">
                  <BookOpen
                    className="h-12 w-12 text-primary/35"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent pt-10">
                <p className="px-4 pb-2 text-left text-sm font-semibold leading-snug text-deep line-clamp-2">
                  {c.title}
                </p>
              </div>
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <span>Course progress</span>
                  <span className="tabular-nums text-deep">65%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-deep/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-sky-400"
                    initial={{ width: reduceMotion ? "65%" : "0%" }}
                    animate={{ width: "65%" }}
                    transition={{
                      duration: reduceMotion ? 0 : 1.1,
                      delay: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>

              <Button
                asChild
                className="h-11 w-full rounded-xl text-sm font-semibold shadow-[0_14px_36px_-14px_rgba(0,174,239,0.45)]"
              >
                <Link href={continueHref} className="gap-2">
                  Jump back in
                  <ChevronRight className="h-4 w-4 opacity-90" />
                </Link>
              </Button>

              {/* Lesson preview row */}
              <div className="flex items-center gap-3 rounded-xl border border-deep/[0.05] bg-[#f8fafc] p-3 transition-colors hover:border-primary/20 hover:bg-white">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <PlayCircle className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                    Up next
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-deep">
                    {lessonPreviewTitle(c.title)}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-muted">
                    <Clock className="h-3 w-3 shrink-0" />
                    ~18 min left in module
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
