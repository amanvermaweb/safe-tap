"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X as XIcon } from "lucide-react";
import { type StudentStatus } from "@/types/teacher";

interface FilterBarProps {
  onStatusChange?: (statuses: StudentStatus[]) => void;
}

const statusOptions: { value: StudentStatus; label: string; color: string }[] =
  [
    {
      value: "present",
      label: "Present",
      color: "from-[#e5f7f4] to-[#f7f9fb]",
    },
    {
      value: "delayed",
      label: "Delayed",
      color: "from-[#fff4d6] to-[#f7f9fb]",
    },
    { value: "absent", label: "Absent", color: "from-[#ffdad6] to-[#f7f9fb]" },
    { value: "on-bus", label: "On Bus", color: "from-[#def8ff] to-[#f7f9fb]" },
  ];

export function FilterBar({ onStatusChange }: FilterBarProps) {
  const [selectedStatuses, setSelectedStatuses] = useState<StudentStatus[]>([]);

  const handleStatusToggle = (status: StudentStatus) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    setSelectedStatuses(newStatuses);
    onStatusChange?.(newStatuses.length > 0 ? newStatuses : []);
  };

  const handleClearAll = () => {
    setSelectedStatuses([]);
    onStatusChange?.([]);
  };

  const hasFilters = selectedStatuses.length > 0;

  const buttonBaseClass =
    "relative rounded-full px-3 py-1.5 text-xs font-semibold transition-all outline ring-0.15";
  const buttonActiveClass =
    "border border-white/70 shadow-[0_12px_20px_rgba(15,23,42,0.08)]";
  const buttonInactiveClass = "bg-white/65 text-[#45464d] hover:bg-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-4xl p-5"
    >
      <div className="space-y-5">
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#6a7078]">
            Status
            <AnimatePresence>
              {hasFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-end cursor-pointer"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClearAll}
                    className="flex items-center gap-1 text-xs font-semibold text-[#006172] transition-colors hover:text-[#005867]"
                  >
                    <XIcon size={14} />
                    Clear all filters
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </h3>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => {
              const isSelected = selectedStatuses.includes(option.value);
              return (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStatusToggle(option.value)}
                  className={`${buttonBaseClass} ${
                    isSelected
                      ? `bg-linear-to-r ${option.color} ${buttonActiveClass} text-[#191c1e]`
                      : buttonInactiveClass
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{option.label}</span>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check size={14} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FilterBar;
