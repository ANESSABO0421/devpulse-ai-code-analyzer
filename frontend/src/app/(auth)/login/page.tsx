"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { getApiErrorMessage } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import { getServerBaseUrl } from "@/lib/env";
import { useAuthStore } from "@/store/useAuthStore";
import { Mail, Lock, LogIn, GitBranch } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/login", form);
      setAuth(data.user, data.token);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Login failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your DevPulse workspace">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--accent)]" />
            <input
              className="w-full !pl-10"
              placeholder="name@company.com"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--accent)]" />
            <input
              className="w-full !pl-10"
              placeholder="Enter your password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
        </div>

        <Button type="submit" className="h-12 w-full" disabled={loading}>
          <LogIn size={17} />
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <div className="divider-or py-2">Or continue with</div>

        <Button
          type="button"
          variant="secondary"
          className="h-12 w-full"
          onClick={() => {
            window.location.href = `${getServerBaseUrl()}/api/auth/github`;
          }}
        >
          <GitBranch size={17} />
          Continue with GitHub
        </Button>

        <p className="text-center text-sm text-[color:var(--muted)]">
          Don&apos;t have an account?{" "}
          <a href="/register" className="font-semibold text-[color:var(--accent)] transition-colors hover:underline">
            Create one free
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
