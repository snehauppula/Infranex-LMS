import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Infranex LMS handles your information on this site.",
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-deep sm:text-4xl">
        Privacy
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted">
        We take learner data seriously. This page will describe what we collect,
        how we use it, and your choices. For now, contact your administrator or
        Infranex Technologies for the full policy if you need it before we publish
        the detailed version here.
      </p>
    </Container>
  );
}
