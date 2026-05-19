'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Bus, Maximize2, MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';
import { buses } from '@/lib/data';
import { DashboardCard } from '@/components/admin/dashboard-card';

export const FleetMap: React.FC = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((value) => value + 1);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const roadLines = useMemo(
    () => [
      'M12 14 C25 10, 36 10, 48 16',
      'M28 34 C40 27, 56 26, 68 35',
      'M16 58 C30 50, 46 48, 60 54',
      'M42 15 C48 30, 48 44, 42 70',
    ],
    []
  );

  return (
    <DashboardCard
      title="Live Fleet Map"
      description="Real-time bus locations across the campus network"
      action={
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 px-3.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          aria-label="Expand fleet map"
        >
          <Maximize2 className="h-4 w-4" />
          Expand View
        </button>
      }
      className="flex h-full flex-col"
      bodyClassName="flex flex-1 flex-col"
    >
      <div className="relative min-h-[330px] flex-1 overflow-hidden bg-[linear-gradient(180deg,rgba(241,245,249,0.9),rgba(226,232,240,0.88))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.92),rgba(255,255,255,0.15)_38%,rgba(148,163,184,0.12)_70%,rgba(15,23,42,0.15)_100%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(148,163,184,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.5)_1px,transparent_1px)] [background-size:44px_44px]" />

        <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
              <feOffset dx="0" dy="1" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path d="M31 24h10v42H31z" fill="#e2e8f0" opacity="0.65" />
          <path d="M41 28c6-2 10 1 11 8-4 10-9 20-16 27h-7V31c4-2 8-3 12-3Z" fill="#f8fafc" opacity="0.85" />
          <path d="M50 16c8 2 14 7 17 16-1 14-7 25-18 34-10-4-16-11-18-21 1-12 8-22 19-29Z" fill="#dbeafe" opacity="0.22" />
          <path d="M44 16h10v46H44z" fill="#f8fafc" opacity="0.75" filter="url(#softShadow)" />

          {roadLines.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="#94a3b8"
              strokeOpacity="0.35"
              strokeLinecap="round"
              strokeWidth="0.7"
            />
          ))}

          <path d="M16 48h68" stroke="#94a3b8" strokeOpacity="0.23" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20 31h59" stroke="#94a3b8" strokeOpacity="0.18" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M28 67h44" stroke="#94a3b8" strokeOpacity="0.18" strokeWidth="1.2" strokeLinecap="round" />
        </svg>

        <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative grid h-16 w-16 place-items-center rounded-full bg-slate-300/30 ring-1 ring-white/70 backdrop-blur-sm">
            <MapPinned className="h-7 w-7 text-slate-400" />
            <div className="absolute inset-[-18px] rounded-full border border-slate-300/40 animate-pulse" />
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
                  className={`grid h-10 w-10 place-items-center rounded-xl text-white shadow-[0_14px_24px_rgba(15,23,42,0.12)] transition-transform duration-300 group-hover:-translate-y-0.5 ${
                    isActive ? 'bg-sky-600' : isDelayed ? 'bg-rose-600' : 'bg-slate-400'
                  }`}
                  aria-label={`Bus ${bus.number} ${bus.route}`}
                >
                  <Bus className="h-5 w-5" />
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.02em] text-white shadow-[0_10px_18px_rgba(15,23,42,0.12)] ${
                    isActive ? 'bg-sky-700' : isDelayed ? 'bg-rose-600' : 'bg-slate-500'
                  }`}
                >
                  Bus {bus.number}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-5 border-t border-slate-100 px-6 py-4 text-xs text-slate-500 sm:px-7">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-600" /> Active
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-600" /> Delayed
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400" /> Inactive
        </div>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live updates every 2s
        </div>
      </div>
    </DashboardCard>
  );
};
