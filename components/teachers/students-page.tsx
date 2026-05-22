"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Search, Users } from "lucide-react";

import { AttendanceStatsCards } from "@/components/teachers/attendance-stats";
import { FilterBar } from "@/components/teachers/filter-bar";
import { StudentRoster } from "@/components/teachers/student-roster";
import { TeacherPageFrame } from "@/components/teachers/page-frame";
import { attendanceStats, students } from "@/lib/teacher-data";
import { type StudentStatus } from "@/types/teacher";

interface StudentsPageProps {
  userName: string;
}

export function StudentsPage({ userName }: StudentsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilters, setStatusFilters] = useState<StudentStatus[]>([]);

  const handleStatusChange = useCallback((statuses: StudentStatus[]) => {
    setStatusFilters(statuses);
  }, []);

  return (
    <TeacherPageFrame userName={userName} searchPlaceholder="Search student names or IDs...">
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="space-y-2">
            <p className="section-heading">Students</p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#191c1e] sm:text-5xl">
              Student Directory
            </h1>
            <p className="text-base text-[#45464d]">Search, sort, and monitor every student in the class.</p>
          </div>

          <div className="glass-panel rounded-3xl px-4 py-3">
            <div className="flex items-center gap-3 text-sm text-[#45464d]">
              <Users className="h-4 w-4 text-[#006172]" />
              28 students tracked across all bus statuses
            </div>
          </div>
        </motion.section>

        <AttendanceStatsCards {...attendanceStats} />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_320px]">
          <div className="space-y-4">
            <div className="glass-panel rounded-4xl p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#006172]" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search students or IDs"
                    className="w-full rounded-full border border-[#e0e3e5] bg-white/80 py-3 pl-11 pr-4 text-sm text-[#191c1e] placeholder:text-[#6a7078] focus:border-[#57dffe] focus:outline-none focus:ring-4 focus:ring-[#57dffe]/20"
                  />
                </div>
                
              </div>
            </div>

            <FilterBar onStatusChange={handleStatusChange} />
            <StudentRoster
              students={students}
              searchQuery={searchQuery}
              statusFilters={statusFilters}
            />
          </div>

          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="glass-panel rounded-4xl p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e5f7f4] text-[#005048]">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#191c1e]">Roster health</p>
                  <p className="text-xs text-[#45464d]">Quick glance at attendance consistency</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-3xl bg-white/70 px-4 py-3">
                  <span className="text-[#45464d]">Checked in before 8:20</span>
                  <span className="font-semibold text-[#005048]">11</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-white/70 px-4 py-3">
                  <span className="text-[#45464d]">Delayed students</span>
                  <span className="font-semibold text-[#725300]">3</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-white/70 px-4 py-3">
                  <span className="text-[#45464d]">Absent with parent notice</span>
                  <span className="font-semibold text-[#93000a]">2</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </div>
    </TeacherPageFrame>
  );
}

export default StudentsPage;