// File: components/overlay/ProgressIndicator.tsx

'use client';

import React from 'react';
import clsx from 'clsx';
import { useOverlaySteps } from '@/lib/useOverlaySteps';

export interface ProgressIndicatorProps {
  stepIndex: number;
}

export const ProgressIndicator = ({ stepIndex }: ProgressIndicatorProps) => {
  const steps = useOverlaySteps();

  return (
    <div className="fixed top-1/2 right-6 transform -translate-y-1/2 flex flex-col items-center gap-2 z-[9999]">
      {steps.map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className={clsx(
              'w-3 h-3 rounded-full transition-all duration-300 z-10',
              i === stepIndex ? 'bg-orange-400 scale-125 shadow-md' : 'bg-gray-300'
            )}
          />
          {i !== steps.length - 1 && <div className="w-0.5 h-5 bg-gray-300" />}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
