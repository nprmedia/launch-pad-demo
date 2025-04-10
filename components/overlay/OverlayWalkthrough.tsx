// File: components/overlay/OverlayWalkthrough.tsx
'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { CheckCircle, RotateCw, Sparkles } from 'lucide-react';
import clsx from 'clsx';

const steps = [
  { id: 'hero-section', label: 'Hero', description: 'This is where we capture first impressions.' },
  { id: 'lead-magnet-section', label: 'Lead Magnet', description: 'Highlight the value exchange for email capture.' },
  { id: 'feature-section', label: 'Features', description: 'Communicate key offerings and benefits.' },
  { id: 'social-proof-section', label: 'Social Proof', description: 'Build trust with testimonials and logos.' },
  { id: 'cta-section', label: 'CTA', description: 'Prompt users with a strong next step.' },
  { id: 'footer-section', label: 'Footer', description: 'Include links and secondary CTAs.' },
];

export const OverlayWalkthrough = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [elementVisible, setElementVisible] = useState(false);
  const maxRetries = 15;
  const currentStep = steps[stepIndex];
  const isKeyboardScroll = useRef(false);

  const validateAndScrollToElement = async (stepId: string): Promise<HTMLElement | null> => {
    let retries = 0;
    return new Promise((resolve) => {
      const attempt = () => {
        const el = document.getElementById(stepId);
        if (el && el.offsetHeight > 0) {
          const rect = el.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

          if (!isVisible && isKeyboardScroll.current) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }

          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                observer.disconnect();
                resolve(el);
              }
            },
            { threshold: 0.5 }
          );
          observer.observe(el);
        } else if (retries < maxRetries) {
          retries++;
          setTimeout(attempt, 250);
        } else {
          resolve(null);
        }
      };
      attempt();
    });
  };

  const runStepLogic = useCallback(async () => {
    setElementVisible(false);
    const el = await validateAndScrollToElement(currentStep.id);
    if (el) {
      requestAnimationFrame(() => {
        setElementVisible(true);
      });
    }
  }, [currentStep.id]);

  useEffect(() => {
    runStepLogic();
  }, [runStepLogic]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        isKeyboardScroll.current = true;
        setStepIndex((i) => Math.min(i + 1, steps.length - 1));
      } else if (e.key === 'ArrowLeft') {
        isKeyboardScroll.current = true;
        setStepIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Escape') {
        setElementVisible(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = steps.findIndex((step) => step.id === entry.target.id);
          if (index !== -1 && entry.isIntersecting) {
            isKeyboardScroll.current = false;
            setStepIndex(index);
          }
        }
      },
      { threshold: 0.6 }
    );

    steps.forEach((step) => {
      const el = document.getElementById(step.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {elementVisible && (
        <div className="fixed inset-x-0 bottom-16 z-[9999] flex justify-center px-4 animate-tooltip-bloom">
          <div className="relative w-full max-w-2xl px-6 py-4 rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-slate-900/60 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-2 ring-blue-400">
            <div className="flex justify-between items-center mb-3 text-xs text-gray-200 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <CheckCircle size={14} className="text-blue-400 drop-shadow" /> Step {stepIndex + 1} of {steps.length}
              </span>
              <span className="text-gray-400">Use ← / → to navigate</span>
            </div>
            <div className="flex items-center justify-center gap-3 mb-1 relative">
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="w-24 h-24 rounded-full bg-blue-500/30 blur-2xl animate-pulse" />
              </div>
              <Sparkles size={20} className="text-blue-400 animate-pulse drop-shadow-sm z-10" />
              <p className="font-extrabold text-3xl text-center text-slate-900 dark:text-white tracking-wide z-10">
                {currentStep.label}
              </p>
            </div>
            <p className="text-base text-center mt-2 text-gray-800 dark:text-slate-300 leading-relaxed max-w-prose mx-auto font-light z-10">
              {currentStep.description}
            </p>
          </div>
        </div>
      )}

      <div className="fixed top-1/2 right-6 transform -translate-y-1/2 flex flex-col items-center gap-2 z-[9999]">
        {steps.map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={clsx(
                'w-3 h-3 rounded-full transition-all duration-300 z-10',
                i === stepIndex ? 'bg-blue-600 scale-125 shadow-md' : 'bg-gray-300'
              )}
            />
            {i !== steps.length - 1 && <div className="w-0.5 h-5 bg-gray-300" />}
          </div>
        ))}
      </div>

      <button
        className="fixed bottom-6 left-6 z-[9999] bg-white/80 hover:bg-white/90 text-xs text-black px-4 py-2 rounded-full flex items-center gap-1 shadow-lg border border-gray-300"
        onClick={() => {
          isKeyboardScroll.current = true;
          setStepIndex(0);
        }}
      >
        <RotateCw size={14} /> Restart
      </button>

      <style jsx global>{`
        @keyframes tooltip-bloom {
          0% {
            transform: scale(0.6);
            opacity: 0;
            filter: blur(6px);
          }
          100% {
            transform: scale(1);
            opacity: 1;
            filter: blur(0);
          }
        }
        .animate-tooltip-bloom {
          animation: tooltip-bloom 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default OverlayWalkthrough;
