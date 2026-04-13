"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type LottieJson = Record<string, unknown>;

export function HeroOnlineLearningAnimation({
  className,
}: {
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [data, setData] = useState<LottieJson | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetch("/lottie/online-learning.json")
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<LottieJson>;
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) {
    return (
      <div
        className={cn("animate-pulse rounded-lg bg-surface", className)}
        aria-hidden
      />
    );
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Lottie
        animationData={data}
        loop
        autoplay={!reduceMotion}
        className="h-full w-full max-w-full object-contain"
        aria-hidden
      />
    </div>
  );
}
