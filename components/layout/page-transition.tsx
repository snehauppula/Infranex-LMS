"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DURATION, pageMotion, transitionEase } from "@/lib/motion";

/**
 * Cross-fades route content inside a persistent shell (nav/footer stay put).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        key={pathname}
        className="min-w-0"
        variants={pageMotion(reduceMotion)}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transitionEase(DURATION.sm, reduceMotion)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
