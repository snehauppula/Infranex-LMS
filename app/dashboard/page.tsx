import Link from "next/link";
import { BookOpen, Shield, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
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
import { Suspense } from "react";

async function Enrollments() {
  const { user } = await getSessionUser();
  if (!user) return null;
  const rows = await getStudentEnrollments(user.id);

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-lg">
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-primary/30 bg-gradient-to-b from-white via-white to-primary/[0.07] px-8 py-14 text-center shadow-[0_18px_50px_-24px_rgba(10,31,68,0.12)]">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/20">
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

  return (
    <>
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Active courses
          </p>
          <p className="mt-1 text-2xl font-semibold text-deep">{rows.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Avg progress
          </p>
          <p className="mt-1 text-2xl font-semibold text-deep">{avg}%</p>
        </div>
        <div className="rounded-2xl border border-border bg-white px-5 py-4 shadow-sm sm:col-span-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Status
          </p>
          <p className="mt-1 text-sm font-semibold text-primary">On track</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {rows.map((e) => (
          <Card
            key={e.id}
            className="overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-18px_rgba(10,31,68,0.16)]"
          >
            <div className="h-2 bg-gradient-to-r from-primary/40 via-primary to-deep/30" />
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
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-deep transition-all"
                    style={{ width: `${e.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <Link href={`/courses/${e.course.id}#course-player`}>
                    Continue
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
    <div className="border-b border-border/60 bg-gradient-to-b from-white to-background pb-12 pt-8 sm:pb-20 sm:pt-14">
      <Container className="max-w-5xl min-w-0">
        {role === "admin" ? (
          <div className="mb-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-deep via-[#0b2a5c] to-deep p-5 text-white shadow-[0_20px_50px_-20px_rgba(0,174,239,0.35)] sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/30">
                  <Shield className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/90">
                    Administrator
                  </p>
                  <p className="mt-1 text-lg font-semibold leading-snug">
                    Admin console is available
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    Learners, courses, and enrollments — open the console anytime.
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="h-12 w-full shrink-0 border-0 bg-primary text-primary-foreground shadow-[0_16px_40px_-12px_rgba(0,174,239,0.5)] hover:bg-primary/90 sm:w-auto sm:px-8"
              >
                <Link href="/admin">Open admin console</Link>
              </Button>
            </div>
          </div>
        ) : null}

        <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-white via-[#f8fafc] to-primary/[0.07] p-6 shadow-[0_18px_50px_-24px_rgba(10,31,68,0.1)] sm:rounded-3xl sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-3 py-1 text-xs font-medium text-deep shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Your workspace
            </div>
            <h1 className="mt-4 break-words text-2xl font-bold tracking-tight text-deep sm:mt-5 sm:text-3xl md:text-4xl">
              Welcome back{firstName !== "there" ? `, ${firstName}` : ""}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Head to the catalog to enroll, or jump back into a course below.
              Progress saves automatically across devices.
            </p>
          </div>
        </section>

        <section className="mt-12 sm:mt-14">
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
              <Link href="/courses">Open catalog</Link>
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
