// File: components/overlay/TooltipCard.tsx

'use client';

import React from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { useOverlaySteps } from '@/lib/useOverlaySteps';
import { motion, AnimatePresence } from 'framer-motion';

export interface TooltipCardProps {
  stepIndex: number;
}

export const TooltipCard = ({ stepIndex }: TooltipCardProps) => {
  const steps = useOverlaySteps();
  const currentStep = steps[stepIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, x: 120, y: -40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 60, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-4 right-4 z-[9999] px-2"
      >
        <motion.div
          className="relative w-full max-w-md px-4 py-2 rounded-xl backdrop-blur-md bg-[#1a1208] border border-orange-400 text-amber-300 shadow-[0_4px_20px_rgba(255,165,0,0.15)]"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
        >
          {/* Label to anchor tooltip identity */}
          <div className="text-[10px] uppercase tracking-widest text-amber-400 mb-1 text-center">
            Guided Demo Tip
          </div>

          {/* Step Info */}
          <div className="flex justify-between items-center mb-1 text-[10px]">
            <span className="flex items-center gap-1">
              <CheckCircle size={12} className="text-amber-400 drop-shadow" />
              Step {stepIndex + 1} of {steps.length}
            </span>
            <span className="text-amber-400">← / →</span>
          </div>

          {/* Title with Aura */}
          <div className="flex items-center justify-center gap-2 mb-1 relative">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0.04 }}
                transition={{ duration: 5, ease: 'easeOut' }}
                className="w-16 h-16 rounded-full bg-orange-400/30 blur-2xl"
              />
            </div>
            <Sparkles size={16} className="text-amber-300 animate-pulse drop-shadow-sm z-10" />
            <p className="font-semibold text-base text-center text-amber-100 tracking-wide z-10">
              {currentStep.label}
            </p>
          </div>

          {/* Description with subtle entrance */}
          <motion.p
            key={`desc-${stepIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xs text-center mt-1 text-amber-200 leading-snug max-w-prose mx-auto font-light z-10"
          >
            {currentStep.description}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
