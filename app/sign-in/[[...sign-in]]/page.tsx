"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Redirect based on role
      const role = data.user?.role;
      switch (role) {
        case "admin":
          router.push("/admin");
          break;
        case "teacher":
          router.push("/teachers");
          break;
        case "parent":
          router.push("/parents");
          break;
        default:
          router.push("/");
      }
    } catch {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="app-shell relative overflow-hidden">
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-50" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="glass-panel-strong rounded-[2.25rem] p-6 sm:p-8 lg:p-10 w-lg">
          <div className="mb-8 space-y-2">
            <p className="section-heading">Sign in</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#191c1e]">
              Access your dashboard
            </h2>
            <p className="text-sm leading-6 text-[#45464d]">
              Use your SafeTAP account to continue.
            </p>
          </div>
          
          {error && (
            <div className="mb-5 rounded-[1.25rem] border border-[#ba1a1a]/20 bg-[#fff1f1] p-4 text-sm text-[#8b1d1d]">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-[#45464d]"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-[#191c1e] outline-none transition placeholder:text-[#7a7f87] focus:border-[#00687a]/30 focus:ring-4 focus:ring-[#57dffe]/25 disabled:cursor-not-allowed disabled:opacity-60"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-[#45464d]"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 pr-12 text-[#191c1e] outline-none transition placeholder:text-[#7a7f87] focus:border-[#00687a]/30 focus:ring-4 focus:ring-[#57dffe]/25 disabled:cursor-not-allowed disabled:opacity-60"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-[#45464d] transition hover:text-[#191c1e]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full justify-center rounded-2xl! h-auto! min-h-14 px-6 text-sm font-semibold"
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#c6c6cd]/70" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6a7078]">
              or
            </span>
            <div className="h-px flex-1 bg-[#c6c6cd]/70" />
          </div>

          <p className="text-center text-sm text-[#45464d]">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-[#00687a] transition hover:text-[#005867]"
            >
              Sign up
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
