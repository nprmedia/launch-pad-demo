'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Playfair_Display, Inter } from 'next/font/google';
import ValueOverlay, { launchPadHighlights } from '@/components/ValueOverlay';
import { SpeedInsights } from "@vercel/speed-insights/next"

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function LaunchPadPage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      q: 'Can I use this layout with my own content?',
      a: 'Yes — everything is structured to be swappable and brandable to your business.',
    },
    {
      q: 'How long does it take to launch?',
      a: 'Typically 2–3 days. We handle the build, you just plug in your content.',
    },
    {
      q: 'Is $1,000 the real price?',
      a: 'This is the exact site you get. No surprise upsells — the value is in the execution.',
    },
  ];

  const testimonials = [
    {
      quote: 'This site helped me collect 200+ leads in my first week. Highly recommend!',
      name: 'Alex R., Career Coach',
    },
    {
      quote: 'It looks and works better than $3,000 sites I’ve seen. Unreal quality.',
      name: 'Maria S., Wellness Coach',
    },
    {
      quote: 'It took 48 hours to go live. The design, copy, and speed were perfect.',
      name: 'Jordan M., Mindset Consultant',
    },
  ];

  return (
    <main className={`${inter.className} bg-white text-gray-900 overflow-x-hidden`}>
    <ValueOverlay highlights={launchPadHighlights} />

      {/* Hero */}
      <section
        id="main-cta"
        className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 relative"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`${playfair.className} text-5xl font-bold tracking-tight md:text-6xl text-blue-900 max-w-3xl`}
        >
          Your Coaching Launch Page, Done Right
        </motion.h1>
        <p className="mt-6 text-lg text-gray-700 max-w-xl">
          Built to convert leads, capture emails, and validate your next coaching offer.
        </p>
        <a
          href="https://launch-pad-demo.vercel.app"
          target="_blank"
          className="mt-8 inline-block px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold shadow-lg ring-2 ring-blue-300"
        >
          Preview the Full Site
        </a>
        <div className="absolute bottom-4 animate-bounce text-blue-600 text-sm">↓ Scroll for Features</div>
      </section>

      {/* Lead Magnet Section */}
      <section
        id="lead-magnet"
        className="py-24 px-6 md:px-16 bg-gradient-to-br from-white to-blue-50 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto"
      >
        <Image
          src="/images/lead-magnet.png"
          alt="Lead magnet mockup"
          width={480}
          height={320}
          className="rounded-xl shadow-lg"
        />
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold mb-4">Capture Emails with a Magnetic Giveaway</h2>
          <p className="text-gray-700 mb-6">
            Offer a checklist, template, or free guide — we build the exact section that gets subscribers.
          </p>
          <ul className="space-y-2 text-left">
            <li>✅ Plug-and-play email capture</li>
            <li>✅ Mobile-first and lightning-fast</li>
            <li>✅ Mailchimp ready</li>
          </ul>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-24 px-6 md:px-16 bg-gradient-to-bl from-gray-50 to-white text-center max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-10">What’s Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '1-Page High-Conversion Layout',
              emoji: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4z" /></svg>,
              desc: 'Strategic layout designed to drive opt-ins and validate offers.',
            },
            {
              title: 'Email Marketing Integration',
              emoji: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
              desc: 'Pre-wired to work with Mailchimp and ConvertKit out of the box.',
            },
            {
              title: 'Mobile & Speed Optimized',
              emoji: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
              desc: 'Fast-loading and responsive across all devices for max performance.',
            },
          ].map(({ title, emoji, desc }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-200"
            >
              <div className="text-4xl mb-2">{emoji}</div>
              <h3 className="text-xl font-semibold mb-1">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="py-16 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">What Real Coaches Are Saying</h2>
        <div className="overflow-hidden relative">
          <motion.div
            className="flex"
            initial={{ x: 0 }}
            animate={{ x: ['0%', '-100%', '0%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="min-w-full px-4">
                <blockquote className="text-lg italic text-gray-800">“{t.quote}”</blockquote>
                <p className="mt-2 text-sm text-gray-600">— {t.name}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="social-proof" className="py-16 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Based on Frameworks Used by:</h2>
        <div className="flex justify-center flex-wrap gap-6 opacity-60">
          {['Forbes', 'CoachHub', 'LinkedIn Learning'].map((brand) => (
            <span key={brand} className="text-lg">{brand}</span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-blue-50 py-20 px-6 md:px-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">FAQ: Is This Really Worth $1,000?</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }, i) => (
            <div key={q} className="border-b pb-4">
              <button
                className="w-full text-left font-semibold text-lg focus:outline-none"
                onClick={() => toggleFAQ(i)}
              >
                {q}
              </button>
              {activeFAQ === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-gray-700 mt-2"
                >
                  {a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-blue-700 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Launch?</h2>
        <p className="mb-6 text-lg">Own this entire site for just $1,000 — ready in days, not weeks.</p>
        <a
          href="https://launch-pad-demo.vercel.app"
          target="_blank"
          className="inline-block bg-white text-blue-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100"
        >
          Preview the Full Site
        </a>
      </section>

      {/* Micro Footer */}
      <footer className="py-6 text-center text-sm text-gray-400 bg-gray-100">
        &copy; 2025 NPR Media. All rights reserved.
      </footer>
    </main>
  );
}
