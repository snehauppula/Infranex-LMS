import { Suspense } from "react";
import { CoursesExplorer } from "@/components/marketing/courses-explorer";
import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourses } from "@/services/courses";

function CoursesFallback() {
  return (
    <Container className="py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[320px] w-full" />
        ))}
      </div>
    </Container>
  );
}

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <div className="py-12 sm:py-16 md:py-20">
      <Container className="py-8">
        <div className="max-w-2xl min-w-0">
          <h1 className="text-[clamp(1.65rem,5vw+0.5rem,3rem)] font-bold leading-tight tracking-tight text-deep sm:text-4xl md:text-5xl">
            Programs worth your nights and weekends
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Search the catalog and open a course to see pricing, previews, and
            enrollment. Everything listed here comes from your database.
          </p>
        </div>
      </Container>
      <Suspense fallback={<CoursesFallback />}>
        <CoursesExplorer courses={courses} />
      </Suspense>
    </div>
  );
}
