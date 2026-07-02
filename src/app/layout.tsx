import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { JsonLd } from "@/components/seo/JsonLd"
import { ConditionalLayout } from "@/components/layout/ConditionalLayout"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://innerloom.in"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    template: "%s | Innerloom",
    default: "Innerloom — Counselling Psychologist India | Parishkriti Bamrara",
  },
  description:
    "Warm, CBT-based online counselling for young adults, professionals & " +
    "students across India. Book a free 15-minute discovery call today.",

  // ── Canonical ──────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Open Graph ─────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Innerloom",
    title: "Innerloom — Counselling Psychologist India",
    description:
      "Warm, CBT-based online counselling for young adults, professionals & " +
      "students across India. Book a free 15-minute discovery call today.",
    images: [
      {
      url: `${BASE_URL}/images/picture.png`,
        width: 1200,
        height: 530,
        alt: "Innerloom — Counselling by Parishkriti Bamrara",
      },
    ],
  },

  // ── Twitter / X card ───────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Innerloom — Counselling Psychologist India",
    description:
      "Warm, CBT-based online counselling for young adults, professionals & " +
      "students across India.",
    images: [`${BASE_URL}/images/picture.png`],
  },

  // ── Indexing ───────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },


  // ── Verification (add when you connect Google Search Console) ──────────
  // verification: {
  //   google: "your-google-site-verification-token",
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN">
      <body>
        <JsonLd />
        <ConditionalLayout>{children}</ConditionalLayout>
        <Toaster />
      </body>
    </html>
  )
}