import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Container } from "@/components/layout/container";
import { InfranexLogoMark } from "@/components/brand/infranex-logo";
import { getSessionUser } from "@/services/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role } = await getSessionUser();
  if (!user) redirect("/auth");
  if (role !== "admin") redirect("/dashboard");

  return (
    <div className="min-h-full min-w-0 overflow-x-clip bg-background">
      <header className="border-b border-deep/[0.08] bg-gradient-to-r from-white/95 via-[#f0f7fc]/95 to-white/95 pt-[env(safe-area-inset-top,0px)] shadow-[0_1px_0_rgba(255,255,255,1)_inset] backdrop-blur-xl">
        <Container className="flex min-h-[64px] flex-wrap items-center justify-between gap-3 py-2.5 sm:h-[72px] sm:flex-nowrap sm:py-0">
          <div className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-6">
            <Link href="/" className="min-w-0 shrink py-1" aria-label="Home">
              <InfranexLogoMark height={30} className="max-w-[min(160px,45vw)] sm:max-w-[160px]" />
            </Link>
            <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-deep">
              Admin
            </span>
            <nav className="hidden items-center gap-4 text-sm text-muted sm:flex">
              <Link href="/admin" className="hover:text-deep">
                Insights
              </Link>
              <Link href="/dashboard" className="hover:text-deep">
                Student view
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[200px] truncate text-xs text-muted sm:inline">
              {user.email}
            </span>
            <SignOutButton />
          </div>
        </Container>
      </header>
      {children}
    </div>
  );
}
