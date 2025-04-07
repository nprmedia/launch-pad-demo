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
  const [positions, setPositions] = useState<any[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  const color = theme?.color || 'indigo';
  const background = theme?.background || 'white';

  useEffect(() => {
    const computePositions = () => {
      const newPositions = highlights.map((highlight) => {
        const el = document.getElementById(highlight.targetId);
        if (!el) return { top: 0, left: 0, width: 300, height: 200 };
        const rect = el.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        };
      });
      setPositions(newPositions);
    };

    setTimeout(computePositions, 300);
    window.addEventListener('resize', computePositions);
    return () => {
      window.removeEventListener('resize', computePositions);
    };
  }, [highlights]);

  useEffect(() => {
    if (!positions[activeIndex]) return;
    const { top, height } = positions[activeIndex];
    window.scrollTo({
      top: top - window.innerHeight / 2 + height / 2,
      behavior: 'smooth',
    });

    if (autoplay) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (activeIndex < highlights.length - 1) setActiveIndex((prev) => prev + 1);
      }, 4000);
    }
  }, [activeIndex, positions, autoplay]);

  if (!positions[activeIndex]) return null;
  const current = positions[activeIndex];

  return (
    <div ref={overlayRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]">
      <AnimatePresence>
        <motion.div
          key={`highlight-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            top: current.top,
            left: current.left,
            width: current.width,
            height: current.height,
          }}
          className={`absolute border-4 border-${color}-500 rounded-xl bg-transparent pointer-events-none`}
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
            onClick={() => setAutoplay(!autoplay)}
            className={`bg-${color}-400 hover:bg-${color}-500 text-${background} px-3 py-1 text-xs rounded shadow`}
          >
            {autoplay ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={() => {
              setActiveIndex(0);
              setAutoplay(true);
            }}
            className={`bg-${color}-600 hover:bg-${color}-700 text-${background} px-4 py-2 rounded shadow`}
          >
            Replay
          </button>
        </div>
      </div>
    </div>
  );
}
