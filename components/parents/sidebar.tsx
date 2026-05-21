"use client";

import Link from "next/link";
import { Bell, House, Menu, Route, Settings, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { ParentNavItem, ParentNavKey } from "@/types/parent";

const iconByKey = {
  dashboard: House,
  "live-track": Route,
  notifications: Bell,
  settings: Settings,
};

interface ParentsSidebarProps {
  navItems: ParentNavItem[];
  activeKey: ParentNavKey;
}

function SidebarNav({
  navItems,
  activeKey,
  onSelect,
}: {
  navItems: ParentNavItem[];
  activeKey: ParentNavKey;
  onSelect?: () => void;
}) {
  return (
    <nav aria-label="Parent navigation" className="space-y-1.5">
      {navItems.map((item) => {
        const Icon = iconByKey[item.key];
        const active = item.key === activeKey;

        return (
          <Link
            key={item.key}
            href={item.href}
            onClick={onSelect}
            className={cn(
              "group flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium transition-all",
              active
                ? "bg-[#57dffe] text-[#001f26] shadow-[0_12px_24px_rgba(0,104,122,0.1)]"
                : "text-[#45464d] hover:bg-white/70 hover:text-[#191c1e]"
            )}
            aria-current={active ? "page" : undefined}
          >
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full transition",
                active ? "bg-[#006172] text-white" : "bg-white/70 text-[#45464d] group-hover:bg-white"
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ navItems, activeKey }: { navItems: ParentNavItem[]; activeKey: ParentNavKey }) {
  return (
    <>
      <div>
        <p className="text-xs font-semibold text-center uppercase tracking-[0.11em] text-slate-400">SafeTap</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-[#191c1e]">Parent Dashboard</h2>
            <p className="text-xs text-[#45464d]">IIT Delhi</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <SidebarNav navItems={navItems} activeKey={activeKey} />
      </div>

      <div className="mt-auto rounded-3xl border border-[#e0e3e5] bg-white/70 p-3.5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80"
              alt="Parent profile"
            />
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-[#191c1e]">Anita Nair</p>
            <p className="text-xs text-[#45464d]">Parent account</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function ParentsSidebar({ navItems, activeKey }: ParentsSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/60 bg-white/78 px-4 backdrop-blur-3xl lg:hidden">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#6a7078]">SafeTap</p>
          <p className="text-sm font-semibold text-[#191c1e]">Parent Dashboard</p>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open navigation menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col pb-5">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Track your child and route updates in real time.</SheetDescription>
            </SheetHeader>
            <SidebarNav navItems={navItems} activeKey={activeKey} onSelect={() => setOpen(false)} />
            <div className="mt-auto rounded-3xl border border-[#e0e3e5] bg-white/70 p-3.5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80" alt="Parent profile" />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-[#191c1e]">Anita Nair</p>
                  <p className="text-xs text-[#45464d]">Parent account</p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <aside className="glass-sidebar fixed inset-y-0 left-0 hidden w-68 px-5 py-6 lg:flex lg:flex-col">
        <div className="flex h-full flex-col">
          <div className="mb-6">
            <SidebarBody navItems={navItems} activeKey={activeKey} />
          </div>
        </div>
      </aside>
    </>
  );
}
