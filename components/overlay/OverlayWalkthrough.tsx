// File: components/overlay/OverlayWalkthrough.tsx
// Purpose: Tooltip is now dynamically positioned near each target section using absolute coordinates

'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface WalkthroughStep {
  title: string;
  description: string;
  anchorId: string;
  icon?: string;
}

const steps: WalkthroughStep[] = [
  {
    title: 'Welcome to the Demo',
    description: 'This is a $2K-grade landing page built for coaches and consultants.',
    anchorId: 'hero-section',
    icon: '🚀'
  },
  {
    title: 'Lead Magnet Offer',
    description: 'Here’s where we drive email opt-ins with value-first copy.',
    anchorId: 'lead-magnet-section',
    icon: '📩'
  },
  {
    title: 'Key Features',
    description: 'We highlight core benefits in this high-conversion card layout.',
    anchorId: 'feature-section',
    icon: '✨'
  },
  {
    title: 'Client Results',
    description: 'Showcase testimonials or social proof for maximum trust.',
    anchorId: 'social-proof-section',
    icon: '💬'
  },
];

export const OverlayWalkthrough = () => {
    const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[stepIndex];

  useEffect(() => {
  setActive(true);
}, []);

  useEffect(() => {
    if (!active || minimized) return;
    const target = document.getElementById(currentStep.anchorId);
    if (target) {
      target.classList.add('ring-2', 'ring-brand', 'rounded-lg');
      const rect = target.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;
      const top = rect.top + scrollY + rect.height + 16;
      const left = rect.left + scrollX + rect.width / 2;
      setPosition({ top, left });

      setTimeout(() => {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }, 150);
    }
    return () => {
      if (target) target.classList.remove('ring-2', 'ring-brand', 'rounded-lg');
    };
  }, [stepIndex, active, currentStep.anchorId, minimized]);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const handleFinish = () => {
    setShowFeedback(true);
  };

  const handleFinalSubmit = () => {
    localStorage.setItem('walkthroughDismissed', 'true');
    setActive(false);
    setStepIndex(0);
    router.push('/checkout?plan=launch-pad');
  };

  const handleDismiss = () => {
    localStorage.setItem('walkthroughDismissed', 'true');
    setActive(false);
  };

  const toggleMinimized = () => setMinimized(!minimized);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="overlay-wrapper"
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {!minimized && (
            <motion.div
              ref={cardRef}
              key="overlay-card"
              className="absolute z-50 bg-white/90 dark:bg-zinc-900/90 border border-gray-200 dark:border-zinc-700 px-6 py-5 rounded-2xl shadow-2xl max-w-sm min-w-[320px] text-left pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{ top: position.top, left: position.left, transform: 'translateX(-50%)' }}
            >
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-base font-semibold text-brand">
                  {currentStep.icon} {currentStep.title}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMinimized}
                    className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    –
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {currentStep.description}
              </p>

              <div className="flex justify-between mt-4 gap-2">
                <button
                  onClick={handleBack}
                  disabled={stepIndex === 0}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-sm text-gray-700 dark:text-white disabled:opacity-50"
                >
                  Back
                </button>
                {stepIndex < steps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded-xl bg-brand text-white text-sm shadow-sm hover:shadow-md transition"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm shadow-sm hover:shadow-md transition"
                  >
                    Finish Tour
                  </button>
                )}
              </div>

              <div className="mt-4">
                <div className="w-full h-1 bg-gray-200 dark:bg-zinc-700 rounded overflow-hidden">
                  <div
                    className="h-full bg-brand transition-all"
                    style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-center text-gray-500 dark:text-gray-400">
                  Step {stepIndex + 1} of {steps.length}
                </p>
              </div>

              {showFeedback && (
                <div className="mt-4">
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2">
                    Was this helpful?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      className="text-green-600 hover:scale-110 transition"
                      onClick={handleFinalSubmit}
                    >
                      👍 Yes
                    </button>
                    <button
                      className="text-red-500 hover:scale-110 transition"
                      onClick={handleFinalSubmit}
                    >
                      👎 No
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {minimized && (
            <button
              onClick={toggleMinimized}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-brand text-white px-4 py-2 rounded-full text-sm shadow-md z-10 pointer-events-auto"
            >
              Resume Walkthrough
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
