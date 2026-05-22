"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BusFront, ShieldCheck, Sparkles, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "parent"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // In a real app, you would submit to an API endpoint
      // For now, just show a message
      setSuccess(
        "Note: Sign up functionality would be configured with a backend. Please use demo credentials to sign in instead."
      );
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "parent"
      });

      // Reset after a delay
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell relative overflow-hidden">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-50" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <section className="glass-panel-strong order-2 rounded-[2.25rem] p-6 sm:p-8 lg:order-1 lg:p-10">
            <div className="mb-8 space-y-2">
              <p className="section-heading">Create account</p>
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#191c1e] sm:text-4xl">
                Join the SafeTAP network.
              </h1>
              <p className="text-sm leading-6 text-[#45464d]">
                Set up your account and connect to the right role in the platform.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-[1.25rem] border border-[#ba1a1a]/20 bg-[#fff1f1] p-4 text-sm text-[#8b1d1d]">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 rounded-[1.25rem] border border-[#00687a]/20 bg-[#effbfe] p-4 text-sm text-[#0f4f5d]">
                {success}
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#45464d]">
                  Full name
                </label>
                <div className="relative mt-2">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6a7078]" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-white/70 bg-white/80 py-3 pl-11 pr-4 text-[#191c1e] outline-none transition placeholder:text-[#7a7f87] focus:border-[#00687a]/30 focus:ring-4 focus:ring-[#57dffe]/25 disabled:cursor-not-allowed disabled:opacity-60"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#45464d]">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-[#191c1e] outline-none transition placeholder:text-[#7a7f87] focus:border-[#00687a]/30 focus:ring-4 focus:ring-[#57dffe]/25 disabled:cursor-not-allowed disabled:opacity-60"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="role" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#45464d]">
                  Account type
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-[#191c1e] outline-none transition focus:border-[#00687a]/30 focus:ring-4 focus:ring-[#57dffe]/25 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={loading}
                >
                  <option value="parent">Parent</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#45464d]">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-[#191c1e] outline-none transition placeholder:text-[#7a7f87] focus:border-[#00687a]/30 focus:ring-4 focus:ring-[#57dffe]/25 disabled:cursor-not-allowed disabled:opacity-60"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#45464d]">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-[#191c1e] outline-none transition placeholder:text-[#7a7f87] focus:border-[#00687a]/30 focus:ring-4 focus:ring-[#57dffe]/25 disabled:cursor-not-allowed disabled:opacity-60"
                  required
                  disabled={loading}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full justify-center rounded-2xl! h-auto! min-h-14 px-6 text-sm font-semibold">
                {loading ? "Creating account..." : "Sign up"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#c6c6cd]/70" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6a7078]">or</span>
              <div className="h-px flex-1 bg-[#c6c6cd]/70" />
            </div>

            <p className="text-center text-sm text-[#45464d]">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-semibold text-[#00687a] transition hover:text-[#005867]">
                Sign in
              </Link>
            </p>
          </section>

          <section
            className="order-1 flex flex-col justify-between gap-8 rounded-[2.25rem] border border-white/70 bg-white/55 p-6 shadow-[0_24px_55px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-8 lg:order-2 lg:p-10"
            style={{ minHeight: "36rem" }}
          >
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00687a] transition hover:text-[#005867]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00201c] text-white shadow-[0_16px_28px_rgba(0,32,28,0.25)]">
                  <BusFront className="h-5 w-5" />
                </span>
                SafeTAP
              </Link>

              <div className="max-w-xl space-y-4">
                <p className="section-heading">Get started</p>
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#191c1e] sm:text-5xl lg:text-6xl">
                  A calm, trusted experience for every role.
                </h2>
                <p className="max-w-lg text-base leading-7 text-[#45464d] sm:text-lg">
                  Parents, teachers, and administrators all work from the same mobility and attendance system with clear role-based access.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Safe access",
                  copy: "Role-based views keep the right information in the right hands.",
                },
                {
                  icon: Sparkles,
                  title: "Modern UI",
                  copy: "Designed to match the polished, glassmorphism feel of SafeTAP.",
                },
                {
                  icon: BusFront,
                  title: "Mobility-first",
                  copy: "Built around buses, attendance, and live route awareness.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="glass-panel rounded-[1.75rem] p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00201c] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-[#191c1e]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#45464d]">{item.copy}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
