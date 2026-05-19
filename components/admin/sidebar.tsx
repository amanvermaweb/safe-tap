'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  MapPin,
  Users,
  BarChart3,
  Navigation,
  UserRound,
  Bell,
  Settings,
  TrendingUp,
  Menu,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: MapPin, label: 'Live Tracking', href: '/admin/tracking' },
  { icon: Users, label: 'Students', href: '/admin/students' },
  { icon: BarChart3, label: 'Attendance', href: '/admin/attendance' },
  { icon: Navigation, label: 'Routes', href: '/admin/routes' },
  { icon: UserRound, label: 'Drivers', href: '/admin/drivers' },
  { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
  { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onOpenChange }) => {
  const pathname = usePathname();
  const isCollapsed = !open;

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-[0_12px_28px_rgba(15,23,42,0.04)] transition-transform duration-300 ease-out lg:shadow-none ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-[16.5rem] lg:w-auto`}
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-5">
          <div className={`flex min-w-0 items-center gap-3 ${isCollapsed ? 'lg:justify-center' : ''}`}>
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-600 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(14,165,233,0.28)]">
              G
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-[15px] font-semibold leading-5 tracking-[-0.02em] text-slate-900">Guardian Bus</p>
                <p className="text-xs leading-5 text-slate-500">Admin Command Center</p>
              </div>
            )}
          </div>
          <button
            onClick={() => onOpenChange(!open)}
            className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                title={isCollapsed ? item.label : undefined}
                className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-medium leading-none transition-all duration-200 ease-out ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 shadow-[0_8px_18px_rgba(14,165,233,0.08)]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                } ${isCollapsed ? 'lg:justify-center' : ''}`}
              >
                <Icon className="h-5 w-5 flex-none" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200/80 p-4">
          <div className={`flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3 ${isCollapsed ? 'lg:justify-center' : ''}`}>
            <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
              SJ
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-5 text-slate-900">Sarah Jenkins</p>
                <p className="truncate text-xs leading-5 text-slate-500">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {open && <button aria-label="Close sidebar overlay" className="fixed inset-0 z-30 bg-slate-950/25 lg:hidden" onClick={() => onOpenChange(false)} />}
    </>
  );
};
