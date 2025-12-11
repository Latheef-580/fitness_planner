import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-panel max-w-md rounded-3xl px-6 py-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">
          404
        </p>
        <h1 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="mt-5 flex justify-center">
          <Link to="/">
            <Button>Back to dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
