'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: 'blue' | 'purple' | 'green' | 'red' | 'teal';
  delay?: number;
}

const colorClasses = {
  blue: 'bg-sky-50 text-sky-600 ring-sky-100',
  purple: 'bg-violet-50 text-violet-600 ring-violet-100',
  green: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
  red: 'bg-rose-50 text-rose-600 ring-rose-100',
  teal: 'bg-cyan-50 text-cyan-600 ring-cyan-100',
};

export const StatCard: React.FC<CardProps> = ({
  title,
  value,
  icon,
  color = 'blue',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-[28px] border border-slate-200/80 bg-white px-5 py-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)] transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(15,23,42,0.07)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[13px] font-medium tracking-[-0.01em] text-slate-500">{title}</p>
          <p className="mt-3 text-[30px] font-semibold tracking-[-0.05em] text-slate-950">{value}</p>
        </div>
        <div className={cn('grid h-12 w-12 place-items-center rounded-2xl ring-1', colorClasses[color])}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};
