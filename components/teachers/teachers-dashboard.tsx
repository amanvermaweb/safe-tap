"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/teachers/sidebar";
import { Topbar } from "@/components/teachers/topbar";
import { AttendanceStatsCards } from "@/components/teachers/attendance-stats";
import { FilterBar } from "@/components/teachers/filter-bar";
import { StudentRoster } from "@/components/teachers/student-roster";
import { attendanceStats, students } from "@/lib/teacher-data";
import { type StudentStatus } from "@/types/teacher";

export function TeachersDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilters, setStatusFilters] = useState<StudentStatus[]>([]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleStatusChange = useCallback((statuses: StudentStatus[]) => {
    setStatusFilters(statuses);
  }, []);

  const currentTime = new Date();
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedDate = dateFormatter.format(currentTime);

  return (
    <div className="app-shell relative min-h-screen overflow-hidden text-[#191c1e]">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-40" />
      <Sidebar />

      <Topbar onSearch={handleSearch} />

      <main className="relative px-4 pb-12 pt-24 md:ml-64 md:pt-20 md:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#191c1e] sm:text-5xl">
                Morning Attendance
              </h1>
              <p className="text-base text-[#45464d]">{formattedDate}</p>
            </div>
          </motion.div>

          <AttendanceStatsCards {...attendanceStats} />

          <FilterBar onStatusChange={handleStatusChange} />

          <StudentRoster
            students={students}
            searchQuery={searchQuery}
            statusFilters={statusFilters}
          />
        </div>
      </main>
    </div>
  );
}
