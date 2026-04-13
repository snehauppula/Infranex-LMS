import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  BRAND_IMAGE_HEIGHT,
  BRAND_IMAGE_SRC,
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
      ? "h-14 w-auto max-w-[min(560px,92vw)] sm:h-16 md:h-[4.25rem] lg:h-20 xl:h-[5.25rem]"
      : "h-9 w-auto max-w-[min(280px,80vw)] sm:h-10";

  return (
    <Image
      src={BRAND_IMAGE_SRC}
      alt="Infranex Technologies — Fast, reliable, future-ready"
      width={BRAND_IMAGE_WIDTH}
      height={BRAND_IMAGE_HEIGHT}
      priority={priority}
      sizes="(max-width: 640px) 420px, (max-width: 1024px) 520px, 560px"
      className={cn(
        "object-contain object-left",
        align === "center" && "object-center",
        height == null ? sizeClasses : "w-auto max-w-[min(560px,94vw)] object-contain",
        className
      )}
      style={height != null ? { height, width: "auto" } : undefined}
    />
  );
}
