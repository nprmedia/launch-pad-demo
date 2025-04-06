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

export default function ValueOverlay({ highlights }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = 'body { overflow-x: hidden !important; }';
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-0 right-0 z-[1000] p-4">
        <button
          onClick={() => setActive(!active)}
          className="px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-md"
        >
          {active ? '❌ Hide Value Highlights' : '💡 Show Why This Costs $1,000'}
        </button>
      </div>

      <AnimatePresence>
        {active && highlights.map(({ id, message }) => {
          const element = document.getElementById(id);
          if (!element) return null;

          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY - 16;
          const left = rect.left + window.scrollX - 16;
          const width = rect.width + 32;
          const height = rect.height + 32;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top,
                left,
                width,
                height,
                pointerEvents: 'none',
                zIndex: 999,
              }}
            >
              <div className="w-full h-full border-4 border-yellow-400 rounded-2xl shadow-xl animate-pulse"></div>
              <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 bg-yellow-400 text-gray-900 text-sm font-medium px-4 py-2 rounded shadow-lg max-w-xs text-center">
                {message}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </>
  );
}
