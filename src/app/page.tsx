import AboutSnippet from "@/components/home/AboutSnippet";
import { Hero } from "@/components/home/Hero";
import HomeCTA from "@/components/home/HomeCTA";
import HowItWorks from "@/components/home/HowItWorks";
import TrustBar from "@/components/home/TrustBar";
import WhoIHelp from "@/components/home/WhoIHelp";
import { FadeIn } from "@/components/shared/FadeIn";

export default function HomePage() {
  return (
<>
  {/* Hero is NOT wrapped in FadeIn — it's the LCP element.
      Starting it at opacity:0 delays LCP until JS hydrates. */}
  <Hero />

  <WhoIHelp />

  <FadeIn direction="up">
    <HowItWorks />
  </FadeIn>

  <FadeIn direction="up">
    <AboutSnippet />
  </FadeIn>

  <FadeIn direction="up">
    <TrustBar />
  </FadeIn>

  <FadeIn direction="up">
    <HomeCTA />
  </FadeIn>
</>
  )
}