// File: components/overlay/Orb.tsx

'use client';

import { useEffect, useRef, useState } from 'react';

// Replace this with your iconic SVG animation or inline SVG component
import { NPRSigil } from '@/components/overlay/NPRSigil';

type OrbProps = {
  onClick: () => void;
};

export const Orb = ({ onClick }: OrbProps) => {
  const orbRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ top: string; left: string; delay: string }[]>([]);

  useEffect(() => {
    const node = orbRef.current;
    if (!node) return;

    const handleMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      node.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 6 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div
      ref={orbRef}
      onClick={onClick}
      className="relative w-52 h-52 rounded-full bg-gradient-to-br from-blue-900/30 to-purple-900/20 backdrop-blur-2xl border-2 border-white/10 shadow-[0_0_60px_rgba(0,200,255,0.4)] cursor-pointer transition-transform hover:scale-105 z-50 group"
    >
      {/* Inner animated sigil */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <NPRSigil className="w-20 h-20 text-blue-300 opacity-90 animate-sigil-pulse" />
      </div>

      {/* Center Text */}
      <div className="absolute bottom-3 inset-x-0 text-center text-xs text-white/70 tracking-wide z-10 font-mono uppercase">
        The Ritual Begins
      </div>

      {/* Particle motes */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-particle-blink"
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}

      {/* Aura pulse rings */}
      <div className="absolute inset-0 rounded-full border border-blue-300/20 animate-ping" />
      <div className="absolute inset-0 rounded-full border border-indigo-300/20 animate-ping delay-300" />

      <style jsx global>{`
        @keyframes sigil-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
        .animate-sigil-pulse {
          animation: sigil-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
