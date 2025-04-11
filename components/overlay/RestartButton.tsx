// File: components/overlay/RestartButton.tsx

'use client';

import { RotateCw } from 'lucide-react';

type RestartButtonProps = {
  onRestart: () => void;
};

export const RestartButton = ({ onRestart }: RestartButtonProps) => {
  return (
    <button
      className="fixed bottom-6 left-6 z-[9999] bg-white/80 hover:bg-white/90 text-xs text-black px-4 py-2 rounded-full flex items-center gap-1 shadow-lg border border-gray-300"
      onClick={onRestart}
    >
      <RotateCw size={14} /> Restart
    </button>
  );
};

export default RestartButton;
