"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, MapPin, Users } from "lucide-react";
import { Sidebar } from "@/components/teachers/sidebar";
import { Topbar } from "@/components/teachers/topbar";
import { AttendanceStatsCards } from "@/components/teachers/attendance-stats";
import { FilterBar } from "@/components/teachers/filter-bar";
import { StudentRoster } from "@/components/teachers/student-roster";
import { attendanceStats, students } from "@/lib/teacher-data";
import { type StudentStatus } from "@/types/teacher";

interface TeachersDashboardProps {
  userName: string;
}

export function TeachersDashboard({ userName }: TeachersDashboardProps) {
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
      <Sidebar userName={userName} />

      <Topbar onSearch={handleSearch} userName={userName} />

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

          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/teachers/attendance",
                icon: CheckCircle2,
                title: "Attendance",
                description: "Review check-ins and follow up on delayed students.",
              },
              {
                href: "/teachers/students",
                icon: Users,
                title: "Students",
                description: "Search the roster, sort by status, and open student details.",
              },
              {
                href: "/teachers/tracking",
                icon: MapPin,
                title: "Live Tracking",
                description: "Monitor bus routes, ETAs, and route progress live.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link href={item.href} className="group block h-full">
                    <div className="glass-panel h-full rounded-4xl p-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_34px_rgba(15,23,42,0.1)]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#def8ff] text-[#006172]">
                          <Icon size={18} />
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-[#6a7078] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[#191c1e]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#45464d]">{item.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </section>

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
