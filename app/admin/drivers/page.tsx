'use client';

import { useEffect, useState } from 'react';
import { Phone, MapPin, Radio } from 'lucide-react';
import { Sidebar } from '@/components/admin/sidebar';
import { Topbar } from '@/components/admin/topbar';
import { activeDriver, buses } from '@/lib/data';
import { DriverCard } from '@/components/admin/driver-card';

export default function DriversPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const syncSidebar = () => setSidebarOpen(mediaQuery.matches);
    syncSidebar();

    mediaQuery.addEventListener('change', syncSidebar);

    return () => mediaQuery.removeEventListener('change', syncSidebar);
  }, []);

  return (
    <div className="app-shell relative min-h-screen overflow-hidden text-[#191c1e]">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-40" />
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div className={`${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'} min-h-screen transition-[padding] duration-300`}>
        <Topbar
          onMenuClick={() => setSidebarOpen((value) => !value)}
          title="Drivers"
          description="Expanded driver focus view with trip status, vehicle assignment, and quick contact controls."
          action={
            <span className="hidden items-center gap-2 rounded-full bg-[#57dffe] px-3 py-1.5 text-xs font-semibold text-[#001f26] ring-1 ring-white/60 sm:inline-flex">
              <span className="h-2 w-2 rounded-full bg-[#00687a]" aria-hidden="true" />
              On Trip
            </span>
          }
        />

        <main className="relative px-4 pb-8 pt-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-400 flex-col gap-6">
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
             

              <div className="mt-6">
                <h3 className="mb-4 text-sm font-semibold text-[#191c1e]">Fleet</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {buses.map((bus) => (
                    <DriverCard key={bus.id} bus={bus} />
                  ))}
                </div>
              </div>

            </section>
          </div>
        </main>
      </div>
    </div>
  );
}