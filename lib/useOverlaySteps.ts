// File: lib/useOverlaySteps.ts 

import { stat } from "fs";

export const steps = [
  {
    id: "hero-section",
    label: "Hero",
    statNumber: "43%",
    statDescription: "increase in conversion with multivariate testing",
    description: "We don’t guess — we run multivariate tests to find the most profitable combo of headline, image, and CTA. That’s how we out-convert typical tested pages."
  },
  {
    id: "lead-magnet-section",
    label: "Lead Magnet",
    statNumber: "300%",
    statDescription: "signup increase with interactive lead forms",
    description: "We embed micro-interactions in your lead forms — hover cues, progress nudges, and dynamic validation — making them feel alive. That gets you more emails without more traffic."
  },
  {
    id: "feature-section",
    label: "Features",
    statNumber: "52%",
    statDescription: "boost in user recall with scroll activated reveals",
    description: "Instead of static blocks, we animate key benefits into view as users scroll. This boosts attention, memory, and engagement — not just readability."
  },
  {
    id: "social-proof-section",
    label: "Social Proof",
    statNumber: "4x",
    statDescription: "boost in trust with contextual proof",
    description: "We don't just drop logos — we embed proof (like client wins or transformations) within relevant sections. This multiplies trust where it matters."
  },
  {
    id: "FAQ-section",
    label: "FAQ Section",
    statNumber: "31%",
    statDescription: "cut in bounce rate with live-style FAQ sections",
    description: "Most FAQs are dry. Ours use interactive toggles with crisp copy and smart grouping to reduce overwhelm and build confidence before the close."
  },
  {
    id: "cta-section",
    label: "CTA",
    statNumber: "70%",
    statDescription: "raise in action with dual contrasting CTA's",
    description: "Instead of a single generic button, we stack 2 CTAs with distinct outcomes — “Talk to Us” vs. “See Pricing.” This respects buyer psychology and boosts commitment."
  },
];

export const useOverlaySteps = () => {
  return steps;
};
