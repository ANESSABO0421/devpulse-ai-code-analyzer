"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import { getServerBaseUrl } from "@/lib/env";
import { useAuthStore } from "@/store/useAuthStore";

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
    <div className="shell py-16">
      <div className="card mx-auto max-w-lg p-8">
        <h1 className="text-4xl font-black">Log in to DevPulse</h1>
        <p className="mt-3 text-[var(--muted)]">Jump back into reviews, projects, and live issue tracking.</p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <input className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          <Button type="submit" className="w-full">{loading ? "Signing in..." : "Sign In"}</Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => {
              window.location.href = `${getServerBaseUrl()}/api/auth/github`;
            }}
          >
            Continue with GitHub
          </Button>
        </form>
      </div>
    </div>
  );
}
