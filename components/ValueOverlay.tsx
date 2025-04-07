'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Highlight {
  targetId: string;
  message: string;
}

interface Props {
  highlights: Highlight[];
  theme?: {
    color?: string;
    background?: string;
  };
}

export const launchPadHighlights: Highlight[] = [
  {
    targetId: 'main-cta',
    message: 'Your first impression section — hooks and converts above the fold.',
  },
  {
    targetId: 'lead-magnet',
    message: 'Capture emails instantly with a lead magnet CTA and visual mockup.',
  },
  {
    targetId: 'features',
    message: 'Feature list styled to communicate value clearly and fast.',
  },
  {
    targetId: 'social-proof',
    message: 'Trust-building layout inspired by 7-figure coaching sites.',
  },
  {
    targetId: 'faq',
    message: 'Handles objections before they happen — fast and scrollable.',
  },
  {
    targetId: 'cta-footer',
    message: 'Closes the loop with urgency and offer reinforcement.',
  },
];

export default function ValueOverlay({ highlights, theme }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [positions, setPositions] = useState<{ top: number; left: number; width: number; height: number }[]>([]);
  const [autoplay, setAutoplay] = useState(true);
  const [interrupted, setInterrupted] = useState(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isReady, setIsReady] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const color = theme?.color || 'indigo';
  const background = theme?.background || 'white';

  useEffect(() => {
    const computePositions = () => {
      const newPositions = highlights.map((highlight) => {
        const el = document.getElementById(highlight.targetId);
        if (!el) return { top: 0, left: 0, width: 300, height: 200 };
        const rect = el.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        return {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
          width: rect.width || 300,
          height: rect.height || 200,
        };
      });
      setPositions(newPositions);
      setIsReady(true);
    };

    const delay = setTimeout(computePositions, 250);
    window.addEventListener('resize', computePositions);
    window.addEventListener('scroll', handleInterrupt);
    window.addEventListener('keydown', handleKeyNav);
    return () => {
      clearTimeout(delay);
      window.removeEventListener('resize', computePositions);
      window.removeEventListener('scroll', handleInterrupt);
      window.removeEventListener('keydown', handleKeyNav);
    };
  }, [highlights]);

  useEffect(() => {
    if (!isReady || activeIndex >= highlights.length || !positions[activeIndex]) return;
    const { top } = positions[activeIndex];
    const scrollToHighlight = () => {
      window.scrollTo({
        top: top - window.innerHeight / 2 + positions[activeIndex].height / 2,
        behavior: 'smooth',
      });
    };
    requestAnimationFrame(scrollToHighlight);

    if (autoplay && !interrupted) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (activeIndex < highlights.length - 1) setActiveIndex((prev) => prev + 1);
        else setAutoplay(false);
      }, 4000);
    }
  }, [activeIndex, positions, autoplay, interrupted, isReady]);

  const handleInterrupt = () => {
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - lastScrollY) > 10) {
      if (autoplay) {
        setAutoplay(false);
        setInterrupted(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    }
    setLastScrollY(currentScrollY);
  };

  const handleKeyNav = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleManualAdvance();
    if (e.key === 'ArrowLeft' && activeIndex > 0) setActiveIndex((prev) => prev - 1);
  };

  const handleManualAdvance = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (activeIndex < highlights.length - 1) setActiveIndex(activeIndex + 1);
    else setActiveIndex(highlights.length);
    setAutoplay(false);
    setInterrupted(false);
  };

  const handleReset = () => {
    setAutoplay(true);
    setActiveIndex(0);
    setInterrupted(false);
  };

  if (!isReady || activeIndex >= highlights.length) {
    console.warn('Overlay skipped: no highlight ready or end of steps.');
    return null;
  }

  const current = positions[activeIndex];

  return (
    <div ref={overlayRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]">
      <div className="absolute inset-0 bg-black/20 transition-all duration-500" />
      <AnimatePresence>
        {current && (
          <motion.div
            key={`overlay-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            style={{
              top: current.top,
              left: current.left,
              width: current.width,
              height: current.height + 32,
            }}
            className={`absolute border-4 border-${color}-500 rounded-xl bg-transparent p-4 pointer-events-none transition-all duration-500`}
          >
            <motion.div
              key={`tooltip-${activeIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`text-${background} text-sm font-medium text-center absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-${color}-700/90 px-4 py-3 rounded-md shadow-lg`}
            >
              <div className={`w-3 h-3 rotate-45 bg-${color}-700 absolute -top-1 left-1/2 -translate-x-1/2`} />
              {highlights[activeIndex].message}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2 pointer-events-auto">
        <div className="flex gap-1 mb-2">
          {highlights.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? `bg-${color}-500 scale-125` : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleManualAdvance}
            className={`bg-${color}-600 hover:bg-${color}-700 text-${background} px-6 py-2 text-sm font-semibold rounded-full shadow-lg ring-2 ring-${color}-400 animate-pulse`}
          >
            {activeIndex < highlights.length - 1 ? 'Next' : 'Finish'}
          </button>
          <button
            onClick={handleReset}
            className={`bg-${color}-500/70 hover:bg-${color}-600 text-${background} px-4 py-2 rounded-full shadow-lg`}
          >
            Replay
          </button>
        </div>
        {interrupted && (
          <div className="mt-2 flex flex-col items-end">
            <p className="text-xs text-white/60 mb-1">You scrolled — walkthrough paused.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setAutoplay(true)}
                className={`bg-${color}-700 hover:bg-${color}-800 text-white text-xs px-3 py-1 rounded-full`}
              >
                Continue
              </button>
              <button
                onClick={handleReset}
                className={`bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-full`}
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
