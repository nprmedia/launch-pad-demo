// File: components/overlay/OverlayWalkthrough.tsx
// Purpose: Walkthrough overlay that now auto-starts on page load (no query param required)

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

interface WalkthroughStep {
  title: string;
  description: string;
  anchorId: string;
}

const steps: WalkthroughStep[] = [
  {
    title: 'Welcome to the Demo',
    description: 'This is a $2K-grade landing page built for coaches and consultants.',
    anchorId: 'hero-section',
  },
  {
    title: 'Lead Magnet Offer',
    description: 'Here’s where we drive email opt-ins with value-first copy.',
    anchorId: 'lead-magnet-section',
  },
  {
    title: 'Key Features',
    description: 'We highlight core benefits in this high-conversion card layout.',
    anchorId: 'feature-section',
  },
  {
    title: 'Client Results',
    description: 'Showcase testimonials or social proof for maximum trust.',
    anchorId: 'social-proof-section',
  },
];

export const OverlayWalkthrough = () => {
  const searchParams = useSearchParams();
  const [stepIndex, setStepIndex] = useState(0);
  const [active, setActive] = useState(false);

  const currentStep = steps[stepIndex];

  useEffect(() => {
    const shouldStart = true; // always trigger on load
    localStorage.removeItem('walkthroughDismissed'); // optional: always show for testing/demo
    const dismissed = localStorage.getItem('walkthroughDismissed');
    if (shouldStart && !dismissed) setActive(true);
  }, [searchParams]);

  useEffect(() => {
    if (!active) return;
    const target = document.getElementById(currentStep.anchorId);
    if (target) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }, 150);
    }
  }, [stepIndex, active, currentStep.anchorId]);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('walkthroughDismissed', 'true');
    setActive(false);
    setStepIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDismiss = () => {
    localStorage.setItem('walkthroughDismissed', 'true');
    setActive(false);
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="overlay-backdrop"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDismiss}
        >
          <motion.div
            key="overlay-card"
            className="relative bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-2xl z-10 max-w-sm min-w-[320px] mx-4 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-brand">{currentStep.title}</h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{currentStep.description}</p>

            <div className="flex justify-between mt-6 gap-2">
              <button
                onClick={handleBack}
                disabled={stepIndex === 0}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700 text-sm disabled:opacity-50"
              >
                Back
              </button>
              {stepIndex < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded bg-brand text-white text-sm"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="px-4 py-2 rounded bg-green-600 text-white text-sm"
                >
                  Finish
                </button>
              )}
            </div>

            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Step {stepIndex + 1} of {steps.length}
            </p>

            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-sm text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
