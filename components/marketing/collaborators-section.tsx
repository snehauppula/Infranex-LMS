"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const COLLABORATORS = [
  { id: "esb", name: "ESB", src: "/partners/esb.png?v=2" },
  {
    id: "communication",
    name: "Communication Skills for Business",
    src: "/partners/communication.png?v=2",
  },
  {
    id: "pmi",
    name: "Project Management Institute",
    src: "/partners/pmi.png?v=2",
  },
  { id: "unity", name: "Unity", src: "/partners/unity.png?v=2" },
  { id: "cisco", name: "Cisco", src: "/partners/cisco.png?v=2" },
  { id: "wipro", name: "Wipro", src: "/partners/wipro.png?v=2" },
] as const;

export function CollaboratorsSection() {
  return (
    <section className="relative overflow-hidden border-b border-border py-11 sm:py-12 lg:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_70%_at_50%_-18%,rgba(0,174,239,0.07),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_110%,rgba(8,28,61,0.04),transparent_58%)]" />

      <Container className="relative z-10 max-w-[1100px]">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm">
            Collaborators
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-deep sm:mt-4 sm:text-3xl">
            Companies we&apos;ve collaborated with
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Teams and organizations we&apos;ve partnered with to deliver learning
            experiences that match how hiring actually works.
          </p>
        </motion.div>

        <ul
          className="mt-8 grid list-none grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6"
          aria-label="Collaborating organizations"
        >
          {COLLABORATORS.map((c, i) => (
            <motion.li
              key={c.id}
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.04 * i }}
              className="flex"
            >
              <div
                className={cn(
                  "group flex h-full w-full flex-1 min-h-[7.25rem] flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card px-3 py-4 shadow-sm sm:min-h-[7.75rem] sm:gap-2.5 sm:px-4 sm:py-5",
                  "transition-[border-color,box-shadow,transform] duration-300 ease-brand-out motion-reduce:duration-150",
                  "hover:border-primary/18 hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                )}
              >
                <img
                  src={c.src}
                  alt=""
                  width={180}
                  height={60}
                  decoding="async"
                  className="h-12 w-auto max-w-[min(100%,14rem)] shrink-0 object-contain object-center opacity-95 transition-[opacity,transform] duration-300 ease-brand-out sm:h-14 sm:max-w-[min(100%,15rem)] group-hover:scale-[1.02]"
                />
                <p className="max-w-full text-center text-[11px] font-semibold leading-snug tracking-tight text-deep/75 sm:text-xs">
                  {c.name}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
