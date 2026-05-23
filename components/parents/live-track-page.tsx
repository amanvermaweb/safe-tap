"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";

import { ParentsSidebar } from "@/components/parents/sidebar";
import { TrackingMap } from "@/components/parents/tracking-map";
import { parentDashboardData, parentNavItems } from "@/lib/parent-data";

const pageVariants: Variants = {
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

interface ParentsLiveTrackPageProps {
  userName: string;
}

export function ParentsLiveTrackPage({ userName }: ParentsLiveTrackPageProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="app-shell relative min-h-screen overflow-hidden text-[#191c1e]">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-45" />

      <ParentsSidebar
        navItems={parentNavItems}
        activeKey="live-track"
        userName={userName}
      />

      <main className="relative z-10 px-4 pb-8 pt-6 sm:px-6 sm:pb-10 lg:pl-76 lg:pr-8 lg:pt-8">
        <motion.div
          variants={pageVariants}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-345"
        >
          <motion.div variants={itemVariants}>
            <TrackingMap
              stops={parentDashboardData.stops}
              routeLabel={parentDashboardData.routeLabel}
              lastUpdated={parentDashboardData.lastUpdated}
              loading={loading}
            />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
