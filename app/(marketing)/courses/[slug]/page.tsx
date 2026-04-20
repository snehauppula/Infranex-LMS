import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Check, Shield, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { CourseRow } from "@/types";
import { getCourseForDetailPage } from "@/services/courses";
import { getSessionUser } from "@/services/auth";
import { getEnrollmentForCourse } from "@/services/enrollments";
import { CourseCheckout } from "@/components/checkout/course-checkout";
import { CoursePlayerScroll } from "@/components/courses/course-player-scroll";
import { EnrolledCourseVideo } from "@/components/courses/enrolled-course-video";
import { ManualCourseComplete } from "@/components/courses/manual-course-complete";
import { catalogVideoThumbnailUrl, megaEmbedSrcFromVideoUrl } from "@/lib/video";
import { courseDetailPath } from "@/lib/course-path";
import { cn } from "@/lib/utils";

function formatInrPaise(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

function courseHighlightLines(course: CourseRow): string[] {
  const raw = course.highlights;
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.filter(
      (line): line is string => typeof line === "string" && line.trim().length > 0
    );
  }
  return [
    course.duration
      ? `About ${course.duration} of structured learning — self-paced`
      : "Self-paced learning on your schedule",
    "Secure Razorpay checkout — instant access after payment",
    "Lesson playback in the built-in course player",
  ];
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: param } = await params;
  const course = await getCourseForDetailPage(param);
  if (!course) notFound();

  if (param !== course.slug) {
    redirect(courseDetailPath(course));
  }

  const { user } = await getSessionUser();
  const enrollment =
    user != null ? await getEnrollmentForCourse(user.id, course.id) : null;
  const isEnrolled = enrollment != null && enrollment.status !== "paused";

  const posterSrc = course.poster_url?.trim() || null;
  // Prefer curated poster over derived video thumbnails.
  const previewThumb =
    posterSrc ??
    (course.video_url != null ? catalogVideoThumbnailUrl(course.video_url) : null);

  const megaEmbedSrc = megaEmbedSrcFromVideoUrl(course.video_url);
  const directVideoSrc = course.video_url?.split("#")[0] ?? null;

  const highlightLines = courseHighlightLines(course);

  const playerShell = cn(
    "aspect-video w-full overflow-hidden rounded-2xl",
    isEnrolled && course.video_url
      ? "bg-black shadow-inner ring-1 ring-white/10"
      : "bg-surface-strong ring-1 ring-border/70"
  );

  return (
    <div
      className={cn(
        "min-w-0 pb-20 sm:pb-28",
        /* Clear fixed overlay navbar (~64–76px) + top offset + breathing room */
        "pt-[max(6.1rem,calc(5.15rem+env(safe-area-inset-top,0px)))] sm:pt-[max(6.45rem,calc(5.55rem+env(safe-area-inset-top,0px)))]"
      )}
    >
      <CoursePlayerScroll enabled={isEnrolled} />
      <Container className="min-w-0">
        <div className="mb-8 sm:mb-10">
          <Link
            href="/courses"
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-deep"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              aria-hidden
            />
            Back to courses
          </Link>
        </div>

        <article
          className={cn(
            "min-w-0 overflow-hidden rounded-3xl border border-border bg-card",
            "shadow-[0_28px_80px_-36px_rgba(8,28,61,0.28)] ring-1 ring-black/[0.03]"
          )}
        >
          <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]">
            {/* Media column */}
            <div
              className={cn(
                "border-border p-5 sm:p-6 lg:p-8 lg:pr-6 xl:pr-8",
                "border-b lg:border-b-0 lg:border-r",
                "bg-[linear-gradient(180deg,rgba(0,174,239,0.06)_0%,transparent_38%)]"
              )}
            >
              <div
                id="course-player"
                className={cn(
                  playerShell,
                  isEnrolled && course.video_url ? "shadow-[0_20px_50px_-20px_rgba(0,0,0,0.55)]" : ""
                )}
              >
                {isEnrolled && course.video_url ? (
                  <EnrolledCourseVideo
                    courseId={course.id}
                    src={course.video_url}
                    title={course.title}
                    initialProgress={enrollment?.progress ?? 0}
                    videoDurationLabel={course.duration}
                  />
                ) : isEnrolled && !course.video_url ? (
                  <div className="flex h-full min-h-[12rem] w-full flex-col items-center justify-center gap-2 bg-deep/[0.04] p-8 text-center">
                    <p className="text-sm font-semibold text-deep">No video URL on this course</p>
                    <p className="max-w-sm text-sm text-muted">
                      Set <span className="font-mono text-xs">video_url</span> to a direct{" "}
                      <span className="font-mono text-xs">.mp4</span> or MEGA{" "}
                      <span className="font-mono text-xs">embed</span> URL (include the hash).
                    </p>
                  </div>
                ) : previewThumb ? (
                  <img
                    src={previewThumb}
                    alt={`${course.title} preview`}
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                ) : posterSrc ? (
                  <img
                    src={posterSrc}
                    alt={`${course.title} preview`}
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                ) : megaEmbedSrc ? (
                  <iframe
                    title={`${course.title} preview`}
                    src={megaEmbedSrc}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : directVideoSrc ? (
                  <video
                    src={directVideoSrc}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={`${course.title} preview`}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8 text-center">
                    <Sparkles className="h-8 w-8 text-primary/60" aria-hidden />
                    <p className="text-sm font-semibold text-deep">Preview coming soon</p>
                    <p className="max-w-sm text-sm text-muted">
                      Add a lesson URL on this course to show a preview and unlock the player.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Copy column */}
            <div className="flex min-w-0 flex-col justify-center p-5 sm:p-6 lg:py-10 lg:pl-6 lg:pr-8 xl:pl-8">
              <div className="border-l-2 border-primary/35 pl-5 sm:pl-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                  Course
                </p>
                <h1 className="mt-2 text-balance text-2xl font-bold leading-tight tracking-tight text-deep sm:text-3xl lg:text-[2rem] lg:leading-[1.15]">
                  {course.title}
                </h1>
                {course.description ? (
                  <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted sm:text-[15px]">
                    {course.description}
                  </p>
                ) : null}

                <ul className="mt-6 grid gap-2.5" role="list">
                  {highlightLines.map((line, i) => (
                    <li key={`${i}-${line.slice(0, 48)}`} className="flex gap-3 text-sm leading-snug">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                      </span>
                      <span className="text-deep/85">{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-lg border border-primary/30 bg-primary/[0.09] px-3 py-1.5 text-xs font-semibold text-deep">
                    {course.duration ?? "Self-paced"}
                  </span>
                  <span className="inline-flex items-center rounded-lg border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium text-muted">
                    Streamed lessons
                  </span>
                </div>
              </div>

              {isEnrolled ? (
                <div className="mt-8 flex gap-3 rounded-xl border border-primary/20 bg-primary/[0.06] p-4 lg:hidden">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <Shield className="h-4 w-4" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-deep">You are enrolled</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">
                      Use the player on the left to watch or resume.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Full-width action bar — balances the layout under the video */}
          <footer
            className={cn(
              "border-t border-border px-5 py-7 sm:px-8 sm:py-8",
              isEnrolled
                ? "bg-gradient-to-b from-primary/[0.05] via-surface to-surface/85"
                : "bg-gradient-to-b from-surface/90 to-surface/40"
            )}
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-stretch lg:justify-between lg:gap-12">
              <div className="min-w-0 lg:flex-1">
                {isEnrolled ? (
                  <div className="flex flex-wrap items-start gap-4 sm:gap-5">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.08] text-primary shadow-sm shadow-primary/5 lg:flex">
                      <Shield className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                        Your access
                      </p>
                      <p className="mt-2 text-xl font-bold tracking-tight text-deep sm:text-[1.35rem]">
                        You are enrolled
                      </p>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                        Resume in the lesson player above — playback and progress stay in sync
                        with your dashboard.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Tuition
                    </p>
                    <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-primary sm:text-[2.65rem] sm:leading-none">
                      {formatInrPaise(course.price)}
                    </p>
                    <p className="mt-2 max-w-md text-sm text-muted">
                      One-time payment in INR. Secure Razorpay checkout — enrollment unlocks
                      immediately after payment.
                    </p>
                  </>
                )}
              </div>

              <div
                className={cn(
                  "w-full shrink-0 lg:max-w-[min(100%,20rem)]",
                  isEnrolled ? "flex flex-col gap-5" : "space-y-4"
                )}
              >
                {user ? (
                  <>
                    <CourseCheckout
                      courseId={course.id}
                      courseSlug={course.slug}
                      title={course.title}
                      enrolled={isEnrolled}
                    />
                    {isEnrolled && enrollment ? (
                      <div className="rounded-xl border border-border/80 bg-card/90 p-4 shadow-sm ring-1 ring-deep/[0.03]">
                        <ManualCourseComplete
                          courseId={course.id}
                          initialProgress={enrollment.progress}
                        />
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Button asChild className="h-12 w-full text-base font-semibold shadow-md shadow-primary/20">
                    <Link href="/auth">Sign in to enroll</Link>
                  </Button>
                )}
              </div>
            </div>
          </footer>
        </article>
      </Container>
    </div>
  );
}
