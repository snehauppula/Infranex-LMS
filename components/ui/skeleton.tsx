import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gradient-to-r from-surface-strong via-surface to-surface-strong bg-[length:200%_100%]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
