'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Highlight {
  targetId: string;
  message: string;
  coordinates: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

interface Props {
  highlights: Highlight[];
  theme?: {
    color?: string;
    background?: string;
  };
}

export default function ValueOverlay({ highlights, theme }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [interrupted, setInterrupted] = useState(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const color = theme?.color || 'indigo';
  const background = theme?.background || 'white';

  const handleScrollInterrupt = () => {
    const currentY = window.scrollY;
    if (Math.abs(currentY - lastScrollY) > 10 && autoplay) {
      setAutoplay(false);
      setInterrupted(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
    setLastScrollY(currentY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollInterrupt);
    return () => window.removeEventListener('scroll', handleScrollInterrupt);
  }, [autoplay]);

  useEffect(() => {
    if (!highlights[activeIndex]) return;
    const { top, height } = highlights[activeIndex].coordinates;

    setTimeout(() => {
      window.scrollTo({
        top: top - window.innerHeight / 2 + height / 2,
        behavior: 'smooth',
      });
    }, 100);

    if (autoplay && !interrupted) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (activeIndex < highlights.length - 1) setActiveIndex((prev) => prev + 1);
      }, 4000);
    }
  }, [activeIndex, autoplay, interrupted, highlights]);

  if (!highlights.length || !highlights[activeIndex]) return null;
  const current = highlights[activeIndex].coordinates;

  return (
    <div ref={overlayRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" />

      <AnimatePresence>
        <motion.div
          key={`highlight-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: window.innerHeight / 2 - current.height / 2,
            left: current.left,
            width: current.width,
            height: current.height,
          }}
          className={`border-4 border-${color}-500 rounded-xl bg-transparent pointer-events-none`}
        >
          <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] px-4 py-2 text-sm font-medium text-${background} bg-${color}-700 rounded shadow-lg text-center`}
          >
            {highlights[activeIndex].message}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-6 pointer-events-auto flex flex-col items-end gap-2">
        <div className="flex gap-1">
          {highlights.map((_, idx) => (
            <div
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? `bg-${color}-500 scale-125` : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setAutoplay((prev) => !prev);
              setInterrupted(false);
            }}
            className={`bg-${color}-400 hover:bg-${color}-500 text-${background} px-3 py-1 text-xs rounded shadow`}
          >
            {autoplay ? 'Pause' : interrupted ? 'Resume' : 'Resume'}
          </button>
          <button
            onClick={() => {
              setActiveIndex(0);
              setAutoplay(true);
              setInterrupted(false);
            }}
            className={`bg-${color}-600 hover:bg-${color}-700 text-${background} px-4 py-2 rounded shadow`}
          >
            Replay
          </button>
        </div>
        {interrupted && (
          <div className="mt-2 text-xs text-white/70 text-right">
            Walkthrough paused — scroll detected.
          </div>
        )}
      </div>
    </div>
  );
}
