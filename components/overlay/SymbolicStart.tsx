// File: components/overlay/SymbolicStart.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { OverlayWalkthroughWrapper } from './OverlayWalkthroughWrapper';

interface SymbolicStartProps {
  onStart?: () => void;
}

export const SymbolicStart: React.FC<React.PropsWithChildren<SymbolicStartProps>> = ({ onStart, children }) => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => {
      onStart?.();
    }, 300);
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleStart();
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  if (!started) {
    return (
      <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60">
        <button
          onClick={handleStart}
          className="group relative flex flex-col items-center justify-center gap-3 px-10 py-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-bold shadow-2xl hover:scale-105 transition-transform"
        >
          <div className="absolute -inset-1 rounded-full bg-white/20 blur-xl animate-pulse" />
          <Sparkles className="w-6 h-6 animate-ping text-white drop-shadow-lg z-10" />
          <span className="z-10 tracking-wide">Begin Experience</span>
        </button>
      </div>
    );
  }

  return (
    <>
        <OverlayWalkthroughWrapper />      
        {children}
    </>
  );
};

export default SymbolicStart;
