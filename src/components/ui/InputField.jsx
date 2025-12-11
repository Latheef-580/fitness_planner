import React from 'react';
import clsx from 'clsx';

export function InputField({
  label,
  id,
  type = 'text',
  helperText,
  error,
  className,
  ...props
}) {
  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={clsx(
          'w-full rounded-xl border bg-white/70 dark:bg-slateDark-800/80 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 shadow-sm outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500 placeholder:text-slate-400 dark:placeholder:text-slate-500',
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
            : 'border-slate-200/80 dark:border-slate-700'
        )}
        {...props}
      />
      {(helperText || error) && (
        <p
          className={clsx(
            'text-xs',
            error ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({
  label,
  id,
  helperText,
  error,
  className,
  rows = 4,
  ...props
}) {
  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={clsx(
          'w-full rounded-xl border bg-white/70 dark:bg-slateDark-800/80 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 shadow-sm outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-y',
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
            : 'border-slate-200/80 dark:border-slate-700'
        )}
        {...props}
      />
      {(helperText || error) && (
        <p
          className={clsx(
            'text-xs',
            error ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
