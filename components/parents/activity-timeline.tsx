"use client";

import { BusFront, CircleDashed, ScanLine } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ActivityItem } from "@/types/parent";

interface ActivityTimelineProps {
  activity: ActivityItem[];
  loading?: boolean;
}

const iconByType = {
  boarded: BusFront,
  waiting: CircleDashed,
  scan: ScanLine,
};

export function ActivityTimeline({ activity, loading = false }: ActivityTimelineProps) {
  if (loading) {
    return (
      <section className="glass-panel rounded-4xl p-4">
        <Skeleton className="h-4 w-28" />
        <div className="mt-4 space-y-3">
          <Skeleton className="h-14 w-full rounded-2xl" />
          <Skeleton className="h-14 w-full rounded-2xl" />
          <Skeleton className="h-14 w-full rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section className="glass-panel rounded-4xl p-4">
      <h2 className="text-sm font-medium text-[#45464d]">Activity Timeline</h2>

      <ol className="mt-4 space-y-4">
        {activity.map((item, index) => {
          const Icon = iconByType[item.type];
          const isLast = index === activity.length - 1;

          return (
            <li key={item.id} className="relative grid grid-cols-[28px_1fr] gap-3">
              <div className="relative flex items-start justify-center">
                {!isLast ? <span className="absolute top-7 h-[calc(100%+12px)] w-px bg-slate-200" /> : null}
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border text-[#45464d]",
                    item.type === "boarded"
                      ? "border-[#c3ece6] bg-[#e5f7f4] text-[#005048]"
                      : item.type === "scan"
                        ? "border-[#b8efff] bg-[#def8ff] text-[#006172]"
                        : "border-[#e0e3e5] bg-white/70"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="min-w-0 pb-1">
                <p className="text-sm font-medium text-[#191c1e]">{item.title}</p>
                <p className="mt-1 text-sm text-[#45464d]">{item.location}</p>
                <p className="mt-1 text-xs text-[#6a7078]">{item.timestamp}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
