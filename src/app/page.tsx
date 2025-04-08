// File: app/page.tsx
// Purpose: Landing page layout combining all sections in order

import { HeroSection } from '@/components/sections/HeroSection';
import { LeadMagnetSection } from '@/components/sections/LeadMagnetSection';
import { FeatureSection } from '@/components/sections/FeatureSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { FooterSection } from '@/components/sections/FooterSection';
import { OverlayWalkthrough } from '@/components/overlay/OverlayWalkthrough';

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <LeadMagnetSection />
      <FeatureSection />
      <SocialProofSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
      <OverlayWalkthrough />    
    </main>
  );
}
