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

export default function ValueOverlay({ highlights, theme }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [positions, setPositions] = useState<{ top: number; left: number; width: number; height: number }[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const computePositions = () => {
      const newPositions = highlights.map((highlight) => {
        const el = document.getElementById(highlight.targetId);
        if (!el) return { top: 0, left: 0, width: 0, height: 0 };
        const rect = el.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        return {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
          width: rect.width,
          height: rect.height,
        };
      });
      setPositions(newPositions);
    };

    computePositions();
    window.addEventListener('resize', computePositions);
    window.addEventListener('scroll', computePositions);
    return () => {
      window.removeEventListener('resize', computePositions);
      window.removeEventListener('scroll', computePositions);
    };
  }, [highlights]);

  useEffect(() => {
    if (activeIndex === null || !positions[activeIndex]) return;
    const { top } = positions[activeIndex];
    window.scrollTo({ top: top - window.innerHeight / 2 + positions[activeIndex].height / 2, behavior: 'smooth' });
  }, [activeIndex, positions]);

  const color = theme?.color || 'indigo';
  const background = theme?.background || 'white';

  return (
    <div ref={overlayRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]">
      <AnimatePresence>
        {activeIndex !== null && positions[activeIndex] && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              top: positions[activeIndex].top,
              left: positions[activeIndex].left,
              width: positions[activeIndex].width,
              height: positions[activeIndex].height,
            }}
            className={`absolute border-4 border-${color}-500 rounded-xl bg-${color}-500/10 backdrop-blur-md p-4 pointer-events-none`}
          >
            <div className={`text-${background} text-sm font-medium text-center mt-auto absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-${color}-700/80 px-4 py-2 rounded-md shadow-lg`}>
              <div className={`w-3 h-3 rotate-45 bg-${color}-700 absolute -top-1 left-1/2 -translate-x-1/2`} />
              {highlights[activeIndex].message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-[200]">
        <button
          onClick={() => {
            if (activeIndex === null) setActiveIndex(0);
            else if (activeIndex < highlights.length - 1) setActiveIndex(activeIndex + 1);
            else setActiveIndex(null);
          }}
          className={`bg-${color}-600 hover:bg-${color}-700 text-${background} px-4 py-2 rounded-full shadow-lg`}
        >
          {activeIndex === null ? 'Start Walkthrough' : activeIndex < highlights.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
}

// Example config to copy
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
    targetId: 'faq',
    message: 'Handles objections before they happen — fast and scrollable.',
  },
  {
    targetId: 'cta-footer',
    message: 'Closes the loop with urgency and offer reinforcement.',
  },
];
