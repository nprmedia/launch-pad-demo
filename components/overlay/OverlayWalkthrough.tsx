// File: components/overlay/OverlayWalkthrough.tsx
'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';

const OFFSET_Y = 16;
const MIN_TOP = 16;
const MAX_RETRIES = 30;
const RETRY_DELAY = 100;
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
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeRef = useRef(true);

  const currentStep = useMemo(() => steps[Math.max(0, Math.min(stepIndex, steps.length - 1))], [stepIndex]);

  const waitForLayoutStability = useCallback((id: string): Promise<HTMLElement> => {
    return new Promise((resolve, reject) => {
      let attempts = 0;

      const tryFind = () => {
        if (!activeRef.current) return;

        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          const visible = style.display !== 'none' && rect.width > 0 && rect.height > 0;
          if (visible) return resolve(el);
        }

        if (++attempts > MAX_RETRIES) return reject(new Error(`Element #${id} not found or not visible`));
        setTimeout(tryFind, RETRY_DELAY);
      };

      tryFind();
    });
  }, []);

  const waitForScrollEnd = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => resolve(), 300);
    });
  }, []);

  const positionTooltip = useCallback(async () => {
    if (!tooltipRef.current) return;

    const target = await waitForLayoutStability(currentStep.id).catch(() => null);
    if (!target || !tooltipRef.current) return;

    const rect = target.getBoundingClientRect();
    const tooltip = tooltipRef.current;
    const tooltipWidth = tooltip.offsetWidth || 320;
    const tooltipHeight = tooltip.offsetHeight || 120;

    const scrollBarOffset = window.innerWidth - document.documentElement.clientWidth;
    const centeredLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
    const clampedLeft = Math.max(16, Math.min(window.innerWidth - tooltipWidth - scrollBarOffset - 16, centeredLeft));

    const rawTop = rect.bottom + OFFSET_Y + window.scrollY;
    const maxTop = window.scrollY + window.innerHeight - tooltipHeight - 16;
    const clampedTop = Math.max(MIN_TOP, Math.min(rawTop, maxTop));

    setPosition({ top: clampedTop, left: clampedLeft + window.scrollX });

    if (document.visibilityState === 'visible') {
      requestAnimationFrame(() => tooltip?.focus());
    }
  }, [currentStep.id, waitForLayoutStability]);

  const runStepLogic = useCallback(async () => {
    try {
      const target = await waitForLayoutStability(currentStep.id);
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await new Promise(requestAnimationFrame);
      await waitForScrollEnd();
      await positionTooltip();
    } catch (error) {
      console.error('Walkthrough step failed:', error);
    }
  }, [currentStep.id, waitForLayoutStability, waitForScrollEnd, positionTooltip]);

  useEffect(() => {
    runStepLogic();
  }, [stepIndex, runStepLogic]);

  useEffect(() => {
    const resizeHandler = () => requestAnimationFrame(runStepLogic);
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [runStepLogic]);

  useEffect(() => {
    return () => {
      activeRef.current = false;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={tooltipRef}
      role="dialog"
      aria-live="polite"
      aria-labelledby="walkthrough-title"
      className="fixed z-[9999] bg-black text-white px-6 py-4 rounded-2xl shadow-2xl text-sm max-w-md w-[90%] animate-fade-in transition-all duration-300 focus:outline-none"
      style={{ top: position.top, left: position.left }}
      tabIndex={0}
    >
      <div id="walkthrough-title" className="mb-3 font-medium leading-tight text-center">
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