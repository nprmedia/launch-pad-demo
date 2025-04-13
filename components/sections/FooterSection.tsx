'use client';

import Link from 'next/link';

export const FooterSection = () => {
  return (
    <footer className="relative w-full py-16 px-6 bg-black text-white text-center overflow-hidden">
      <div className="max-w-xl mx-auto">
        <p className="text-sm text-white/60">Demo 1 of 9 – Coaches & Consultants</p>
        <p className="mt-1 text-white/80">Crafted by NPR Media</p>

        <div className="mt-6">
          <Link
            href="/demo/2"
            className="inline-block text-orange-500 bg-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
          >
            → View Demo 2: DTC Brand
          </Link>
        </div>
      </div>

      <div className="absolute -z-10 top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 blur-[120px] opacity-10" />
    </footer>
  );
};
