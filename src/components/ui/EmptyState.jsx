import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import clsx from 'clsx';
import Button from './Button';

export function EmptyState({ title, description, ctaLabel, onCta, icon }) {
  const Icon = icon || FiPlusCircle;

  return (
    <div className="glass-panel flex flex-col items-center justify-center rounded-2xl px-6 py-10 text-center">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
        {title}
      </h3>
      {description && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-md">
          {description}
        </p>
      )}
      {ctaLabel && onCta && (
        <div className="mt-4">
          <Button onClick={onCta}>{ctaLabel}</Button>
        </div>
      )}
    </div>
  );
}
