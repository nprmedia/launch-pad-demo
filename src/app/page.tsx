// File: src/app/page.tsx
// Fully patched: hydration-safe walkthrough + strict section rendering + clarity

'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { LeadMagnetSection } from '@/components/sections/LeadMagnetSection';
import { FeatureSection } from '@/components/sections/FeatureSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { CTASection } from '@/components/sections/CTASection';
import { FooterSection } from '@/components/sections/FooterSection';
import { OverlayWalkthroughWrapper } from '@/components/overlay/OverlayWalkthroughWrapper';
import { useEffect, useState } from 'react';

export default function Page() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
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

      {hydrated && <OverlayWalkthroughWrapper />}
    </main>
  );
}
