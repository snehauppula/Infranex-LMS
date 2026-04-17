"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, User, X } from "lucide-react";
import { startTransition, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InfranexLogoMark } from "@/components/brand/infranex-logo";
import { SignOutButton } from "@/components/auth/sign-out-button";
import {
  DURATION,
  transitionEase,
  transitionSpring,
} from "@/lib/motion";

const MotionLink = motion.create(Link);

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
  overlay = false,
}: {
  sessionEmail?: string | null;
  displayName?: string | null;
  role?: "student" | "admin" | null;
  /** When true, navbar overlays content instead of pushing layout down. */
  overlay?: boolean;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountWrapRef = useRef<HTMLDivElement>(null);
  const navItems = primaryNavLinks(sessionEmail);

  useEffect(() => {
    startTransition(() => setAccountMenuOpen(false));
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
        overlay
          ? "fixed left-1/2 -translate-x-1/2"
          : "relative sticky mx-auto mb-2 mt-3 sm:mb-3 sm:mt-4",
        "z-40 mx-auto box-border w-[calc(100%-2rem)] max-w-[1280px] overflow-x-clip overflow-y-visible rounded-2xl border pt-[env(safe-area-inset-top,0px)] transition-shadow duration-300 sm:w-[calc(100%-2.5rem)] sm:rounded-3xl md:w-[calc(100%-3.5rem)]",
        overlay ? "top-3 sm:top-4" : "top-3 sm:top-4",
        "border-border bg-background/92 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/84"
      )}
    >
      {/* Hero-aligned wash + ambient (same palette as home hero) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_100%_70%_at_15%_-15%,rgba(0,174,239,0.06),transparent_52%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-2xl motion-reduce:blur-none motion-reduce:opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-deep/[0.04] blur-2xl motion-reduce:blur-none motion-reduce:opacity-40"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-border"
        aria-hidden
      />

      {/* Desktop: center nav; side columns sized so logo is not squeezed */}
      <div
        className="relative z-10 mx-auto hidden h-[88px] w-full max-w-[1280px] items-center gap-4 px-5 sm:px-8 md:grid"
        style={{
          gridTemplateColumns:
            "minmax(14rem, min(28vw, 22rem)) 1fr minmax(11rem, auto)",
        }}
      >
        <div className="flex shrink-0 justify-start pr-2">
          <MotionLink
            href="/"
            className="group flex items-center py-1 outline-none transition-opacity duration-200 ease-out hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Infranex LMS home"
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={transitionSpring(reduceMotion)}
          >
            <InfranexLogoMark priority size="nav" />
          </MotionLink>
        </div>

        <nav
          className="flex justify-center justify-self-center"
          aria-label="Primary"
        >
          <LayoutGroup id="nav-pills">
            <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-surface p-1.5">
              {navItems.map((l) => {
                const active = linkIsActive(pathname, l.href);
                return (
                  <MotionLink
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "relative min-w-0 rounded-full px-3 py-2.5 text-center text-sm font-semibold tracking-tight transition-colors duration-200 ease-out sm:px-4 sm:text-[15px]",
                      "outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active
                        ? "bg-card text-deep shadow-sm ring-1 ring-border"
                        : "text-muted hover:bg-card hover:text-deep"
                    )}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    transition={transitionSpring(reduceMotion)}
                  >
                    {l.label}
                    {active ? (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="pointer-events-none absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-primary sm:inset-x-4"
                        aria-hidden
                        transition={transitionSpring(reduceMotion)}
                      />
                    ) : null}
                  </MotionLink>
                );
              })}
            </div>
          </LayoutGroup>
        </nav>

        <div className="flex min-w-0 shrink-0 flex-wrap items-center justify-end gap-2 pl-2">
          {sessionEmail ? (
            <>
              <div className="relative" ref={accountWrapRef}>
                <motion.button
                  type="button"
                  id="nav-account-trigger"
                  aria-expanded={accountMenuOpen}
                  aria-haspopup="menu"
                  aria-controls="nav-account-menu"
                  onClick={() => setAccountMenuOpen((v) => !v)}
                  className={cn(
                    "flex min-w-0 max-w-[min(100vw-14rem,280px)] items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3 text-left shadow-sm outline-none transition-[box-shadow,ring] sm:pr-3.5",
                    "focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    accountMenuOpen && "ring-2 ring-primary/20"
                  )}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={transitionSpring(reduceMotion)}
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
                </motion.button>
                <AnimatePresence>
                  {accountMenuOpen ? (
                    <motion.div
                      key="nav-account-menu"
                      id="nav-account-menu"
                      role="menu"
                      aria-labelledby="nav-account-trigger"
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={transitionSpring(reduceMotion)}
                      className="absolute right-0 top-[calc(100%+0.5rem)] z-[60] origin-top-right rounded-2xl border border-border bg-card p-2 shadow-xl ring-1 ring-deep/[0.04]"
                    >
                      <SignOutButton className="h-10 min-w-[10rem] rounded-xl px-4 text-xs font-semibold" />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
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
      <div className="relative z-10 mx-auto flex min-h-[72px] w-full min-w-0 max-w-[1280px] items-center justify-between gap-2 py-2 ps-[max(0.75rem,env(safe-area-inset-left,0px))] pe-[max(0.5rem,env(safe-area-inset-right,0px))] sm:gap-3 sm:px-8 md:hidden">
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
        <motion.button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-deep shadow-sm outline-none transition-colors duration-200 ease-out hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          transition={transitionSpring(reduceMotion)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: reduceMotion ? 0 : -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: reduceMotion ? 0 : 90 }}
              transition={transitionEase(DURATION.xs, reduceMotion)}
              className="flex items-center justify-center"
              aria-hidden
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transitionEase(DURATION.sm, reduceMotion)}
            className="relative z-10 overflow-hidden border-t border-border bg-background/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/88 md:hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_20%_0%,rgba(0,174,239,0.05),transparent_45%)]" aria-hidden />
            <motion.div
              className="relative mx-auto flex max-w-[1280px] flex-col gap-2 px-4 pb-5 pt-3 sm:px-8"
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.05,
                    delayChildren: reduceMotion ? 0 : 0.04,
                  },
                },
                hidden: {},
              }}
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: -4 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: transitionEase(DURATION.sm, reduceMotion),
                  },
                }}
                className="px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted"
              >
                Menu
              </motion.p>
              {navItems.map((l) => {
                const active = linkIsActive(pathname, l.href);
                return (
                  <motion.div
                    key={l.href}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: transitionEase(DURATION.sm, reduceMotion),
                      },
                    }}
                  >
                    <MotionLink
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        active
                          ? "bg-surface text-deep ring-1 ring-border"
                          : "text-deep hover:bg-surface"
                      )}
                      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                    >
                      {l.label}
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 shrink-0 opacity-35",
                          active && "text-primary opacity-100"
                        )}
                      />
                    </MotionLink>
                  </motion.div>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
