"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";

import { ActivityTimeline } from "@/components/parents/activity-timeline";
import { DriverCard } from "@/components/parents/driver-card";
import { ParentsSidebar } from "@/components/parents/sidebar";
import { StatusBanner } from "@/components/parents/status-banner";
import { TrackingMap } from "@/components/parents/tracking-map";
import { parentDashboardData, parentNavItems } from "@/lib/parent-data";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" } },
};

export default function ParentsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-shell relative min-h-screen overflow-hidden text-[#191c1e]">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-45" />

      <ParentsSidebar navItems={parentNavItems} activeKey="dashboard" />

      <main className="relative z-10 px-4 pb-8 pt-6 sm:px-6 sm:pb-10 lg:pl-76 lg:pr-8 lg:pt-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-345"
        >
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <StatusBanner child={parentDashboardData.child} />
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.6fr)_420px] lg:gap-6">
              <TrackingMap
                stops={parentDashboardData.stops}
                routeLabel={parentDashboardData.routeLabel}
                lastUpdated={parentDashboardData.lastUpdated}
                loading={loading}
              />

              <div className="grid auto-rows-max gap-5">
                <div className="sticky top-8 space-y-5">
                  <DriverCard driver={parentDashboardData.driver} loading={loading} />
                  <ActivityTimeline activity={parentDashboardData.activity} loading={loading} />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
