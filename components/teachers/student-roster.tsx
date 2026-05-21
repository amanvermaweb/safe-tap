"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { type Student, type StudentStatus} from "@/types/teacher";
import { RosterRow } from "./roster-row";

interface StudentRosterProps {
  students: Student[];
  searchQuery?: string;
  statusFilters?: StudentStatus[];
}

export function StudentRoster({
  students,
  searchQuery = "",
  statusFilters = [],
}: StudentRosterProps) {
  const [sortBy, setSortBy] = useState<"name" | "status" | "eta">("name");

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students;

    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.id.toLowerCase().includes(query)
      );
    }

    
    if (statusFilters.length > 0) {
      filtered = filtered.filter((student) =>
        statusFilters.includes(student.status)
      );
    }

    
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "status") {
        const statusOrder = {
          present: 0,
          "on-bus": 1,
          delayed: 2,
          absent: 3,
        };
        return statusOrder[a.status] - statusOrder[b.status];
      } else if (sortBy === "eta") {
        const getTime = (s: Student) => s.timeArrived || s.eta || "99:99";
        return getTime(a).localeCompare(getTime(b));
      }
      return 0;
    });

    return sorted;
  }, [students, searchQuery, statusFilters, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel overflow-hidden rounded-4xl"
    >
      {/* Table Header */}
      <div className="border-b border-[#e0e3e5]/80 bg-white/55 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[#191c1e]">
              Student Roster
              <span className="ml-2 font-normal text-[#45464d]">
                ({filteredAndSortedStudents.length} of {students.length})
              </span>
            </h3>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <label htmlFor="sort-select" className="text-xs font-medium text-[#45464d]">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-full border border-[#e0e3e5] bg-white/80 px-3 py-2 text-xs text-[#191c1e] focus:border-[#57dffe] focus:outline-none focus:ring-4 focus:ring-[#57dffe]/20"
            >
              <option value="name">Name</option>
              <option value="status">Status</option>
              <option value="eta">Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e0e3e5] bg-white/60">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#6a7078]">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#6a7078]">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#6a7078]">
                Transport
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#6a7078]">
                ETA / Time
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.12em] text-[#6a7078]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedStudents.length > 0 ? (
              filteredAndSortedStudents.map((student, index) => (
                <RosterRow key={student.id} student={student} index={index} />
              ))
            ) : (
              <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl">🔍</div>
                    <p className="text-sm font-medium text-[#45464d]">
                      No students found
                    </p>
                    <p className="text-xs text-[#6a7078]">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default StudentRoster;
