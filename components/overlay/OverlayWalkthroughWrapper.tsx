// Wrapper for symbolic start and walkthrough overlay
'use client';

import SymbolicStartFlow from './SymbolicStartFlow';

type WrapperProps = {
  children: React.ReactNode;
};

export const OverlayWalkthroughWrapper = ({ children }: WrapperProps) => {
  return (
    <>
      <SymbolicStartFlow />
      {children}
    </>
  );
};
