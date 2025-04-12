import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Phase1Props {
  onBegin: () => void;
}

const PlaceholderGlyph = () => (
  <motion.div
    className="absolute w-8 h-8 rounded-full opacity-70"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 0.7, rotate: 360 }}
    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    style={{
      background: "radial-gradient(circle, #FFA500 0%, #000 80%)",
      boxShadow: "0 0 20px #FFA500",
    }}
  />
);

export default function Phase1({ onBegin }: Phase1Props) {
  const orbRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onBegin();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onBegin]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative flex flex-col items-center justify-center w-full h-full"
        >
          {/* Subtle motion background */}
          <div className="absolute inset-0 z-0 animate-pulse opacity-10 bg-gradient-to-br from-orange-500 via-black to-orange-900" />

          {/* Dim particles (placeholder: glowing glyphs) */}
          <div className="absolute w-full h-full overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <PlaceholderGlyph key={i} />
            ))}
          </div>

          {/* Orb Core */}
          <button
            ref={orbRef}
            aria-label="Begin the ritual"
            className={cn(
              "relative z-10 w-32 h-32 rounded-full",
              "bg-black border-4 border-orange-500",
              "shadow-[0_0_40px_#FFA500] hover:scale-105 transition"
            )}
            onClick={onBegin}
          >
            {/* Branded Initials */}
            <span className="absolute inset-0 flex items-center justify-center text-3xl text-orange-500 font-bold opacity-20">
              NPR
            </span>
            <span className="sr-only">Activate Experience</span>
          </button>

          {/* Prompt */}
          <div className="mt-10 text-center text-sm opacity-70">
            Press <kbd>Enter</kbd> or click the orb to begin.
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/*
📁 File: components/overlay/symbolic-start/Phase1.tsx
🔁 Now a pure experience gate component.
🔗 Accepts `onBegin: () => void` to progress flow externally.
📦 Intended to be used inside SymbolicStartFlow.tsx controller.
*/
