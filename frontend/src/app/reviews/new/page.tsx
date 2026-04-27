"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/AppShell";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import { Project } from "@/types/project";
import { useAuth } from "@/hooks/useAuth";

const supportedLanguages = [
  "typescript",
  "javascript",
  "python",
  "go",
  "css",
  "scss",
  "html",
  "json",
  "markdown",
  "yaml",
  "plaintext",
] as const;

function normalizeLanguage(value: string | null) {
  if (!value) {
    return "typescript";
  }

  return supportedLanguages.includes(value as (typeof supportedLanguages)[number])
    ? value
    : "typescript";
}

function NewReviewContent() {
  useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [form, setForm] = useState({
    projectId: "",
    title: searchParams.get("fileName") || "",
    language: normalizeLanguage(searchParams.get("language")),
    code: searchParams.get("code") || "",
  });

  useEffect(() => {
    axiosInstance
      .get("/projects", { params: { limit: 100 } })
      .then(({ data }) => {
        setProjects(data.projects);
        if (!form.projectId && data.projects[0]?._id) {
          setForm((current) => ({ ...current, projectId: data.projects[0]._id }));
        }
      })
      .finally(() => setLoadingProjects(false));
  }, [form.projectId]);

  async function handleSubmit() {
    if (!form.projectId) {
      toast.error("Select a project before submitting this review");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/reviews", form);
      toast.success("AI review generated");
      router.push(`/reviews/${data.review._id}`);
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Failed to create review"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div>
        <h1 className="text-5xl font-black">New Review</h1>
        <p className="mt-3 text-[var(--muted)]">Paste code, pick a project, and let AI review it while your team watches the thread.</p>
      </div>
      <div className="card space-y-4 p-6">
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <input className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Review title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <select className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3" value={form.projectId} onChange={(event) => setForm({ ...form, projectId: event.target.value })}>
            <option value="" disabled>
              {loadingProjects ? "Loading projects..." : projects.length ? "Select a project" : "Create a project first"}
            </option>
            {projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}
          </select>
          <select className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3" value={form.language} onChange={(event) => setForm({ ...form, language: event.target.value })}>
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="go">Go</option>
            <option value="css">CSS</option>
            <option value="scss">SCSS</option>
            <option value="html">HTML</option>
            <option value="json">JSON</option>
            <option value="markdown">Markdown</option>
            <option value="yaml">YAML</option>
            <option value="plaintext">Plain Text</option>
          </select>
        </div>
        {!projects.length && !loadingProjects ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            You need at least one project before creating a review.
          </div>
        ) : null}
        <CodeEditor value={form.code} language={form.language} onChange={(code) => setForm({ ...form, code })} />
        <Button disabled={loading || !form.projectId || !projects.length} onClick={handleSubmit}>
          {loading ? "AI is reviewing your code..." : "Submit Review"}
        </Button>
      </div>
    </AppShell>
  );
}

export default function NewReviewPage() {
  return (
    <Suspense fallback={<AppShell><div className="card p-6">Loading review draft...</div></AppShell>}>
      <NewReviewContent />
    </Suspense>
  );
}
