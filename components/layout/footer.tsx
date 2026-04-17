import Link from "next/link";
import { ArrowRight, BookOpen, LayoutDashboard, Scale } from "lucide-react";
import { Container } from "@/components/layout/container";
import { InfranexLogoMark } from "@/components/brand/infranex-logo";
import { cn } from "@/lib/utils";

function FooterLink({
  href,
  children,
  className,
  showArrow = true,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white",
        className
      )}
    >
      <span className="border-b border-transparent pb-px transition-[border-color] group-hover:border-primary/80">
        {children}
      </span>
      {showArrow ? (
        <ArrowRight
          className="h-3.5 w-3.5 shrink-0 opacity-0 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:opacity-100"
          strokeWidth={2.25}
          aria-hidden
        />
      ) : null}
    </Link>
  );
}

function FooterColumn({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof BookOpen;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-primary ring-1 ring-white/10">
          <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
        </span>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/90">
          {title}
        </p>
      </div>
      <ul className="mt-5 space-y-3.5">{children}</ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-deep text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_0%,rgba(0,174,239,0.08),transparent_50%)]"
        aria-hidden
      />

      <Container className="relative py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 lg:gap-y-14">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex flex-col items-start gap-3">
              <div className="rounded-2xl bg-white/95 p-2.5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] ring-1 ring-white/25">
                <InfranexLogoMark height={44} className="max-w-[240px]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                LMS platform
              </span>
            </div>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/72">
              Placement-focused courses and a calm learning surface—so you
              spend energy on skills, not fighting the product.
            </p>
            <Link
              href="/courses"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm outline-none transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
            >
              Browse courses
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </Link>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
            <FooterColumn title="Explore" icon={BookOpen}>
              <li>
                <FooterLink href="/">Home</FooterLink>
              </li>
              <li>
                <FooterLink href="/courses">Courses</FooterLink>
              </li>
              <li>
                <FooterLink href="/about">About us</FooterLink>
              </li>
            </FooterColumn>

            <FooterColumn title="Account" icon={LayoutDashboard}>
              <li>
                <FooterLink href="/auth">Sign in</FooterLink>
              </li>
              <li>
                <FooterLink href="/dashboard">Dashboard</FooterLink>
              </li>
            </FooterColumn>

            <FooterColumn title="Legal" icon={Scale}>
              <li>
                <FooterLink href="/privacy">Privacy</FooterLink>
              </li>
              <li>
                <FooterLink href="/terms">Terms of use</FooterLink>
              </li>
            </FooterColumn>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10 bg-deep/95">
        <Container className="flex flex-col items-center justify-between gap-4 py-7 sm:flex-row sm:gap-6">
          <p className="text-center text-xs text-white/50 sm:text-left">
            © {year} Infranex Technologies. All rights reserved.
          </p>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/45"
            aria-label="Footer secondary"
          >
            <FooterLink
              href="/privacy"
              showArrow={false}
              className="text-xs text-white/45 hover:text-white/80"
            >
              Privacy
            </FooterLink>
            <FooterLink
              href="/terms"
              showArrow={false}
              className="text-xs text-white/45 hover:text-white/80"
            >
              Terms
            </FooterLink>
            <FooterLink
              href="/courses"
              showArrow={false}
              className="text-xs text-white/45 hover:text-white/80"
            >
              Catalog
            </FooterLink>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
