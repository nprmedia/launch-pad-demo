// File: components/sections/LeadMagnetSection.tsx
// Purpose: Email capture section with mock Mailchimp integration, form validation, and success animation

'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface FormData {
  email: string;
}

export const LeadMagnetSection = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: FormData) => {
    // Simulate Mailchimp submission with delay
    await new Promise((res) => setTimeout(res, 800));
    console.log('Submitted data:', data);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    reset();
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-centerpy-20 px-6 bg-gray-50 dark:bg-gray-900 text-center" id="lead-magnet-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Get the Free Strategy Guide
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Discover how to streamline your coaching offer and attract ideal clients—instantly.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="Enter your email"
            className="w-full sm:w-auto flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <Button type="submit" intent="primary" className="w-full sm:w-auto">
            Send it my way
          </Button>
        </form>
        {errors.email && (
          <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
        )}
        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-green-600 dark:text-green-400"
          >
            Guide sent! Check your inbox.
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};
