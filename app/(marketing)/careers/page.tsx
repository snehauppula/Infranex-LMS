import type { Metadata } from "next";
import { CareersPageSections } from "@/components/marketing/careers-page-sections";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Infranex team — campus ambassador and business development opportunities to build impactful learning experiences.",
};

export default function CareersPage() {
  return <CareersPageSections />;
}
