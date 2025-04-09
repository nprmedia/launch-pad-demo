// File: src/app/page.tsx
// Purpose: Ensures Walkthrough overlay renders properly at page-level, below section content

'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { LeadMagnetSection } from '@/components/sections/LeadMagnetSection';
import { FeatureSection } from '@/components/sections/FeatureSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { CTASection } from '@/components/sections/CTASection';
import { FooterSection } from '@/components/sections/FooterSection';

import { OverlayWalkthrough } from '@/components/overlay/OverlayWalkthrough';

export default function Page() {
  return (
    <main className="relative overflow-x-hidden">
      <section id="hero-section">
        <HeroSection />
      </section>

      <section id="lead-magnet-section">
        <LeadMagnetSection />
      </section>

      <section id="feature-section">
        <FeatureSection />
      </section>

      <section id="social-proof-section">
        <SocialProofSection />
      </section>

      <section id="cta-section">
        <CTASection />
      </section>

      <section id="footer-section">
        <FooterSection />
      </section>

      {/* 🔁 Walkthrough overlay is rendered here to ensure client-side behavior */}
      <OverlayWalkthrough />
    </main>
  );
}
