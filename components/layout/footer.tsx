import Link from "next/link";
import { Container } from "@/components/layout/container";
import { InfranexLogoMark } from "@/components/brand/infranex-logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-[#0a1f44] via-[#0c264f] to-[#061222] text-white">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <Container className="relative grid gap-10 py-12 sm:gap-12 sm:py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex flex-col items-start gap-2">
            <div className="rounded-xl bg-white/95 p-2 shadow-lg ring-1 ring-white/20">
              <InfranexLogoMark height={44} className="max-w-[240px]" />
            </div>
            <span className="mt-2 text-sm font-semibold text-primary">
              LMS Platform
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
            Skill development and placement-focused learning — built on the
            same blue and navy palette you see in our brand: clear, calm,
            serious about outcomes.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Product</p>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li>
              <Link
                href="/courses"
                className="transition-colors hover:text-primary"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="transition-colors hover:text-primary"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/auth"
                className="transition-colors hover:text-primary"
              >
                Sign in
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Legal</p>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li>
              <span className="cursor-default">Privacy</span>
            </li>
            <li>
              <span className="cursor-default">Terms</span>
            </li>
          </ul>
        </div>
      </Container>
      <div className="relative border-t border-white/10 bg-black/20">
        <Container className="py-6">
          <p className="text-center text-xs text-white/50">
            © {new Date().getFullYear()} Infranex Technologies. All rights
            reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
