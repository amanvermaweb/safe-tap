"use client";

import type { ReactNode } from "react";

import { Sidebar } from "@/components/teachers/sidebar";
import { Topbar } from "@/components/teachers/topbar";

interface TeacherPageFrameProps {
  userName: string;
  children: ReactNode;
  searchPlaceholder?: string;
}

export function TeacherPageFrame({
  userName,
  children,
  searchPlaceholder,
}: TeacherPageFrameProps) {
  return (
    <div className="app-shell relative min-h-screen overflow-hidden text-[#191c1e]">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-40" />
      <Sidebar userName={userName} />
      <Topbar userName={userName} searchPlaceholder={searchPlaceholder} />
      <main className="relative px-4 pb-12 pt-24 md:ml-64 md:pt-20 md:px-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}

export default TeacherPageFrame;