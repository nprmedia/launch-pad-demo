'use client';

import React, { useEffect, useState } from 'react';
import { OverlayWalkthrough } from './OverlayWalkthrough';

interface OverlayWalkthroughWrapperProps {
  children: React.ReactNode;
}

export const OverlayWalkthroughWrapper: React.FC<OverlayWalkthroughWrapperProps> = ({ children }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 500); // slight delay to allow layout stabilization

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {children}
      {showOverlay && <OverlayWalkthrough />}
    </div>
  );
};
