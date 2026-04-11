import { AdminConsole } from "@/components/admin/admin-console";
import { getAdminCourses, getAdminStudents } from "@/services/admin";

export default async function AdminPage() {
  const [students, courses] = await Promise.all([
    getAdminStudents(),
    getAdminCourses(),
  ]);

  return <AdminConsole students={students} courses={courses} />;
}
