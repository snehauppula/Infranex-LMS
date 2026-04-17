"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  megaEmbedSrcFromVideoUrl,
  megaEmbedSrcWithStartSeconds,
  parseVideoDurationLabelToSeconds,
} from "@/lib/video";

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
  videoDurationLabel,
}: {
  courseId: string;
  src: string;
  title: string;
  /** Last saved 0–100 from `enrollments.progress` */
  initialProgress: number;
  /**
   * When this matches the real video length as a clock (e.g. `2:55:30` or `45:30`), MEGA embeds
   * get a `!{seconds}s` hash suffix so the iframe opens near the learner’s saved percent.
   */
  videoDurationLabel?: string | null;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSent = useRef(Math.max(0, Math.min(100, Math.round(initialProgress))));
  const debounceRef = useRef<number | undefined>(undefined);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  const persist = useCallback(
    async (pct: number) => {
      const p = Math.max(0, Math.min(100, Math.round(pct)));
      if (p <= lastSent.current && p < 100) return;

      setSaveState("saving");
      setSaveError(null);
      try {
        const res = await fetch("/api/enrollments/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId, progress: p }),
        });
        const data = (await res.json()) as { ok?: boolean; progress?: number; error?: string };
        if (!res.ok || !data.ok) {
          const msg = data.error ?? `Save failed (${res.status})`;
          if (process.env.NODE_ENV === "development") {
            console.error("[EnrolledCourseVideo] progress API:", msg);
          }
          setSaveError(msg);
          setSaveState("error");
          return;
        }
        lastSent.current = data.progress ?? p;
        setSaveState("saved");
        window.setTimeout(() => setSaveState("idle"), 2000);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Save failed";
        if (process.env.NODE_ENV === "development") {
          console.error("[EnrolledCourseVideo] progress save:", e);
        }
        setSaveError(msg);
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

  const baseMegaSrc = megaEmbedSrcFromVideoUrl(src);
  const durationSec = parseVideoDurationLabelToSeconds(videoDurationLabel ?? undefined);

  let megaSrc = baseMegaSrc;
  if (baseMegaSrc && durationSec != null && durationSec > 0) {
    const endish = Math.max(0, durationSec - 1);
    if (initialProgress >= 100) {
      megaSrc = megaEmbedSrcWithStartSeconds(baseMegaSrc, endish);
    } else if (initialProgress > 0) {
      megaSrc = megaEmbedSrcWithStartSeconds(
        baseMegaSrc,
        Math.min(endish, Math.floor((initialProgress / 100) * durationSec))
      );
    }
  }

  const megaNoticeTitle =
    durationSec != null && durationSec > 0
      ? "MEGA cannot report live playback to this site. When the course duration matches the file length, we set MEGA’s !seconds start in the embed URL from your saved percent."
      : "Embedded MEGA players cannot share playback position with this site for security reasons.";
  const megaNoticeText =
    durationSec != null && durationSec > 0 && initialProgress > 0
      ? "Live position isn’t saved; opened near your saved progress."
      : "Watch progress isn’t saved for this MEGA embed.";

  if (megaSrc) {
    return (
      <div className="relative h-full w-full">
        <iframe
          title={title}
          src={megaSrc}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <p
          className="pointer-events-none absolute bottom-3 right-3 max-w-[min(100%,16rem)] rounded-md bg-black/40 px-2 py-1 text-[10px] font-medium leading-snug text-white/85 backdrop-blur-sm"
          aria-live="polite"
          title={megaNoticeTitle}
        >
          {megaNoticeText}
        </p>
      </div>
    );
  }

  const videoSrc = src.split("#")[0];

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        controls
        playsInline
        preload="auto"
        src={videoSrc}
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
          {saveState === "error" &&
            (saveError ? `Could not save: ${saveError}` : "Could not save progress")}
        </p>
      ) : null}
    </div>
  );
}
