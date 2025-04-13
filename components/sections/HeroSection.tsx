'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const HeroSection = () => {
  return (
    <section className="relative isolate w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center bg-white overflow-hidden">
      {/* Glow aura behind content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-orange-500 blur-[160px] z-0"
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-gray-900 leading-tight">
          Unlock Your Coaching Potential
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Build a profitable, aligned business with systems that scale and messaging that converts.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button intent="primary">Get Free Strategy Guide</Button>
          <Button intent="secondary" href="#features">See What’s Inside</Button>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2 h-2 rounded-full bg-gray-400"
          />
        </div>
      </motion.div>
    </section>
  );
};
