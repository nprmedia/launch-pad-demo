'use client';

import { useEffect, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import clsx from 'clsx';

type SymbolicStartProps = {
  onStart: () => void;
};

export const SymbolicStart = ({ onStart }: SymbolicStartProps) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const triggerStart = useCallback(() => {
    if (!visible) return;
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      onStart();
    }, 1200); // match fade-out transition
  }, [visible, onStart]);

  // Allow Enter or Spacebar to unlock
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        triggerStart();
      }
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
      {/* Background aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-black opacity-90 animate-background-pulse pointer-events-none" />

      {/* Faint brand initials in background */}
      <div className="absolute text-[30vw] text-white/5 font-extrabold tracking-widest select-none pointer-events-none">
        NPR
      </div>

      {/* Spark trail layer */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Optional: Add spark Lottie or SVG particles here */}
      </div>

      {/* Orb */}
      <div
        onClick={triggerStart}
        className="relative z-[5] w-48 h-48 rounded-full bg-white/10 border-2 border-white/20 backdrop-blur-3xl flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:ring-4 ring-blue-500 shadow-[0_0_80px_rgba(0,195,255,0.4)] animate-shimmer-glow group"
      >
        {/* Inner Sparkles Icon */}
        <Sparkles className="h-12 w-12 text-blue-200 animate-slow-pulse transition-all group-hover:scale-110 group-hover:text-white" />

        {/* Ripple Effect */}
        <div className="absolute w-full h-full rounded-full border border-blue-300/40 animate-ping" />
        <div className="absolute w-full h-full rounded-full border border-blue-300/20 animate-ping delay-200" />
      </div>

      {/* Subtext */}
      <div className="absolute bottom-24 text-center text-white text-sm tracking-wide z-[5]">
        This is not an ordinary page.<br />
        Press <kbd className="px-1 py-0.5 bg-white/10 border border-white/20 rounded text-xs">Enter</kbd> or click the orb to begin.
      </div>

      {/* Cursor Glow */}
      <div className="fixed w-16 h-16 bg-blue-500/10 rounded-full blur-xl pointer-events-none z-[0] transition-all duration-300 ease-in-out animate-cursor-glow" />
      
      <style jsx global>{`
        @keyframes background-pulse {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer-glow {
          0%, 100% { box-shadow: 0 0 80px rgba(0, 195, 255, 0.4); }
          50% { box-shadow: 0 0 100px rgba(0, 255, 255, 0.7); }
        }
        @keyframes slow-pulse {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        .animate-background-pulse {
          animation: background-pulse 10s ease infinite;
        }
        .animate-shimmer-glow {
          animation: shimmer-glow 3s ease-in-out infinite;
        }
        .animate-slow-pulse {
          animation: slow-pulse 2.5s ease-in-out infinite;
        }
        .animate-cursor-glow {
          animation: shimmer-glow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
