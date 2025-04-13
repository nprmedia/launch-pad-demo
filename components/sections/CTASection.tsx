'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const CTASection = () => {
  return (
    <section className="relative w-full py-24 px-6 bg-orange-500 text-white text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-semibold">
          Ready to Turn Strategy into Clients?
        </h2>
        <p className="mt-4 text-lg text-white/90">
          You don’t need another cheap ripoff. You need a system that converts.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Button intent="secondary" size="lg">
            Get the Free Strategy Guide
          </Button>
          <Button intent="ghost" size="lg" href="#faq">
            Still Have Questions?
          </Button>
        </div>

        <p className="mt-6 text-sm text-white/70">
          No spam. No fluff. Just proven frameworks.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1.4, delay: 0.3 }}
        className="absolute -z-10 top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[160px] opacity-10"
      />
    </section>
  );
};
