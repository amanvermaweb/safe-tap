'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventLogs } from '@/lib/data';
import { LogOut, UserCheck, AlertTriangle, Radio, Zap } from 'lucide-react';
import { DashboardCard } from '@/components/admin/dashboard-card';

type EventType = 'boarded' | 'exited' | 'delayed' | 'scan' | 'alert';

const iconMap: Record<EventType, React.ComponentType<{ className?: string }>> = {
  boarded: UserCheck,
  exited: LogOut,
  delayed: AlertTriangle,
  scan: Radio,
  alert: Zap,
};

export const EventLog: React.FC = () => {
  const [displayedLogs, setDisplayedLogs] = useState(eventLogs.slice(0, 6));

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedLogs((prev) => {
        const newLog = {
          id: `new-${Date.now()}`,
          type: 'scan' as const,
          description: 'RFID scan processed at Main Campus',
          timestamp: 'just now',
        };
        return [newLog, ...prev].slice(0, 8);
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardCard
      title="Live Event Log"
      description="Real-time activity feed"
      className="flex h-full flex-col"
      bodyClassName="flex min-h-[590px] flex-1 flex-col"
    >
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {displayedLogs.map((log) => {
            const Icon = iconMap[log.type] || Radio;
            const isAlert = log.type === 'delayed';

            return (
              <motion.div
                key={log.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-[#e0e3e5]/90 px-6 py-4 transition-colors hover:bg-white/65 sm:px-7"
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 grid h-11 w-11 flex-none place-items-center rounded-[1.15rem] ${isAlert ? 'bg-[#ba1a1a] text-white' : 'bg-white/75 text-[#45464d]'}`}>
                    <Icon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium tracking-[-0.01em] ${isAlert ? 'text-[#ba1a1a]' : 'text-[#191c1e]'}`}>
                      {log.description}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#45464d]">{log.timestamp}</p>
                  </div>

                  {isAlert && (
                    <div className="flex-none rounded-full bg-[#ffdad6] px-2.5 py-1 text-[11px] font-semibold tracking-[0.02em] text-[#93000a] ring-1 ring-[#ffdad6]">
                      Delay
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </DashboardCard>
  );
};
