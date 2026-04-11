"use client";

import { useEffect } from "react";

/** Scrolls to `#course-player` when opening from Dashboard “Continue” (or any link with that hash). */
export function CoursePlayerScroll({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#course-player") return;

    const run = () => {
      document
        .getElementById("course-player")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    run();
    requestAnimationFrame(run);
  }, [enabled]);

  return null;
}
