import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { BRAND_IMAGE_HEIGHT, BRAND_IMAGE_URL, BRAND_IMAGE_WIDTH } from "@/components/brand/brand-assets";
import {
  DEFAULT_SITE_DESCRIPTION,
  ORGANIZATION_LEGAL_NAME,
  SITE_URL,
} from "@/lib/site-seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: ORGANIZATION_LEGAL_NAME,
    template: `%s · ${ORGANIZATION_LEGAL_NAME}`,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  applicationName: ORGANIZATION_LEGAL_NAME,
  authors: [{ name: ORGANIZATION_LEGAL_NAME, url: SITE_URL }],
  creator: ORGANIZATION_LEGAL_NAME,
  publisher: ORGANIZATION_LEGAL_NAME,
  keywords: [
    ORGANIZATION_LEGAL_NAME,
    "Infranex",
    "Infranex Technologies",
    "online courses India",
    "placement training",
    "LMS",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: ORGANIZATION_LEGAL_NAME,
    images: [
      {
        url: BRAND_IMAGE_URL,
        width: BRAND_IMAGE_WIDTH,
        height: BRAND_IMAGE_HEIGHT,
        alt: `${ORGANIZATION_LEGAL_NAME} — logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1f44" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full overflow-x-clip antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
