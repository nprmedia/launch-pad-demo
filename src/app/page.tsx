'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ValueOverlay from '@/components/ValueOverlay';

export default function LaunchPadPage() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-white text-gray-900">
      {/* Demo Notice */}
      <div className="fixed top-4 right-4 bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full shadow">
        🧪 This is a Demo Site Preview
      </div>

      {/* Hero */}
      <section id="main-cta" className="relative bg-blue-50 py-24 px-6 text-center overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-blue-900 max-w-3xl mx-auto"
        >
          This Could Be the Launchpad for Your Next Offer
        </motion.h1>
        <p className="mt-4 text-lg text-gray-700">
          A high-converting landing page designed for coaches validating a new offer or lead magnet.
        </p>
        <a
          href="https://launch-pad-demo.vercel.app"
          target="_blank"
          className="mt-8 inline-block px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold shadow-lg ring-2 ring-blue-300 animate-pulse"
        >
          View the Demo Site Preview
        </a>
      </section>

      {/* Lead Magnet */}
      <section id="lead-magnet" className="py-20 px-6 md:px-16 text-center bg-white">
        <h2 className="text-3xl font-semibold mb-6">Offer a Free Lead Magnet — Like This</h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-8">
          Use your site to give away a PDF, checklist, or video in exchange for emails. Here’s how that could look.
        </p>
        <img
          src="/images/lead-magnet.png"
          alt="Lead magnet preview"
          className="mx-auto max-w-md rounded-xl shadow-md"
        />
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">What’s Included in This Package</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              '1-page layout tailored for high conversions',
              'Email capture section integrated with Mailchimp',
              'Fully mobile-optimized with CTA buttons throughout',
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-medium">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="social-proof" className="py-20 px-6 md:px-16 text-center bg-white">
        <h2 className="text-2xl font-semibold mb-4">Trusted Frameworks for Real Coaches</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          This layout draws from proven marketing principles used by 7-figure coaching brands.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {['Forbes', 'CoachHub', 'LinkedIn Learning'].map((brand, i) => (
            <span key={i} className="text-gray-500 text-lg">{brand}</span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-blue-50 py-20 px-6 md:px-16">
        <h2 className="text-3xl font-semibold text-center mb-10">About This Demo Site</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="font-semibold text-lg">Can I get this exact layout for my business?</h3>
            <p className="text-gray-700">Yes! This is part of our Launch Pad Website package for coaches.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">How customizable is this?</h3>
            <p className="text-gray-700">Fonts, colors, content, and email integrations are all personalized to your brand.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Is this really just $500–$1,000?</h3>
            <p className="text-gray-700">Yes. This exact site structure is what you get at that price — mobile-ready and launchable in days.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Launch Your Site Today</h2>
        <p className="mb-6 text-lg">Everything you need to validate your offer and grow your list.</p>
        <a
          href="https://launch-pad-demo.vercel.app"
          target="_blank"
          className="inline-block bg-white text-blue-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100"
        >
          View Demo
        </a>
      </section>

      {/* Back to Top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

      {/* Value Overlay Toggle */}
      <ValueOverlay />

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 bg-gray-100">
        &copy; 2025 NPR Media. All rights reserved.
      </footer>
    </main>
  );
}
