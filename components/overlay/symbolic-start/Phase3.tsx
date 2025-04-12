import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Phase3Props {
  onComplete: () => void;
}

export default function Phase3({ onComplete }: Phase3Props) {
  const [showArtifact, setShowArtifact] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowArtifact(true), 1800);
    const t2 = setTimeout(() => onComplete(), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* BACKGROUND FLASH + RIPPLE */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-orange-900 to-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      />

      {/* PLANETARY LINEAR IMPLOSION */}
      <motion.div
        className="z-20 w-40 h-40 rounded-full border-4 border-orange-500 bg-black shadow-[0_0_80px_#FFA500]"
        initial={{ scaleX: 1, scaleY: 1, opacity: 1 }}
        animate={{ scaleX: 0.05, scaleY: 1.3, opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* RING FLASH BURST */}
      <motion.div
        className="absolute z-10 w-60 h-60 rounded-full border-2 border-orange-400"
        initial={{ scale: 0.4, opacity: 0.8 }}
        animate={{ scale: 2.4, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* ORB GLOW TRAIL */}
      <motion.div
        className="absolute z-10 w-44 h-44 rounded-full bg-orange-500/10 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
      />

      {/* TOOLTIP INTRO */}
      <motion.div
        className="absolute z-30 px-6 py-4 text-sm font-semibold text-black bg-white rounded-xl shadow-xl"
        initial={{ scale: 0, opacity: 0, y: 0 }}
        animate={{ scale: 1, opacity: 1, y: -120 }}
        transition={{ delay: 2.0, duration: 0.9, ease: "anticipate" }}
      >
        <span className="block">🔓 Demo Access Unlocked</span>
        <span className="block text-xs opacity-60">Your system walkthrough begins now.</span>
      </motion.div>

      {/* SYSTEM ARTIFACT CONFIRMATION */}
      {showArtifact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-8 px-5 py-3 rounded-xl border border-orange-500 text-orange-400 text-sm font-semibold shadow-orange-glow backdrop-blur z-40"
        >
          System Access Granted: Demo Framework Online
          <div className="mt-1 text-xs opacity-70">Press → or scroll down to begin.</div>
        </motion.div>
      )}
    </div>
  );
}

/*
📁 File: components/overlay/symbolic-start/Phase3.tsx
🚀 Upgraded: Cinematic planetary-style horizontal implosion with ease-in gravity
✨ Now includes glow trail remnant + synced tooltip delay
🧠 Added next-step cue for smoother walkthrough transition
*/
