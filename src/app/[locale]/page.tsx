import { HeroSection } from "@/components/sections/HeroSection";
import { SearchBar } from "@/components/sections/SearchBar";
import { NewsResearchSection } from "@/components/sections/NewsResearchSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { FeaturedListingsSection } from "@/components/sections/FeaturedListingsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { InternationalSection } from "@/components/sections/InternationalSection";
import { TopAgentsSection } from "@/components/sections/TopAgentsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchBar />
      <NewsResearchSection />
      <FeaturedListingsSection />
      <WhyUsSection />
      <HowItWorksSection />
      <InternationalSection />
      <TopAgentsSection />
      <PartnersSection />
      <TestimonialsSection />
    </>
  );
}
