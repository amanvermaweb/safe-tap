'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search, CheckCircle2, XCircle, Clock3, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { students } from '@/lib/data';
import { DashboardCard } from '@/components/admin/dashboard-card';

type ScanStatus = 'boarded' | 'exited' | 'pending';

export const RecentScans: React.FC = () => {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState(students);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRows((current) => {
        const [first, second, ...rest] = current;
        const next = second ?? first;
        const updated = first
          ? {
              ...first,
              timestamp: first.timestamp === '08:15 AM' ? '08:16 AM' : '08:15 AM',
              status: first.status === 'boarded' ? 'boarded' : 'pending',
            }
          : next;

        return [
          {
            ...(updated ?? students[0]),
            id: `${Date.now()}`,
            name: 'Aarav Sharma',
            bus: 'Bus 12',
            route: 'Northwood',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'boarded',
            avatar: 'AS',
          },
          ...(next ? [next, ...rest] : rest),
        ].slice(0, 6) as typeof students;
      });
    }, 18000);

    return () => window.clearInterval(interval);
  }, []);

  const filteredStudents = useMemo(() => {
    return rows.filter(
      (student) =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.bus.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

  const getStatusIcon = (status: ScanStatus) => {
    switch (status) {
      case 'boarded':
        return <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />;
      case 'exited':
        return <XCircle className="h-4.5 w-4.5 text-slate-400" />;
      default:
        return <Clock3 className="h-4.5 w-4.5 text-amber-500" />;
    }
  };

  const getStatusBg = (status: ScanStatus) => {
    switch (status) {
      case 'boarded':
        return 'bg-emerald-50 text-emerald-700 ring-emerald-100';
      case 'exited':
        return 'bg-slate-50 text-slate-700 ring-slate-200';
      default:
        return 'bg-amber-50 text-amber-700 ring-amber-100';
    }
  };

  return (
    <DashboardCard
      title="Recent Scans"
      description="Live RFID terminal updates"
      className="flex h-full flex-col"
      bodyClassName="flex flex-1 flex-col"
    >
      <div className="border-b border-slate-100 px-6 pb-5 sm:px-7">
        <label className="sr-only" htmlFor="student-search">
          Search student
        </label>
        <div className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-slate-500 transition-colors focus-within:border-sky-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100">
          <Search className="h-4.5 w-4.5 flex-none" />
          <input
            id="student-search"
            type="search"
            placeholder="Search student or bus..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="min-w-[760px] w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50/80 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              <th className="px-6 py-4 sm:px-7">Student</th>
              <th className="px-6 py-4">Bus & Route</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-slate-100/90 transition-colors hover:bg-slate-50/70"
              >
                <td className="px-6 py-4 sm:px-7">
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 flex-none place-items-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-[11px] font-semibold text-white">
                      {student.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold tracking-[-0.01em] text-slate-900">{student.name}</p>
                      <p className="text-xs leading-5 text-slate-500">RFID ID verified</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">{student.bus}</p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-500">{student.route}</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{student.timestamp}</td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${getStatusBg(student.status as ScanStatus)}`}>
                    {getStatusIcon(student.status as ScanStatus)}
                    <span className="capitalize">
                      {student.status === 'boarded' ? 'Boarded' : student.status === 'exited' ? 'Exited' : 'Pending'}
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-xs sm:px-7">
        <p className="text-slate-500">Showing {filteredStudents.length} live records</p>
        <a href="#" className="font-semibold text-sky-600 transition-colors hover:text-sky-700">
          View All Records →
        </a>
      </div>
    </DashboardCard>
  );
};
