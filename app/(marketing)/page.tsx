import { HomeSections } from "@/components/marketing/home-sections";
import { getCourses } from "@/services/courses";

export default async function HomePage() {
  const courses = await getCourses();
  return <HomeSections courses={courses} />;
}
