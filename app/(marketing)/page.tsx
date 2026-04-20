import { HomeSections } from "@/components/marketing/home-sections";
import { getCourses } from "@/services/courses";

export const metadata = {
  title: "Infranex Technologies — Fast, reliable, future-ready",
  description:
    "Placement-focused courses and a calm learning surface—so you spend energy on skills, not fighting the product.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Infranex Technologies — Fast, reliable, future-ready",
    description:
      "Placement-focused courses and a calm learning surface—so you spend energy on skills, not fighting the product.",
    url: "/",
    images: [{ url: "/brand/infranex.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infranex Technologies — Fast, reliable, future-ready",
    description:
      "Placement-focused courses and a calm learning surface—so you spend energy on skills, not fighting the product.",
    images: ["/brand/infranex.png"],
  },
};

export default async function HomePage() {
  const courses = await getCourses();
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Infranex Technologies Pvt Ltd",
    url: "https://www.infranextech.in/",
    logo: "https://www.infranextech.in/brand/infranex.png",
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
    name: "Infranex Technologies",
    url: "https://www.infranextech.in/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.infranextech.in/courses?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
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
