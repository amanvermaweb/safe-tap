"use client";

import Link from "next/link";
import { navigationItems, teacherProfile } from "@/lib/teacher-data";
import {
  LayoutDashboard,
  CheckCircle2,
  Users,
  MapPin,
  Bell,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
  LayoutDashboard,
  CheckCircle2,
  Users,
  MapPin,
  Bell,
};

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-sidebar fixed left-0 top-0 hidden h-screen w-64 flex-col md:flex"
    >
      <div className="border-b border-[#e0e3e5] px-5 py-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-11 w-11 items-center justify-center shrink-0 rounded-full bg-[#00687a] text-sm font-semibold text-white shadow-[0_16px_24px_rgba(0,104,122,0.18)]">
            {teacherProfile.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-[#191c1e] truncate">
              {teacherProfile.name}
            </h3>
            <p className="text-xs text-[#45464d] truncate">
              {teacherProfile.grade}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        {navigationItems.map((item, index) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = item.isActive;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={item.href}>
                <div
                  className={`relative group flex items-center gap-3 rounded-[1.25rem] px-3.5 py-2.5 text-label transition-all duration-200 ${
                    isActive
                      ? "bg-[#57dffe] text-[#001f26] font-medium"
                      : "text-[#45464d] hover:bg-white/70"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 rounded-lg border border-[#57dffe]/60"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 shrink-0">
                    <Icon size={20} />
                  </div>
                  <span className="relative z-10 flex-1">{item.label}</span>
                  {isActive && (
                    <div className="relative z-10 shrink-0">
                      <ChevronRight size={16} />
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

    </motion.aside>
  );
}

export default Sidebar;
