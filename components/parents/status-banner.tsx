"use client";

import { CheckCircle2, Clock3 } from "lucide-react";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { ChildStatus } from "@/types/parent";

interface StatusBannerProps {
  child: ChildStatus;
}

export function StatusBanner({ child }: StatusBannerProps) {
  return (
    <section className="glass-panel rounded-4xl p-5 sm:p-6 lg:p-7">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[auto_1fr_auto]">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 ring-2 ring-white/70 sm:h-16 sm:w-16">
            <AvatarImage src={child.avatarUrl} alt={child.name} />
            <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="mt-1 text-lg font-semibold leading-6 text-[#191c1e] sm:text-2xl">{child.name}</h1>
          </div>
        </div>

        <div className="mx-auto hidden sm:block" />

        <div className="flex items-center justify-end gap-3">
          <Badge variant="success" className="px-3 py-1.5 text-sm font-semibold">
            ETA {child.etaMinutes} min
          </Badge>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#45464d] sm:mt-5">
        <span className="inline-flex items-center gap-2">
          <motion.span
            className="relative flex h-2.5 w-2.5"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/80" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#005048]" />
          </motion.span>
          <span className="font-medium text-[#191c1e]">{child.statusText}</span>
        </span>

        <span className="inline-flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#005048]" />
          <span className="text-[#45464d]">{child.currentStop}</span>
        </span>

        <span className="inline-flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-[#6a7078]" />
          <span className="text-[#45464d]">{child.timestampLabel}</span>
        </span>
      </div>
    </section>
  );
}
