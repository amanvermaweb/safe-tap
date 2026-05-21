"use client";

import { motion } from "framer-motion";
import { MoreVertical, MapPin, Phone, CheckCircle } from "lucide-react";
import { type Student } from "@/types/teacher";
import { StatusBadge } from "./status-badge";

interface RosterRowProps {
  student: Student;
  index?: number;
}
export function RosterRow({ student, index = 0 }: RosterRowProps) {
  const displayTime = student.status === "present" 
    ? student.timeArrived 
    : student.status === "delayed" || student.status === "on-bus"
    ? student.eta
    : undefined;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.55)" }}
      className="border-b border-[#e0e3e5]/80 transition-colors"
    >
      {/* Student Info */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00687a] text-xs font-semibold text-white shadow-[0_12px_20px_rgba(0,104,122,0.18)]">
            {student.avatar}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#191c1e]">
              {student.name}
            </p>
            <p className="text-xs text-[#45464d]">ID: {student.id}</p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge status={student.status} />
      </td>


      {/* Time */}
      <td className="px-6 py-4">
        {displayTime ? (
          <span className="text-body font-medium text-[#191c1e]">
            {displayTime}
          </span>
        ) : (
          <span className="text-body text-[#6a7078] italic">—</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1">
          {student.status === "delayed" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full p-2 transition-colors hover:bg-[#fff4d6]"
              title="Contact parent"
            >
              <Phone size={18} className="text-[#725300]" />
            </motion.button>
          )}

          {student.status === "on-bus" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full p-2 transition-colors hover:bg-[#def8ff]"
              title="Track on map"
            >
              <MapPin size={18} className="text-[#006172]" />
            </motion.button>
          )}

          {student.status === "present" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full p-2 transition-colors hover:bg-[#e5f7f4]"
              title="Arrival confirmed"
            >
              <CheckCircle size={18} className="text-[#005048]" />
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full p-2 transition-colors hover:bg-white"
            title="More options"
          >
            <MoreVertical size={18} className="text-[#6a7078]" />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
}

export default RosterRow;
