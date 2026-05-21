'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  MapPin,
  Users,
  BarChart3,
  UserRound,
} from 'lucide-react';
import { teacherProfile } from '@/lib/teacher-data';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: MapPin, label: 'Live Tracking', href: '/admin/tracking' },
  { icon: Users, label: 'Students', href: '/admin/students' },
  { icon: BarChart3, label: 'Attendance', href: '/admin/attendance' },
  { icon: UserRound, label: 'Drivers', href: '/admin/drivers' },
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
        className={`glass-sidebar fixed inset-y-0 left-0 z-40 flex w-64 flex-col transition-transform duration-300 ease-out lg:shadow-none ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-66 lg:w-auto`}
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-between border-b border-[#e0e3e5] px-4 py-5">
          <div className={`flex min-w-0 items-center gap-3 ${isCollapsed ? 'lg:justify-center' : ''}`}>
            <div className="grid h-10 w-10 place-items-center rounded-[1.1rem] bg-[#00687a] text-sm font-semibold text-white shadow-[0_18px_28px_rgba(0,104,122,0.22)]">
              G
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-[15px] font-semibold leading-5 tracking-[-0.02em] text-[#191c1e]">SafeTAP</p>
                <p className="text-xs leading-5 text-[#45464d]">Admin Command Center</p>
              </div>
            )}
          </div>
          <button
            onClick={() => onOpenChange(!open)}
            className="grid h-10 w-10 place-items-center rounded-full text-[#45464d] transition-colors hover:bg-[#eceef0] hover:text-[#191c1e]"
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
                    ? 'bg-[#57dffe] text-[#001f26] shadow-[0_12px_24px_rgba(0,104,122,0.12)]'
                    : 'text-[#45464d] hover:bg-white/70 hover:text-[#191c1e]'
                } ${isCollapsed ? 'lg:justify-center' : ''}`}
              >
                <Icon className="h-5 w-5 flex-none" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#e0e3e5] p-4">
          <div className={`flex items-center gap-3 rounded-3xl bg-white/70 px-3 py-3 ${isCollapsed ? 'lg:justify-center' : ''}`}>
            <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#00201c] text-sm font-semibold text-white">
              {teacherProfile.avatar}
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-5 text-[#191c1e]">{teacherProfile.name}</p>
                <p className="truncate text-xs leading-5 text-[#45464d]">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {open && <button aria-label="Close sidebar overlay" className="fixed inset-0 z-30 bg-[#191c1e]/25 backdrop-blur-[2px] lg:hidden" onClick={() => onOpenChange(false)} />}
    </>
  );
};
