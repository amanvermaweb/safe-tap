"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { Topbar } from "@/components/admin/topbar";
import { RecentScans } from "@/components/admin/recent-scans";

export default function StudentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const syncSidebar = () => setSidebarOpen(mediaQuery.matches);
    syncSidebar();

    mediaQuery.addEventListener("change", syncSidebar);

    return () => mediaQuery.removeEventListener("change", syncSidebar);
  }, []);

  

  return (
    <div className="app-shell relative min-h-screen overflow-hidden text-[#191c1e]">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-40" />
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div
        className={`${sidebarOpen ? "lg:pl-64" : "lg:pl-20"} min-h-screen transition-[padding] duration-300`}
      >
        <Topbar
          onMenuClick={() => setSidebarOpen((value) => !value)}
          title="Students"
        />

        <main className="relative px-4 pb-8 pt-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-400 flex-col gap-6">
            <RecentScans />
          </div>
        </main>
      </div>
    </div>
  );
}
