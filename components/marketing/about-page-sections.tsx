"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Layers,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
};

function FlowArrow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center text-primary/55",
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 48 24"
        className="h-6 w-16 rotate-90 lg:h-8 lg:w-20 lg:rotate-0"
        fill="none"
      >
        <path
          d="M2 12h36M34 6l8 6-8 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
}

export function AboutPageSections() {
  return (
    <div className="overflow-x-hidden bg-transparent">
      {/* Hero */}
      <section className="relative border-b border-border pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_12%_-18%,rgba(0,174,239,0.05),transparent_50%)]" />
        <Container className="relative max-w-[1100px]">
          <motion.div
            {...fade}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              About Infranex Technologies
            </p>
            <h1 className="mt-4 text-[clamp(1.75rem,5vw+0.5rem,3.25rem)] font-semibold leading-[1.12] tracking-tight text-deep sm:text-5xl lg:text-[3.25rem]">
              Theory gets you in the room.{" "}
              <span className="text-primary">Proof gets you the seat.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:mt-6 sm:text-lg md:text-xl">
              We started Infranex because the gap between campus and company is
              painfully wide — smart people with weak portfolios, outdated
              stacks, and zero rehearsal for real interviews. Our answer is
              blunt: ship projects, work with mentors who have shipped, and get
              placement support that treats your career like the product it is.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Journey: brand-tinted band (navy + electric blue) — only this strip */}
      <section className="relative overflow-hidden border-b border-border bg-surface py-16 sm:py-20 lg:py-24">

        <Container className="relative max-w-[1200px]">
          <motion.div {...fade} transition={{ duration: 0.45 }} className="mb-12 max-w-2xl">
            <p className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              The problem we solve
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-deep sm:text-3xl">
              From “I read it once” to{" "}
              <span className="text-primary">“Here is what I shipped.”</span>
            </h2>
          </motion.div>

          <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-stretch lg:gap-2">
            {/* Column A — starting point */}
            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex flex-1 flex-col gap-4"
            >
              <p className="text-center text-[11px] font-bold uppercase tracking-wider text-deep/70 lg:text-left">
                Where learners often start
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: GraduationCap,
                    title: "Strong academics",
                    sub: "Theory-first education without enough industry reps.",
                  },
                  {
                    icon: Target,
                    title: "Unclear next step",
                    sub: "Hard to translate coursework into interview-ready proof.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-primary">
                        <c.icon className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <div>
                        <p className="font-semibold text-deep">{c.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-deep/65">
                          {c.sub}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-1.5">
                      <div className="h-1.5 rounded-full bg-primary/25" />
                      <div className="h-1.5 w-[85%] rounded-full bg-deep/15" />
                      <div className="h-1.5 w-[60%] rounded-full bg-primary/15" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <FlowArrow className="py-2 lg:py-0 lg:pt-24" />

            {/* Column B — what Infranex does (stacked “extraction” style) */}
            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-1 flex-col gap-4"
            >
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-deep shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  How Infranex fits in
                </span>
              </div>
              <div className="space-y-3 rounded-3xl border border-border bg-surface-strong/60 p-4">
                {[
                  { icon: Layers, label: "Project-based depth", hint: "Ship real artifacts, not slides." },
                  { icon: Briefcase, label: "Industry-oriented programs", hint: "Aligned to roles employers hire for." },
                  { icon: HeartHandshake, label: "Mentorship & guidance", hint: "Humans in the loop when it matters." },
                  { icon: Rocket, label: "Employability focus", hint: "Practice interviews, resumes, placements." },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-deep ring-1 ring-primary/20">
                      <row.icon className="h-4 w-4 text-primary" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-deep">{row.label}</p>
                      <p className="text-xs text-deep/60">{row.hint}</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  </div>
                ))}
              </div>
            </motion.div>

            <FlowArrow className="py-2 lg:py-0 lg:pt-24" />

            {/* Column C — outcome */}
            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-1 flex-col gap-4"
            >
              <p className="text-center text-[11px] font-bold uppercase tracking-wider text-deep/70 lg:text-left">
                What learners walk away with
              </p>
              <div className="flex flex-1 flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25">
                      <Compass className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <p className="text-base font-semibold text-deep sm:text-lg">
                      Career trajectory
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-deep">
                    Outcome-led
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-deep/70">
                  Practical skills, portfolio-worthy work, and the confidence to
                  pursue roles in technology and business — supported by a team
                  obsessed with quality over vanity metrics.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Interview-ready", "Project proof", "Mentor network"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-deep"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex-1 rounded-xl border border-border bg-surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Your prep surface
                  </p>
                  <p className="mt-2 text-sm text-deep/75">
                    Structured paths, feedback loops, and placement support — in
                    one calm experience.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Mission + Vision */}
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <Container className="max-w-[1100px]">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <motion.article
              {...fade}
              transition={{ duration: 0.45 }}
              className="rounded-3xl border border-border bg-card p-8 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Mission
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-deep">
                Empower learners with practical skills
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                To empower students and professionals with practical skills and
                real-world knowledge required to succeed in a technology-driven
                world.
              </p>
            </motion.article>
            <motion.article
              {...fade}
              transition={{ duration: 0.45, delay: 0.06 }}
              className="rounded-3xl border border-border bg-card p-8 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Vision
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-deep">
                A trusted home for career growth
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                To become a trusted platform for skill development and career
                growth — helping people build lasting careers across IT and
                business domains.
              </p>
            </motion.article>
          </div>
        </Container>
      </section>

      {/* What makes us unique — bento */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="max-w-[1100px]">
          <motion.div {...fade} transition={{ duration: 0.45 }} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              What makes us unique
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-deep sm:text-3xl">
              Built like a product studio — taught like a serious school.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {[
              {
                icon: Zap,
                title: "Real-time projects",
                body: "Project-based learning that mirrors how teams actually ship.",
              },
              {
                icon: Briefcase,
                title: "Industry-oriented tracks",
                body: "Programs shaped around tools, stacks, and expectations in the market.",
              },
              {
                icon: Users,
                title: "Personalized mentorship",
                body: "Guidance that adapts to your pace, goals, and gaps — not one-size-fits-all.",
              },
              {
                icon: TrendingUp,
                title: "Employability first",
                body: "Career support woven into the journey — not bolted on at the end.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fade}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                  <item.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-deep">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Audience · Offerings · Achievements */}
      <section className="border-t border-border bg-surface py-16 sm:py-20 lg:py-24">
        <Container className="max-w-[1100px]">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            <motion.div {...fade} transition={{ duration: 0.45 }}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Who we serve
              </p>
              <h3 className="mt-2 text-xl font-semibold text-deep">Target audience</h3>
              <ul className="mt-6 space-y-3">
                {[
                  "Students — graduates & undergraduates",
                  "Job seekers entering or re-entering the market",
                  "Professionals upskilling or switching careers",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.45, delay: 0.05 }}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                What we offer
              </p>
              <h3 className="mt-2 text-xl font-semibold text-deep">Offerings</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Training programs",
                  "Internship opportunities",
                  "Real-time projects",
                  "Career & placement support",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-deep"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Everything builds toward one outcome: you leave with skills you
                can demonstrate and a story recruiters believe.
              </p>
            </motion.div>

            <motion.div
              {...fade}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-3xl border border-border bg-card p-8 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Today & tomorrow
              </p>
              <h3 className="mt-2 text-xl font-semibold text-deep">Achievements</h3>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
                <li className="flex gap-3">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  A growing community of learners who care about craft.
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Relentless focus on quality training and measurable outcomes.
                </li>
                <li className="flex gap-3">
                  <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Early-stage startup with a clear roadmap for expansion.
                </li>
              </ul>
              <p className="mt-6 text-xs text-muted">
                Numbers evolve — we’ll keep this page honest as we grow.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-background py-14 sm:py-16">
        <Container className="max-w-[1100px]">
          <motion.div
            {...fade}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card px-8 py-10 shadow-sm sm:flex-row sm:items-center sm:px-10"
          >
            <div>
              <h2 className="text-xl font-semibold text-deep sm:text-2xl">
                Stop collecting courses. Start stacking proof.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
                Pick a track, ship something that interviewers can click on, and use
                placement support that is wired into the product — not an
                afterthought.
              </p>
            </div>
            <Button asChild size="lg" className="h-12 shrink-0 rounded-xl px-7">
              <Link href="/courses" className="gap-2">
                Find a course to own
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
