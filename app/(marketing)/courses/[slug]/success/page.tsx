import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/container";
import { EnrollmentSuccessExperience } from "@/components/checkout/enrollment-success-experience";
import { getCourseForDetailPage } from "@/services/courses";
import { getSessionUser } from "@/services/auth";
import { getEnrollmentForCourse } from "@/services/enrollments";
import { courseDetailPath } from "@/lib/course-path";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseForDetailPage(slug);
  return {
    title: course ? `You are enrolled · ${course.title}` : "Enrollment confirmed",
    description: "Your payment went through — open your course and start learning.",
  };
}

export default async function EnrollmentSuccessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: param } = await params;
  const course = await getCourseForDetailPage(param);
  if (!course) redirect("/courses");

  if (param !== course.slug) {
    redirect(`${courseDetailPath(course)}/success`);
  }

  const { user } = await getSessionUser();
  if (!user) {
    redirect(`/auth?next=${encodeURIComponent(`/courses/${course.slug}/success`)}`);
  }

  const enrollment = await getEnrollmentForCourse(user.id, course.id);
  if (!enrollment || enrollment.status === "paused") {
    redirect(courseDetailPath(course));
  }

  return (
    <div
      className="min-w-0 pb-20 sm:pb-28 pt-[max(6.1rem,calc(5.15rem+env(safe-area-inset-top,0px)))] sm:pt-[max(6.45rem,calc(5.55rem+env(safe-area-inset-top,0px)))]"
    >
      <Container className="min-w-0">
        <EnrollmentSuccessExperience courseTitle={course.title} courseSlug={course.slug} />
      </Container>
    </div>
  );
}
