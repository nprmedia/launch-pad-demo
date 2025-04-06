'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const highlights = [
  {
    id: 'cta',
    selector: '#main-cta',
    message: 'Conversion-optimized CTA built to drive action — not just decoration.',
  },
  {
    id: 'lead-magnet',
    selector: '#lead-magnet',
    message: 'Designed to turn traffic into subscribers, not just look pretty.',
  },
  {
    id: 'features',
    selector: '#features',
    message: 'Integrated features with mobile-first UX that drive ROI.',
  },
  {
    id: 'social-proof',
    selector: '#social-proof',
    message: 'Trust-building layout inspired by 7-figure coaching sites.',
  },
  {
    id: 'faq',
    selector: '#faq',
    message: 'Handles objections proactively — critical for conversions.',
  },
];

type HighlightPosition = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export default function ValueOverlay() {
  const [active, setActive] = useState(false);
  const [positions, setPositions] = useState<Record<string, HighlightPosition>>({});

  useEffect(() => {
    if (active) {
      const newPos: Record<string, HighlightPosition> = {};
      highlights.forEach(({ id, selector }) => {
        const el = document.querySelector(selector);
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
    } else {
      setPositions({});
    }
  }, [active]);

  return (
    <>
      <div className="fixed bottom-0 right-0 z-50 p-4">
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
                  top: pos.top - 16,
                  left: pos.left - 16,
                  width: pos.width + 32,
                  height: pos.height + 32,
                }}
                className="z-40 pointer-events-none border-4 border-yellow-400 rounded-2xl shadow-xl animate-pulse"
              >
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 text-sm font-medium px-4 py-2 rounded shadow-lg">
                  {message}
                </div>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </>
  );
}