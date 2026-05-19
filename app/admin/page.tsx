'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/admin/sidebar';
import { Topbar } from '@/components/admin/topbar';
import { StatCard } from '@/components/admin/stat-card';
import { FleetMap } from '@/components/admin/fleet-map';
import { RecentScans } from '@/components/admin/recent-scans';
import { EventLog } from '@/components/admin/event-log';
import { ActiveDriver } from '@/components/admin/active-driver';
import {
  PanelSkeleton,
  StatCardSkeleton,
  TableSkeleton,
} from '@/components/admin/loading-states';
import {
  Bus,
  Users,
  Radio,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const syncSidebar = () => setSidebarOpen(mediaQuery.matches);
    syncSidebar();

    const handleChange = () => syncSidebar();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 550);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-900">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div className={`${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'} min-h-screen transition-[padding] duration-300`}>
        <Topbar onMenuClick={() => setSidebarOpen((value) => !value)} />

        <main className="px-4 pb-8 pt-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-405 flex-col gap-6">
            {loading ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StatCardSkeleton key={index} />
                  ))}
                </div>

                <div className="grid grid-cols-12 gap-6">
                  <PanelSkeleton className="col-span-12 xl:col-span-8" />
                  <PanelSkeleton className="col-span-12 xl:col-span-4" />
                </div>

                <div className="grid grid-cols-12 gap-6">
                  <TableSkeleton />
                  <PanelSkeleton className="col-span-12 xl:col-span-4" />
                </div>
              </>
            ) : (
              <>
                <section aria-label="Dashboard metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  <StatCard
                    title="Active Buses"
                    value="12"
                    icon={<Bus className="h-5 w-5" />}
                    color="blue"
                    delay={0}
                  />
                  <StatCard
                    title="Students Onboard"
                    value="458"
                    icon={<Users className="h-5 w-5" />}
                    color="purple"
                    delay={0.06}
                  />
                  <StatCard
                    title="RFID Scans Today"
                    value="892"
                    icon={<Radio className="h-5 w-5" />}
                    color="teal"
                    delay={0.12}
                  />
                  <StatCard
                    title="Delayed Buses"
                    value="2"
                    icon={<AlertTriangle className="h-5 w-5" />}
                    color="red"
                    delay={0.18}
                  />
                  <StatCard
                    title="Attendance"
                    value="94%"
                    icon={<TrendingUp className="h-5 w-5" />}
                    color="green"
                    delay={0.24}
                  />
                </section>

                <section aria-label="Operations overview" className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 xl:col-span-8">
                    <FleetMap />
                  </div>
                  <div className="col-span-12 xl:col-span-4">
                    <ActiveDriver />
                  </div>
                </section>

                <section aria-label="Live activity" className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 xl:col-span-8">
                    <RecentScans />
                  </div>
                  <div className="col-span-12 xl:col-span-4">
                    <EventLog />
                  </div>
                </section>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
