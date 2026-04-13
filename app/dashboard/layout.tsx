import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
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
      <Navbar
        sessionEmail={user.email ?? null}
        displayName={displayName}
        role={role}
      />
      <div className="flex-1">{children}</div>
    </div>
  );
}
