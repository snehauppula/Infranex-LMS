import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  BRAND_IMAGE_HEIGHT,
  BRAND_IMAGE_URL,
  BRAND_IMAGE_WIDTH,
} from "@/components/brand/brand-assets";

export function InfranexLogoMark({
  className,
  priority,
  /** Fixed pixel height (overrides size classes if set). Prefer omitting for responsive nav. */
  height,
  align = "left",
  size = "default",
}: {
  className?: string;
  priority?: boolean;
  height?: number;
  align?: "left" | "center";
  /** `nav` = larger responsive mark for header */
  size?: "default" | "nav";
}) {
  const sizeClasses =
    size === "nav"
      ? /* ~163px max width at scale; shrink-0 avoids 0×0 in flex nav rows */
        "h-[2.375rem] w-auto max-h-[48px] max-w-[min(163px,calc(100vw-7.5rem))] sm:h-[2.5rem] sm:max-w-[min(163px,calc(100vw-8rem))] md:h-[2.5625rem] lg:h-[2.625rem]"
      : "h-9 w-auto max-w-[min(280px,80vw)] sm:h-10";

  return (
    <Image
      src={BRAND_IMAGE_URL}
      alt="Infranex Technologies — Fast, reliable, future-ready"
      width={BRAND_IMAGE_WIDTH}
      height={BRAND_IMAGE_HEIGHT}
      priority={priority}
      sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 328px"
      className={cn(
        "shrink-0 object-contain object-left",
        align === "center" && "object-center",
        height == null ? sizeClasses : "w-auto max-w-[min(560px,94vw)] object-contain",
        className
      )}
      style={height != null ? { height, width: "auto" } : undefined}
    />
  );
}
