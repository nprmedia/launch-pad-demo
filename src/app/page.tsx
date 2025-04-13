'use client';

import { motion } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { LeadMagnetSection } from "@/components/sections/LeadMagnetSection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { CTASection } from "@/components/sections/CTASection";
import { FooterSection } from "@/components/sections/FooterSection";
import { OverlayWalkthroughWrapper } from "@/components/overlay/OverlayWalkthroughWrapper";
import { useEffect, useState } from "react";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Page() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const id = document?.getElementById("active-section-id")?.dataset?.currentId;
    if (id) setActiveId(id);
  }, []);

  const SectionWrapper = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const isActive = id === activeId;
    return (
      <motion.div
        initial={false}
        animate={{
          scale: isActive ? 1.02 : 1,
          boxShadow: isActive
            ? "0 0 25px rgba(255, 165, 0, 0.25)"
            : "none",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-xl"
      >
        <section id={id}>{children}</section>
      </motion.div>
    );
  };

  return (
    <OverlayWalkthroughWrapper>
      <main>
        <SectionWrapper id="hero-section">
          <HeroSection />
        </SectionWrapper>
        <SectionWrapper id="lead-magnet-section">
          <LeadMagnetSection />
        </SectionWrapper>
        <SectionWrapper id="feature-section">
          <FeatureSection />
        </SectionWrapper>
        <SectionWrapper id="social-proof-section">
          <SocialProofSection />
        </SectionWrapper>
        <SectionWrapper id="FAQ-section">
          <FAQSection />
        </SectionWrapper>
        <SectionWrapper id="cta-section">
          <CTASection />
        </SectionWrapper>
        <SectionWrapper id="footer-section">
          <FooterSection />
        </SectionWrapper>
      </main>
    </OverlayWalkthroughWrapper>
  );
}
