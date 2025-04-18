// File: components/overlay/OverlayWalkthrough.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Prop types for lazy components
type TooltipCardProps = { stepIndex: number };
type ProgressIndicatorProps = { stepIndex: number };
type RestartButtonProps = { onRestart: () => void };

const TooltipCard = dynamic(() =>
  import('./TooltipCard').then(mod => mod.default as React.ComponentType<TooltipCardProps>),
  { ssr: false }
);

const ProgressIndicator = dynamic(() =>
  import('./ProgressIndicator').then(mod => mod.default as React.ComponentType<ProgressIndicatorProps>),
  { ssr: false }
);

const RestartButton = dynamic(() =>
  import('./RestartButton').then(mod => mod.default as React.ComponentType<RestartButtonProps>),
  { ssr: false }
);

import { WarningOverlay } from './WarningOverlay';
import { useOverlaySteps } from '@/lib/useOverlaySteps';

export const OverlayWalkthrough = () => {
  const [acknowledged, setAcknowledged] = useState(false);
  const steps: { id: string; description: string; statNumber?: string; statDescription?: string }[] = useOverlaySteps();
  const [stepIndex, setStepIndex] = useState(0);
  const isKeyboardScroll = useRef(false);

  const validateAndScrollToElement = async (stepId: string): Promise<HTMLElement | null> => {
    return new Promise((resolve) => {
      let retries = 0;
      const maxRetries = 15;

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

  useEffect(() => {
    if (!acknowledged) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        isKeyboardScroll.current = true;
        setStepIndex((i) => {
          const newIndex = Math.min(i + 1, steps.length - 1);
          void validateAndScrollToElement(steps[newIndex].id);
          return newIndex;
        });
      } else if (e.key === 'ArrowLeft') {
        isKeyboardScroll.current = true;
        setStepIndex((i) => {
          const newIndex = Math.max(i - 1, 0);
          void validateAndScrollToElement(steps[newIndex].id);
          return newIndex;
        });
      }
    };

    window.addEventListener('keydown', handler);
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

    return () => {
      window.removeEventListener('keydown', handler);
      observer.disconnect();
    };
  }, [steps, setStepIndex, acknowledged]);

  return (
    <div className="relative z-[9990]">
      {!acknowledged && <WarningOverlay onAcknowledge={() => setAcknowledged(true)} />}
      {acknowledged && (
        <div className="absolute top-4 right-4 space-y-3 pointer-events-auto">
          <TooltipCard key={`tooltip-${stepIndex}`} stepIndex={stepIndex} />
          <ProgressIndicator stepIndex={stepIndex} />
          <RestartButton
            onRestart={() => {
              isKeyboardScroll.current = true;
              setStepIndex(0);
            }}
          />
        </div>
      )}    </div>
  );
};

export default OverlayWalkthrough;
