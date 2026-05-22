"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, BusFront, ShieldCheck, Users } from "lucide-react";

const RoutesMap = dynamic(
  () => import("@/components/admin/routes-map").then((mod) => mod.RoutesMap),
  { ssr: false },
);

export default function Home() {
  return (
    <div className="app-shell relative overflow-hidden">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-50" />
      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="space-y-8">
            <div className="max-w-3xl space-y-5">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#191c1e] sm:text-5xl lg:text-6xl">
                A premium safety command center for school mobility.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#45464d] sm:text-xl">
                Track buses, monitor arrivals, and keep administrators,
                teachers, and parents aligned inside one calm, high-trust
                interface.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00687a] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_38px_rgba(0,104,122,0.24)] transition hover:-translate-y-0.5 hover:bg-[#005867]"
              >
                Sign in
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/75 px-6 py-3.5 text-sm font-semibold text-[#191c1e] backdrop-blur-2xl transition hover:bg-white"
              >
                Sign up
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 object-center justify-center">
              {[
                {
                  icon: BusFront,
                  title: "Live fleet",
                  copy: "Real-time bus visibility with soft alerts.",
                },
                {
                  icon: Users,
                  title: "Class sync",
                  copy: "Attendance and parent notifications in one place.",
                },
                {
                  icon: ShieldCheck,
                  title: "Safety first",
                  copy: "Designed for reliability, clarity, and trust.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="glass-panel rounded-4xl p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00201c] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 text-base font-semibold text-[#191c1e]">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-[#45464d]">
                      {item.copy}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="glass-panel-strong rounded-[2.5rem] p-5 sm:p-6 lg:p-8 w-full">
            <RoutesMap />
          </section>
        </div>
      </main>
    </div>
  );
}
