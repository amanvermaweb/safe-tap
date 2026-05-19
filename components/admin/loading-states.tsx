'use client';

const shimmer = 'animate-pulse rounded-2xl bg-slate-200/80';

export function StatCardSkeleton() {
  return <div className={`h-29.5 ${shimmer}`} aria-hidden="true" />;
}

export function PanelSkeleton({ className = '' }: { className?: string }) {
  return <div className={`min-h-90 ${shimmer} ${className}`} aria-hidden="true" />;
}

export function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
      <div className="border-b border-slate-100 px-6 py-5 sm:px-7">
        <div className="h-5 w-40 rounded-full bg-slate-200/80 animate-pulse" />
        <div className="mt-3 h-4 w-56 rounded-full bg-slate-200/70 animate-pulse" />
        <div className="mt-5 h-10 rounded-2xl bg-slate-100 animate-pulse" />
      </div>
      <div className="divide-y divide-slate-100 p-6 sm:p-7">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 py-4">
            <div className="h-8 w-8 rounded-full bg-slate-200/80 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-36 rounded-full bg-slate-200/80 animate-pulse" />
              <div className="h-3 w-24 rounded-full bg-slate-200/70 animate-pulse" />
            </div>
            <div className="h-4 w-20 rounded-full bg-slate-200/80 animate-pulse" />
            <div className="h-7 w-20 rounded-full bg-slate-200/80 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
