import type { Metadata } from "next"
import "./globals.css"
import { CrisisBanner } from "@/components/layout/CrisisBanner"
import { CardFooter } from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/layout/Navbar"
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB"

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL!
  ),
  title: {
    template: "%s | [Name] Psychology",
    default: "Counselling Psychologist India | [Name]",
  },
  description:
    "Warm, CBT-based online & in-person counselling for " +
    "young adults, professionals & students across India.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "[Name] Psychology",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <CrisisBanner />
        <Navbar />
        <main id="main">{children}</main>
        <CardFooter />
        <Toaster />
        <WhatsAppFAB/>
      </body>
    </html>
  )
}