"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import { getServerBaseUrl } from "@/lib/env";
import { useAuthStore } from "@/store/useAuthStore";

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
    <div className="shell py-16">
      <div className="card mx-auto max-w-lg p-8">
        <h1 className="text-4xl font-black">Create your DevPulse workspace</h1>
        <p className="mt-3 text-[var(--muted)]">Set up projects, invite teammates, and run AI reviews.</p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <input className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <input className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          <Button type="submit" className="w-full">{loading ? "Creating account..." : "Create Account"}</Button>
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
