// File: components/overlay/TooltipCard.tsx

'use client';

import React from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { useOverlaySteps } from '@/lib/useOverlaySteps';

export interface TooltipCardProps {
  stepIndex: number;
}

export const TooltipCard = ({ stepIndex }: TooltipCardProps) => {
    const steps = useOverlaySteps();
    const currentStep = steps[stepIndex];

  return (
    <div className="fixed inset-x-0 bottom-16 z-[9999] flex justify-center px-4 animate-tooltip-bloom">
      <div className="relative w-full max-w-2xl px-6 py-4 rounded-3xl backdrop-blur-xl bg-black border border-orange-500 text-orange-400 shadow-[0_8px_30px_rgba(255,165,0,0.3)]">
        {/* Step Info */}
        <div className="flex justify-between items-center mb-3 text-xs">
          <span className="flex items-center gap-1">
            <CheckCircle size={14} className="text-orange-400 drop-shadow" />
            Step {stepIndex + 1} of {steps.length}
          </span>
          <span className="text-orange-300">Use ← / → to navigate</span>
        </div>

        {/* Title with Aura */}
        <div className="flex items-center justify-center gap-3 mb-1 relative">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-24 h-24 rounded-full bg-orange-500/30 blur-2xl animate-pulse" />
          </div>
          <Sparkles size={20} className="text-orange-400 animate-pulse drop-shadow-sm z-10" />
          <p className="font-extrabold text-3xl text-center text-orange-100 tracking-wide z-10">
            {currentStep.label}
          </p>
        </div>

        {/* Description */}
        <p className="text-base text-center mt-2 text-orange-200 leading-relaxed max-w-prose mx-auto font-light z-10">
          {currentStep.description}
        </p>
      </div>

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
    </div>
  );
};
