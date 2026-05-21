"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { type AlertBanner } from "@/types/teacher";

interface AlertBannerProps extends AlertBanner {
  onDismiss?: () => void;
}

const iconConfig = {
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-[#fff4d6]",
    borderColor: "border-[#f4d28a]",
    textColor: "text-[#725300]",
    accentColor: "bg-[#ffdf99]",
  },
  info: {
    icon: Info,
    bgColor: "bg-[#def8ff]",
    borderColor: "border-[#b8efff]",
    textColor: "text-[#006172]",
    accentColor: "bg-[#b8efff]",
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-[#e5f7f4]",
    borderColor: "border-[#c3ece6]",
    textColor: "text-[#005048]",
    accentColor: "bg-[#b7e8df]",
  },
} as const;

export function AlertBannerComponent({
  type,
  title,
  message,
  action,
  onDismiss,
}: AlertBannerProps) {
  const config = iconConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className={`flex items-start gap-4 rounded-3xl border px-5 py-4 shadow-sm ${config.bgColor} ${config.borderColor}`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.accentColor}`}>
        <Icon size={18} className={config.textColor} />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className={`text-sm font-semibold ${config.textColor}`}>{title}</p>
            <p className="text-sm text-[#45464d]">{message}</p>
          </div>

          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className={`rounded-full p-1 ${config.textColor} transition-opacity hover:opacity-60`}
              aria-label="Dismiss alert"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {action && (
          <div>
            {action.href ? (
              <Link
                href={action.href}
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${config.textColor} ${config.accentColor}`}
              >
                {action.label}
              </Link>
            ) : (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${config.textColor} ${config.accentColor}`}
              >
                {action.label}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default AlertBannerComponent;
