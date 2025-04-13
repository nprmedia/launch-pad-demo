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

export const SocialProofSection = () => {
  return (
    <section className="relative w-full py-24 px-6 bg-white text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Trusted by Coaches Like You
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 bg-neutral-50 rounded-xl shadow border border-neutral-200 text-left"
            >
              <p className="text-gray-700 italic">“{t.quote}”</p>
              <div className="mt-4 font-semibold text-gray-900 ">
                {t.name}{' '}
                <span className="text-sm font-normal text-gray-500 ">/ {t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        className="absolute -z-10 top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 blur-[140px]"
      />
    </section>
  );
};
