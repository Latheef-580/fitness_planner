import React from 'react';
import clsx from 'clsx';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={clsx(
        'glass-panel rounded-2xl p-4 sm:p-5 lg:p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div className={clsx('flex items-center justify-between mb-3', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children }) {
  return (
    <h3
      className={clsx(
        'text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50',
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardSubtitle({ className, children }) {
  return (
    <p
      className={clsx(
        'text-xs sm:text-sm text-muted',
        className
      )}
    >
      {children}
    </p>
  );
}

export function CardContent({ className, children }) {
  return <div className={clsx('mt-3', className)}>{children}</div>;
}
