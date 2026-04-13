import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  BRAND_IMAGE_HEIGHT,
  BRAND_IMAGE_SRC,
  BRAND_IMAGE_WIDTH,
} from "@/components/brand/brand-assets";

export function AuthHeroLogo({
  className,
  priority,
  variant = "desktop",
}: {
  className?: string;
  priority?: boolean;
  variant?: "desktop" | "mobile";
}) {
  return (
    <Image
      src={BRAND_IMAGE_SRC}
      alt="Infranex Technologies — Fast, reliable, future-ready"
      width={BRAND_IMAGE_WIDTH}
      height={BRAND_IMAGE_HEIGHT}
      priority={priority}
      sizes={
        variant === "desktop"
          ? "(min-width: 1024px) 36rem, 90vw"
          : "(max-width: 1023px) 90vw, 320px"
      }
      className={cn(
        "object-contain object-center",
        variant === "desktop"
          ? "h-[min(10rem,calc(5rem+12vw))] w-auto max-w-full sm:h-[min(11rem,calc(6rem+10vw))] lg:h-[min(12rem,18vw)]"
          : "h-[min(9rem,calc(4.5rem+14vw))] w-auto max-w-full",
        className
      )}
    />
  );
}
