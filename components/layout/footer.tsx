import Link from "next/link";
import {
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { InfranexLogoMark } from "@/components/brand/infranex-logo";

/** Credit link — opens WhatsApp with a prefilled inquiry (FlowSite AI). */
const FLOWSITE_WHATSAPP_PHONE = "918500097071";
const FLOWSITE_WHATSAPP_MESSAGE =
  "Hi FlowSite AI! I came across your work on the Infranex website. I'd like to get a similar website built for my business. Could you share details on your services and pricing?";

function flowsiteWhatsAppHref() {
  const q = new URLSearchParams({
    text: FLOWSITE_WHATSAPP_MESSAGE,
  });
  return `https://wa.me/${FLOWSITE_WHATSAPP_PHONE}?${q.toString()}`;
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
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-3 space-y-2.5 text-[13px] text-white/72">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" aria-hidden />
                <span>+91 90198 57285</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" aria-hidden />
                <span>support@infranextech.in</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" aria-hidden />
                <span>Yelahanka, Bangalore, Karnataka</span>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div className="lg:col-span-3">
            <FooterHeading>Follow us</FooterHeading>
            <div className="mt-3 flex items-center gap-3">
              {[
                { href: "/", label: "Home", Icon: Globe },
                { href: "/courses", label: "Courses", Icon: ExternalLink },
                {
                  href: "mailto:support@infranextech.in",
                  label: "Email support",
                  Icon: Mail,
                },
                { href: "/privacy", label: "Privacy", Icon: ExternalLink },
              ].map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white shadow-sm backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 ease-brand-out hover:border-primary/35 hover:bg-white/15 hover:scale-[1.03] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
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
      </Container>

      {/* Full-bleed credit strip — same palette as footer (no flat black) */}
      <div className="relative border-t border-white/15 bg-deep px-4 py-3.5 sm:py-4">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_90%_at_50%_120%,rgba(0,174,239,0.08),transparent_58%)]"
          aria-hidden
        />
        <div className="relative">
          <p className="text-center text-[13px] font-medium leading-snug text-white sm:text-sm">
            <span className="text-white/85">Designed & developed by </span>
            <a
              href={flowsiteWhatsAppHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline decoration-primary decoration-2 underline-offset-[3px] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
              aria-label="Message FlowSite AI on WhatsApp about building a website for your business"
            >
              FlowSite AI
            </a>
          </p>
          <p className="mt-1.5 text-center text-[11px] leading-relaxed text-white/55 sm:text-xs">
            © {year} Infranex Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
