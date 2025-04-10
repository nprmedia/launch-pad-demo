// File: src/app/page.tsx
import React from 'react';
import SymbolicStart from '@/components/overlay/SymbolicStart';

import { HeroSection } from '@/components/sections/HeroSection';
import { LeadMagnetSection } from '@/components/sections/LeadMagnetSection';
import { FeatureSection } from '@/components/sections/FeatureSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { CTASection } from '@/components/sections/CTASection';
import { FooterSection } from '@/components/sections/FooterSection';

export default function Page() {
  return (
    <SymbolicStart>
      <main className="flex flex-col items-center justify-center">
        <HeroSection />
        <LeadMagnetSection />
        <FeatureSection />
        <SocialProofSection />
        <CTASection />
        <FooterSection />
      </main>
    </SymbolicStart>
  );
}