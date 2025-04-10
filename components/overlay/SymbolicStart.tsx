'use client';

import { Orb } from '@/components/overlay/Orb';
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
    }, 1200);
  }, [visible, onStart]);

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
      {/* Background gradient aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-black opacity-90 animate-background-pulse pointer-events-none z-[1]" />

      {/* Blackout isolation layer */}
      <div className="absolute inset-0 bg-black z-[2]" />

      {/* Faint brand initials */}
      <div className="absolute text-[30vw] text-white/5 font-extrabold tracking-widest select-none pointer-events-none z-[3]">
        NPR
      </div>

      {/* Optional spark trail layer */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        {/* Lottie spark trails or SVG effects go here */}
      </div>

      {/* Central orb */}
      <Orb onClick={triggerStart} />

      {/* Subtext */}
      <div className="absolute bottom-24 text-center text-white text-sm tracking-wide z-[5]">
        This is not an ordinary page.<br />
        Press <kbd className="px-1 py-0.5 bg-white/10 border border-white/20 rounded text-xs">Enter</kbd> or click the orb to begin.
      </div>

      {/* Cursor Glow */}
      <div className="fixed w-16 h-16 bg-blue-500/10 rounded-full blur-xl pointer-events-none z-[0] transition-all duration-300 ease-in-out animate-cursor-glow" />

      {/* Global Styles */}
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
