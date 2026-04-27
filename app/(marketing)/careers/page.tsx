import type { Metadata } from "next";
import { CareersPageSections } from "@/components/marketing/careers-page-sections";
import { ORGANIZATION_LEGAL_NAME } from "@/lib/site-seo";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Infranex team — campus ambassador and business development opportunities to build impactful learning experiences.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: `Careers · ${ORGANIZATION_LEGAL_NAME}`,
    description:
      "Join the Infranex team — campus ambassador and business development opportunities to build impactful learning experiences.",
    url: "/careers",
    siteName: ORGANIZATION_LEGAL_NAME,
    locale: "en_IN",
  },
};

export default function CareersPage() {
  return <CareersPageSections />;
}
