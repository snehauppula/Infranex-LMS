import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getCourseById } from "@/services/courses";
import { getSessionUser } from "@/services/auth";
import { getEnrollmentForCourse } from "@/services/enrollments";
import { CourseCheckout } from "@/components/checkout/course-checkout";
import { CoursePlayerScroll } from "@/components/courses/course-player-scroll";
import { EnrolledCourseVideo } from "@/components/courses/enrolled-course-video";
import { cloudinaryVideoThumbnailUrl } from "@/lib/cloudinary";

function formatInrPaise(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);
  if (!course) notFound();

  const { user } = await getSessionUser();
  const enrollment =
    user != null ? await getEnrollmentForCourse(user.id, course.id) : null;
  const isEnrolled = enrollment != null && enrollment.status !== "paused";

  const previewThumb =
    course.cloudinary_url != null
      ? cloudinaryVideoThumbnailUrl(course.cloudinary_url)
      : null;

  const videoSrc = course.cloudinary_url?.split("#")[0] ?? null;

  return (
    <div className="bg-background py-12 sm:py-16 md:py-20">
      <CoursePlayerScroll enabled={isEnrolled} />
      <Container className="min-w-0">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          <Link href="/courses" className="shrink-0 hover:text-deep">
            Courses
          </Link>
          <span className="shrink-0 opacity-60" aria-hidden>
            /
          </span>
          <span className="min-w-0 break-words text-deep">{course.title}</span>
        </div>

        <div className="mt-8 grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0">
            <div
              id="course-player"
              className={
                isEnrolled && videoSrc
                  ? "aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black shadow-[0_22px_60px_-18px_rgba(10,31,68,0.22)]"
                  : "aspect-video w-full overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
              }
            >
              {isEnrolled && videoSrc ? (
                <EnrolledCourseVideo
                  courseId={course.id}
                  src={videoSrc}
                  title={course.title}
                  initialProgress={enrollment?.progress ?? 0}
                />
              ) : isEnrolled && !videoSrc ? (
                <div className="flex h-full min-h-[12rem] w-full flex-col items-center justify-center gap-2 bg-deep/5 p-8 text-center">
                  <p className="text-sm font-semibold text-deep">No video URL on this course</p>
                  <p className="max-w-sm text-sm text-muted">
                    Add a Cloudinary <span className="font-mono">.mp4</span> delivery URL to the
                    course so enrolled learners can watch here.
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
              ) : course.cloudinary_url ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8 text-center">
                  <p className="text-sm font-medium text-deep">
                    Preview image unavailable
                  </p>
                  <p className="max-w-sm text-sm text-muted">
                    Use a Cloudinary <span className="font-mono">.mp4</span>{" "}
                    delivery URL to generate a thumbnail.
                  </p>
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8 text-center">
                  <p className="text-sm font-medium text-deep">
                    Preview coming soon
                  </p>
                  <p className="max-w-sm text-sm text-muted">
                    Connect a Cloudinary delivery URL on the course record to
                    stream video here.
                  </p>
                </div>
              )}
            </div>
            {isEnrolled ? (
              <p className="mt-3 text-sm font-medium text-primary">
                You are enrolled — full lesson video is available above.
              </p>
            ) : null}
            <h1 className="mt-6 break-words text-2xl font-bold tracking-tight text-deep sm:mt-8 sm:text-3xl md:text-4xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {course.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted">
              <span className="rounded-full border border-border bg-card px-3 py-1 font-medium text-deep shadow-sm">
                Duration: {course.duration ?? "Self-paced"}
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1 font-medium text-deep shadow-sm">
                Cloud-ready media
              </span>
            </div>
          </div>

          <aside className="min-w-0 lg:pt-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <p className="text-sm font-medium text-muted">Investment</p>
              <p className="mt-2 text-3xl font-semibold text-deep">
                {formatInrPaise(course.price)}
              </p>
              <p className="mt-2 text-sm text-muted">
                Secure checkout with Razorpay. Enrollment unlocks instantly
                after payment.
              </p>
              {user ? (
                <CourseCheckout
                  courseId={course.id}
                  title={course.title}
                  enrolled={isEnrolled}
                />
              ) : (
                <Button asChild className="mt-6 w-full">
                  <Link href="/auth">Sign in to purchase</Link>
                </Button>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
