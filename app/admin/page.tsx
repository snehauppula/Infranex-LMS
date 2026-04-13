import { AdminConsole } from "@/components/admin/admin-console";
import { getSupabaseServiceRoleKey } from "@/lib/supabase/env";
import { getAdminCourses, getAdminStudents } from "@/services/admin";

export default async function AdminPage() {
  const [students, courses] = await Promise.all([
    getAdminStudents(),
    getAdminCourses(),
  ]);

  const serviceRoleConfigured = Boolean(getSupabaseServiceRoleKey());

  return (
    <AdminConsole
      students={students}
      courses={courses}
      serviceRoleConfigured={serviceRoleConfigured}
    />
  );
}
