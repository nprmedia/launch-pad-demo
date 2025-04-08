// File: components/sections/FeatureSection.tsx
// Purpose: Highlights 3 core benefits with visual icons, responsive grid, and animated entry

'use client';

import { motion } from 'framer-motion';
import { LucideTarget, LucideRepeat, LucideHandCoins } from 'lucide-react';

const features = [
  {
    title: 'Clarify Your Offer',
    description:
      'Craft a message that resonates with your ideal client and positions you as a premium solution.',
    icon: LucideTarget,
  },
  {
    title: 'Systematize Your Funnel',
    description:
      'Install a repeatable lead generation system that attracts qualified prospects daily.',
    icon: LucideRepeat,
  },
  {
    title: 'Sell With Confidence',
    description:
      'Learn to lead value-based sales calls that convert without pressure or scripts.',
    icon: LucideHandCoins,
  },
];

export const FeatureSection = () => {
  return (
    <section id="feature-section" className="py-24 px-6 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          What You’ll Unlock
        </motion.h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm min-h-[320px]"
            >
              <Icon className="w-12 h-12 text-brand mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
