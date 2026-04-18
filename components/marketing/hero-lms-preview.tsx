"use client";

import { motion } from "framer-motion";
import { HeroOnlineLearningAnimation } from "@/components/marketing/hero-online-learning-animation";

/** Hero column visual — Lottie only (no mock LMS chrome). */
export function HeroLmsPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full min-w-0 max-w-[560px]"
    >
      <div
        className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-primary/[0.04] blur-2xl"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-sm sm:p-4">
        <div className="relative mx-auto aspect-[3/2] w-full max-h-[min(38dvh,400px)] max-w-[620px] sm:max-h-[min(42dvh,420px)]">
          <HeroOnlineLearningAnimation className="absolute inset-0" />
        </div>
      </div>
    </motion.div>
  );
}
