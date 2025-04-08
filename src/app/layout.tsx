// File: src/app/layout.tsx
// Purpose: Root layout with full system support, global styling, font preload, dark mode, SEO meta, and overlay walkthrough mount

import '../styles/globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { OverlayWalkthrough } from '@/components/overlay/OverlayWalkthrough';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Launch Pad Demo – Coaches & Consultants',
  description: 'A $2,000-grade landing page demo for coaching businesses built by NPR Media.',
  metadataBase: new URL('https://npr-media.com'),
  openGraph: {
    title: 'Launch Pad Demo – Coaches & Consultants',
    description: 'A premium demo landing page for consultants and coaches.',
    url: 'https://npr-media.com/demo/1',
    siteName: 'NPR Media',
    locale: 'en_US',
    type: 'website',
  },
  themeColor: '#6941C6',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-black dark:bg-black dark:text-white antialiased">
        {children}
        <OverlayWalkthrough />
      </body>
    </html>
  );
}
