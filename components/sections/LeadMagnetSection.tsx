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
    await new Promise((res) => setTimeout(res, 800));
    console.log('Submitted data:', data);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    reset();
  };

  return (
    <section className="relative w-full py-24 px-6 flex flex-col items-center justify-center bg-white text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative z-10 max-w-xl w-full"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Get the 7-Figure Systems Playbook
        </h2>
        <p className="mt-2 text-sm md:text-base text-gray-600 ">
          Actionable systems and strategy for scaling your coaching business — sent straight to your inbox.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="Your email"
            className="w-full flex-1 px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <Button intent="primary" type="submit" className="w-full sm:w-auto">
            Get Free Guide
          </Button>
        </form>

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
        )}

        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-green-600"
          >
            Guide sent! Check your inbox.
          </motion.p>
        )}

        <p className="mt-2 text-xs text-gray-500">
          No spam. Just strategy.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        className="absolute -z-10 top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 blur-[140px]"
      />
    </section>
  );
};
