import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { getSessionUser, getUserDisplayName } from "@/services/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role } = await getSessionUser();
  if (!user) redirect("/auth");
  if (role !== "admin") redirect("/dashboard");

  const displayName = getUserDisplayName(user);

  return (
    <div className="min-h-full min-w-0 overflow-x-clip bg-background">
      <SkipToContent />
      <Navbar
        sessionEmail={user.email ?? null}
        displayName={displayName}
        role={role}
      />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
    </div>
  );
}
