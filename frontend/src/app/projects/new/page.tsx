"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";

export default function NewProjectPage() {
  useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    language: "typescript",
    githubRepo: "",
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const { data } = await axiosInstance.post("/projects", form);
      toast.success("Project created");
      router.push(`/projects/${data.project._id}`);
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Failed to create project"));
    }
  }

  return (
    <AppShell>
      <div>
        <h1 className="text-5xl font-black">Create Project</h1>
        <p className="mt-3 text-[var(--muted)]">Spin up a code review hub for your repo, teammates, and issue backlog.</p>
      </div>
      <form className="card max-w-3xl space-y-4 p-6" onSubmit={handleSubmit}>
        <input className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Project name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <textarea className="min-h-40 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Describe this workspace" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        <div className="grid gap-4 md:grid-cols-2">
          <select className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3" value={form.language} onChange={(event) => setForm({ ...form, language: event.target.value })}>
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="go">Go</option>
          </select>
          <input className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="owner/repo (optional)" value={form.githubRepo} onChange={(event) => setForm({ ...form, githubRepo: event.target.value })} />
        </div>
        <Button type="submit">Create Project</Button>
      </form>
    </AppShell>
  );
}
