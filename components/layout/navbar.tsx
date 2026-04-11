"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InfranexLogoMark } from "@/components/brand/infranex-logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About us" },
];

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

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b pt-[env(safe-area-inset-top,0px)] transition-shadow duration-300",
        "border-deep/[0.08] bg-gradient-to-r from-white/95 via-[#f0f7fc]/95 to-white/95 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_14px_40px_-28px_rgba(10,31,68,0.08)] backdrop-blur-2xl",
        "supports-[backdrop-filter]:from-white/88 supports-[backdrop-filter]:via-[#eef6fc]/90 supports-[backdrop-filter]:to-white/88"
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        aria-hidden
      />

      {/* Desktop: center nav; side columns sized so logo is not squeezed */}
      <div
        className="relative mx-auto hidden h-[88px] w-full max-w-[1360px] items-center gap-4 px-5 sm:px-8 md:grid"
        style={{
          gridTemplateColumns: "minmax(14rem, min(28vw, 22rem)) 1fr minmax(11rem, auto)",
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
          <div className="inline-flex items-center gap-1 rounded-full border border-deep/[0.08] bg-white/95 p-1.5 shadow-[0_4px_24px_-12px_rgba(10,31,68,0.12),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-black/[0.03]">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative min-w-0 rounded-full px-3.5 py-2.5 text-center text-sm font-semibold tracking-tight transition-all duration-200 sm:px-5 sm:text-[15px]",
                    active
                      ? "bg-deep/[0.04] text-deep shadow-sm ring-1 ring-deep/[0.06]"
                      : "text-muted hover:bg-deep/[0.03] hover:text-deep"
                  )}
                >
                  {l.label}
                  {active ? (
                    <span
                      className="pointer-events-none absolute inset-x-4 bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary/0 via-primary to-primary/0"
                      aria-hidden
                    />
                  ) : null}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2 pl-2">
          {sessionEmail ? (
            <>
              <Link
                href="/dashboard"
                className="group flex max-w-[min(100vw-14rem,260px)] items-center gap-2.5 rounded-full border border-deep/[0.08] bg-white py-1.5 pl-1.5 pr-3 shadow-sm ring-1 ring-white transition-all duration-200 hover:border-primary/30 hover:shadow-[0_12px_32px_-16px_rgba(0,174,239,0.18)]"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-white"
                  aria-hidden
                >
                  <User className="h-[17px] w-[17px]" strokeWidth={2.25} />
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  {displayName ? (
                    <span className="truncate text-xs font-semibold text-deep">
                      {displayName}
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-[0.12em] text-primary",
                      displayName ? "mt-0.5" : "text-xs tracking-normal"
                    )}
                  >
                    Dashboard
                  </span>
                </span>
              </Link>
              {role === "admin" && (
                <Link href="/admin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 rounded-full border-deep/[0.1] bg-white px-4 text-xs font-bold uppercase tracking-wider text-deep shadow-sm transition hover:border-primary/35 hover:bg-primary/[0.03]"
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
                className="h-10 rounded-full px-6 text-xs font-bold uppercase tracking-wider shadow-[0_12px_32px_-12px_rgba(0,174,239,0.4)]"
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
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-deep/[0.08] bg-white text-deep shadow-sm transition hover:border-primary/25 hover:bg-primary/[0.04]"
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
            className="overflow-hidden border-t border-deep/[0.06] bg-white shadow-[0_20px_50px_-36px_rgba(10,31,68,0.12)] md:hidden"
          >
            <div className="mx-auto flex max-w-[1360px] flex-col gap-2 px-4 pb-5 pt-3 sm:px-8">
              <p className="px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                Menu
              </p>
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold transition-colors",
                      active
                        ? "bg-primary/[0.08] text-deep ring-1 ring-primary/20"
                        : "text-deep hover:bg-deep/[0.04]"
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
                  <div className="my-1 h-px bg-gradient-to-r from-transparent via-deep/[0.08] to-transparent" />
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-2xl border border-deep/[0.06] bg-[#f8fafc] px-4 py-4"
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-600 text-white shadow-inner ring-2 ring-white"
                      aria-hidden
                    >
                      <User className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col text-left">
                      {displayName ? (
                        <span className="truncate text-sm font-semibold text-deep">
                          {displayName}
                        </span>
                      ) : null}
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                        Open dashboard
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted" />
                  </Link>
                  {role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-semibold text-deep hover:bg-deep/[0.04]"
                    >
                      Admin console
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted" />
                    </Link>
                  )}
                </>
              ) : (
                <Link href="/auth" onClick={() => setOpen(false)} className="mt-1">
                  <Button className="h-12 w-full rounded-xl text-sm font-bold shadow-[0_16px_40px_-14px_rgba(0,174,239,0.4)]">
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
