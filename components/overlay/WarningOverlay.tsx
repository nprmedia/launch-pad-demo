// File: components/overlay/WarningOverlay.tsx

'use client';

import React from 'react';

interface WarningOverlayProps {
  onAcknowledge: () => void;
}

export const WarningOverlay = ({ onAcknowledge }: WarningOverlayProps) => {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center backdrop-blur-sm pointer-events-auto">
      <div className="bg-white px-6 py-6 rounded-xl shadow-2xl border border-amber-200 text-center max-w-md animate-fade-in">
        <p className="text-4xl font-extrabold text-red-600 uppercase tracking-widest mb-2">Warning</p>
        <h2 className="text-l font-bold text-gray-900 leading-tight">This site is optimized to convert</h2>
        <p className="text-2xl font-extrabold text-amber-500 mt-2">50% more visitors</p>
        <p className="text-xs text-gray-500 mt-2 mb-4">than the average consultant or coaching site.</p>
        <button
          onClick={onAcknowledge}
          className="mt-2 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WarningOverlay;
