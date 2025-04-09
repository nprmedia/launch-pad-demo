// File: components/overlay/OverlayWalkthrough.tsx
// Basic functional rebuild: 1 tooltip shown per section with navigation

'use client';

import React, { useEffect, useState } from 'react';

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
  const currentStep = steps[stepIndex];

  useEffect(() => {
    const target = document.getElementById(currentStep.id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [stepIndex]);

  return (
    <div className="fixed z-50 bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-xl shadow-xl text-sm">
      <div className="mb-2 font-semibold">{currentStep.label}</div>
      <div className="flex justify-between">
        <button
          onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
          disabled={stepIndex === 0}
          className="text-xs px-3 py-1 bg-white text-black rounded disabled:opacity-50"
        >
          Back
        </button>
        {stepIndex < steps.length - 1 ? (
          <button
            onClick={() => setStepIndex(stepIndex + 1)}
            className="text-xs px-3 py-1 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => setStepIndex(0)}
            className="text-xs px-3 py-1 bg-green-600 text-white rounded"
          >
            Restart
          </button>
        )}
      </div>
    </div>
  );
};
