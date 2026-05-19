'use client';

import React from 'react';

type DashboardCardProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function DashboardCard({
  title,
  description,
  action,
  children,
  className = '',
  bodyClassName = '',
}: DashboardCardProps) {
  return (
    <section
      className={`overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)] ${className}`}
    >
      {(title || description || action) && (
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:px-7">
          <div className="min-w-0">
            {title && <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-slate-900">{title}</h2>}
            {description && <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>}
          </div>
          {action && <div className="flex-none">{action}</div>}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
