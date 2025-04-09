// File: components/overlay/OverlayWalkthroughWrapper.tsx
// Minimal wrapper to position the walkthrough component cleanly

'use client';

import React from 'react';
import { OverlayWalkthrough } from './OverlayWalkthrough';

export const OverlayWalkthroughWrapper = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        <OverlayWalkthrough />
      </div>
    </div>
  );
};