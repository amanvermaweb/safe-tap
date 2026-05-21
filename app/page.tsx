import Link from "next/link";
import { ArrowRight, BusFront, ShieldCheck, Users, MapPinned } from "lucide-react";

export default function Home() {
  return (
    <div className="app-shell relative overflow-hidden">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-50" />
      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#006172] backdrop-blur-2xl">
              Luminous Mobility
            </div>

            <div className="max-w-3xl space-y-5">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#191c1e] sm:text-5xl lg:text-6xl">
                A premium safety command center for school mobility.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#45464d] sm:text-xl">
                Track buses, monitor arrivals, and keep administrators, teachers, and parents aligned inside one calm, high-trust interface.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00687a] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_38px_rgba(0,104,122,0.24)] transition hover:-translate-y-0.5 hover:bg-[#005867]"
              >
                Sign in
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/75 px-6 py-3.5 text-sm font-semibold text-[#191c1e] backdrop-blur-2xl transition hover:bg-white"
              >
                Sign up
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: BusFront, title: "Live fleet", copy: "Real-time bus visibility with soft alerts." },
                { icon: Users, title: "Class sync", copy: "Attendance and parent notifications in one place." },
                { icon: ShieldCheck, title: "Safety first", copy: "Designed for reliability, clarity, and trust." },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="glass-panel rounded-4xl p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00201c] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 text-base font-semibold text-[#191c1e]">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-[#45464d]">{item.copy}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="glass-panel-strong rounded-[2.5rem] p-5 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between gap-3 border-b border-[#e0e3e5] pb-5">
              <div>
                <p className="section-heading">Control suite</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#191c1e]">Everything in view</h2>
              </div>
              <div className="rounded-full bg-[#57dffe] px-3 py-1.5 text-xs font-semibold text-[#001f26]">
                Live
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="glass-panel rounded-4xl p-5">
                <p className="section-heading">RFID</p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#191c1e]">892</p>
                <p className="mt-2 text-sm text-[#45464d]">Scans today</p>
              </div>
              <div className="glass-panel rounded-4xl p-5">
                <p className="section-heading">Fleet health</p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#191c1e]">94%</p>
                <p className="mt-2 text-sm text-[#45464d]">Attendance accuracy</p>
              </div>
            </div>

            <div className="mt-4 glass-panel rounded-4xl p-5">
              <div className="flex items-center gap-3 text-sm font-medium text-[#45464d]">
                <MapPinned className="h-4 w-4 text-[#00687a]" />
                Campus route visibility and live location tracking
              </div>
              <div className="surface-grid mt-4 aspect-16/10 rounded-4xl border border-[#e0e3e5] bg-[radial-gradient(circle_at_top,rgba(87,223,254,0.2),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(236,238,240,0.95))]" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
