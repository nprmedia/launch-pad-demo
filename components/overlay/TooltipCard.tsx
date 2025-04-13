'use client';

import React from 'react';
import { Sparkles, X } from 'lucide-react';
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
        className="fixed top-4 right-4 z-[9999] px-2 font-luxury"
      >
        <motion.div
          className="relative w-full max-w-sm px-6 py-4 rounded-xl backdrop-blur-md bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-amber-100/50"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
        >

          {/* Title with Aura */}
          <div className="flex items-center justify-start gap-2 mb-3 relative">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0.06 }}
                transition={{ duration: 5, ease: 'easeOut' }}
                className="w-16 h-16 rounded-full bg-amber-400/30 blur-2xl"
              />
            </div>
            <Sparkles size={16} className="text-amber-500 drop-shadow-sm z-10" />
            <p className="font-semibold text-lg text-gray-900 tracking-wide z-10">
              {currentStep.label}
            </p>
          </div>

          {/* Stat Row with Stat Number + Divider */}
          {currentStep.statNumber && currentStep.statDescription && (
            <div className="flex items-start gap-3 mt-2 mb-2 text-left">
              <div className="flex flex-col justify-start items-end">
                <motion.span
                  key={`stat-${stepIndex}`}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold text-amber-500 tracking-tight relative"
                >
                  <span className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
                    <span className="absolute inset-0 rounded-full bg-amber-300/30 blur-lg animate-[ping_4s_ease-out_infinite]" />
                  </span>
                  {currentStep.statNumber}
                </motion.span>
              </div>
              <div className="h-10 w-px bg-amber-200 opacity-40" />
              <p className="text-sm font-normal text-gray-700 leading-snug pt-0.5">
                {currentStep.statDescription}
              </p>
            </div>
          )}

          {/* Description */}
          <motion.p
            key={`desc-${stepIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm text-left mt-5 text-gray-600 leading-relaxed max-w-prose mx-auto font-normal z-10 pt-4 border-t border-gray-100"
          >
            {currentStep.description}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
