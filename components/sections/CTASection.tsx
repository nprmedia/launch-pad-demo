// File: components/sections/CTASection.tsx
// Purpose: Final conversion push with CTA text, dual buttons, and trust copy

'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const CTASection = () => {
  return (
    <section className="py-24 px-6 bg-brand text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Turn Strategy into Clients?
        </h2>
        <p className="mt-4 text-lg text-white/90">
          You don’t need another course. You need a system that converts.
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
    </section>
  );
};
