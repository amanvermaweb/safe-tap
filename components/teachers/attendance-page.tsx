"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

import { AlertBannerComponent } from "@/components/teachers/alert-banner";
import { FilterBar } from "@/components/teachers/filter-bar";
import { StudentRoster } from "@/components/teachers/student-roster";
import { TeacherPageFrame } from "@/components/teachers/page-frame";
import { alertBanner, students } from "@/lib/teacher-data";
import { type StudentStatus } from "@/types/teacher";

interface AttendancePageProps {
  userName: string;
}

export function AttendancePage({ userName }: AttendancePageProps) {
  const [statusFilters, setStatusFilters] = useState<StudentStatus[]>([]);

  const handleStatusChange = useCallback((statuses: StudentStatus[]) => {
    setStatusFilters(statuses);
  }, []);

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <TeacherPageFrame
      userName={userName}
      searchPlaceholder="Search attendance records..."
    >
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="space-y-2">
            <p className="section-heading">Attendance</p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#191c1e] sm:text-5xl">
              Morning Attendance
            </h1>
            <p className="text-base text-[#45464d]">
              {dateFormatter.format(new Date())}
            </p>
          </div>
        </motion.section>

        <AlertBannerComponent {...alertBanner} />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_320px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-heading">Attendance list</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#191c1e]">
                  Review student status
                </h2>
              </div>
            </div>

            <FilterBar onStatusChange={handleStatusChange} />
            <StudentRoster students={students} statusFilters={statusFilters} />
          </div>

          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="glass-panel rounded-4xl p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#def8ff] text-[#006172]">
                  <Filter className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#191c1e]">
                    Attendance filters
                  </p>
                  <p className="text-xs text-[#45464d]">
                    Highlight present, delayed, bus, or absent students
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-3xl bg-white/70 px-4 py-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#45464d]">Present today</span>
                    <span className="font-semibold text-[#005048]">18</span>
                  </div>
                </div>
                <div className="rounded-3xl bg-white/70 px-4 py-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#45464d]">In transit</span>
                    <span className="font-semibold text-[#006172]">7</span>
                  </div>
                </div>
                <div className="rounded-3xl bg-white/70 px-4 py-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#45464d]">Need follow-up</span>
                    <span className="font-semibold text-[#93000a]">5</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="glass-panel rounded-4xl p-6"
            >
              <p className="section-heading">Quick actions</p>
              <div className="mt-4 space-y-3 text-sm text-[#45464d]">
                <p>• Mark late arrivals from the bus manifest</p>
                <p>• Notify parents when a student is absent</p>
                <p>• Review confirmed check-ins before class starts</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </TeacherPageFrame>
  );
}

export default AttendancePage;
