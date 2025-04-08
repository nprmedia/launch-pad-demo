// File: components/overlay/OverlayWalkthrough.tsx
// Purpose: Fully modular walkthrough overlay system with steps, scroll targeting, localStorage, blur mask, and controls

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

const STEPS = [
  {
    id: 'hero',
    title: 'Welcome to Your Demo',
    description: 'This section introduces your coaching offer with a high-conversion CTA.',
    anchorId: 'hero-section',
  },
  {
    id: 'lead-magnet',
    title: 'Lead Magnet',
    description: 'Capture emails and offer value instantly with this clean form.',
    anchorId: 'lead-magnet-section',
  },
  {
    id: 'features',
    title: 'Key Benefits',
    description: 'Highlight what clients can unlock with clear value cards.',
    anchorId: 'feature-section',
  },
  {
    id: 'social-proof',
    title: 'Credibility Boost',
    description: 'Show testimonials and logos to build trust.',
    anchorId: 'social-proof-section',
  },
];

export const OverlayWalkthrough = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldStart = searchParams?.get('walkthrough') === 'true';
  const [step, setStep] = useState<number>(0);
  const [dismissed, setDismissed] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!shouldStart || typeof window === 'undefined') return;
    if (localStorage.getItem('walkthroughDismissed') === 'true') return;

    scrollToStep(STEPS[step]);
  }, [step, shouldStart]);

  const scrollToStep = (step: (typeof STEPS)[number]) => {
    const el = document.getElementById(step.anchorId);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offset = window.scrollY + rect.top - 120; // Adjust as needed
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('walkthroughDismissed', 'true');
    router.replace('/demo/1');
  };

  if (!shouldStart || dismissed || typeof window === 'undefined') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay-bg"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleDismiss}
      />

      <motion.div
        key="overlay-box"
        ref={boxRef}
        className="fixed z-[60] max-w-sm bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl shadow-xl left-1/2 top-24 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{STEPS[step].title}</h3>
          <button onClick={handleDismiss}>
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {STEPS[step].description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            Step {step + 1} of {STEPS.length}
          </span>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                className="underline text-gray-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setStep(step - 1);
                }}
              >
                <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                className="underline text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setStep(step + 1);
                }}
              >
                Next <ArrowRight className="w-4 h-4 inline ml-1" />
              </button>
            ) : (
              <button
                className="underline text-brand font-semibold"
                onClick={handleDismiss}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
