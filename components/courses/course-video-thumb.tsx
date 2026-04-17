"use client";

import { cn } from "@/lib/utils";
import { catalogVideoThumbnailUrl } from "@/lib/video";

/** Static first-frame thumbnail for catalog / featured cards (no video playback). */
export function CourseVideoThumb({
  url,
  posterUrl,
  className,
}: {
  /** Video delivery URL (Cloudinary and similar may yield an auto thumbnail). */
  url?: string | null;
  /** When no derivable video thumbnail (e.g. MEGA embed), use this image URL. */
  posterUrl?: string | null;
  className?: string;
}) {
  const fromVideo = url ? catalogVideoThumbnailUrl(url) : null;
  const fromPoster = posterUrl?.trim() ? posterUrl.trim() : null;
  // Poster should always win: it’s explicitly curated.
  const thumb = fromPoster ?? fromVideo;

  if (!thumb) {
    return (
      <div
        className={cn(
          "h-full w-full bg-surface",
          className
        )}
        aria-hidden
      />
    );
  }

  return (
    <img
      src={thumb}
      alt=""
      className={cn("h-full w-full object-cover", className)}
      loading="lazy"
      decoding="async"
      // Decorative crop; card / parent provide visible title
      aria-hidden
    />
  );
}
