import React from 'react';
import clsx from 'clsx';

export function Skeleton({ className }) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-xl bg-slate-200/70 dark:bg-slate-700/70',
        className
      )}
    />
  );
}

export function ListSkeleton({ items = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, idx) => (
        <Skeleton key={idx} className="h-24 w-full" />
      ))}
    </div>
  );
}

export function Spinner({ className }) {
  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
    </div>
  );
}
