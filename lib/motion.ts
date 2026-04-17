/** Shared Framer Motion presets — calm, premium easing (no bounce). */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  xs: 0.18,
  sm: 0.26,
  md: 0.34,
  lg: 0.42,
} as const;

/** Default “buttery” ease-out curve. */
export function transitionEase(
  duration: number = DURATION.sm,
  reduceMotion?: boolean | null
) {
  if (reduceMotion) return { duration: 0.01 };
  return { duration, ease: EASE_OUT };
}

/** Soft spring for overlays / menus. */
export function transitionSpring(reduceMotion?: boolean | null) {
  if (reduceMotion) return { duration: 0.2 };
  return {
    type: "spring" as const,
    stiffness: 420,
    damping: 34,
    mass: 0.85,
  };
}

/** Page / section cross-fade + slight lift. */
export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function pageMotion(reduceMotion: boolean | null) {
  if (reduceMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    } as const;
  }
  return pageVariants;
}
