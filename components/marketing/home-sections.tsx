"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BookOpen, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import type { CourseRow } from "@/types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { DomainsMarquee } from "@/components/marketing/domains-marquee";
import { HeroLmsPreview } from "@/components/marketing/hero-lms-preview";
import { CourseVideoThumb } from "@/components/courses/course-video-thumb";
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
      <section className="relative overflow-x-clip overflow-y-hidden border-b border-border bg-background py-16 sm:py-24 lg:min-h-[min(88dvh,840px)] lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_15%_-15%,rgba(0,174,239,0.06),transparent_52%)]" />
        <motion.div
          className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl home-ambient-float"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-deep/[0.04] blur-3xl home-ambient-float-delayed"
          aria-hidden
        />

        <Container className="relative z-10 max-w-[1360px]">
          <div className="grid min-w-0 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-6 xl:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-deep shadow-sm sm:px-3.5 sm:text-[11px] sm:tracking-[0.16em]">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="break-words">
                    Infranex LMS · Where skills become offers
                  </span>
                </div>

                <h1 className="mt-6 max-w-[20ch] text-[clamp(1.85rem,6vw+0.4rem,2.75rem)] font-semibold leading-[1.08] tracking-tight text-deep sm:mt-7 sm:max-w-[18ch] sm:text-5xl sm:leading-[1.06] lg:max-w-[20ch] lg:text-[3.25rem] lg:leading-[1.04]">
                  Learn. Build. <span className="text-primary">Get placed.</span>
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
                      className="h-12 w-full rounded-xl px-7 text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
                    >
                      Find your next course
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about" className="sm:w-auto">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="h-12 w-full rounded-xl border border-border bg-card px-7 text-[15px] font-semibold text-deep shadow-sm transition-all duration-200 hover:border-primary/30 sm:w-auto"
                    >
                      See how we get you hired
                    </Button>
                  </Link>
                </div>

                {/* Trust strip — LMS outcomes */}
                <div className="mt-12 max-w-xl">
                  <div className="flex flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:flex-row sm:divide-y-0 sm:divide-x">
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

            <div className="relative min-w-0 lg:col-span-6 xl:col-span-6">
              <HeroLmsPreview />
            </div>
          </div>
        </Container>
      </section>

      {/* —— Domains —— */}
      <section className="relative overflow-hidden py-24 sm:py-28">
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
                Hover to pause. From core engineering to professional programs —
                no buried catalogs, just a steady stream of paths you could take
                next.
              </p>
            </motion.div>
          </div>
        </Container>
        <DomainsMarquee />
      </section>

      {/* —— Featured courses —— */}
      <section className="relative border-y border-border bg-surface py-24 sm:py-28">
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
                  className="h-12 rounded-2xl border border-border px-6 transition-colors duration-200 hover:border-primary/35 hover:bg-primary/[0.03]"
                >
                  See everything we teach
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {featured.map((c, i) => (
              <motion.div
                key={c.id}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={`/courses/${c.id}`} className="group block">
                  <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border hover:shadow-md">
                    <div className="relative aspect-[16/11] overflow-hidden bg-deep">
                      {c.cloudinary_url ? (
                        <CourseVideoThumb
                          url={c.cloudinary_url}
                          title={c.title}
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

      {/* —— Why us: staggered / alternating —— */}
      <section className="relative border-t border-border py-24 sm:py-28">
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
            <p className="mx-auto mt-4 max-w-xl text-base text-muted lg:mx-0">
              No filler modules. No fake urgency. Just a straight path from “I
              studied this” to “Here is what I built.”
            </p>
          </motion.div>

          <div className="mt-20 flex flex-col gap-20 lg:gap-24">
            {whyRows.map((row, i) => {
              const Icon = row.icon;
              const reverse = i % 2 === 1;
              return (
                <motion.div
                  key={row.n}
                  {...fadeUp}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className={cn(
                    "flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20",
                    reverse && "lg:flex-row-reverse"
                  )}
                >
                  <div className="min-w-0 lg:w-[42%]">
                    <span className="inline-block bg-gradient-to-br from-primary to-deep bg-clip-text text-6xl font-black leading-none tracking-tighter text-transparent sm:text-7xl md:text-[5rem]">
                      {row.n}
                    </span>
                  </div>
                  <div className="min-w-0 lg:w-[58%]">
                    <div
                      className={cn(
                        "inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface text-primary"
                      )}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold tracking-tight text-deep sm:text-3xl">
                      {row.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                      {row.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* —— CTA —— */}
      <section className="relative pb-24 pt-4 sm:pb-32">
        <Container className="relative max-w-[1360px]">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-deep px-5 py-12 text-center shadow-lg sm:rounded-[2rem] sm:px-16 sm:py-20"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,174,239,0.12),transparent_55%)]" />

            <div className="relative mx-auto max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Your move
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                One strong course beats a vague “someday.”
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70">
                Pick a track, ship something real this month, and stack evidence
                recruiters can’t ignore — then keep going.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/courses">
                  <Button
                    size="lg"
                    className="h-14 rounded-2xl px-10 text-base transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Browse all programs
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-14 rounded-2xl border-2 border-white/20 bg-white/10 px-10 text-base text-white backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/15"
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
