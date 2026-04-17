"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { pageMotion, transitionEase, DURATION } from "@/lib/motion";

export function MarketingMotionTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const page = pageMotion(reduceMotion);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={page.initial}
        animate={page.animate}
        exit={page.exit}
        transition={transitionEase(DURATION.md, reduceMotion)}
        className="min-w-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
