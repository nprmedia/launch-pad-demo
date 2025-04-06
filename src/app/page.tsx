'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Playfair_Display, Inter } from 'next/font/google';
import ValueOverlay, { launchPadHighlights } from '@/components/ValueOverlay';
import { SpeedInsights } from '@vercel/speed-insights/next';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function LaunchPadPage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const toggleFAQ = (index: number) => setActiveFAQ(activeFAQ === index ? null : index);

  const faqs = [
    { q: 'Can I use this layout with my own content?', a: 'Yes — everything is swappable and brandable.' },
    { q: 'How long does it take to launch?', a: 'Typically 2–3 days. We handle the build, you plug in your content.' },
    { q: 'Is $1,000 the real price?', a: 'Yes. This exact site. No surprise upsells — the value is in the execution.' },
  ];

  const testimonials = [
    { quote: 'Helped me collect 200+ leads in my first week. Highly recommend!', name: 'Alex R., Career Coach' },
    { quote: 'Looks and works better than $3,000 sites I’ve seen. Unreal quality.', name: 'Maria S., Wellness Coach' },
    { quote: 'Live in 48 hours. The design, copy, and speed were perfect.', name: 'Jordan M., Mindset Consultant' },
  ];

  return (
    <main className={`${inter.className} bg-white text-gray-900 overflow-x-hidden w-full max-w-full`}>
      <ValueOverlay highlights={launchPadHighlights} />

      {/* Hero */}
      <motion.section
        id="main-cta"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 text-center bg-gradient-to-br from-blue-50 to-blue-100"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-200 to-transparent blur-3xl opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-blue-900 max-w-3xl leading-tight`}
        >
          Your Coaching Launch Page, Done Right
        </motion.h1>
        <p className="mt-4 text-balance text-base sm:text-lg text-gray-700 max-w-xl">
          Built to convert leads, capture emails, and validate your next coaching offer.
        </p>
        <a
          href="https://launch-pad-demo.vercel.app"
          target="_blank"
          className="group mt-8 inline-block px-6 sm:px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold shadow-xl ring-2 ring-blue-400 ring-offset-2 transition duration-200 relative overflow-hidden"
        >
          <span className="relative z-10">🚀 Preview the Full Site</span>
          <span className="absolute inset-0 rounded-full group-hover:scale-105 transition-transform duration-300 ring-2 ring-white/40" />
        </a>
        <div className="absolute bottom-4 animate-bounce text-blue-600 text-sm">↓ Scroll for Features</div>
      </motion.section>

      {/* Lead Magnet */}
      <motion.section
        id="lead-magnet"
        className="py-24 px-4 sm:px-6 md:px-16 bg-gradient-to-br from-white to-blue-50 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Image
          src="/images/lead-magnet.png"
          alt="Lead magnet mockup"
          width={480}
          height={320}
          className="rounded-xl shadow-xl w-full md:w-auto"
        />
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Capture Emails with a Magnetic Giveaway</h2>
          <p className="text-gray-700 mb-6 text-sm sm:text-base">
            Offer a checklist, template, or guide — we build the exact section that gets subscribers.
          </p>
          <ul className="space-y-2 text-sm sm:text-base text-left">
            <li>✅ Plug-and-play email capture</li>
            <li>✅ Mobile-first and lightning-fast</li>
            <li>✅ Mailchimp ready</li>
          </ul>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        id="features"
        className="py-24 px-4 sm:px-6 md:px-16 bg-gradient-to-bl from-gray-50 to-white text-center max-w-6xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-12">What’s Included</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { title: 'High-Conversion Layout', emoji: '📄', desc: 'Drives opt-ins and validates your offer.' },
            { title: 'Email Marketing Integration', emoji: '📬', desc: 'Works with Mailchimp and ConvertKit.' },
            { title: 'Mobile & Speed Optimized', emoji: '⚡', desc: 'Lightning-fast across all devices.' },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition border border-gray-100"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-20 px-4 sm:px-6 text-center max-w-3xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">What Real Coaches Are Saying</h2>
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
      </motion.section>

      {/* Social Proof */}
      <motion.section
        id="social-proof"
        className="py-20 px-4 sm:px-6 text-center max-w-4xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Based on Frameworks Used by:</h2>
        <div className="flex justify-center flex-wrap gap-6 opacity-60">
          {['Forbes', 'CoachHub', 'LinkedIn Learning'].map((brand) => (
            <span key={brand} className="text-base sm:text-lg">{brand}</span>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        id="faq"
        className="bg-blue-50 py-24 px-4 sm:px-6 md:px-16 max-w-3xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-xl sm:text-3xl font-semibold text-center mb-10">FAQ: Is This Really Worth $1,000?</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }, i) => (
            <div key={q} className="border-b pb-4">
              <button
                className="w-full text-left font-semibold text-base sm:text-lg focus:outline-none flex justify-between items-center"
                onClick={() => toggleFAQ(i)}
              >
                <span>{q}</span>
                <span>{activeFAQ === i ? '−' : '+'}</span>
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
      </motion.section>

      {/* CTA Footer */}
      <motion.section
        id="cta-footer"
        className="bg-blue-700 text-white py-20 px-4 sm:px-6 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Launch?</h2>
        <p className="mb-6 text-base sm:text-lg">
          Own this entire site for just $1,000 — ready in days, not weeks.
        </p>
        <div className="flex justify-center flex-wrap gap-4 mb-6">
          <span className="bg-white text-blue-700 text-xs sm:text-sm px-3 py-1 rounded-full font-semibold">
            ✅ 2-day Turnaround Included
          </span>
          <span className="bg-white text-blue-700 text-xs sm:text-sm px-3 py-1 rounded-full font-semibold">
            🎯 Built for Coaches & Consultants
          </span>
        </div>
        <a
          href="https://launch-pad-demo.vercel.app"
          target="_blank"
          className="inline-block bg-white text-blue-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
        >
          Preview the Full Site
        </a>
      </motion.section>

      <footer className="py-6 text-center text-sm text-gray-400 bg-gray-100">
        &copy; 2025 NPR Media. All rights reserved.
      </footer>

      <SpeedInsights />
    </main>
  );
}
