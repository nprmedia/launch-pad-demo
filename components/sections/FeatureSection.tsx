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
    <section className="relative w-full py-24 px-6 bg-white text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-black">
          What You’ll Unlock
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-f4f4f4 border-ffffff shadow-sm"
            >
              <Icon className="w-10 h-10 text-orange-400 mb-4" />
              <h3 className="text-lg font-semibold text-black">
                {title}
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                {description}
              </p>
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
