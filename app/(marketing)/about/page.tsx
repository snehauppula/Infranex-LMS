import type { Metadata } from "next";
import { AboutPageSections } from "@/components/marketing/about-page-sections";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Why Infranex exists — bridging academic learning with industry skills, mentorship, and placement-focused programs.",
};

export default function AboutPage() {
  return <AboutPageSections />;
}
