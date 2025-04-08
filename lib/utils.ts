// File: lib/utils.ts
// Purpose: Utility helpers used across components (e.g., cn for class merging)

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with conditional logic.
 * Ensures class order and overrides work as expected.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smoothly scrolls to a target section by ID.
 * Optional offset if using fixed navbars or overlays.
 */
export function scrollToId(id: string, offset = 0) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * Returns true if running on client (browser).
 */
export const isBrowser = typeof window !== 'undefined';
