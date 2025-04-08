// File: components/overlay/OverlayWalkthroughWrapper.tsx
// Purpose: Client-only wrapper to render dynamic OverlayWalkthrough with suspense

'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const OverlayWalkthrough = dynamic(() =>
  import('./OverlayWalkthrough').then((mod) => mod.OverlayWalkthrough),
  { ssr: false }
);

export const OverlayWalkthroughWrapper = () => (
  <Suspense fallback={null}>
    <OverlayWalkthrough />
  </Suspense>
);
