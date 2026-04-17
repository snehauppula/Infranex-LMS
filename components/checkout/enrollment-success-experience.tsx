"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, PartyPopper, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courseDetailPath } from "@/lib/course-path";

function fireCelebration() {
  const colors = ["#00AEEF", "#081c3d", "#38bdf8", "#e0f2fe", "#ffffff"];
  const count = 200;
  const defaults = {
    origin: { y: 0.62 },
    colors,
    ticks: 220,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    void confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 52 });
  fire(0.2, { spread: 58, startVelocity: 42 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.82 });
  fire(0.1, { spread: 120, startVelocity: 26, decay: 0.92, scalar: 1.15 });
  fire(0.1, { spread: 118, startVelocity: 44 });
}

export function EnrollmentSuccessExperience({
  courseTitle,
  courseSlug,
}: {
  courseTitle: string;
  courseSlug: string;
}) {
  const reduceMotion = useReducedMotion();
  const played = useRef(false);

  useEffect(() => {
    if (reduceMotion || played.current) return;
    played.current = true;
    const t1 = window.setTimeout(() => fireCelebration(), 120);
    const t2 = window.setTimeout(() => fireCelebration(), 520);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduceMotion]);

  const courseHref = courseDetailPath({ slug: courseSlug });

  return (
    <div className="mx-auto flex min-h-[min(72dvh,640px)] max-w-2xl flex-col items-center justify-center px-4 py-10 sm:px-6">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[0_28px_80px_-36px_rgba(8,28,61,0.35)] ring-1 ring-primary/10 sm:p-10"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-20%,rgba(0,174,239,0.18),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-primary/[0.08] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-deep/[0.06] blur-3xl"
          aria-hidden
        />

        <div className="relative text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#0088bc] text-white shadow-lg shadow-primary/35">
            <PartyPopper className="h-8 w-8" aria-hidden strokeWidth={2} />
          </div>

          <p className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Payment successful
          </p>

          <h1
            className="mt-4 text-balance text-2xl font-bold tracking-tight text-deep sm:text-3xl"
            id="enroll-success-title"
          >
            You&apos;re in — welcome aboard!
          </h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted sm:text-base">
            <span className="font-medium text-deep/90">{courseTitle}</span> is now on your
            dashboard. Jump into the lesson player whenever you&apos;re ready.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="h-12 px-6 text-base font-semibold shadow-md shadow-primary/25">
              <Link href={courseHref}>
                Start learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-12 border-deep/[0.08] bg-surface/90 px-6 text-base font-semibold text-deep"
            >
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                My dashboard
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-xs text-muted">
            Receipt and access details are available from your account. Need help?{" "}
            <Link href="/about" className="font-medium text-primary underline-offset-2 hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
}
