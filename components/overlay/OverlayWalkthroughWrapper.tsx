// File: components/overlay/OverlayWalkthroughWrapper.tsx
// Exports both OverlayWalkthroughWrapper and Wrapper for layout

'use client';

import React from 'react';
import { OverlayWalkthrough } from './OverlayWalkthrough';

export const OverlayWalkthroughWrapper = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <OverlayWalkthrough />
    </div>
  );
};

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);
