"use client";

import { motion } from "framer-motion";
import { BusFront, MapPin } from "lucide-react";

import { LiveIndicator } from "@/components/parents/live-indicator";
import { Skeleton } from "@/components/ui/skeleton";
import type { MapStop } from "@/types/parent";

interface TrackingMapProps {
  stops: MapStop[];
  routeLabel: string;
  lastUpdated: string;
  loading?: boolean;
}

const routePath = "M 12 72 C 26 64, 32 51, 46 46 C 58 43, 66 40, 77 35 C 83 31, 89 25, 92 18";

export function TrackingMap({ stops, routeLabel, lastUpdated, loading = false }: TrackingMapProps) {
  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-200/85 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="mt-4 h-[360px] w-full rounded-2xl" />
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200/85 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Live Route</h2>
          <p className="text-sm text-slate-500">{routeLabel}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">{lastUpdated}</span>
          <LiveIndicator />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80">
        <div className="relative aspect-[16/10] w-full">
          <div className="absolute inset-0 opacity-30 [background-size:22px_22px] [background-image:linear-gradient(to_right,#94a3b815_1px,transparent_1px),linear-gradient(to_bottom,#94a3b815_1px,transparent_1px)]" />
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(15,23,42,0.02)_20%,rgba(255,255,255,0.15)_55%,rgba(15,23,42,0.02)_90%)]" />

          <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full">
            <path d={routePath} fill="none" stroke="rgba(148,163,184,0.48)" strokeWidth="3" strokeLinecap="round" />
            <path d={routePath} fill="none" stroke="rgba(13,148,136,0.92)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="0.5 5" />
          </svg>

          {stops.map((stop) => (
            <div key={stop.id} className="absolute -translate-x-1/2 -translate-y-1/2 text-sm" style={{ left: `${stop.x}%`, top: `${stop.y}%` }}>
              <div className="relative flex items-center gap-2">
                <span className="absolute -inset-2 rounded-full bg-white/75 blur-sm" />
                <MapPin className="relative h-4 w-4 text-slate-500" />
                <span className="whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-slate-500 shadow-sm">{stop.label}</span>
              </div>
            </div>
          ))}

          <motion.div
            className="absolute"
            animate={{
              left: ["30%", "44%", "58%", "72%"],
              top: ["52%", "49%", "45%", "36%"],
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <motion.span
                className="absolute inset-0 rounded-full bg-teal-400/25"
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-teal-100 bg-white text-teal-600 shadow-md">
                <BusFront className="h-5 w-5" />
              </span>
              <span className="absolute left-12 top-1 whitespace-nowrap rounded-full bg-teal-600 px-2.5 py-1 text-[11px] font-medium text-white">Bus B12</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
