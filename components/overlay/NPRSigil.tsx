// File: components/overlay/NPRSigil.tsx

'use client';

import React from 'react';
import clsx from 'clsx';

interface NPRSigilProps {
  className?: string;
}

export const NPRSigil = ({ className }: NPRSigilProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={clsx('drop-shadow-[0_0_8px_rgba(0,200,255,0.6)]', className)}
    >
      {/* Core concentric rings */}
      <circle cx="50" cy="50" r="8" className="opacity-70" />
      <circle cx="50" cy="50" r="16" className="opacity-30" />
      <circle cx="50" cy="50" r="24" className="opacity-20" />

      {/* Glowing triangular runes */}
      <path d="M50 30 L55 40 L45 40 Z" className="fill-current text-blue-400" />
      <path d="M70 50 L60 55 L60 45 Z" className="fill-current text-purple-400" />
      <path d="M50 70 L45 60 L55 60 Z" className="fill-current text-cyan-400" />
      <path d="M30 50 L40 45 L40 55 Z" className="fill-current text-indigo-400" />

      {/* Central spark glyph */}
      <g className="animate-pulse-slow">
        <path
          d="M50 45 L52 50 L50 55 L48 50 Z"
          className="fill-current text-white"
        />
      </g>

      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
        }
      `}</style>
    </svg>
  );
};

export default NPRSigil;
