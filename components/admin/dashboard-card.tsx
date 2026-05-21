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
      className={`overflow-hidden rounded-4xl glass-panel ${className}`}
    >
      {(title || description || action) && (
        <header className="flex items-start justify-between gap-4 border-b border-[#e0e3e5]/80 px-6 py-5 sm:px-7">
          <div className="min-w-0">
            {title && <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-[#191c1e]">{title}</h2>}
            {description && <p className="mt-1 text-sm leading-6 text-[#45464d]">{description}</p>}
          </div>
          {action && <div className="flex-none">{action}</div>}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
