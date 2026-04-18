import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        // Keep the site grid aligned with the floating navbar shell (1280px).
        // Individual sections can opt into wider canvases via `className`.
        "mx-auto w-full min-w-0 max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}
