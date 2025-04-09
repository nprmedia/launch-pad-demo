// File: components/overlay/OverlayWalkthrough.tsx
// Step 2: Add anchored dynamic positioning to tooltip

'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const steps = [
  { id: 'hero-section', label: 'Welcome to the Hero Section' },
  { id: 'lead-magnet-section', label: 'Lead Magnet Explained' },
  { id: 'feature-section', label: 'Core Features Overview' },
  { id: 'social-proof-section', label: 'What Others Are Saying' },
  { id: 'cta-section', label: 'Call to Action' },
  { id: 'footer-section', label: 'Footer & Final Details' },
];

export const OverlayWalkthrough = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const currentStep = steps[stepIndex];
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  
  useLayoutEffect(() => {
    const target = document.getElementById(currentStep.id);
    const tooltip = tooltipRef.current;
    if (!target || !tooltip) return;

    const offsetY = 16;

    const updateTooltipPosition = () => {
      const rect = target.getBoundingClientRect();
      const tooltipWidth = tooltip.offsetWidth || 300;
      const tooltipHeight = tooltip.offsetHeight || 100;

      if (tooltipHeight < 10) return; // Prevent update if not rendered

      const centeredLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
      const clampedLeft = Math.max(16, Math.min(window.innerWidth - tooltipWidth - 16, centeredLeft));

      const rawTop = rect.bottom + offsetY + window.scrollY;
      const maxTop = window.scrollY + window.innerHeight - tooltipHeight - 16;
      const clampedTop = Math.min(rawTop, maxTop);

      setPosition({ top: clampedTop, left: clampedLeft + window.scrollX });
    };

    const frame = requestAnimationFrame(() => {
      updateTooltipPosition();
      const sectionTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: sectionTop - window.innerHeight / 4, behavior: 'smooth' });
    });

    return () => cancelAnimationFrame(frame);
  }, [stepIndex]);

  return (
    <div
      ref={tooltipRef}
      className="absolute z-50 bg-black text-white px-6 py-4 rounded-2xl shadow-2xl text-sm max-w-md w-[90%] animate-fade-in transition-all duration-300"
      style={{ top: position.top, left: position.left, animationDuration: '300ms' }}
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
            onClick={() => setStepIndex(0)}
            className="text-xs px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Restart
          </button>
        )}
      </div>
    </div>
  );
};
