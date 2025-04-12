import { motion } from "framer-motion";

interface Phase4TooltipProps {
  text: string;
  subtext?: string;
  icon?: React.ReactNode;
}

export default function Phase4Tooltip({ text, subtext, icon }: Phase4TooltipProps) {
  return (
    <div className="relative w-fit max-w-xs px-6 py-4 text-black bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Subtle watermark glyph in background */}
      <motion.div
        className="absolute -top-8 -right-8 w-24 h-24 opacity-5 pointer-events-none"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full"
             style={{
               background: "radial-gradient(circle, #FFA500 0%, transparent 60%)",
               boxShadow: "0 0 20px #FFA500",
             }}
        />
      </motion.div>

      {/* Tooltip content */}
      <div className="relative z-10 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-base font-semibold">
          {icon && <span className="text-xl">{icon}</span>}
          <span>{text}</span>
        </div>
        {subtext && <div className="text-xs opacity-60">{subtext}</div>}
      </div>
    </div>
  );
}

/*
📁 File: components/overlay/symbolic-start/Phase4.tsx
🧠 Persistent Memory Anchors:
- Watermark glyph spins subtly in tooltip bg
- Orbit-style visuals reused across experience
- Orange aura = brand recall thread
📌 Use this in walkthrough step overlays, onboarding, emails
*/
