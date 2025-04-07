'use client';

import { useEffect, useState } from 'react';
import ValueOverlay from '@/components/ValueOverlay';

const rawHighlights = [
  {
    targetId: 'main-cta',
    message: 'Hooks visitors above the fold with a conversion-optimized hero.',
  },
  {
    targetId: 'lead-magnet',
    message: 'Drives email signups with a high-value lead magnet and instant visual appeal.',
  },
  {
    targetId: 'features',
    message: 'Explains product benefits clearly with value-first feature layout.',
  },
  {
    targetId: 'social-proof',
    message: 'Builds trust using credibility indicators styled like 7-figure founders.',
  },
  {
    targetId: 'faq',
    message: 'Overcomes objections before they’re raised with rapid Q&A format.',
  },
  {
    targetId: 'cta-footer',
    message: 'Closes the loop with urgency, reinforcing the offer and next action.',
  },
];

export default function Page() {
  const [highlights, setHighlights] = useState<{
    targetId: string;
    message: string;
    coordinates: {
      top: number;
      left: number;
      width: number;
      height: number;
    };
  }[]>([]);

  const debug = true;

  useEffect(() => {
    const compute = () => {
      const dynamicHighlights = rawHighlights.map((h) => {
        const el = document.getElementById(h.targetId);
        if (!el) {
          console.warn(`Missing element for highlight: ${h.targetId}`);
        }
        const rect = el?.getBoundingClientRect();

        const coordinates = rect
          ? {
              top: rect.top + window.scrollY,
              left: rect.left + window.scrollX,
              width: rect.width || 640,
              height: rect.height || 320,
            }
          : {
              top: 0,
              left: 0,
              width: 640,
              height: 320,
            };

        return {
          ...h,
          coordinates,
        };
      });

      setHighlights(dynamicHighlights);

      if (debug) {
        console.log('Live Debug Overlay:');
        dynamicHighlights.forEach((h, i) => {
          console.log(`[#${i}] ${h.targetId}`, h.coordinates);
        });
      }
    };

    setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(compute);
      });
    }, 300);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(compute);
    });
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      {debug &&
        highlights.map((h, i) => (
          <div
            key={`debug-${i}`}
            style={{
              position: 'absolute',
              top: h.coordinates.top,
              left: h.coordinates.left,
              width: h.coordinates.width,
              height: h.coordinates.height,
              border: '2px dashed red',
              backgroundColor: 'rgba(255, 0, 0, 0.05)',
              color: 'red',
              fontSize: '12px',
              zIndex: 10000,
              pointerEvents: 'none',
            }}
          >
            <div style={{ padding: '4px' }}>#{i} {h.targetId}</div>
          </div>
        ))}

      <main className="relative bg-white text-gray-900">
        <ValueOverlay highlights={highlights} />

        <section id="main-cta">...</section>
        <section id="lead-magnet">...</section>
        <section id="features">...</section>
        <section id="social-proof">...</section>
        <section id="faq">...</section>
        <section id="cta-footer">...</section>
      </main>
    </>
  );
}
