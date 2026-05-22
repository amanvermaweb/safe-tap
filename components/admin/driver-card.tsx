'use client';

import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Bus } from '@/types';
import { DashboardCard } from '@/components/admin/dashboard-card';
import Link from 'next/link';

type Props = {
  bus: Bus;
};

export const DriverCard: React.FC<Props> = ({ bus }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <DashboardCard
        title={bus.driver}
        description={`Bus ${bus.number} — ${bus.route}`}
        className="h-full"
        bodyClassName="p-5"
      >
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[#131b2e] text-lg font-semibold text-white">
            {bus.number}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#191c1e]">{bus.driver}</p>
            <p className="mt-1 text-xs text-[#45464d] flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              {bus.route}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[1.05rem] bg-white/70 px-3 py-2">
            <p className="text-xs text-[#45464d]">Status</p>
            <p className="mt-1 text-sm font-semibold capitalize text-[#191c1e]">{bus.status}</p>
          </div>
          <div className="rounded-[1.05rem] bg-white/70 px-3 py-2">
            <p className="text-xs text-[#45464d]">Position</p>
            <p className="mt-1 text-sm font-semibold text-[#191c1e]">{bus.position.x},{' '}{bus.position.y}</p>
          </div>
        </div>

        <div className="mt-4">
          <Link href={`tel:+91${bus.phone}`} className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-full bg-[#57dffe] px-3 text-sm font-semibold text-[#001f26] hover:bg-[#7fe6ff] focus:outline-none focus:ring-4 focus:ring-[#57dffe]/35 cursor-pointer transition">
            <Phone className="h-3.5 w-3.5" />
            Contact
          </Link>
        </div>
      </DashboardCard>
    </motion.div>
  );
};
