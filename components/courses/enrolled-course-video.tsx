"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SAVE_DEBOUNCE_MS = 4000;

/**
 * Full lesson video for enrolled users: resumes from saved progress and POSTs
 * watched percentage (debounced) to `/api/enrollments/progress`.
 */
export function EnrolledCourseVideo({
  courseId,
  src,
  title,
  initialProgress,
}: {
  courseId: string;
  src: string;
  title: string;
  /** Last saved 0–100 from `enrollments.progress` */
  initialProgress: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSent = useRef(Math.max(0, Math.min(100, Math.round(initialProgress))));
  const debounceRef = useRef<number | undefined>(undefined);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const persist = useCallback(
    async (pct: number) => {
      const p = Math.max(0, Math.min(100, Math.round(pct)));
      if (p <= lastSent.current && p < 100) return;

      setSaveState("saving");
      try {
        const res = await fetch("/api/enrollments/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId, progress: p }),
        });
        const data = (await res.json()) as { ok?: boolean; progress?: number; error?: string };
        if (!res.ok || !data.ok) {
          throw new Error(data.error ?? "Save failed");
        }
        lastSent.current = data.progress ?? p;
        setSaveState("saved");
        window.setTimeout(() => setSaveState("idle"), 2000);
      } catch {
        setSaveState("error");
      }
    },
    [courseId]
  );

  const schedulePersist = useCallback(
    (pct: number) => {
      if (debounceRef.current !== undefined) {
        window.clearTimeout(debounceRef.current);
      }
      debounceRef.current = window.setTimeout(() => {
        debounceRef.current = undefined;
        void persist(pct);
      }, SAVE_DEBOUNCE_MS);
    },
    [persist]
  );

  const onTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el?.duration || !Number.isFinite(el.duration) || el.duration <= 0) return;
    const pct = (el.currentTime / el.duration) * 100;
    schedulePersist(pct);
  }, [schedulePersist]);

  const onEnded = useCallback(() => {
    if (debounceRef.current !== undefined) {
      window.clearTimeout(debounceRef.current);
      debounceRef.current = undefined;
    }
    void persist(100);
  }, [persist]);

  useEffect(() => {
    return () => {
      if (debounceRef.current !== undefined) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, []);

  /* Resume near last saved position once metadata is known */
  useEffect(() => {
    const el = videoRef.current;
    if (!el || initialProgress <= 0 || initialProgress >= 100) return;
    const onMeta = () => {
      if (!el.duration || !Number.isFinite(el.duration)) return;
      const t = (Math.max(0, Math.min(99, initialProgress)) / 100) * el.duration;
      if (Number.isFinite(t) && t > 0) {
        el.currentTime = t;
      }
    };
    el.addEventListener("loadedmetadata", onMeta, { once: true });
    return () => el.removeEventListener("loadedmetadata", onMeta);
  }, [initialProgress, src]);

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        controls
        playsInline
        preload="auto"
        src={src}
        title={title}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      >
        Your browser does not support embedded video.
      </video>
      {saveState !== "idle" ? (
        <p
          className="pointer-events-none absolute bottom-3 right-3 rounded-lg bg-black/55 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
          aria-live="polite"
        >
          {saveState === "saving" && "Saving progress…"}
          {saveState === "saved" && "Progress saved"}
          {saveState === "error" && "Could not save progress"}
        </p>
      ) : null}
    </div>
  );
}
