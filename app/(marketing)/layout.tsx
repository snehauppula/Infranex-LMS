import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { getSessionUser, getUserDisplayName } from "@/services/auth";

export const dynamic = "force-dynamic";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role } = await getSessionUser();
  const displayName = getUserDisplayName(user);

  return (
    <>
      <Navbar
        sessionEmail={user?.email ?? null}
        displayName={displayName}
        role={role}
      />
      <main className="min-w-0 flex-1 overflow-x-clip bg-transparent">
        {children}
      </main>
      <Footer />
    </>
  );
}
