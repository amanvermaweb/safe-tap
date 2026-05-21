'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { activeDriver } from '@/lib/data';
import { DashboardCard } from '@/components/admin/dashboard-card';

export const ActiveDriver: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <DashboardCard
        title="Active Driver Focus"
        description="Driver currently assigned to the on-trip vehicle"
        action={
          <div className="flex items-center gap-2">
            
            <Link
              href="/admin/drivers"
              className="inline-flex h-8 items-center rounded-full border border-[#e0e3e5] bg-white/75 px-3 text-xs font-semibold text-[#006172] transition-colors hover:bg-white hover:text-[#005867]"
              aria-label="Open drivers page"
            >
              Open Drivers
            </Link>
          </div>
        }
        className="relative h-full"
        bodyClassName="p-6 sm:p-7"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="grid h-16 w-16 place-items-center rounded-3xl bg-[#131b2e] text-xl font-semibold text-white shadow-[0_16px_30px_rgba(15,23,42,0.18)]">
                {activeDriver.avatar}
              </div>
              <span className="absolute -bottom-1 -right-1 h-4.5 w-4.5 rounded-full border-2 border-white bg-[#009485]" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-[#191c1e]">{activeDriver.name}</h3>
              </div>
              <p className="mt-1 flex items-center gap-2 text-sm leading-6 text-[#45464d]">
                <MapPin className="h-4 w-4 flex-none" />
                {activeDriver.route}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e0e3e5] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(241,245,249,0.88))] px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#006172]">Assigned Vehicle</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-[26px] font-semibold tracking-tighter text-[#191c1e]">{activeDriver.busNumber}</p>
              
            </div>
            <p className="mt-1 text-xs leading-5 text-[#45464d]">Route ETA within target window</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[1.35rem] bg-white/70 px-4 py-3">
              <p className="text-xs font-medium text-[#45464d]">Status</p>
              <p className="mt-1 text-sm font-semibold capitalize tracking-[-0.01em] text-[#191c1e]">{activeDriver.status}</p>
            </div>
            <div className="rounded-[1.35rem] bg-white/70 px-4 py-3">
              <p className="text-xs font-medium text-[#45464d]">Current Stop</p>
              <p className="mt-1 text-sm font-semibold tracking-[-0.01em] text-[#191c1e]">Main Campus</p>
            </div>
          </div>

          <div>
            <button className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#57dffe] px-3 text-sm font-semibold text-[#001f26] transition-colors hover:bg-[#7fe6ff] focus:outline-none focus:ring-4 focus:ring-[#57dffe]/35" aria-label="Call driver">
              <Phone className="h-4 w-4" />
              Call
            </button>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
};
