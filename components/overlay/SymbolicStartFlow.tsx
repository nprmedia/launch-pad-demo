import { useState } from "react";
import Phase1 from "./symbolic-start/Phase1";
import Phase2 from "./symbolic-start/Phase2";
import Phase3 from "./symbolic-start/Phase3";
import WalkthroughOverlay from "./OverlayWalkthrough";

export default function SymbolicStartFlow() {
  const [phase, setPhase] = useState<"phase1" | "phase2" | "phase3" | "walkthrough">("phase1");

  return (
    <>
      {phase === "phase1" && <Phase1 onBegin={() => setPhase("phase2")} />}
      {phase === "phase2" && <Phase2 onComplete={() => setPhase("phase3")} />}
      {phase === "phase3" && <Phase3 onComplete={() => setPhase("walkthrough")} />}
      {phase === "walkthrough" && <WalkthroughOverlay />}
    </>
  );
}

/*
📁 File: components/overlay/SymbolicStartFlow.tsx
📡 Controls all Symbolic Start phases in sequence:
- Phase1 → orb awaits initiation
- Phase2 → bloom and glyphs swirl
- Phase3 → transformation burst & tooltip intro
- Walkthrough → full demo experience (uses Phase4 tooltips)
*/
