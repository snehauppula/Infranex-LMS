import type { Metadata } from "next";
import { AboutPageSections } from "@/components/marketing/about-page-sections";
import { ORGANIZATION_LEGAL_NAME } from "@/lib/site-seo";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Why Infranex exists — bridging academic learning with industry skills, mentorship, and placement-focused programs.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About us · ${ORGANIZATION_LEGAL_NAME}`,
    description:
      "Why Infranex exists — bridging academic learning with industry skills, mentorship, and placement-focused programs.",
    url: "/about",
    siteName: ORGANIZATION_LEGAL_NAME,
    locale: "en_IN",
  },
};

export default function AboutPage() {
  return <AboutPageSections />;
}
