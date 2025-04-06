'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Highlight = {
  id: string;
  message: string;
};

export const launchPadHighlights: Highlight[] = [
  { id: 'main-cta', message: 'This above-the-fold hero is designed to convert instantly with optimized visual hierarchy.' },
  { id: 'lead-magnet', message: 'Lead capture system ready to integrate with Mailchimp or ConvertKit for list building.' },
  { id: 'features', message: 'Strategic feature layout visually communicates core deliverables of the $1,000 package.' },
  { id: 'testimonials', message: 'Real social proof slider with client results builds instant trust and lowers objections.' },
  { id: 'social-proof', message: 'Frameworks and platforms trusted by top-tier coaches — immediate trust builder.' },
  { id: 'faq', message: 'Anticipates and answers objections directly — critical for closing high-intent leads.' },
  { id: 'cta-footer', message: 'Closes strong with a final CTA, price reiteration, and urgency — built to convert.' },
];

type Props = {
  highlights: Highlight[];
};

export default function ValueOverlay({ highlights }: Props) {
  const [current, setCurrent] = useState<number>(-1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const runWalkthrough = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await delay(600);

    for (let i = 0; i < highlights.length; i++) {
      const el = document.getElementById(highlights[i].id);
      const section = el?.closest('section') || el;
      if (!section) continue;

      setCurrent(i);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      await delay(2200);
    }

    setCurrent(-1);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = 'body { overflow-x: hidden !important; }';
    document.head.appendChild(style);
    runWalkthrough();
    return () => {
      document.head.removeChild(style);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {current === -1 && (
        <div className="fixed bottom-4 right-4 z-[1001]">
          <button
            onClick={runWalkthrough}
            className="px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-md"
          >
            🔁 Replay Value Highlights
          </button>
        </div>
      )}
      {/* Dimmed Background */}
      <AnimatePresence>
        {current >= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/40 z-[900]"
          />
        )}
      </AnimatePresence>

      {/* Overlay Highlight */}
      <AnimatePresence>
        {current >= 0 && (() => {
          const { id, message } = highlights[current];
          const el = document.getElementById(id);
          if (!el) return null;
          const section = el.closest('section') || el;
          const bounds = section.getBoundingClientRect();
          const scrollTop = window.scrollY;
          const scrollLeft = window.scrollX;
          const top = bounds.top + scrollTop;
          const left = bounds.left + scrollLeft;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                top,
                left,
                width: bounds.width,
                height: bounds.height,
                zIndex: 999,
                pointerEvents: 'none',
              }}
            >
              <div className="w-full h-full border-4 border-yellow-400 rounded-2xl shadow-xl animate-pulse" />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4 }}
                className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 text-sm font-medium px-4 py-2 rounded shadow-lg max-w-xs text-center z-[1001]"
              >
                {message}
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
}
