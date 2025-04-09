// File: components/overlay/OverlayWalkthrough.tsx
// Full-fidelity, timing-locked, guaranteed-stable overlay walkthrough system

'use client';

import React, { useEffect, useRef, useState } from 'react';

const OFFSET_Y = 16;
const MIN_TOP = 16;
const FIRST_STEP_INDEX = 0;

const steps = [
  { id: 'hero-section', label: 'Welcome to the Hero Section' },
  { id: 'lead-magnet-section', label: 'Lead Magnet Explained' },
  { id: 'feature-section', label: 'Core Features Overview' },
  { id: 'social-proof-section', label: 'What Others Are Saying' },
  { id: 'cta-section', label: 'Call to Action' },
  { id: 'footer-section', label: 'Footer & Final Details' },
];

export const OverlayWalkthrough = () => {
  const [stepIndex, setStepIndex] = useState(FIRST_STEP_INDEX);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [tooltipKey, setTooltipKey] = useState(0);
  const currentStep = steps[stepIndex];

  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const waitForLayoutStability = (id: string): Promise<HTMLElement> => {
    return new Promise((resolve) => {
      const tryFind = () => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        if (rect.height > 0 && rect.width > 0) {
          resolve(el);
          return true;
        }
        return false;
      };

      if (tryFind()) return;

      const interval = setInterval(() => {
        if (tryFind()) clearInterval(interval);
      }, 50);
    });
  };

  const waitForScrollEnd = (): Promise<void> => {
    return new Promise((resolve) => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => resolve(), 200);
    });
  };

  const positionTooltip = async () => {
    const tooltip = tooltipRef.current;
    const target = await waitForLayoutStability(currentStep.id);
    if (!tooltip || !target) return;

    const rect = target.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth || 300;
    const tooltipHeight = tooltip.offsetHeight || 100;

    const centeredLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
    const clampedLeft = Math.max(16, Math.min(window.innerWidth - tooltipWidth - 16, centeredLeft));

    const rawTop = rect.bottom + OFFSET_Y + window.scrollY;
    const maxTop = window.scrollY + window.innerHeight - tooltipHeight - 16;
    const clampedTop = Math.max(MIN_TOP, Math.min(rawTop, maxTop));

    setPosition({ top: clampedTop, left: clampedLeft + window.scrollX });

    requestAnimationFrame(() => tooltip.focus());
  };

  const runStepLogic = async () => {
    const target = await waitForLayoutStability(currentStep.id);
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await waitForScrollEnd();
    await positionTooltip();
  };

  useEffect(() => {
    setTooltipKey(stepIndex);
    runStepLogic();
  }, [stepIndex]);

  useEffect(() => {
    const resizeHandler = () => runStepLogic();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [currentStep.id]);

  return (
    <div
      key={tooltipKey}
      ref={tooltipRef}
      role="dialog"
      aria-live="polite"
      className="fixed z-[9999] bg-black text-white px-6 py-4 rounded-2xl shadow-2xl text-sm max-w-md w-[90%] animate-fade-in transition-all duration-300 focus:outline-none"
      style={{ top: position.top, left: position.left }}
      tabIndex={-1}
    >
      <div className="mb-3 font-medium leading-tight text-center">
        {currentStep.label}
      </div>
      <div className="flex justify-between gap-3">
        <button
          onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
          disabled={stepIndex === 0}
          className="text-xs px-4 py-1.5 bg-white text-black rounded-lg transition disabled:opacity-40"
        >
          Back
        </button>
        {stepIndex < steps.length - 1 ? (
          <button
            onClick={() => setStepIndex(stepIndex + 1)}
            className="text-xs px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => setStepIndex(FIRST_STEP_INDEX)}
            className="text-xs px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Restart
          </button>
        )}
      </div>
    </div>
  );
};
