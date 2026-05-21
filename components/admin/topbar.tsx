"use client";

import React from "react";
import { Menu } from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({
  onMenuClick,
  title,
  description,
  action,
}) => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/75 backdrop-blur-3xl">
      <div className="flex min-h-20 items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#e0e3e5] text-[#45464d] transition-colors hover:bg-white hover:text-[#191c1e] lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-[28px] font-semibold tracking-[-0.04em] text-[#191c1e] sm:text-[30px]">
              {title}
            </h1>
            {description && (
              <p className="truncate text-sm leading-5 text-[#45464d]">
                {description}
              </p>
            )}
          </div>
        </div>

        {action && <div className="flex-none">{action}</div>}
      </div>
    </header>
  );
};
