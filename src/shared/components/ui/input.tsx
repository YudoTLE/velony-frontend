import { cn } from '@shared/lib/utils';
import * as React from 'react';

function Input({
  className,
  type,
  variant = 'default',
  ...props
}: React.ComponentProps<'input'> & { variant?: 'default' | 'underline' }) {
  const base = cn(
    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  );

  const defaultVariant = cn(
    'border-input rounded-md border bg-transparent px-3 py-1 shadow-xs',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  );

  const underlineVariant = cn(
    'border-0 border-b border-input bg-transparent rounded-none px-0 py-1 shadow-none',
    'focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visible:border-ring',
    'dark:border-input/50',
  );

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        base,
        variant === 'underline' ? underlineVariant : defaultVariant,
        className,
      )}
      {...props}
    />
  );
}

export { Input };
