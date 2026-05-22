"use client";

import dynamic from "next/dynamic";

import { LiveIndicator } from "@/components/parents/live-indicator";
import { Skeleton } from "@/components/ui/skeleton";
import type { MapStop } from "@/types/parent";

const LiveRouteMap = dynamic(
  () => import("@/components/parents/live-route-map").then((mod) => mod.LiveRouteMap),
  {
    ssr: false,
    loading: () => <div className="h-[28rem] w-full rounded-3xl bg-white/60 sm:h-[32rem] lg:h-[34rem]" />,
  }
);

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
      <section className="glass-panel rounded-4xl p-4 sm:p-5 lg:p-6">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="mt-4 h-[28rem] w-full rounded-3xl sm:h-[32rem] lg:h-[34rem]" />
      </section>
    );
  }

  return (
    <section className="glass-panel rounded-4xl p-4 sm:p-5 lg:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#191c1e]">Live Map</h2>
          <p className="text-sm text-[#45464d]">{routeLabel}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6a7078]">{lastUpdated}</span>
          <LiveIndicator />
        </div>
      </div>

      <LiveRouteMap stops={stops} routeLabel={routeLabel} />
    </section>
  );
}
