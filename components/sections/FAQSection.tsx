// File: components/sections/FAQSection.tsx
// Purpose: Answer key objections with accessible accordion UI and animated transitions

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
    <section className="w-full min-h-screen flex items-center justify-center py-24 px-6 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="mt-12 space-y-6 text-left">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"
            >
              <button
                onClick={() => toggle(i)}
                className="flex items-center justify-between w-full text-lg font-medium text-gray-800 dark:text-white focus:outline-none"
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
                    className="overflow-hidden mt-2 text-gray-600 dark:text-gray-300"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
