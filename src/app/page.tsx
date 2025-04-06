'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ValueOverlay from '@/components/ValueOverlay';

export default function LaunchPadPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* Overlay Toggle */}
      <ValueOverlay />

      {/* Hero */}
      <section
        id="main-cta"
        className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 relative"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold tracking-tight md:text-6xl text-blue-900 max-w-3xl"
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
        className="py-24 px-6 md:px-16 bg-white flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto"
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
        className="py-24 px-6 md:px-16 bg-gray-50 text-center max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-10">What’s Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '1-Page High-Conversion Layout',
              emoji: '🧩',
              desc: 'Strategic layout designed to drive opt-ins and validate offers.',
            },
            {
              title: 'Email Marketing Integration',
              emoji: '📬',
              desc: 'Pre-wired to work with Mailchimp and ConvertKit out of the box.',
            },
            {
              title: 'Mobile & Speed Optimized',
              emoji: '⚡',
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

      {/* Social Proof */}
      <section
        id="social-proof"
        className="py-16 px-6 text-center max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4">Based on Frameworks Used by:</h2>
        <div className="flex justify-center flex-wrap gap-6 opacity-60">
          {['Forbes', 'CoachHub', 'LinkedIn Learning'].map((brand) => (
            <span key={brand} className="text-lg">{brand}</span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="bg-blue-50 py-20 px-6 md:px-16 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-semibold text-center mb-10">FAQ: Is This Really Worth $1,000?</h2>
        <div className="space-y-6">
          {[
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
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold text-lg">{q}</h3>
              <p className="text-gray-700 text-sm mt-1">{a}</p>
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
