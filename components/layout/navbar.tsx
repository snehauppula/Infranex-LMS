"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InfranexLogoMark } from "@/components/brand/infranex-logo";
import { SignOutButton } from "@/components/auth/sign-out-button";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About us" },
] as const;

function primaryNavLinks(sessionEmail: string | null | undefined) {
  if (sessionEmail) {
    return [
      ...links,
      { href: "/dashboard" as const, label: "Dashboard" },
    ];
  }
  return [...links];
}

function linkIsActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  }
  if (href === "/courses") {
    return pathname === "/courses" || pathname.startsWith("/courses/");
  }
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({
  sessionEmail,
  displayName,
  role,
}: {
  sessionEmail?: string | null;
  displayName?: string | null;
  role?: "student" | "admin" | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountWrapRef = useRef<HTMLDivElement>(null);
  const navItems = primaryNavLinks(sessionEmail);

  useEffect(() => {
    setAccountMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!accountMenuOpen) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const el = accountWrapRef.current;
      if (el && !el.contains(e.target as Node)) setAccountMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAccountMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [accountMenuOpen]);

  return (
    <header
      className={cn(
        "sticky z-40 mx-auto mb-2 mt-3 box-border w-[calc(100%-1.5rem)] max-w-[1360px] overflow-x-clip overflow-y-visible rounded-2xl border pt-[env(safe-area-inset-top,0px)] transition-shadow duration-300 sm:top-4 sm:mb-3 sm:mt-4 sm:w-[calc(100%-2rem)] sm:rounded-3xl md:w-[calc(100%-3rem)]",
        "top-3",
        "border-border bg-card/90 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-card/85"
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border"
        aria-hidden
      />

      {/* Desktop: center nav; side columns sized so logo is not squeezed */}
      <div
        className="relative mx-auto hidden h-[88px] w-full max-w-[1360px] items-center gap-4 px-5 sm:px-8 md:grid"
        style={{
          gridTemplateColumns:
            "minmax(14rem, min(28vw, 22rem)) 1fr minmax(11rem, auto)",
        }}
      >
        <div className="flex shrink-0 justify-start pr-2">
          <Link
            href="/"
            className="group flex items-center py-1 transition-opacity duration-200 hover:opacity-90"
            aria-label="Infranex LMS home"
          >
            <InfranexLogoMark priority size="nav" />
          </Link>
        </div>

        <nav
          className="flex justify-center justify-self-center"
          aria-label="Primary"
        >
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-surface p-1.5">
            {navItems.map((l) => {
              const active = linkIsActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative min-w-0 rounded-full px-3 py-2.5 text-center text-sm font-semibold tracking-tight transition-all duration-200 sm:px-4 sm:text-[15px]",
                    active
                      ? "bg-card text-deep shadow-sm ring-1 ring-border"
                      : "text-muted hover:bg-card hover:text-deep"
                  )}
                >
                  {l.label}
                  {active ? (
                    <span
                      className="pointer-events-none absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-primary sm:inset-x-4"
                      aria-hidden
                    />
                  ) : null}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex min-w-0 shrink-0 flex-wrap items-center justify-end gap-2 pl-2">
          {sessionEmail ? (
            <>
              <div className="relative" ref={accountWrapRef}>
                <button
                  type="button"
                  id="nav-account-trigger"
                  aria-expanded={accountMenuOpen}
                  aria-haspopup="menu"
                  aria-controls="nav-account-menu"
                  onClick={() => setAccountMenuOpen((v) => !v)}
                  className={cn(
                    "flex min-w-0 max-w-[min(100vw-14rem,280px)] items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3 text-left shadow-sm transition-[box-shadow,ring] sm:pr-3.5",
                    accountMenuOpen && "ring-2 ring-primary/20"
                  )}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                    aria-hidden
                  >
                    <User className="h-[17px] w-[17px]" strokeWidth={2.25} />
                  </span>
                  <span className="hidden min-w-0 flex-1 flex-col leading-tight sm:flex">
                    {displayName ? (
                      <span className="truncate text-xs font-semibold text-deep">
                        {displayName}
                      </span>
                    ) : null}
                    <span
                      className={cn(
                        "truncate text-[11px] text-muted",
                        displayName && "mt-0.5"
                      )}
                    >
                      {sessionEmail}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs font-semibold text-deep sm:hidden">
                    {displayName ?? sessionEmail}
                  </span>
                </button>
                {accountMenuOpen ? (
                  <div
                    id="nav-account-menu"
                    role="menu"
                    aria-labelledby="nav-account-trigger"
                    className="absolute right-0 top-[calc(100%+0.5rem)] z-[60] rounded-2xl border border-border bg-card p-2 shadow-lg"
                  >
                    <SignOutButton className="h-10 min-w-[10rem] rounded-xl px-4 text-xs font-semibold" />
                  </div>
                ) : null}
              </div>
              {role === "admin" && (
                <Link href="/admin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 rounded-full border-border bg-card px-4 text-xs font-bold uppercase tracking-wider text-deep shadow-sm transition hover:border-primary/30"
                  >
                    Admin
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <Link href="/auth">
              <Button
                size="sm"
                className="h-10 rounded-full px-6 text-xs font-bold uppercase tracking-wider"
              >
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile: logo + menu — taller row for readable mark */}
      <div className="relative mx-auto flex min-h-[72px] w-full min-w-0 max-w-[1360px] items-center justify-between gap-2 py-2 ps-[max(0.75rem,env(safe-area-inset-left,0px))] pe-[max(0.5rem,env(safe-area-inset-right,0px))] sm:gap-3 sm:px-8 md:hidden">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center py-1 pr-2"
          aria-label="Infranex LMS home"
        >
          <InfranexLogoMark
            priority
            size="nav"
            className="max-w-[min(560px,calc(100vw-5.5rem))]"
          />
        </Link>
        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-deep shadow-sm transition hover:border-primary/30"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-card shadow-sm md:hidden"
          >
            <div className="mx-auto flex max-w-[1360px] flex-col gap-2 px-4 pb-5 pt-3 sm:px-8">
              <p className="px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                Menu
              </p>
              {navItems.map((l) => {
                const active = linkIsActive(pathname, l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold transition-colors",
                      active
                        ? "bg-surface text-deep ring-1 ring-border"
                        : "text-deep hover:bg-surface"
                    )}
                  >
                    {l.label}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 opacity-35",
                        active && "text-primary opacity-100"
                      )}
                    />
                  </Link>
                );
              })}

              {sessionEmail ? (
                <>
                  <div className="my-1 h-px bg-border" />
                  <div
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5"
                    role="group"
                    aria-label="Signed in as"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                      aria-hidden
                    >
                      <User className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                    <div className="min-w-0 flex-1 text-left">
                      {displayName ? (
                        <>
                          <p className="truncate text-sm font-semibold text-deep">
                            {displayName}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-muted">
                            {sessionEmail}
                          </p>
                        </>
                      ) : (
                        <p className="truncate text-sm font-semibold text-deep">
                          {sessionEmail}
                        </p>
                      )}
                    </div>
                  </div>
                  {role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-semibold text-deep hover:bg-surface"
                    >
                      Admin console
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted" />
                    </Link>
                  )}
                  <div className="mt-2 border-t border-border pt-4">
                    <SignOutButton className="h-11 w-full rounded-xl text-sm font-semibold" />
                  </div>
                </>
              ) : (
                <Link href="/auth" onClick={() => setOpen(false)} className="mt-1">
                  <Button className="h-12 w-full rounded-xl text-sm font-bold">
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
