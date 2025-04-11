// Wrapper for symbolic start and walkthrough overlay
'use client';

import { useState } from 'react';
import { SymbolicStart } from './SymbolicStart';
import { OverlayWalkthrough } from './OverlayWalkthrough';

type WrapperProps = {
  children: React.ReactNode;
};

export const OverlayWalkthroughWrapper = ({ children }: WrapperProps) => {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started && <SymbolicStart onStart={() => setStarted(true)} />}
      {started && <OverlayWalkthrough />}
      {children}
    </>
  );
};
