import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
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
        "group inline-flex items-center gap-1.5 text-[13px] text-white/72 transition-[color,opacity] duration-300 ease-brand-out motion-reduce:duration-150 hover:text-white",
        className
      )}
    >
      <span className="border-b border-transparent pb-px transition-[border-color] duration-300 ease-brand-out motion-reduce:duration-150 group-hover:border-primary/80">
        {children}
      </span>
      {showArrow ? (
        <ArrowRight
          className="h-3.5 w-3.5 shrink-0 opacity-0 transition-[opacity,transform] duration-300 ease-brand-out motion-reduce:duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
          strokeWidth={2.25}
          aria-hidden
        />
      ) : null}
    </Link>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
      {children}
    </p>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-deep text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_12%_-18%,rgba(0,174,239,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_100%_0%,rgba(0,174,239,0.10),transparent_55%)]"
        aria-hidden
      />

      <Container className="relative py-7 sm:py-9">
        <p className="text-center text-[11px] font-semibold tracking-wide text-white/60">
          Placement-focused • Self-paced • Secure checkout
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-white/95 p-2 shadow-[0_18px_46px_-28px_rgba(0,0,0,0.55)] ring-1 ring-white/15">
                <InfranexLogoMark height={34} className="max-w-[220px]" />
              </div>
              <p className="mt-0.5 max-w-sm text-sm leading-relaxed text-white/72">
                Placement-focused courses and a calm learning surface—so you spend
                energy on skills, not fighting the product.
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
              <FooterLink href="/courses" showArrow={false}>
                Courses
              </FooterLink>
              <FooterLink href="/about" showArrow={false}>
                About
              </FooterLink>
              <FooterLink href="/dashboard" showArrow={false}>
                Dashboard
              </FooterLink>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-3 space-y-2.5 text-[13px] text-white/72">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" aria-hidden />
                <span>+91 97052 81105</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" aria-hidden />
                <span>support@infranex.tech</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" aria-hidden />
                <span>Hyderabad, India</span>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div className="lg:col-span-3">
            <FooterHeading>Follow us</FooterHeading>
            <div className="mt-3 flex items-center gap-3">
              {[
                { href: "#", label: "Website", Icon: Globe },
                { href: "#", label: "Updates", Icon: ExternalLink },
                { href: "#", label: "Community", Icon: ExternalLink },
                { href: "#", label: "Media", Icon: ExternalLink },
              ].map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white shadow-sm backdrop-blur-sm transition hover:border-primary/35 hover:bg-white/15"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </Link>
              ))}
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-white/65">
              Stay updated with new courses and announcements.
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="text-center text-[11px] text-white/50 sm:text-left">
            © {year} Infranex Technologies. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
