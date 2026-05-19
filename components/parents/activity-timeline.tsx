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
      <section className="rounded-3xl border border-slate-200/85 bg-white p-4 shadow-sm">
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
    <section className="rounded-3xl border border-slate-200/85 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-medium text-slate-500">Activity Timeline</h2>

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
                    "flex h-7 w-7 items-center justify-center rounded-full border text-slate-500",
                    item.type === "boarded"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                      : item.type === "scan"
                        ? "border-cyan-200 bg-cyan-50 text-cyan-600"
                        : "border-slate-200 bg-slate-50"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="min-w-0 pb-1">
                <p className="text-sm font-medium text-slate-800">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.location}</p>
                <p className="mt-1 text-xs text-slate-400">{item.timestamp}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
