'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is this landing page actually functional?',
    answer: 'Yes — all core sections are live, animated, and mobile-responsive. The email capture is also wired up to a mock Mailchimp flow.',
  },
  {
    question: 'Can I customize this for my business?',
    answer: 'Absolutely. The layout, text, and visuals are modular and easy to update with your own content.',
  },
  {
    question: 'Does this integrate with my CRM?',
    answer: 'This demo is CRM-ready and can be integrated with platforms like HubSpot, ConvertKit, or HighLevel with minimal setup.',
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative w-full py-24 px-6 bg-white text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Frequently Asked Questions
        </h2>

        <div className="mt-12 space-y-6 text-left">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-neutral-200 rounded-xl p-4 bg-f4f4f4 text-black-900"
            >
              <button
                onClick={() => toggle(i)}
                className="flex items-center justify-between w-full text-base md:text-lg font-medium text-gray-700 focus:outline-none"
              >
                {faq.question}
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-2 text-sm text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        className="absolute -z-10 top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 blur-[140px]"
      />
    </section>
  );
};
