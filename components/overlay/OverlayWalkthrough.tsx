// File: components/overlay/OverlayWalkthrough.tsx

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TooltipCard } from './TooltipCard';
import { ProgressIndicator } from './ProgressIndicator';
import { RestartButton } from './RestartButton';
import { useOverlaySteps } from '@/lib/useOverlaySteps';

export const OverlayWalkthrough = () => {
  const steps = useOverlaySteps();
  const [stepIndex, setStepIndex] = useState(0);
  const [elementVisible, setElementVisible] = useState(false);
  const isKeyboardScroll = useRef(false);
  const currentStep = steps[stepIndex];

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
  }, [steps.length]);

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
  }, [steps]);

  return (
    <>
      {elementVisible && <TooltipCard stepIndex={stepIndex} />}
      <ProgressIndicator stepIndex={stepIndex} />
      <RestartButton onRestart={() => {
        isKeyboardScroll.current = true;
        setStepIndex(0);
      }} />
    </>
  );
};

export default OverlayWalkthrough;
