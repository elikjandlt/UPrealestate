import { HeroSection } from "@/components/sections/HeroSection";
import { SearchBar } from "@/components/sections/SearchBar";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TopAgentsSection } from "@/components/sections/TopAgentsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchBar />
      <FeaturedListingsSection />
      <WhyUsSection />
      <HowItWorksSection />
      <TopAgentsSection />
      <PartnersSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
