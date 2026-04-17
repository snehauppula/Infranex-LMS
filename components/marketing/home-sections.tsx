"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { CourseRow } from "@/types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { DomainsMarquee } from "@/components/marketing/domains-marquee";
import { HeroLmsPreview } from "@/components/marketing/hero-lms-preview";
import { CourseVideoThumb } from "@/components/courses/course-video-thumb";
import { courseDetailPath } from "@/lib/course-path";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

function formatInrPaise(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function HomeSections({ courses }: { courses: CourseRow[] }) {
  const featured = courses.slice(0, 3);

  const whyRows = [
    {
      n: "01",
      icon: BookOpen,
      title: "Your next role is the north star",
      body: "Every module builds toward something you can demo — projects, artifacts, and talking points that interviewers actually ask about.",
    },
    {
      n: "02",
      icon: ShieldCheck,
      title: "Mentors who have shipped before",
      body: "Feedback from mentors with hiring, team-building, and production experience — not generic tips from a slide deck.",
    },
    {
      n: "03",
      icon: LineChart,
      title: "Progress you can point to",
      body: "Track momentum week over week through completion, depth, and readiness signals — so you know when you are interview-ready instead of guessing.",
    },
  ] as const;

  return (
    <>
      {/* —— Hero: light LMS, placements + learning —— */}
      <section
        className={cn(
          "relative isolate overflow-x-clip bg-gradient-to-b from-background via-surface to-background",
          /* Clear fixed overlay nav (~64–76px) + top inset + safe area. */
          "pt-[max(6.1rem,calc(5.15rem+env(safe-area-inset-top,0px)))] pb-16 sm:pt-[max(6.45rem,calc(5.55rem+env(safe-area-inset-top,0px)))] sm:pb-24",
          /* On large screens, keep the hero vertically centered in the viewport. */
          "lg:flex lg:min-h-[min(86dvh,860px)] lg:items-center lg:pt-[max(7rem,calc(5.85rem+env(safe-area-inset-top,0px)))] lg:pb-24"
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_0%_-20%,rgba(0,174,239,0.14),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(0,174,239,0.08),transparent_45%)]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(10,31,68,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(10,31,68,0.04) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <motion.div
          className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/[0.12] blur-3xl home-ambient-float"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl home-ambient-float-delayed"
          aria-hidden
        />

        <Container className="relative z-10 max-w-[1240px]">
          <div className="grid min-w-0 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="pt-0 sm:pt-1 lg:pt-2"
              >
                <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-primary/20 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-deep/85 shadow-sm sm:px-3.5 sm:text-[11px] sm:tracking-[0.16em]">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="break-words">
                    Infranex LMS · Where skills become offers
                  </span>
                </div>

                <h1 className="mt-6 max-w-[20ch] text-[clamp(1.85rem,6vw+0.4rem,2.75rem)] font-semibold leading-[1.08] tracking-tight text-deep sm:mt-7 sm:max-w-[18ch] sm:text-5xl sm:leading-[1.06] lg:max-w-[20ch] lg:text-[3.25rem] lg:leading-[1.04]">
                  Learn. Build.{" "}
                  <span className="bg-gradient-to-r from-primary to-[#0088bc] bg-clip-text text-transparent">
                    Get placed.
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:mt-6 sm:text-base sm:leading-relaxed md:text-lg">
                  Stop collecting certificates that nobody asks for. Stack{" "}
                  <span className="font-medium text-deep/90">real projects</span>
                  , get{" "}
                  <span className="font-medium text-deep/90">
                    mentor-grade feedback
                  </span>
                  , and walk into interviews with{" "}
                  <span className="font-medium text-deep/90">proof</span> — in
                  one calm, placement-minded platform.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/courses" className="sm:w-auto">
                    <Button
                      size="lg"
                      className="h-12 w-full rounded-xl px-7 text-[15px] font-semibold shadow-[0_16px_44px_-18px_rgba(0,174,239,0.45)] transition-[transform,box-shadow] duration-300 ease-brand-out motion-reduce:duration-150 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-16px_rgba(0,174,239,0.4)] sm:w-auto"
                    >
                      Find your next course
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about" className="sm:w-auto">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="h-12 w-full rounded-xl border border-deep/[0.08] bg-white px-7 text-[15px] font-semibold text-deep shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-brand-out motion-reduce:duration-150 hover:border-primary/25 hover:bg-white sm:w-auto"
                    >
                      See how we get you hired
                    </Button>
                  </Link>
                </div>

                {/* Trust strip — LMS outcomes */}
                <div className="mt-12 max-w-xl">
                  <div className="flex flex-col overflow-hidden rounded-2xl border border-deep/[0.06] bg-white/90 shadow-[0_20px_50px_-36px_rgba(10,31,68,0.12)] sm:flex-row">
                    {[
                      { k: "50+", v: "Paths to ship" },
                      { k: "10,000+", v: "Learners in motion" },
                      { k: "Placement", v: "In your corner" },
                    ].map((m) => (
                      <div
                        key={m.v}
                        className="flex flex-1 flex-col justify-center px-5 py-4 sm:px-6 sm:py-5"
                      >
                        <p className="text-2xl font-bold tabular-nums tracking-tight text-deep sm:text-[1.65rem]">
                          {m.k}
                        </p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                          {m.v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="relative min-w-0 pt-0 sm:pt-1 lg:pt-2">
              <HeroLmsPreview />
            </div>
          </div>
        </Container>
      </section>

      {/* —— Domains —— */}
      <section className="relative overflow-hidden pb-14 pt-12 sm:pb-16 sm:pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(72rem,90vw)] -translate-x-1/2 bg-border" />

        <Container className="relative z-10 max-w-[1360px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Pick your lane
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-deep sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
                One row. Every domain
                <br />
                <span className="text-muted">you actually care about.</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
                From core engineering to professional programs — no buried catalogs,
                just a steady stream of paths you could take next.
              </p>
            </motion.div>
          </div>
        </Container>
        <DomainsMarquee />
      </section>

      {/* —— Featured courses —— */}
      <section className="relative border-b border-border bg-surface pt-14 pb-20 sm:pt-16 sm:pb-24">
        <Container className="relative z-10 max-w-[1360px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Start here
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-deep sm:text-4xl">
                Courses worth finishing
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
                Big previews, honest pricing, and hover states that feel expensive
                — because if it looks like a template, your brain files it as
                optional.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.05 }}>
              <Link href="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-2xl border border-border px-6 transition-[color,background-color,border-color] duration-300 ease-brand-out motion-reduce:duration-150 hover:border-primary/35 hover:bg-primary/[0.03]"
                >
                  See everything we teach
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {featured.map((c, i) => (
              <motion.div
                key={c.id}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={courseDetailPath(c)} className="group block">
                  <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border hover:shadow-md">
                    <div className="relative aspect-[16/11] overflow-hidden bg-deep">
                      {c.video_url || c.poster_url ? (
                        <CourseVideoThumb
                          url={c.video_url}
                          posterUrl={c.poster_url}
                          className="absolute inset-0 scale-[1.02]"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/55 to-deep/20" />
                      <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h60v60H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M30%200L60%2030%2030%2060%200%2030z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.04%22%2F%3E%3C%2Fsvg%3E')]" />
                      <span className="absolute left-5 top-5 inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 ring-1 ring-white/20 backdrop-blur-md">
                        Featured
                      </span>
                      <h3 className="absolute bottom-5 left-5 right-5 text-xl font-bold leading-snug tracking-tight text-white drop-shadow-sm">
                        {c.title}
                      </h3>
                    </div>
                    <div className="space-y-4 bg-card p-6">
                      <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                        {c.description}
                      </p>
                      <div className="flex items-center justify-between border-t border-border pt-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                          {c.duration ?? "Self-paced"}
                        </span>
                        <span className="text-lg font-bold text-deep">
                          {formatInrPaise(c.price)}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                        View course
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* —— Why us: tight grid (less “void space” than alternating wide rails) —— */}
      <section className="relative border-t border-border py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-surface" />
        <Container className="relative z-10 max-w-[1360px]">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Why learners choose us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-deep sm:text-4xl">
              Built for depth — not dopamine.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted lg:mx-0">
              No filler modules. No fake urgency. Just a straight path from “I
              studied this” to “Here is what I built.”
            </p>
          </motion.div>

          <div className="mt-10 flex flex-col gap-10 sm:gap-12 lg:gap-14">
            {whyRows.map((row, i) => {
              const Icon = row.icon;
              const reverse = i % 2 === 1;
              return (
                <motion.div
                  key={row.n}
                  {...fadeUp}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="grid items-start gap-6 sm:gap-7 lg:grid-cols-12 lg:gap-8"
                >
                  <div
                    className={cn(
                      "min-w-0 lg:col-span-3",
                      reverse ? "lg:order-2" : "lg:order-1"
                    )}
                  >
                    <span className="inline-block bg-gradient-to-br from-primary from-15% via-[#4dc8f5] to-[#006fa3] bg-clip-text text-transparent text-5xl font-black leading-none tracking-tighter sm:text-6xl md:text-7xl">
                      {row.n}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "min-w-0 lg:col-span-9",
                      reverse ? "lg:order-1" : "lg:order-2"
                    )}
                  >
                    <div
                      className={cn(
                        "inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface text-primary"
                      )}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-deep sm:text-2xl">
                      {row.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
                      {row.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* —— Domains —— */}
      {/* —— Domains —— */}

      {/* —— CTA —— */}
      <section className="relative pb-20 pt-2 sm:pb-24">
        <Container className="relative max-w-[1360px]">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card px-4 py-8 text-center shadow-sm ring-1 ring-deep/[0.035] sm:px-8 sm:py-10"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(0,174,239,0.12),transparent_60%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent_70%)]"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(8,28,61,0.06) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(8,28,61,0.06) 1px, transparent 1px)`,
                backgroundSize: "52px 52px",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-60"
              aria-hidden
            />

            <div className="relative mx-auto max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Your move
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-deep sm:text-3xl">
                One strong course beats a vague “someday.”
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                Pick a track, ship something real this month, and stack evidence
                recruiters can’t ignore — then keep going.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
                <Link href="/courses">
                  <Button
                    size="lg"
                    className="h-11 rounded-xl px-6 text-sm font-semibold shadow-[0_14px_34px_-18px_rgba(0,174,239,0.55)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Browse all programs
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-11 rounded-xl border border-primary/20 bg-surface px-6 text-sm font-semibold text-deep shadow-sm transition-[color,background-color,border-color,box-shadow] duration-300 ease-brand-out motion-reduce:duration-150 hover:border-primary/30 hover:bg-primary/[0.06]"
                  >
                    Sign in and continue
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
