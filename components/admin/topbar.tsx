'use client';

import React from 'react';
import { Bell, Menu, RefreshCcw, Settings, CircleUserRound } from 'lucide-react';

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-[28px] font-semibold tracking-[-0.04em] text-slate-900 sm:text-[30px]">Overview</h1>
            <p className="text-sm leading-5 text-slate-500">Guardian Bus Admin Command Center</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 sm:inline-flex"
            aria-label="Refresh dashboard"
          >
            <RefreshCcw className="h-4.5 w-4.5" />
          </button>

          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
            aria-label="Settings"
          >
            <Settings className="h-4.5 w-4.5" />
          </button>

          <div className="ml-2 hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">
            <div className="text-right">
              <p className="text-sm font-semibold leading-5 text-slate-900">Sarah Jenkins</p>
              <p className="text-xs leading-5 text-slate-500">Administrator</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-[0_10px_24px_rgba(168,85,247,0.18)]">
              <CircleUserRound className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
