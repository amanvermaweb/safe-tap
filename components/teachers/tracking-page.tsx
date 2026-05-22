"use client";

import { motion } from "framer-motion";
import { Clock3, MapPin, Route, Truck } from "lucide-react";

import { AlertBannerComponent } from "@/components/teachers/alert-banner";
import { TeacherPageFrame } from "@/components/teachers/page-frame";
import { alertBanner, attendanceStats } from "@/lib/teacher-data";

interface TrackingPageProps {
  userName: string;
}

const routeStops = [
  { name: "Depot", time: "7:20 AM", status: "Departed" },
  { name: "North Gate", time: "7:42 AM", status: "On schedule" },
  { name: "Main Avenue", time: "7:58 AM", status: "2 min late" },
  { name: "Campus Entry", time: "8:12 AM", status: "Approaching" },
];

const liveBuses = [
  { label: "Route A", driver: "Kamal", eta: "8:35 AM", status: "3 students delayed" },
  { label: "Route B", driver: "Rita", eta: "8:28 AM", status: "5 students on bus" },
  { label: "Route C", driver: "Arjun", eta: "8:44 AM", status: "Arriving now" },
];

export function TrackingPage({ userName }: TrackingPageProps) {
  return (
    <TeacherPageFrame userName={userName} searchPlaceholder="Search routes or stops...">
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="space-y-2">
            <p className="section-heading">Live Tracking</p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#191c1e] sm:text-5xl">
              Bus Tracking Center
            </h1>
            <p className="text-base text-[#45464d]">Monitor route progress and bus arrival estimates in real time.</p>
          </div>

          <div className="glass-panel rounded-3xl px-4 py-3">
            <div className="flex items-center gap-3 text-sm text-[#45464d]">
              <Route className="h-4 w-4 text-[#006172]" />
              {attendanceStats.onBus} students currently in transit
            </div>
          </div>
        </motion.section>

        <AlertBannerComponent {...alertBanner} />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_360px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel overflow-hidden rounded-4xl"
          >
            <div className="border-b border-[#e0e3e5]/80 bg-white/55 px-6 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="section-heading">Route view</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#191c1e]">Route A live map</h2>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#def8ff] px-3 py-2 text-xs font-semibold text-[#006172]">
                  <MapPin className="h-4 w-4" />
                  GPS refresh every 30s
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1.3fr)_280px]">
              <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-[#e0e3e5] bg-[radial-gradient(circle_at_top,rgba(0,104,122,0.16),transparent_30%),linear-gradient(180deg,#eef7fb_0%,#f8fbfd_100%)] p-6">
                <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,rgba(22,36,57,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,36,57,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between gap-4">
                    <div className="rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-[#191c1e] shadow-sm">
                      Bus 14 • Route A
                    </div>
                    <div className="rounded-full bg-[#ffffff]/85 px-4 py-2 text-sm font-semibold text-[#006172] shadow-sm">
                      ETA 8:35 AM
                    </div>
                  </div>

                  <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-[#57dffe]/50 bg-white/85 shadow-[0_20px_40px_rgba(0,104,122,0.12)]">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#def8ff] text-[#006172]">
                      <Truck className="h-10 w-10" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ["Speed", "28 km/h"],
                      ["Students onboard", "7"],
                      ["Delay", "4 min"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-3xl bg-white/85 px-4 py-3 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.12em] text-[#6a7078]">{label}</p>
                        <p className="mt-1 text-lg font-semibold text-[#191c1e]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="glass-panel rounded-4xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5f7f4] text-[#005048]">
                      <Clock3 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#191c1e]">Route timeline</p>
                      <p className="text-xs text-[#45464d]">Estimated arrival checkpoints</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    {routeStops.map((stop, index) => (
                      <div key={stop.name} className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#def8ff] text-xs font-semibold text-[#006172]">
                          {index + 1}
                        </div>
                        <div className="flex-1 rounded-3xl bg-white/70 px-4 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-[#191c1e]">{stop.name}</p>
                              <p className="text-xs text-[#45464d]">{stop.status}</p>
                            </div>
                            <p className="text-sm font-semibold text-[#191c1e]">{stop.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel rounded-4xl p-5">
                  <p className="section-heading">Live buses</p>
                  <div className="mt-4 space-y-3">
                    {liveBuses.map((bus) => (
                      <div key={bus.label} className="rounded-3xl bg-white/70 px-4 py-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-[#191c1e]">{bus.label}</p>
                            <p className="text-xs text-[#45464d]">Driver {bus.driver}</p>
                          </div>
                          <p className="text-sm font-semibold text-[#006172]">{bus.eta}</p>
                        </div>
                        <p className="mt-2 text-xs text-[#45464d]">{bus.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="glass-panel rounded-4xl p-6"
            >
              <p className="section-heading">Tracking summary</p>
              <div className="mt-4 space-y-3 text-sm text-[#45464d]">
                <p>• Route A is closest to campus and carrying the delayed group</p>
                <p>• Parent notifications already sent for late arrivals</p>
                <p>• Live map updates stay aligned with attendance records</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="glass-panel rounded-4xl p-6"
            >
              <p className="section-heading">Recommended actions</p>
              <div className="mt-4 space-y-3 text-sm text-[#45464d]">
                <p>• Call the driver if ETA drifts beyond 10 minutes</p>
                <p>• Watch the final stop before marking attendance complete</p>
                <p>• Open the student roster to confirm linked arrival records</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </TeacherPageFrame>
  );
}

export default TrackingPage;