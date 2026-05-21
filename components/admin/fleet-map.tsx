'use client';

import React from 'react';
import Link from 'next/link';
import { Bus, Maximize2, MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';
import { buses } from '@/lib/data';
import { DashboardCard } from '@/components/admin/dashboard-card';

export const FleetMap: React.FC = () => {
  return (
    <DashboardCard
      title="Live Fleet Map"
      description="Real-time bus locations across the campus network"
      action={
        <Link
          href="/admin/tracking"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-[#e0e3e5] bg-white/70 px-3.5 text-xs font-semibold text-[#45464d] transition-colors hover:bg-white hover:text-[#191c1e]"
          aria-label="Open live tracking page"
        >
          <Maximize2 className="h-4 w-4" />
          Expand View
        </Link>
      }
      className="flex h-full flex-col"
      bodyClassName="flex flex-1 flex-col"
    >
      <div className="relative min-h-82.5 flex-1 overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(236,238,240,0.92))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(87,223,254,0.16),rgba(255,255,255,0.14)_38%,rgba(198,198,205,0.08)_70%,rgba(15,23,42,0.08)_100%)]" />
        <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(148,163,184,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.45)_1px,transparent_1px)]" />

        <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M31 24h10v42H31z" fill="#e0e3e5" opacity="0.65" />
          <path d="M41 28c6-2 10 1 11 8-4 10-9 20-16 27h-7V31c4-2 8-3 12-3Z" fill="#ffffff" opacity="0.85" />
          <path d="M50 16c8 2 14 7 17 16-1 14-7 25-18 34-10-4-16-11-18-21 1-12 8-22 19-29Z" fill="#57dffe" opacity="0.18" />
          <path d="M44 16h10v46H44z" fill="#ffffff" opacity="0.8" filter="url(#softShadow)" />

          <path d="M16 48h68" stroke="#76777d" strokeOpacity="0.23" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20 31h59" stroke="#76777d" strokeOpacity="0.18" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M28 67h44" stroke="#76777d" strokeOpacity="0.18" strokeWidth="1.2" strokeLinecap="round" />
        </svg>

        <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative grid h-16 w-16 place-items-center rounded-full bg-white/60 ring-1 ring-white/70 backdrop-blur-sm">
            <MapPinned className="h-7 w-7 text-[#00687a]" />
            <div className="absolute inset-4.5 rounded-full border border-[#57dffe]/40 animate-pulse" />
          </div>
        </div>

        {buses.map((bus, index) => {
          const isActive = bus.status === 'active';
          const isDelayed = bus.status === 'delayed';

          return (
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, scale: 0.9, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{ left: `${bus.position.x}%`, top: `${bus.position.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              {isActive && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-full border border-sky-400/50"
                  animate={{ scale: [1, 1.55], opacity: [0.8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                />
              )}

              <div className="group flex items-center gap-2">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-[1.1rem] text-white shadow-[0_14px_24px_rgba(15,23,42,0.12)] transition-transform duration-300 group-hover:-translate-y-0.5 ${
                    isActive ? 'bg-[#00687a]' : isDelayed ? 'bg-[#ba1a1a]' : 'bg-[#565e74]'
                  }`}
                  aria-label={`Bus ${bus.number} ${bus.route}`}
                >
                  <Bus className="h-5 w-5" />
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.02em] text-white shadow-[0_10px_18px_rgba(15,23,42,0.12)] ${
                    isActive ? 'bg-[#006172]' : isDelayed ? 'bg-[#ba1a1a]' : 'bg-[#565e74]'
                  }`}
                >
                  Bus {bus.number}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-5 border-t border-[#e0e3e5]/80 px-6 py-4 text-xs text-[#45464d] sm:px-7">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#00687a]" /> Active
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ba1a1a]" /> Delayed
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#565e74]" /> Inactive
        </div>
        
      </div>
    </DashboardCard>
  );
};
