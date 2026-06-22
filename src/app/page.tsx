import { Hero } from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import TrustBar from "@/components/home/TrustBar";
import WhoIHelp from "@/components/home/WhoIHelp";


export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoIHelp />
      <HowItWorks />
      {/* <AboutSnippet /> */}
      <TrustBar />
      {/* <HomeCTA /> */}
    </>
  )
}