import React from 'react';
import clsx from 'clsx';

export function PageHeader({ title, description, actions, className }) {
  return (
    <div
      className={clsx(
        'mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <div>
        <h2 className="section-title">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
