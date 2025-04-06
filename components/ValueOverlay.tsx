'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Highlight = {
  id: string;
  message: string;
};

export const launchPadHighlights: Highlight[] = [
  {
    id: 'main-cta',
    message: 'This above-the-fold hero is designed to convert instantly with optimized visual hierarchy.',
  },
  {
    id: 'lead-magnet',
    message: 'Lead capture system ready to integrate with Mailchimp or ConvertKit for list building.',
  },
  {
    id: 'features',
    message: 'Strategic feature layout visually communicates core deliverables of the $1,000 package.',
  },
  {
    id: 'social-proof',
    message: 'Frameworks and platforms trusted by top-tier coaches — immediate trust builder.',
  },
  {
    id: 'faq',
    message: 'Anticipates and answers objections directly — critical for closing high-intent leads.',
  },
];

type Props = {
  highlights: Highlight[];
};

export default function ValueOverlay({ highlights }: Props) {
  const [active, setActive] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [current, setCurrent] = useState<number>(-1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = 'body { overflow-x: hidden !important; }';
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const stopScroll = () => {
    setScrolling(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const scrollStep = (index: number) => {
    if (!scrolling || index >= highlights.length) {
      setScrolling(false);
      return;
    }
    setCurrent(index);
    const el = document.getElementById(highlights[index].id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    timeoutRef.current = setTimeout(() => scrollStep(index + 1), 2200);
  };

  const startGuidedScroll = () => {
    if (scrolling) return stopScroll();
    setActive(true);
    setScrolling(true);
    setCurrent(0);
    const el = document.getElementById(highlights[0].id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    timeoutRef.current = setTimeout(() => scrollStep(1), 2000);
  };

  return (
    <>
      <div className="fixed bottom-0 right-0 z-[1000] p-4">
        <button
          onClick={startGuidedScroll}
          className="px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-md"
        >
          {scrolling ? '⏹ Stop Walkthrough' : active ? '🔁 Replay Value Highlights' : '💡 Show Why This Costs $1,000'}
        </button>
      </div>

      <AnimatePresence>
        {active && current >= 0 &&
          (() => {
            const { id, message } = highlights[current];
            const el = document.getElementById(id);
            if (!el) return null;
                        const scrollTop = window.scrollY;
            const scrollLeft = window.scrollX;
            const bounds = el.getBoundingClientRect();
            const top = bounds.top + scrollTop;
            const left = bounds.left + scrollLeft;

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'absolute',
                  top: top - 12,
                  left: left - 12,
                  width: bounds.width + 24,
                  height: bounds.height + 24,
                  zIndex: 999,
                  pointerEvents: 'none',
                }}
              >
                <div className="w-full h-full border-4 border-yellow-400 rounded-2xl shadow-xl animate-pulse"></div>
                <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 text-sm font-medium px-4 py-2 rounded shadow-lg max-w-xs text-center z-[1001]">
                  {message}
                </div>
              </motion.div>
            );
          })()}
      </AnimatePresence>
    </>
  );
}
