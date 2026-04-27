import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ORGANIZATION_LEGAL_NAME } from "@/lib/site-seo";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Infranex Technologies Pvt Ltd.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms · ${ORGANIZATION_LEGAL_NAME}`,
    description: "Terms of use for Infranex Technologies Pvt Ltd.",
    url: "/terms",
    siteName: ORGANIZATION_LEGAL_NAME,
    locale: "en_IN",
  },
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl pb-16 pt-[max(6.1rem,calc(5.15rem+env(safe-area-inset-top,0px)))] sm:pb-20 sm:pt-[max(6.45rem,calc(5.55rem+env(safe-area-inset-top,0px)))]">
      <h1 className="text-3xl font-bold tracking-tight text-deep sm:text-4xl">
        Terms of use
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted">
        Terms for using courses, accounts, and payments on this platform will
        appear here. Until the full legal text is published, course purchases and
        access are governed by the checkout and enrollment terms shown at
        purchase time.
      </p>
    </Container>
  );
}
