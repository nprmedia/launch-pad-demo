// File: components/sections/HeroSection.tsx
// Purpose: High-conversion landing hero with responsive headline, CTA, motion reveal, and ambient glow

'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const HeroSection = () => {
  return (
    <section id="hero-section" className="relative isolate w-full min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white dark:bg-black overflow-hidden">
      <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-brand opacity-10 blur-[120px] z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
          Unlock Your Coaching Potential
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Build a profitable, aligned business with systems that scale and messaging that converts.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button intent="primary">Get Free Strategy Guide</Button>
          <Button intent="secondary" href="#features">
            See What’s Inside
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"
          />
        </div>
      </motion.div>
    </section>
  );
};
