import { Suspense } from "react";
import { CoursesExplorer } from "@/components/marketing/courses-explorer";
import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourses } from "@/services/courses";

function CoursesFallback() {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-[320px] w-full" />
      ))}
    </div>
  );
}

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <div className="relative min-w-0 overflow-x-clip bg-gradient-to-b from-background via-surface to-background pb-14 pt-[max(6.1rem,calc(5.15rem+env(safe-area-inset-top,0px)))] sm:pb-16 sm:pt-[max(6.45rem,calc(5.55rem+env(safe-area-inset-top,0px)))] md:pb-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_85%_at_50%_8%,rgba(0,174,239,0.10),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_12%_-10%,rgba(8,28,61,0.05),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(8,28,61,0.028) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(8,28,61,0.028) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />
      <Container>
        <div className="relative max-w-2xl min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Course catalog
          </p>
          <h1 className="text-[clamp(1.65rem,5vw+0.5rem,3rem)] font-bold leading-tight tracking-tight text-deep sm:text-4xl md:text-5xl">
            Programs worth your nights and weekends
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Search the catalog and open a course to see pricing, previews, and
            enrollment. Everything listed here comes from your database.
          </p>
        </div>
        <Suspense fallback={<CoursesFallback />}>
          <CoursesExplorer courses={courses} />
        </Suspense>
      </Container>
    </div>
  );
}
