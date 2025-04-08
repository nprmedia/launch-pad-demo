// File: src/app/page.tsx
// Purpose: Root landing page entry point with client-only rendering and embedded overlay walkthrough

'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { LeadMagnetSection } from '@/components/sections/LeadMagnetSection';
import { FeatureSection } from '@/components/sections/FeatureSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { FooterSection } from '@/components/sections/FooterSection';
import { OverlayWalkthroughWrapper } from '@/components/overlay/OverlayWalkthroughWrapper';

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
      <OverlayWalkthroughWrapper />
    </main>
  );
}