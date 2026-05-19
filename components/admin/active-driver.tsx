'use client';

import React from 'react';
import { Phone, MapPin, Radio } from 'lucide-react';
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
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
            <span className="h-2 w-2 rounded-full bg-sky-500" aria-hidden="true" />
            On Trip
          </span>
        }
        className="relative h-full"
        bodyClassName="p-6 sm:p-7"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="grid h-16 w-16 place-items-center rounded-[22px] bg-gradient-to-br from-slate-800 via-slate-700 to-sky-700 text-xl font-semibold text-white shadow-[0_16px_30px_rgba(15,23,42,0.18)]">
                {activeDriver.avatar}
              </div>
              <span className="absolute -bottom-1 -right-1 h-4.5 w-4.5 rounded-full border-2 border-white bg-emerald-500" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-slate-900">{activeDriver.name}</h3>
              </div>
              <p className="mt-1 flex items-center gap-2 text-sm leading-6 text-slate-500">
                <MapPin className="h-4 w-4 flex-none" />
                {activeDriver.route}
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-sky-100 bg-[linear-gradient(135deg,rgba(239,246,255,0.95),rgba(224,242,254,0.88))] px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">Assigned Vehicle</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-[26px] font-semibold tracking-[-0.05em] text-sky-950">{activeDriver.busNumber}</p>
              <div className="hidden rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-sky-700 ring-1 ring-sky-100 sm:inline-flex">
                98.2% reliability
              </div>
            </div>
            <p className="mt-1 text-xs leading-5 text-sky-700">Route ETA within target window</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium text-slate-500">Status</p>
              <p className="mt-1 text-sm font-semibold capitalize tracking-[-0.01em] text-slate-900">{activeDriver.status}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium text-slate-500">Current Stop</p>
              <p className="mt-1 text-sm font-semibold tracking-[-0.01em] text-slate-900">Main Campus</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-sky-50 px-3 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-100 focus:outline-none focus:ring-4 focus:ring-sky-100" aria-label="Call driver">
              <Phone className="h-4 w-4" />
              Call
            </button>
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-50 px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-100" aria-label="Open radio contact">
              <Radio className="h-4 w-4" />
              Radio
            </button>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
};
