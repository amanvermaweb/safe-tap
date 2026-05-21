"use client";

import { Phone, Star } from "lucide-react";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { DriverProfile } from "@/types/parent";

interface DriverCardProps {
  driver: DriverProfile;
  loading?: boolean;
}

export function DriverCard({ driver, loading = false }: DriverCardProps) {
  if (loading) {
    return (
      <section className="glass-panel rounded-4xl p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="mt-4 h-10 w-full rounded-xl" />
      </section>
    );
  }

  return (
    <motion.section whileHover={{ y: -3 }} transition={{ duration: 0.28, ease: "easeOut" }} className="glass-panel rounded-4xl p-4">
      <h2 className="text-sm font-medium text-[#45464d]">Assigned Driver</h2>

      <div className="mt-4 flex items-center gap-3">
        <Avatar className="h-12 w-12 ring-2 ring-white/70">
          <AvatarImage src={driver.avatarUrl} alt={driver.name} />
          <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-base font-semibold text-[#191c1e]">{driver.name}</p>
          <p className="text-sm text-[#45464d]">{driver.busLabel}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-sm text-[#45464d]">
            <Star className="h-4 w-4 text-[#00687a]" />
            <span className="ml-0.5">{driver.rating.toFixed(1)}</span>
          </p>
        </div>
      </div>

      <Button className="mt-4 h-10 w-full rounded-full text-sm font-semibold cursor-pointer">
        <Phone className="h-4 w-4" />
        <span className="ml-2">{driver.phoneLabel}</span>
      </Button>
    </motion.section>
  );
}
