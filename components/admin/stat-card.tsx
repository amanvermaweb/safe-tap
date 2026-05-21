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
  blue: 'bg-[#131b2e] text-white ring-white/40',
  purple: 'bg-[#565e74] text-white ring-white/40',
  green: 'bg-[#00201c] text-white ring-white/40',
  red: 'bg-[#ba1a1a] text-white ring-white/30',
  teal: 'bg-[#57dffe] text-[#001f26] ring-white/40',
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
      className="group glass-panel rounded-4xl px-5 py-5 transition-transform duration-300 ease-out shadow-[0_24px_40px_rgba(15,23,42,0.11)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[13px] font-medium tracking-[-0.01em] text-[#45464d]">{title}</p>
          <p className="mt-3 text-[30px] font-semibold tracking-tighter text-[#191c1e]">{value}</p>
        </div>
        <div className={cn('grid h-12 w-12 place-items-center rounded-[1.15rem] ring-1 shadow-[0_12px_24px_rgba(15,23,42,0.09)]', colorClasses[color])}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};
