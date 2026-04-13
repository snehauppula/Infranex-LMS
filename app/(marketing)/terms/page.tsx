import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Infranex LMS platform.",
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
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
