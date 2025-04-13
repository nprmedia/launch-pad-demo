// File: components/ui/Button.tsx
// Purpose: Fully styled, accessible, intent-based Button component for UI consistency

import Link from 'next/link';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
  };

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      intent: {
        primary:
          'bg-orange-500 text-white hover:bg-black hover:text-white focus:ring-brand',
        secondary:
          'bg-white text-black border border-black hover:bg-transparent hover:text-black hover:border-transparent',
        ghost:
          'bg-transparent hover:bg-black text-white hover:text-white ',
      },
      size: {
        default: 'h-10 px-6',
        sm: 'h-9 px-4',
        lg: 'h-12 px-8 text-base',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'default',
    },
  }
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ intent, size, className, children, href, ...props }, ref) => {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ intent, size }), className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ intent, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
