import type { Metadata } from "next";
import { BRAND_IMAGE_URL } from "@/components/brand/brand-assets";
import { HomeSections } from "@/components/marketing/home-sections";
import {
  absoluteUrl,
  ORGANIZATION_LEGAL_NAME,
  ORGANIZATION_SHORT_NAME,
  SITE_URL,
} from "@/lib/site-seo";
import { getCourses } from "@/services/courses";

const HOME_TITLE = `${ORGANIZATION_LEGAL_NAME} — Fast, reliable, future-ready`;
const HOME_DESCRIPTION = `${ORGANIZATION_LEGAL_NAME} — placement-focused courses and a calm learning surface. Spend energy on skills, not fighting the product.`;

export const metadata: Metadata = {
  title: {
    /** Avoid root `%s · …` template appending the legal name twice on `/`. */
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: ORGANIZATION_LEGAL_NAME,
    locale: "en_IN",
    images: [{ url: BRAND_IMAGE_URL }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [BRAND_IMAGE_URL],
  },
};

export default async function HomePage() {
  const courses = await getCourses();
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalOrganization"],
    name: ORGANIZATION_LEGAL_NAME,
    legalName: ORGANIZATION_LEGAL_NAME,
    alternateName: [ORGANIZATION_SHORT_NAME, "Infranex"],
    url: `${SITE_URL}/`,
    logo: absoluteUrl("/brand/infranex.png"),
    email: "support@infranextech.in",
    telephone: "+91 90198 57285",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "3rd Floor, Infront of Indian Oil, Sy No 1, Shivanahalli, Yelahanka, Jakkur Main Rd, Nehru Nagar",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560064",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.linkedin.com/company/infranextechnologies-private-limited/",
      "https://www.instagram.com/infranex_official?utm_source=qr&igsh=MXVpcHdvbDNubnE3MQ%3D%3D",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORGANIZATION_LEGAL_NAME,
    alternateName: ORGANIZATION_SHORT_NAME,
    url: `${SITE_URL}/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([orgJsonLd, websiteJsonLd]),
        }}
      />
      <HomeSections courses={courses} />
    </>
  );
}
