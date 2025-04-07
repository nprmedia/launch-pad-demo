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
  }, [debug]);

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

        <section id="main-cta" className="min-h-screen flex flex-col justify-center items-center bg-indigo-50 p-12 text-center">
  <h1 className="text-5xl font-bold mb-6">Launch Your Product Like a Pro 🚀</h1>
  <p className="text-xl text-gray-700 mb-6 max-w-2xl">
    Conversion-optimized landing page with every section designed to hook, prove, and convert.
  </p>
  <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition">Start for Free</button>
</section>
        <section id="lead-magnet" className="bg-white py-20 px-6 text-center">
  <h2 className="text-3xl font-semibold mb-4">Grab the Free Toolkit 🧰</h2>
  <p className="text-gray-600 max-w-xl mx-auto mb-6">
    Get a curated resource pack including templates, frameworks, and onboarding strategies.
  </p>
  <input type="email" placeholder="you@example.com" className="border px-4 py-2 rounded mr-2" />
  <button className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition">Send It</button>
</section>
        <section id="features" className="bg-gray-50 py-20 px-8">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
    <div>
      <h3 className="text-xl font-bold mb-2">Speed Matters</h3>
      <p className="text-gray-600">Optimized Lighthouse scores and load times out of the box.</p>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">Visual Impact</h3>
      <p className="text-gray-600">Stunning UI with clarity-focused layouts and spacing.</p>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">Conversion Engineering</h3>
      <p className="text-gray-600">Every pixel serves a purpose. Built for results.</p>
    </div>
  </div>
</section>
        <section id="social-proof" className="bg-white py-20 px-6">
  <h2 className="text-3xl font-semibold text-center mb-12">Trusted by Lean Founders</h2>
  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
    <blockquote className="border-l-4 border-indigo-500 pl-4 text-gray-700">
      “We used this exact template to launch our SaaS MVP. Clean, fast, and effective.”<br /><span className="block mt-2 font-bold">— Alex, Co-founder @Toolbase</span>
    </blockquote>
    <blockquote className="border-l-4 border-indigo-500 pl-4 text-gray-700">
      “It just works. The overlays, pacing, and mobile responsiveness are elite.”<br /><span className="block mt-2 font-bold">— Bri, UX Lead @Craftlane</span>
    </blockquote>
  </div>
</section>
        <section id="faq" className="bg-gray-100 py-20 px-6">
  <h2 className="text-3xl font-semibold text-center mb-10">Questions? Answered.</h2>
  <div className="max-w-3xl mx-auto space-y-6">
    <div>
      <h4 className="text-lg font-semibold">How fast can I launch this site?</h4>
      <p className="text-gray-600">In under 24 hours if you copy+paste. It's production-grade out of the box.</p>
    </div>
    <div>
      <h4 className="text-lg font-semibold">Is this worth $1,000?</h4>
      <p className="text-gray-600">We think it&apos;s underpriced. Founders routinely spend 5x more for worse UX.</p>
    </div>
  </div>
</section>
        <section id="cta-footer" className="bg-indigo-600 text-white py-20 px-6 text-center">
  <h2 className="text-4xl font-bold mb-4">Launch with Confidence</h2>
  <p className="text-lg mb-6">Get the site that converts with clarity, speed, and polish.</p>
  <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">Claim This Site</button>
</section>
      </main>
    </>
  );
}
