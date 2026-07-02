import { AboutMe } from "@/components/about/AboutMe"
import { Credentials } from "@/components/about/Credentials"
import { MyApproach } from "@/components/about/MyApproach"
import { Vignettes } from "@/components/about/Vignettes"
import { FadeIn } from "@/components/shared/FadeIn"
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
  <FadeIn direction="up">
    <AboutMe />
  </FadeIn>

  <FadeIn direction="up">
    <MyApproach />
  </FadeIn>

  <FadeIn direction="up">
    <Credentials />
  </FadeIn>

  {/* <FadeIn direction="up">
    <Vignettes />
  </FadeIn> */}
</>
  )
}