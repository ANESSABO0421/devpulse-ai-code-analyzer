"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/AppShell";
import { CodeEditor } from "@/components/features/reviews/CodeEditor";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import { Project } from "@/types/project";
import { useAuth } from "@/hooks/useAuth";
import { FileEdit, Layers, Brackets, AlertTriangle } from "lucide-react";

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
      <section className="mb-10">
        <h1 className="text-3xl font-black text-white sm:text-4xl md:text-5xl">New Review</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Paste code or import from GitHub. Let our AI analyze security, performance, and best practices in seconds.
        </p>
      </section>

      <div className="glass-card space-y-8 p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted">
              <FileEdit size={16} className="text-accent" />
              Review Title
            </label>
            <input 
              className="w-full" 
              placeholder="e.g. Auth logic refactor" 
              value={form.title} 
              onChange={(e) => setForm({ ...form, title: e.target.value })} 
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted">
              <Layers size={16} className="text-accent" />
              Project Workspace
            </label>
            <select 
              className="w-full" 
              value={form.projectId} 
              onChange={(e) => setForm({ ...form, projectId: e.target.value })}
            >
              <option value="" disabled>
                {loadingProjects ? "Loading projects..." : projects.length ? "Select a project" : "Create a project first"}
              </option>
              {projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted">
              <Brackets size={16} className="text-accent" />
              Language
            </label>
            <select 
              className="w-full" 
              value={form.language} 
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            >
              {supportedLanguages.map(lang => (
                <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {!projects.length && !loadingProjects ? (
          <div className="flex items-center gap-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-5 text-amber-200">
            <AlertTriangle size={24} className="shrink-0" />
            <p className="text-sm font-medium">You need at least one project before creating a review.</p>
          </div>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-white/5">
          <CodeEditor value={form.code} language={form.language} onChange={(code) => setForm({ ...form, code })} />
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            className="h-14 w-full text-base sm:w-auto sm:px-12" 
            disabled={loading || !form.projectId || !projects.length} 
            onClick={handleSubmit}
          >
            {loading ? "AI is reviewing your code..." : "Submit for Review"}
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

export default function NewReviewPage() {
  return (
    <Suspense fallback={<AppShell><div className="glass-card p-10 text-center text-muted">Loading review draft...</div></AppShell>}>
      <NewReviewContent />
    </Suspense>
  );
}
