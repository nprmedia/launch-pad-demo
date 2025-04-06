'use client';

import { useEffect, useState } from 'react';
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

type HighlightPosition = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export default function ValueOverlay({ highlights }: Props) {
  const [active, setActive] = useState(false);
  const [positions, setPositions] = useState<Record<string, HighlightPosition>>({});

  useEffect(() => {
    const calculatePositions = () => {
      if (!active) return;
      const newPos: Record<string, HighlightPosition> = {};
      highlights.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          newPos[id] = {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height,
          };
        }
      });
      setPositions(newPos);
    };

    calculatePositions();
    window.addEventListener('scroll', calculatePositions);
    window.addEventListener('resize', calculatePositions);
    return () => {
      window.removeEventListener('scroll', calculatePositions);
      window.removeEventListener('resize', calculatePositions);
    };
  }, [active, highlights]);

  return (
    <>
      <div className="fixed bottom-0 right-0 z-50 p-4 overflow-x-hidden">
        <button
          onClick={() => setActive(!active)}
          className="px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-md"
        >
          {active ? '❌ Hide Value Highlights' : '💡 Show Why This Costs $1,000'}
        </button>
      </div>

      <AnimatePresence>
        {active &&
          highlights.map(({ id, message }) => {
            const pos = positions[id];
            if (!pos) return null;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'absolute',
                  top: `${pos.top - 16}px`,
                  left: `${pos.left - 16}px`,
                  width: `${pos.width + 32}px`,
                  height: `${pos.height + 32}px`,
                  overflowX: 'hidden',
                }}
                className="absolute z-30 pointer-events-none max-w-full"
              >
                <div className="w-full h-full border-4 border-yellow-400 rounded-2xl shadow-xl animate-pulse"></div>
                <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 bg-yellow-400 text-gray-900 text-sm font-medium px-4 py-2 rounded shadow-lg">
                  {message}
                </div>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </>
  );
}