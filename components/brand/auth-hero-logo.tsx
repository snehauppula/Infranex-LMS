import Image from "next/image";
import { cn } from "@/lib/utils";

/** Standalone mark (e.g. transparent PNG) — `public/brand/infranex-auth-hero.png`. */
const AUTH_HERO_LOGO_SRC = "/brand/infranex-auth-hero.png";

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
      src={AUTH_HERO_LOGO_SRC}
      alt="Infranex"
      width={512}
      height={512}
      priority={priority}
      sizes={
        variant === "desktop"
          ? "(min-width: 1024px) 22rem, 70vw"
          : "(max-width: 1023px) 70vw, 280px"
      }
      className={cn(
        "object-contain object-center",
        variant === "desktop"
          ? "h-[min(19rem,calc(14rem+8vw))] w-auto max-w-full sm:h-[min(22rem,calc(15rem+10vw))]"
          : "h-[min(16rem,calc(12rem+10vw))] w-auto max-w-full",
        className
      )}
    />
  );
}
