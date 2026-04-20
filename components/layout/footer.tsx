import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { InfranexLogoMark } from "@/components/brand/infranex-logo";

/** Brand marks (Lucide omits LinkedIn/Instagram in recent builds). */
function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.441 1.441 0 1 0 0 2.881 1.441 1.441 0 0 0 0-2.881z" />
    </svg>
  );
}

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

          {/* Below lg: Contact | Follow in two columns; lg+: same row as brand (12-col grid) */}
          <div className="grid min-w-0 grid-cols-2 items-start gap-x-4 gap-y-6 sm:gap-x-8 lg:contents">
            {/* Contact */}
            <div className="min-w-0 lg:col-span-4">
              <FooterHeading>Contact</FooterHeading>
              <ul className="mt-3 space-y-2.5 text-[13px] text-white/72">
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="break-words">+91 90198 57285</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="break-words">support@infranextech.in</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="break-words leading-snug">
                    3rd Floor, Infront of Indian Oil, Sy No 1, Shivanahalli,
                    Yelahanka, Jakkur Main Rd, Nehru Nagar, Bengaluru, Karnataka
                    560064
                  </span>
                </li>
              </ul>
            </div>

            {/* Follow */}
            <div className="min-w-0 lg:col-span-3">
              <FooterHeading>Follow us</FooterHeading>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/infranextechnologies-private-limited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Infranex Technologies on LinkedIn"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white shadow-sm backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 ease-brand-out hover:border-primary/35 hover:bg-white/15 hover:scale-[1.03] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
                >
                  <LinkedInGlyph className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/infranex_official?utm_source=qr&igsh=MXVpcHdvbDNubnE3MQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Infranex on Instagram"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white shadow-sm backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 ease-brand-out hover:border-primary/35 hover:bg-white/15 hover:scale-[1.03] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
                >
                  <InstagramGlyph className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-white/65 sm:text-[12px]">
                Stay updated with new courses and announcements.
              </p>
            </div>
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
