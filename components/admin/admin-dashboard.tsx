"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Sidebar } from "@/components/admin/sidebar";
import { Topbar } from "@/components/admin/topbar";
import { StatCard } from "@/components/admin/stat-card";
import { RecentScans } from "@/components/admin/recent-scans";
import { DriverCard } from "@/components/admin/driver-card";
import { PanelSkeleton, StatCardSkeleton, TableSkeleton } from "@/components/admin/loading-states";
import { Bus, Users, Radio, AlertTriangle, TrendingUp, ChevronRight } from "lucide-react";
import { buses } from "@/lib/data";
import { motion } from "framer-motion";

const LiveTrackingMap = dynamic(
  () => import("@/components/admin/live-tracking-map").then((mod) => mod.LiveTrackingMap),
  { ssr: false }
);

interface AdminDashboardProps {
  userName: string;
}

export function AdminDashboard({ userName }: AdminDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentDriverIndex, setCurrentDriverIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const syncSidebar = () => setSidebarOpen(mediaQuery.matches);
    syncSidebar();

    const handleChange = () => syncSidebar();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 550);
    return () => window.clearTimeout(id);
  }, []);

  const handleNextDriver = () => {
    setCurrentDriverIndex((prev) => (prev + 1) % buses.length);
  };

  return (
    <div className="app-shell relative min-h-screen overflow-hidden text-[#191c1e]">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-40" />
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} userName={userName} />

      <div className={`${sidebarOpen ? "lg:pl-64" : "lg:pl-20"} min-h-screen transition-[padding] duration-300`}>
        <Topbar
          onMenuClick={() => setSidebarOpen((value) => !value)}
          title="Admin Command Center"
        />

        <main className="relative px-4 pb-8 pt-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-400 flex-col gap-6">
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
                  <StatCard title="Active Buses" value="12" icon={<Bus className="h-5 w-5" />} color="blue" delay={0} />
                  <StatCard title="Students Onboard" value="458" icon={<Users className="h-5 w-5" />} color="purple" delay={0.06} />
                  <StatCard title="RFID Scans Today" value="892" icon={<Radio className="h-5 w-5" />} color="teal" delay={0.12} />
                  <StatCard title="Delayed Buses" value="2" icon={<AlertTriangle className="h-5 w-5" />} color="red" delay={0.18} />
                  <StatCard title="Attendance" value="94%" icon={<TrendingUp className="h-5 w-5" />} color="green" delay={0.24} />
                </section>

                <section aria-label="Operations overview" className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px]">
                  <div>
                    <LiveTrackingMap />
                  </div>
                  <div className="grid auto-rows-max gap-6 relative">
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#191c1e]">Active Drivers</h2>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#45464d]">{currentDriverIndex + 1} / {buses.length}</span>
                          <a
                            href="/admin/drivers"
                            className="inline-flex h-8 items-center rounded-full border border-[#e0e3e5] bg-white/75 px-3 text-xs font-semibold text-[#006172] transition-colors hover:bg-white hover:text-[#005867]"
                            aria-label="View all drivers"
                          >
                            All Drivers
                          </a>
                        </div>
                      </div>
                      <div className="relative h-full min-h-[500px]">
                        <motion.div
                          key={currentDriverIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0"
                        >
                          <DriverCard bus={buses[currentDriverIndex]} />
                        </motion.div>
                      </div>
                      
                      {/* NEXT Button */}
                      <motion.button
                        onClick={handleNextDriver}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-[#006172] text-white hover:bg-[#005867] transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#006172]/35 z-20"
                        aria-label="Next driver"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </section>

                <section aria-label="Live activity">
                  <div>
                    <RecentScans />
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
