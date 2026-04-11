"use client";

import { cn } from "@/lib/utils";
import { cloudinaryVideoThumbnailUrl } from "@/lib/cloudinary";

/** Static first-frame thumbnail for catalog / featured cards (no video playback). */
export function CourseVideoThumb({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const thumb = cloudinaryVideoThumbnailUrl(url);

  if (!thumb) {
    return (
      <div
        className={cn(
          "h-full w-full bg-gradient-to-br from-primary/20 via-white to-deep/10",
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
