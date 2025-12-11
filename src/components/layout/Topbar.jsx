import React from 'react';
import { FiMoon, FiSun, FiMenu } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

export function Topbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="glass-panel sticky top-0 z-20 flex h-16 items-center justify-between gap-3 px-4 shadow-sm lg:px-6">
      <div className="flex items-center gap-3">
        <button
          className="inline-flex items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-900/5 lg:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <FiMenu className="h-5 w-5" />
        </button>
        <div className="hidden flex-col lg:flex">
          <span className="text-xs font-medium uppercase tracking-widest text-primary-500">
            Dashboard
          </span>
          <span className="text-sm text-muted">
            Stay consistent with your fitness habits
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/60 text-slate-500 hover:bg-slate-900/5 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-50/5"
          aria-label="Toggle dark mode"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <FiSun className="h-4 w-4" />
          ) : (
            <FiMoon className="h-4 w-4" />
          )}
        </button>
        <div className="flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:bg-slate-50/5 dark:text-slate-200">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-primary-500 to-blue-400 text-xs font-semibold text-white">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="truncate max-w-[120px]">
              {user?.name || 'Guest User'}
            </span>
            {user?.email && (
              <span className="text-[10px] text-soft truncate max-w-[120px]">
                {user.email}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
