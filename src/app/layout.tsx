import type { Metadata } from "next"
import "./globals.css"
import { CrisisBanner } from "@/components/layout/CrisisBanner"
import Footer from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/layout/Navbar"
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB"
import { JsonLd } from "@/components/seo/JsonLd"

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
        url: `${BASE_URL}/images/og-image.jpg`, // create a 1200×630 image
        width: 1200,
        height: 630,
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
    images: [`${BASE_URL}/images/og-image.jpg`],
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

  // ── Icons ──────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
      <head>
        <JsonLd />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <CrisisBanner />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Toaster />
        <WhatsAppFAB />
      </body>
    </html>
  )
}