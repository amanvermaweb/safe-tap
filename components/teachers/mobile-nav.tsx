"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigationItems, teacherProfile } from "@/lib/teacher-data";
import { getInitials } from "@/lib/utils";
import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}


export function MobileNav({ isOpen, onClose, userName }: MobileNavProps) {
  const userInitials = getInitials(userName);
  const pathname = usePathname();

  const isActivePath = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#191c1e]/35 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="glass-sidebar fixed left-0 top-0 z-50 flex h-screen w-64 flex-col md:hidden"
      >
        {/* Close Button */}
        <div className="flex items-center justify-between border-b border-[#e0e3e5] px-6 py-4">
          <span className="font-semibold text-[#191c1e]">Menu</span>
          <button onClick={onClose} className="p-1">
            <X size={24} className="text-[#45464d]" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="border-b border-[#e0e3e5] px-6 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00687a] text-sm font-semibold text-white shadow-[0_14px_24px_rgba(0,104,122,0.18)]">
              {userInitials}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-[#191c1e]">
                {userName}
              </h3>
              <p className="truncate text-xs text-[#45464d]">
                {teacherProfile.grade}
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-white/70 px-3 py-2 backdrop-blur-xl">
            <p className="text-xs font-medium text-[#191c1e]">{teacherProfile.classroom}</p>
            <p className="text-xs text-[#45464d]">{teacherProfile.school}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          {navigationItems.map((item) => {
            const isActive = isActivePath(item.href);
            return (
              <Link key={item.id} href={item.href} onClick={onClose}>
                <div
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    isActive
                      ? "bg-[#57dffe] text-[#001f26]"
                      : "text-[#45464d] hover:bg-white/70"
                  }`}
                >
                  <span className="text-lg">{item.label[0]}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
}

export default MobileNav;
