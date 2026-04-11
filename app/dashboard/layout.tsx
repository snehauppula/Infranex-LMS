import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getSessionUser, getUserDisplayName } from "@/services/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role } = await getSessionUser();
  if (!user) redirect("/auth");
  const displayName = getUserDisplayName(user);

  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-clip bg-background">
      <DashboardHeader
        displayName={displayName}
        email={user.email ?? null}
        role={role}
      />
      <div className="flex-1">{children}</div>
    </div>
  );
}
