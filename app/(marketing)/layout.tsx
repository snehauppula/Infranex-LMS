import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/layout/page-transition";
import { SkipToContent } from "@/components/layout/skip-to-content";
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
      <SkipToContent />
      <Navbar
        sessionEmail={user?.email ?? null}
        displayName={displayName}
        role={role}
        overlay
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-w-0 flex-1 overflow-x-clip bg-transparent outline-none"
      >
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
