'use client';

import { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import swirlAnimation from '@/animations/swirl-core.json'; // Lottie JSON file
import { Sparkles } from 'lucide-react';

type OrbProps = {
  onClick: () => void;
};

export const Orb = ({ onClick }: OrbProps) => {
  const orbRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={orbRef}
      onClick={onClick}
      className="relative w-52 h-52 rounded-full bg-white/5 backdrop-blur-xl border-2 border-white/20 shadow-[0_0_60px_rgba(0,200,255,0.5)] cursor-pointer transition-transform hover:scale-105 z-50 group"
    >
      {/* Orb inner swirling core */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Lottie
          animationData={swirlAnimation}
          loop
          autoplay
          className="w-28 h-28 opacity-90"
        />
      </div>

      {/* Faint icon fallback */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <Sparkles className="w-10 h-10 text-blue-300 opacity-20 animate-pulse" />
      </div>

      {/* Runes or orbiting glyphs */}
      <div className="absolute w-full h-full rounded-full z-20 pointer-events-none">
        <div className="absolute w-4 h-4 bg-blue-300/50 rounded-full top-1/2 left-0 animate-orbit" />
        <div className="absolute w-3 h-3 bg-purple-300/50 rounded-full top-1/2 right-0 animate-orbit reverse delay-1000" />
        <div className="absolute w-3.5 h-3.5 bg-cyan-300/50 rounded-full bottom-0 left-1/2 animate-orbit" />
      </div>

      {/* Double aura pulse rings */}
      <div className="absolute inset-0 rounded-full border border-blue-400/20 animate-ping" />
      <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping delay-300" />
    </div>
  );
};
