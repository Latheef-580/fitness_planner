import React from 'react';
import clsx from 'clsx';
import { FiActivity } from 'react-icons/fi';

const SIZE_MAP = {
  sm: {
    icon: 'h-10 w-10',
    glyph: 'h-[18px] w-[18px]',
    text: 'text-lg',
  },
  md: {
    icon: 'h-12 w-12',
    glyph: 'h-[22px] w-[22px]',
    text: 'text-xl',
  },
  lg: {
    icon: 'h-14 w-14',
    glyph: 'h-[26px] w-[26px]',
    text: 'text-2xl',
  },
};

export function BrandMark({
  title = 'Fitness Planner',
  subtitle,
  orientation = 'horizontal',
  size = 'md',
  className,
}) {
  const { icon, glyph, text } = SIZE_MAP[size] || SIZE_MAP.md;
  const words = title.trim().split(' ');
  const primary = words.shift();
  const accent = words.join(' ');

  return (
    <div
      className={clsx(
        'inline-flex gap-3 text-slate-900 dark:text-slate-50',
        orientation === 'vertical'
          ? 'flex-col items-start'
          : 'flex-row items-center',
        className
      )}
    >
      <div className="relative">
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-400/40 via-primary-500/25 to-cyan-400/30 blur-[8px]"
          aria-hidden="true"
        />
        <div
          className={clsx(
            'relative flex items-center justify-center rounded-2xl border border-white/40 bg-slate-900/80 text-primary-100 shadow-lg shadow-primary-900/30 dark:border-slate-700/60 dark:bg-slate-900/70',
            icon
          )}
        >
          <FiActivity className={clsx('text-primary-100', glyph)} />
        </div>
      </div>
      <div className="min-w-0 leading-tight">
        <p
          className={clsx(
            'font-extrabold tracking-tight text-slate-900 dark:text-slate-50',
            text
          )}
        >
          <span className="whitespace-nowrap">{primary}</span>
          {accent && (
            <span className="ml-2 bg-gradient-to-r from-primary-600 via-primary-500 to-cyan-400 bg-clip-text text-transparent">
              {accent}
            </span>
          )}
        </p>
        {subtitle && (
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.3em] text-soft">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default BrandMark;

