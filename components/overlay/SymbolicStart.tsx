// File: components/overlay/SymbolicStart.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { Orb } from './Orb';
import clsx from 'clsx';

interface SymbolicStartProps {
  onStart: () => void;
}

export const SymbolicStart = ({ onStart }: SymbolicStartProps) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const triggerStart = useCallback(() => {
    if (!visible) return;
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      onStart();
    }, 1200);
  }, [visible, onStart]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') triggerStart();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [triggerStart]);

  if (!visible) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[10000] flex items-center justify-center transition-opacity duration-1000',
        fading ? 'opacity-0' : 'opacity-100'
      )}
    >
      {/* Animated Flow Field Background */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-indigo-700 to-purple-900 opacity-40 animate-flowfield" />
      </div>

      {/* Isolation Layer */}
      <div className="absolute inset-0 bg-black z-[2]" />

      {/* Subliminal Branding */}
      <div className="absolute text-[30vw] text-white/5 font-extrabold tracking-widest select-none pointer-events-none z-[3]">
        NPR
      </div>

      {/* Ambient Glow Glyphs */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        {/* Reserved for particle ambient or glow effects */}
      </div>

      {/* Core Orb */}
      <Orb onClick={triggerStart} />

      {/* Subtext Prompt */}
      <div className="absolute bottom-24 text-center text-white text-sm tracking-wide z-[5]">
        This is not an ordinary page.<br />
        Press <kbd className="px-1 py-0.5 bg-white/10 border border-white/20 rounded text-xs">Enter</kbd> or click the orb to begin.
      </div>

      {/* Cursor Glow Trail */}
      <div className="fixed w-16 h-16 bg-blue-500/10 rounded-full blur-xl pointer-events-none z-[0] transition-all duration-300 ease-in-out animate-cursor-glow" />

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes background-pulse {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer-glow {
          0%, 100% { box-shadow: 0 0 80px rgba(0, 195, 255, 0.4); }
          50% { box-shadow: 0 0 100px rgba(0, 255, 255, 0.7); }
        }
        @keyframes cursor-glow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        @keyframes flowfield {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(1deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .animate-background-pulse { animation: background-pulse 12s ease infinite; }
        .animate-cursor-glow { animation: cursor-glow 4s ease-in-out infinite; }
        .animate-flowfield { animation: flowfield 20s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
