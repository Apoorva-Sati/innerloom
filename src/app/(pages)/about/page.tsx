import { AboutHero } from "@/components/about/AboutHero"
import { Credentials } from "@/components/about/Credentials"
import { MyApproach } from "@/components/about/MyApproach"
import { Vignettes } from "@/components/about/Vignettes"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Innerloom",
  description:
    "Meet [Name], certified counselling psychologist. Learn about my " +
    "CBT-based approach, qualifications, and who I work with.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MyApproach />
      <Credentials />
      <Vignettes />
    </>
  )
}