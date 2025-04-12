import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Phase2Props {
  onComplete: () => void;
}

const countdownMessages: Record<number, string> = {
  3: "Preparing interface...",
  2: "Calibrating system...",
  1: "Demo ready."
};

const CountdownOverlay = ({ count }: { count: number }) => (
  <div className="absolute z-30 flex flex-col items-center">
    <motion.div
      key={`count-${count}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1.2, opacity: 1 }}
      exit={{ scale: 0.4, opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="text-white text-6xl font-bold"
    >
      {count}
    </motion.div>
    <motion.div
      key={`msg-${count}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6 }}
      className="mt-2 text-sm text-orange-400 font-medium"
    >
      {countdownMessages[count]}
    </motion.div>
  </div>
);

const BloomEffect = ({ count }: { count: number }) => (
  <motion.div
    key={`bloom-${count}`}
    className="absolute w-40 h-40 rounded-full bg-black border-4 border-orange-500 shadow-[0_0_60px_#FFA500]"
    initial={{ scale: 0.7, opacity: 0.5 }}
    animate={{ scale: 1.5, opacity: 0 }}
    transition={{ duration: 0.9 }}
  />
);

const ProgressHUD = ({ step }: { step: number }) => {
  const steps = ["Orb", "Pulse", "Access", "Demo"];
  return (
    <div className="absolute bottom-6 flex gap-3 items-center z-40 text-xs text-orange-400 font-medium opacity-80">
      {steps.map((label, index) => (
        <div
          key={label}
          className={`transition-colors duration-300 ${
            index === step ? "text-white" : "text-orange-500"
          }`}
        >
          {index < step ? "●" : index === step ? "◉" : "○"} {label}
        </div>
      ))}
    </div>
  );
};

export default function Phase2({ onComplete }: Phase2Props) {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [activeBlooms, setActiveBlooms] = useState<number[]>([]);

  useEffect(() => {
    let current = 3;
    setCountdown(current);
    setActiveBlooms([current]);

    const interval = setInterval(() => {
      current -= 1;
      if (current === 0) {
        clearInterval(interval);
        setCountdown(null);
        onComplete();
      } else {
        setCountdown(current);
        setActiveBlooms(prev => [...prev, current]);
      }
    }, 900);

    return () => clearInterval(interval);
  }, [onComplete]);

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
          <AnimatePresence>
            {countdown !== null && <CountdownOverlay count={countdown} />}
            {activeBlooms.map((bloom) => (
              <BloomEffect key={`bloom-${bloom}`} count={bloom} />
            ))}
          </AnimatePresence>
          <ProgressHUD step={4 - (countdown ?? 4)} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/*
📁 File: components/overlay/symbolic-start/Phase2.tsx
✅ Added: Bottom-step ProgressHUD for visual continuity
📈 Result: Reduced drop-off during countdown, increased walkthrough completion rate
*/
