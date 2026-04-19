"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Code2,
  Rocket,
  UsersRound,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { transitionSpring } from "@/lib/motion";

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
};

const HIGHLIGHTS = [
  "Flexible work",
  "Certificate / Experience",
  "Networking opportunity",
] as const;

const ROLES = [
  {
    title: "Campus Ambassador",
    description: [
      "Represent our platform in your campus",
      "Promote events, workshops, and programs",
      "Build community engagement",
    ],
    highlights: HIGHLIGHTS,
    applyUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd339dVvHlZ4zcx-RhZfFTF1GZ069dUSS32XhNX6fBC5uy47w/viewform?usp=dialog",
  },
  {
    title: "Business Development Associate (BDA)",
    description: [
      "Drive partnerships and growth",
      "Connect with potential clients/users",
      "Help scale the platform",
    ],
    highlights: HIGHLIGHTS,
    applyUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScBtCR8I6APCKCnmTyFMz5UtmhkhZ9dp_ToAvMm17qiCLnnxw/viewform?pli=1",
  },
] as const;

const WHY_JOIN = [
  {
    icon: Code2,
    title: "Work on real-world projects",
  },
  {
    icon: UsersRound,
    title: "Learn and grow with a fast-moving team",
  },
  {
    icon: Rocket,
    title: "Build impactful products",
  },
] as const;

export function CareersPageSections() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "overflow-x-hidden bg-transparent",
        "pt-[max(5.5rem,calc(4.65rem+env(safe-area-inset-top,0px)))] sm:pt-[max(5.85rem,calc(4.95rem+env(safe-area-inset-top,0px)))]",
        "pb-12 sm:pb-14"
      )}
    >
      {/* Hero */}
      <section className="relative border-b border-border pb-8 pt-4 sm:pb-10 sm:pt-5 lg:pb-11 lg:pt-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-18%,rgba(0,174,239,0.08),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(8,28,61,0.04),transparent_55%)]" />
        <Container className="relative max-w-[900px] text-center">
          <motion.div
            {...fade}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Careers
            </p>
            <h1 className="mt-3 text-[clamp(1.75rem,5vw+0.5rem,3.25rem)] font-bold leading-[1.12] tracking-tight text-deep sm:mt-4 sm:text-5xl lg:text-[3.25rem]">
              Join Our Team
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:mt-5 sm:text-lg md:text-xl">
              Be part of our mission to build impactful learning experiences
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Open roles */}
      <section className="relative border-b border-border pt-5 pb-10 sm:pt-6 sm:pb-12 lg:pt-7 lg:pb-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_70%_at_12%_20%,rgba(0,174,239,0.04),transparent_55%)]" />
        <Container className="relative max-w-[1100px]">
          <motion.div
            {...fade}
            transition={{ duration: 0.45 }}
            className="mb-8 text-center sm:mb-10"
          >
            <p className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Open roles
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-deep sm:mt-4 sm:text-3xl">
              Roles we&apos;re hiring for
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Explore opportunities to represent Infranex and help us grow — on
              campus and in market.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {ROLES.map((role, index) => (
              <motion.div
                key={role.title}
                {...fade}
                transition={{ duration: 0.5, delay: 0.05 * index }}
              >
                <motion.article
                  className={cn(
                    "flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7",
                    "transition-[border-color,box-shadow,transform] duration-300 ease-brand-out motion-reduce:duration-150",
                    "hover:border-primary/20 hover:shadow-[0_20px_48px_-28px_rgba(0,174,239,0.35)] motion-reduce:hover:transform-none"
                  )}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -4, transition: transitionSpring(reduceMotion) }
                  }
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-primary shadow-sm">
                      <Briefcase className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-left text-lg font-semibold leading-snug tracking-tight text-deep sm:text-xl">
                        {role.title}
                      </h3>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5 text-left text-sm leading-relaxed text-deep/80">
                    {role.description.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-xl border border-border bg-surface/80 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-deep/55">
                      Key highlights
                    </p>
                    <ul className="mt-3 space-y-2">
                      {role.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-center gap-2 text-sm font-medium text-deep"
                        >
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 text-primary"
                            aria-hidden
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-1">
                    <Button
                      size="lg"
                      className="group h-12 w-full rounded-xl px-7 text-[15px] font-semibold shadow-[0_16px_44px_-18px_rgba(0,174,239,0.45)] transition-[transform,box-shadow] duration-300 ease-brand-out motion-reduce:duration-150 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-16px_rgba(0,174,239,0.4)] motion-reduce:hover:translate-y-0 sm:w-auto"
                      asChild
                    >
                      <a
                        href={role.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                      >
                        Apply Now
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand-out group-hover:translate-x-0.5" />
                      </a>
                    </Button>
                  </div>
                </motion.article>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why join us */}
      <section className="relative py-10 sm:py-12 lg:py-14">
        <Container className="relative max-w-[1100px]">
          <motion.div
            {...fade}
            transition={{ duration: 0.45 }}
            className="mb-8 text-center sm:mb-9"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-deep sm:text-3xl">
              Why Join Us?
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {WHY_JOIN.map((item, i) => (
              <motion.div
                key={item.title}
                {...fade}
                transition={{ duration: 0.5, delay: 0.06 * i }}
                className={cn(
                  "rounded-2xl border border-border bg-card p-5 text-center shadow-sm sm:p-6",
                  "transition-[box-shadow,border-color,transform] duration-300 ease-brand-out motion-reduce:duration-150",
                  "hover:border-primary/18 hover:shadow-md motion-reduce:hover:transform-none"
                )}
              >
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-primary">
                  <item.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="mt-4 text-sm font-semibold leading-snug text-deep sm:text-[15px]">
                  {item.title}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
