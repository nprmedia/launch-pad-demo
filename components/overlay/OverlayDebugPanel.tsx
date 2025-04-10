// File: components/overlay/OverlayDebugPanel.tsx
'use client';

import React from 'react';

type Props = {
  stepId: string;
  tooltipTop: number;
  tooltipLeft: number;
  elementFound: boolean;
  elementVisible: boolean;
  elementRect: DOMRect | null;
  currentScrollY: number;
  windowHeight: number;
  retries: number;
  timestamp: string;
};

export const OverlayDebugPanel = ({
  stepId,
  tooltipTop,
  tooltipLeft,
  elementFound,
  elementVisible,
  elementRect,
  currentScrollY,
  windowHeight,
  retries,
  timestamp,
}: Props) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white text-black p-4 rounded-xl shadow-lg text-xs z-[9999] w-72 space-y-1 font-mono">
      <div className="font-bold text-sm">[Overlay Debug Panel]</div>
      <div>Step ID: <span className="text-blue-600">{stepId}</span></div>
      <div>Retries: {retries}</div>
      <div>Timestamp: {timestamp}</div>

      <div className="pt-2 border-t border-gray-300">
        <div>Element Found: {elementFound ? '✅ Yes' : '❌ No'}</div>
        <div>Element Visible: {elementVisible ? '✅ Yes' : '❌ No'}</div>
        {elementRect && (
          <div className="pl-2">
            <div>Top: {Math.round(elementRect.top)}</div>
            <div>Left: {Math.round(elementRect.left)}</div>
            <div>Width: {Math.round(elementRect.width)}</div>
            <div>Height: {Math.round(elementRect.height)}</div>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-gray-300">
        <div>Tooltip Top: {Math.round(tooltipTop)}px</div>
        <div>Tooltip Left: {Math.round(tooltipLeft)}px</div>
      </div>

      <div className="pt-2 border-t border-gray-300">
        <div>ScrollY: {currentScrollY}px</div>
        <div>Window Height: {windowHeight}px</div>
      </div>
    </div>
  );
};