"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Library, Shield, User } from "lucide-react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Container } from "@/components/layout/container";
import { InfranexLogoMark } from "@/components/brand/infranex-logo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/courses", label: "Catalog", icon: Library },
] as const;

export function DashboardHeader({
  displayName,
  email,
  role,
}: {
  displayName: string | null;
  email: string | null;
  role: "student" | "admin" | null;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-deep/[0.08] bg-gradient-to-r from-white/95 via-[#f0f7fc]/95 to-white/95 pt-[env(safe-area-inset-top,0px)] shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_10px_36px_-24px_rgba(10,31,68,0.08)] backdrop-blur-xl">
      <Container className="flex min-h-[64px] max-w-[1320px] flex-wrap items-center justify-between gap-3 py-2 sm:h-[72px] sm:flex-nowrap sm:py-0">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-8">
          <Link href="/" className="shrink-0 py-1" aria-label="Infranex home">
            <InfranexLogoMark height={32} className="max-w-[140px] sm:max-w-[180px]" />
          </Link>
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Student navigation"
          >
            {nav.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/dashboard"
                  ? pathname === "/dashboard" || pathname.startsWith("/dashboard/")
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-deep"
                      : "text-muted hover:bg-background hover:text-deep"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                  {label}
                </Link>
              );
            })}
            {role === "admin" && (
              <Link
                href="/admin"
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith("/admin")
                    ? "bg-primary/10 text-deep"
                    : "text-muted hover:bg-background hover:text-deep"
                )}
              >
                <Shield className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {role === "admin" ? (
            <Link
              href="/admin"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-deep sm:px-3 sm:text-xs",
                pathname.startsWith("/admin") && "border-primary/40 bg-primary/15"
              )}
            >
              <Shield className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              Admin
            </Link>
          ) : null}
          <div className="flex items-center gap-2 rounded-2xl border border-border/90 bg-background/80 py-1 pl-1.5 pr-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-600 text-white shadow-inner ring-2 ring-white">
              <User className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </span>
            <div className="hidden min-w-0 max-w-[140px] flex-col leading-tight sm:flex lg:max-w-[200px]">
              {displayName ? (
                <span className="truncate text-sm font-semibold text-deep">
                  {displayName}
                </span>
              ) : null}
              <span className="truncate text-xs text-muted">{email}</span>
            </div>
          </div>
          <SignOutButton />
        </div>
      </Container>
      <div className="border-t border-border bg-white/95 pb-[env(safe-area-inset-bottom,0px)] md:hidden">
        <Container className="max-w-[1320px] min-w-0">
          <nav
            className="-mx-1 flex gap-1 overflow-x-auto overscroll-x-contain px-1 py-2 [-webkit-overflow-scrolling:touch]"
            aria-label="Student navigation"
          >
            {nav.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/dashboard"
                  ? pathname === "/dashboard" ||
                    pathname.startsWith("/dashboard/")
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium",
                    active
                      ? "bg-primary/10 text-deep"
                      : "text-muted hover:bg-background hover:text-deep"
                  )}
                >
                  <Icon className="h-4 w-4 opacity-80" aria-hidden />
                  {label}
                </Link>
              );
            })}
            {role === "admin" && (
              <Link
                href="/admin"
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium",
                  pathname.startsWith("/admin")
                    ? "bg-primary/10 text-deep"
                    : "text-muted hover:bg-background hover:text-deep"
                )}
              >
                <Shield className="h-4 w-4 opacity-80" aria-hidden />
                Admin
              </Link>
            )}
          </nav>
        </Container>
      </div>
    </header>
  );
}
