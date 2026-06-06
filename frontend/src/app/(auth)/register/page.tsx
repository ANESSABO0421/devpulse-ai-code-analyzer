"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import { getServerBaseUrl } from "@/lib/env";
import { useAuthStore } from "@/store/useAuthStore";
import { User, Mail, Lock, UserPlus, GitBranch } from "lucide-react";

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
    <div className="flex min-h-screen items-center justify-center py-16">
      <div className="w-full max-w-md p-8">
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#F1F5F9]">Create account</h1>
          <p className="mt-2 text-[#94A3B8]">Get started with DevPulse</p>
        </section>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#94A3B8]">
              <User size={16} className="text-[#3B82F6]" />
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
            <label className="flex items-center gap-2 text-sm font-semibold text-[#94A3B8]">
              <Mail size={16} className="text-[#3B82F6]" />
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
            <label className="flex items-center gap-2 text-sm font-semibold text-[#94A3B8]">
              <Lock size={16} className="text-[#3B82F6]" />
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

          <Button type="submit" className="h-12 w-full text-base font-semibold bg-[#3B82F6] hover:bg-[#2563EB] text-white" disabled={loading}>
            <UserPlus size={18} className="mr-2" />
            {loading ? "Creating account..." : "Create Account"}
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#334155]"></div></div>
            <div className="relative flex justify-center text-xs"><span className="bg-[#0F172A] px-3 text-[#94A3B8]">Or continue with</span></div>
          </div>

          <Button
            type="button"
            variant="secondary"
            className="h-12 w-full text-base font-semibold border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]"
            onClick={() => {
              window.location.href = `${getServerBaseUrl()}/api/auth/github`;
            }}
          >
            <GitBranch size={18} className="mr-2" />
            GitHub
          </Button>

          <div className="text-center">
            <p className="text-[#94A3B8]">
              Already have an account?{" "}
              <a href="/login" className="text-[#3B82F6] font-semibold hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
