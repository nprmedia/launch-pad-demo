// File: components/sections/FooterSection.tsx
// Purpose: Lightweight footer with brand echo and link to next demo

'use client';

import Link from 'next/link';

export const FooterSection = () => {
  return (
    <footer className="py-12 px-6 bg-black text-white text-center">
      <p className="text-sm text-white/60">Demo 1 of 9 – Coaches & Consultants</p>
      <p className="mt-1 text-white/80">Crafted by NPR Media</p>

      <div className="mt-6">
        <Link
          href="/demo/2"
          className="inline-block text-brand bg-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
        >
          → View Demo 2: DTC Brand
        </Link>
      </div>
    </footer>
  );
};
