"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import { getServerBaseUrl } from "@/lib/env";
import { useAuthStore } from "@/store/useAuthStore";
import { User, Mail, Lock, UserPlus, GitBranch, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/register", form);
      setAuth(data.user, data.token);
      toast.success("Account created");
      router.push("/dashboard");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Registration failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-16 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00CFFF]/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-[#6366f1]/20 blur-3xl" />
      
      <div className="relative z-10 glass-card mx-auto w-full max-w-lg p-10 md:p-12 border-[#00CFFF]/20 shadow-2xl shadow-[#00CFFF]/10">
        <section className="mb-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00CFFF]/30 bg-[#00CFFF]/10 px-4 py-2 text-sm font-semibold text-[#00CFFF]">
            <Sparkles size={16} className="animate-pulse" />
            <span>Get Started</span>
          </div>
          <h1 className="text-5xl font-black text-white md:text-6xl">Join DevPulse</h1>
          <p className="mt-4 text-xl text-slate-400">Set up your workspace and ship cleaner code with AI.</p>
        </section>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <User size={14} className="text-[#00CFFF]" />
              Full Name
            </label>
            <input
              className="w-full"
              placeholder="Jane Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Mail size={14} className="text-[#6366f1]" />
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
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Lock size={14} className="text-[#ec4899]" />
              Password
            </label>
            <input
              className="w-full"
              placeholder="Min. 8 characters"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="h-14 w-full text-base font-semibold bg-gradient-to-r from-[#00CFFF] to-[#6366f1] hover:from-[#00CFFF]/90 hover:to-[#6366f1]/90 shadow-lg shadow-[#00CFFF]/25" disabled={loading}>
            <UserPlus size={20} className="mr-2" />
            {loading ? "Creating account..." : "Create Account"}
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#020617] px-3 text-slate-400">Or continue with</span></div>
          </div>

          <Button
            type="button"
            variant="secondary"
            className="h-14 w-full text-base font-semibold border-[#6366f1]/30 bg-[#6366f1]/10 text-[#6366f1] hover:bg-[#6366f1]/20"
            onClick={() => {
              window.location.href = `${getServerBaseUrl()}/api/auth/github`;
            }}
          >
            <GitBranch size={20} className="mr-2" />
            GitHub Account
          </Button>
        </form>
      </div>
    </div>
  );
}
