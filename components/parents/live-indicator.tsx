"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface LiveIndicatorProps {
  className?: string;
}

export function LiveIndicator({ className }: LiveIndicatorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[#ffdad6] bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#ba1a1a]",
        className,
      )}
      aria-label="Live tracking enabled"
    >
      <motion.span
        className="relative flex h-2.5 w-2.5"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ba1a1a]/40" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ba1a1a]" />
      </motion.span>
      LIVE
    </div>
  );
}
