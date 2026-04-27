"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import { getServerBaseUrl } from "@/lib/env";
import { useAuthStore } from "@/store/useAuthStore";
import { Mail, Lock, LogIn, GitCommit, } from "lucide-react";

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
      toast.success("Welcome back");
      router.push("/dashboard");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Login failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-16">
      <div className="glass-card mx-auto w-full max-w-lg p-10 md:p-12">
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-black text-white">Welcome Back</h1>
          <p className="mt-4 text-muted">Jump back into your AI-powered code review workspace.</p>
        </section>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted opacity-60">
              <Mail size={12} />
              Email Address
            </label>
            <input
              className="w-full"
              placeholder="name@company.com"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted opacity-60">
              <Lock size={12} />
              Password
            </label>
            <input
              className="w-full"
              placeholder="••••••••"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="h-14 w-full text-base" disabled={loading}>
            <LogIn size={20} className="mr-2" />
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#020617] px-2 text-muted">Or continue with</span></div>
          </div>

          <Button
            type="button"
            variant="secondary"
            className="h-14 w-full text-base"
            onClick={() => {
              window.location.href = `${getServerBaseUrl()}/api/auth/github`;
            }}
          >
            <GitCommit size={20} className="mr-2" />
            GitHub Account
          </Button>
        </form>
      </div>
    </div>
  );
}
