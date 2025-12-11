import React from 'react';
import clsx from 'clsx';

const baseStyles =
  'inline-flex items-center justify-center rounded-xl border border-transparent px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variants = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md',
  secondary:
    'bg-slate-900/5 text-slate-900 hover:bg-slate-900/10 dark:bg-slate-50/5 dark:text-slate-50 dark:hover:bg-slate-50/10 border-slate-200/60 dark:border-slate-700',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-slate-50/5',
  danger:
    'bg-rose-600 text-white hover:bg-rose-700 shadow-sm hover:shadow-md',
};

export function Button({ variant = 'primary', className, children, ...props }) {
  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
