"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";
import { FolderPlus, Globe, Code2, GitBranch, } from "lucide-react";

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
      <section className="mb-10">
        <h1 className="text-4xl font-black text-[color:var(--foreground)] md:text-5xl">Create Project</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Spin up a professional code review hub for your repository, team, and automated issue tracking.
        </p>
      </section>

      <form className="glass-card max-w-3xl space-y-8 p-8 md:p-10" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted">
            <FolderPlus size={16} className="text-accent" />
            Project Name
          </label>
          <input
            className="w-full"
            placeholder="e.g. DevPulse Frontend"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted">
            <Globe size={16} className="text-accent" />
            Workspace Description
          </label>
          <textarea
            className="min-h-[120px] w-full"
            placeholder="What is this workspace for?"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted">
              <Code2 size={16} className="text-accent" />
              Primary Language
            </label>
            <select
              className="w-full"
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="java">Java</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted">
              <GitBranch size={16} className="text-accent" />
              GitHub Repository
            </label>
            <input
              className="w-full"
              placeholder="owner/repo"
              value={form.githubRepo}
              onChange={(e) => setForm({ ...form, githubRepo: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" className="h-14 w-full text-base sm:w-auto sm:px-12">
            Create Workspace
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
