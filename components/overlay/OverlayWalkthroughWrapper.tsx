'use client';

import React, { useState } from 'react';
import { OverlayWalkthrough } from './OverlayWalkthrough';
import { SymbolicStart } from './SymbolicStart';

interface OverlayWalkthroughWrapperProps {
  children: React.ReactNode;
}

export const OverlayWalkthroughWrapper: React.FC<OverlayWalkthroughWrapperProps> = ({ children }) => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="relative">
      {children}

      {!unlocked && (
        <SymbolicStart onStart={() => setUnlocked(true)} />
      )}

      {unlocked && <OverlayWalkthrough />}
    </div>
  );
};
