import Link from "next/link";
import { BookOpen, Shield } from "lucide-react";
import { Container } from "@/components/layout/container";
import { DashboardWelcomeToast } from "@/components/dashboard/dashboard-welcome-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getSessionUser, getUserDisplayName } from "@/services/auth";
import { getStudentEnrollments } from "@/services/enrollments";
import { courseDetailPath } from "@/lib/course-path";
import { Suspense } from "react";

async function Enrollments() {
  const { user } = await getSessionUser();
  if (!user) return null;
  const rows = await getStudentEnrollments(user.id);

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-lg">
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-card px-8 py-14 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface text-primary">
            <BookOpen className="h-8 w-8" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-6 text-xl font-semibold tracking-tight text-deep">
            No enrollments yet
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Browse the catalog, purchase a course, and your seats will show up
            here with progress and a one-click continue path.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/courses">Browse courses</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const avg =
    rows.length > 0
      ? Math.round(
          rows.reduce((a, r) => a + r.progress, 0) / rows.length
        )
      : 0;

  const total = rows.length;
  const completedCount = rows.filter((r) => r.status === "completed").length;
  const pausedCount = rows.filter((r) => r.status === "paused").length;
  const summaryStatus =
    completedCount === total
      ? total === 1
        ? "Course complete"
        : "All courses complete"
      : `${completedCount} of ${total} complete`;
  const summaryDetail =
    pausedCount > 0
      ? `${pausedCount} paused`
      : completedCount === total
        ? null
        : avg > 0
          ? `${avg}% avg progress`
          : "Start your first lesson";
  const statusScreenReader = summaryDetail
    ? `${summaryStatus}. ${summaryDetail}.`
    : `${summaryStatus}.`;

  return (
    <>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm ring-1 ring-border/60">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Active courses
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-deep">
            {rows.length}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm ring-1 ring-border/60">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Avg progress
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-deep">
            {avg}%
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm ring-1 ring-border/60 sm:col-span-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Status
          </p>
          <p className="sr-only">{statusScreenReader}</p>
          <p className="mt-1 text-sm font-semibold leading-snug text-deep text-balance">
            {summaryStatus}
          </p>
          {summaryDetail ? (
            <p className="mt-1 text-xs font-medium leading-snug text-muted">{summaryDetail}</p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {rows.map((e) => (
          <Card
            key={e.id}
            className="overflow-hidden border-border transition-[transform,box-shadow] duration-300 ease-brand-out motion-reduce:duration-150 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-sm"
          >
            <div className="h-1 bg-primary" />
            <CardHeader>
              <CardTitle className="line-clamp-2">{e.course.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {e.course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-muted">
                  <span>Progress</span>
                  <span>{e.progress}%</span>
                </div>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-surface-strong"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={e.progress}
                  aria-label={`Progress for ${e.course.title}`}
                >
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
                    style={{ width: `${e.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <Link href={`${courseDetailPath(e.course)}#course-player`}>
                    Open course
                  </Link>
                </Button>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-deep">
                  {e.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function EnrollmentsFallback() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-52 w-full rounded-2xl" />
        <Skeleton className="h-52 w-full rounded-2xl" />
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const { user, role } = await getSessionUser();
  const displayName = getUserDisplayName(user);
  const firstName = displayName?.split(/\s+/)[0] ?? "there";

  return (
    <div className="border-b border-border bg-background pb-12 pt-6 sm:pb-20 sm:pt-10">
      <Container className="max-w-5xl min-w-0">
        <DashboardWelcomeToast firstName={firstName} />
        {role === "admin" ? (
          <div className="mb-8 rounded-2xl border border-border border-l-4 border-l-primary bg-card p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-primary">
                  <Shield className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    Administrator
                  </p>
                  <p className="mt-1 text-lg font-semibold leading-snug text-deep">
                    Admin console is available
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Learners, courses, and enrollments — open the console anytime.
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="h-12 w-full shrink-0 sm:w-auto sm:px-8"
              >
                <Link href="/admin">Open admin console</Link>
              </Button>
            </div>
          </div>
        ) : null}

        <section className="mt-8 sm:mt-10">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-deep sm:text-2xl">
                My courses
              </h2>
              <p className="mt-1 max-w-xl text-sm text-muted">
                Resume learning, track completion, and open the full course page
                when you need the player or purchase flow.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="shrink-0 self-start sm:self-auto">
              <Link href="/courses">View all courses</Link>
            </Button>
          </div>
          <Suspense fallback={<EnrollmentsFallback />}>
            <Enrollments />
          </Suspense>
        </section>
      </Container>
    </div>
  );
}
