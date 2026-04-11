import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export function PageLoading({
  variant = "default",
}: {
  variant?: "default" | "course" | "grid";
}) {
  if (variant === "grid") {
    return (
      <Container className="py-16 sm:py-20">
        <Skeleton className="mx-auto mb-4 h-10 w-2/3 max-w-lg" />
        <Skeleton className="mx-auto mb-12 h-5 w-1/2 max-w-md" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[300px] w-full rounded-2xl" />
          ))}
        </div>
      </Container>
    );
  }

  if (variant === "course") {
    return (
      <Container className="py-16 sm:py-20">
        <Skeleton className="h-4 w-48" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Skeleton className="aspect-video w-full rounded-2xl" />
            <Skeleton className="mt-8 h-10 w-3/4" />
            <Skeleton className="mt-4 h-24 w-full" />
          </div>
          <div>
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="py-20 sm:py-28">
      <Container>
        <Skeleton className="h-8 w-56 rounded-full" />
        <Skeleton className="mt-8 h-14 w-full max-w-2xl" />
        <Skeleton className="mt-4 h-24 w-full max-w-xl" />
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-12 w-full max-w-xs rounded-xl" />
          <Skeleton className="h-12 w-full max-w-xs rounded-xl" />
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Skeleton className="h-24 rounded-2xl" />
          <Skeleton className="h-24 rounded-2xl" />
          <Skeleton className="hidden h-24 rounded-2xl sm:block" />
        </div>
      </Container>
    </div>
  );
}
