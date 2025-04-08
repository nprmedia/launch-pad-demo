// File: src/app/layout.tsx
// Purpose: Root layout with suspense-safe overlay integration and production-safe setup

import '../styles/globals.css';
import { ReactNode, Suspense } from 'react';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const OverlayWalkthrough = dynamic(() =>
  import('@/components/overlay/OverlayWalkthrough').then((mod) => mod.OverlayWalkthrough),
  { ssr: false }
);

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
        <Suspense fallback={null}>
          <OverlayWalkthrough />
        </Suspense>
      </body>
    </html>
  );
}
