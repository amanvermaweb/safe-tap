"use client";

import { useState } from "react";
import { Search, RotateCw, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { getInitials } from "@/lib/utils";
import MobileNav from "./mobile-nav";

interface TopbarProps {
  onSearch?: (query: string) => void;
  userName: string;
  searchPlaceholder?: string;
}

export function Topbar({
  onSearch,
  userName,
  searchPlaceholder = "Search students...",
}: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userInitials = getInitials(userName);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <>
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} userName={userName} />
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 left-0 z-40 border-b border-white/60 bg-white/78 backdrop-blur-3xl md:left-64"
      >
        <div className="flex h-20 items-center justify-between gap-4 px-4 md:px-8">
         
          <motion.button
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0 rounded-full border border-[#e0e3e5] p-2.5 transition-colors hover:bg-white md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} className="text-[#45464d]" />
          </motion.button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-sm">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 shrink-0 text-[#006172]"
              size={18}
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-full border border-[#e0e3e5] bg-white/70 py-2.5 pl-11 pr-4 text-sm text-[#191c1e] placeholder:text-[#6a7078] transition-all focus:border-[#57dffe] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#57dffe]/20"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Refresh Button */}
            <motion.button
              onClick={handleRefresh}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isRefreshing}
              className="rounded-full border border-[#e0e3e5] p-2.5 transition-colors hover:bg-white disabled:opacity-50"
              aria-label="Refresh data"
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                  duration: 1,
                  repeat: isRefreshing ? Infinity : 0,
                }}
              >
                <RotateCw size={20} className="text-[#45464d]" />
              </motion.div>
            </motion.button>

            {/* Profile Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#00687a] text-sm font-semibold text-white shadow-[0_14px_24px_rgba(0,104,122,0.18)] transition-shadow hover:shadow-[0_18px_28px_rgba(0,104,122,0.22)]"
              title={userName}
            >
              {userInitials}
            </motion.div>
          </div>
        </div>
      </motion.header>
    </>
  );
}

export default Topbar;
