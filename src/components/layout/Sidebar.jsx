import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiActivity, FiHome, FiList, FiSettings, FiUser, FiLogOut } from 'react-icons/fi';
import clsx from 'clsx';
import { useAuth } from '../../hooks/useAuth';
import { BrandMark } from '../ui/BrandMark';

const navItems = [
  { to: '/', label: 'Overview', icon: FiHome },
  { to: '/workouts', label: 'Workouts', icon: FiActivity },
  { to: '/meals', label: 'Meals', icon: FiList },
  { to: '/profile', label: 'Profile', icon: FiUser },
  { to: '/settings', label: 'Settings', icon: FiSettings },
];

export function Sidebar({ mobileOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center px-4">
        <BrandMark orientation="horizontal" />
      </div>
      <nav className="mt-4 flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition',
                  'text-slate-500 hover:text-slate-900 hover:bg-primary-500/10 dark:text-slate-400 dark:hover:text-slate-50',
                  isActive &&
                    'bg-primary-500/15 text-primary-600 dark:text-primary-400'
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t border-slate-200/70 px-3 py-3 dark:border-slate-700/70">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-rose-500 hover:bg-rose-500/10"
        >
          <FiLogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="glass-panel fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200/60 dark:border-slate-800/70 lg:flex">
        {content}
      </aside>

      {/* Mobile */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      >
        <aside
          className={clsx(
            'glass-panel absolute inset-y-0 left-0 z-50 w-64 border-r border-slate-200/60 dark:border-slate-800/70',
            'transition-transform',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </aside>
      </div>
    </>
  );
}
