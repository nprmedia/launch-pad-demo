// File: components/sections/SocialProofSection.tsx
// Purpose: Showcases credibility via testimonial quotes and brand logos

'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      'Within 2 weeks of launching, I booked 3 new high-ticket clients — the clarity was game-changing.',
    name: 'Sarah M.',
    role: 'Wellness Coach',
  },
  {
    quote:
      'Finally a system that helps me show up with confidence. My funnel actually works now.',
    name: 'James T.',
    role: 'Business Mentor',
  },
];

const logos = [
  '/logos/logo1.svg',
  '/logos/logo2.svg',
  '/logos/logo3.svg',
  '/logos/logo4.svg',
];

export const SocialProofSection = () => {
  return (
    <section id="social-proof-section" className="w-full min-h-screen flex items-center justify-center py-24 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          Trusted by Coaches Like You
        </motion.h2>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-black rounded-xl shadow border border-gray-200 dark:border-gray-800 text-left"
            >
              <p className="text-gray-700 dark:text-gray-300 italic">“{t.quote}”</p>
              <div className="mt-4 font-semibold text-gray-900 dark:text-white">
                {t.name} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ {t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {logos.map((logo, i) => (
            <motion.img
              key={i}
              src={logo}
              alt="Brand logo"
              className="h-8 grayscale opacity-70 hover:opacity-100 transition"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
