"use client";

import { motion } from "framer-motion";
import { type AttendanceStats } from "@/types/teacher";

type AttendanceStatsProps = AttendanceStats;

const statCards = [
  {
    key: "totalClass",
    label: "Total Class",
    bgColor: "from-[#ffffff] to-[#f2f4f6]",
    textColor: "text-[#191c1e]",
  },
  {
    key: "arrived",
    label: "Arrived",
    bgColor: "from-[#ffffff] to-[#f2f4f6]",
    textColor: "text-[#191c1e]",
  },
  {
    key: "onBus",
    label: "On Bus",
    bgColor: "from-[#ffffff] to-[#f2f4f6]",
    textColor: "text-[#191c1e]",
  },
  {
    key: "absent",
    label: "Absent",
    bgColor: "from-[#ffffff] to-[#f2f4f6]",
    textColor: "text-[#191c1e]",
  },
];

export function AttendanceStatsCards(props: AttendanceStatsProps) {
  const data = {
    totalClass: props.totalClass,
    arrived: props.arrived,
    onBus: props.onBus,
    absent: props.absent,
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card, index) => {
        const value = data[card.key as keyof typeof data];

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 24px rgba(0,0,0,0.1)",
            }}
            className={`glass-panel rounded-4xl bg-linear-to-br ${card.bgColor} p-6 transition-all`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#6a7078]">
                  {card.label}
                </p>
                <h3 className={`mb-2 text-4xl font-semibold ${card.textColor}`}>
                  {value}
                </h3>
                <p className="text-xs text-[#45464d]">
                  {card.key === "totalClass" && "Students in class"}
                  {card.key === "arrived" && "On time"}
                  {card.key === "onBus" && "In transit"}
                  {card.key === "absent" && "Not present"}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default AttendanceStatsCards;
