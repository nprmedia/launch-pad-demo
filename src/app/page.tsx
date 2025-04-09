// File: src/app/page.tsx
// Rebuilt clean: hydration-safe, distinct wrapper, overlay isolated

'use client';

import { useEffect, useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { LeadMagnetSection } from '@/components/sections/LeadMagnetSection';
import { FeatureSection } from '@/components/sections/FeatureSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { CTASection } from '@/components/sections/CTASection';
import { FooterSection } from '@/components/sections/FooterSection';
import { OverlayWalkthroughWrapper, Wrapper } from '@/components/overlay/OverlayWalkthroughWrapper';

export default function Page() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <section id="hero-section">
        <Wrapper>
          <HeroSection />
        </Wrapper>
      </section>

      <section id="lead-magnet-section">
        <Wrapper>
          <LeadMagnetSection />
        </Wrapper>
      </section>

      <section id="feature-section">
        <Wrapper>
          <FeatureSection />
        </Wrapper>
      </section>

      <section id="social-proof-section">
        <Wrapper>
          <SocialProofSection />
        </Wrapper>
      </section>

      <section id="cta-section">
        <Wrapper>
          <CTASection />
        </Wrapper>
      </section>

      <section id="footer-section">
        <Wrapper>
          <FooterSection />
        </Wrapper>
      </section>

      {hydrated && <OverlayWalkthroughWrapper />}
    </main>
  );
}
