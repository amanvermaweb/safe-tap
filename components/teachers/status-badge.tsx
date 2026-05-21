"use client";

import { type StudentStatus } from "@/types/teacher";
import { CheckCircle2, Clock, XCircle, Truck } from "lucide-react";

interface StatusBadgeProps {
  status: StudentStatus;
  className?: string;
}

const statusConfig = {
  present: {
    bgColor: "bg-[#e5f7f4]",
    textColor: "text-[#005048]",
    borderColor: "border-[#c3ece6]",
    icon: CheckCircle2,
    label: "Present",
  },
  delayed: {
    bgColor: "bg-[#fff4d6]",
    textColor: "text-[#725300]",
    borderColor: "border-[#f4d28a]",
    icon: Clock,
    label: "Delayed",
  },
  absent: {
    bgColor: "bg-[#ffdad6]",
    textColor: "text-[#93000a]",
    borderColor: "border-[#ffc7be]",
    icon: XCircle,
    label: "Absent",
  },
  "on-bus": {
    bgColor: "bg-[#def8ff]",
    textColor: "text-[#006172]",
    borderColor: "border-[#b8efff]",
    icon: Truck,
    label: "On Bus",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.borderColor} ${config.bgColor} ${config.textColor} ${className}`}
    >
      <Icon size={14} className="shrink-0" />
      <span>{config.label}</span>
    </div>
  );
}

export default StatusBadge;
