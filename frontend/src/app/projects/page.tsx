"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectCard } from "@/components/features/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { axiosInstance } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/api";
import { Project } from "@/types/project";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("");
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance
      .get("/projects", { params: { search, language } })
      .then(({ data }) => setProjects(data.projects));
  }, [language, search]);

  const handleDeleteProject = useCallback(
    async (project: Project) => {
      if (!user || project.ownerId !== user._id) return;
      if (!window.confirm(`Delete project "${project.name}"? This cannot be undone.`)) return;

      setDeletingProjectId(project._id);
      try {
        await axiosInstance.delete(`/projects/${project._id}`);
        setProjects((current) => current.filter((entry) => entry._id !== project._id));
        toast.success("Project deleted");
      } catch (error: unknown) {
        toast.error(getApiErrorMessage(error, "Delete failed"));
      } finally {
        setDeletingProjectId(null);
      }
    },
    [user],
  );

  return (
    <AppShell>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[color:var(--foreground)] md:text-5xl">Projects</h1>
          <p className="mt-2 text-lg text-muted">Manage your workspaces.</p>
        </div>
        <Link href="/projects/new"><Button>New Project</Button></Link>
      </div>
      <div className="card grid gap-4 p-5 md:grid-cols-[1fr_220px]">
        <input placeholder="Search projects" value={search} onChange={(event) => setSearch(event.target.value)} />
        <select value={language} onChange={(event) => setLanguage(event.target.value)}>
          <option value="">All languages</option>
          <option value="typescript">TypeScript</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="go">Go</option>
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            canDelete={project.ownerId === user?._id}
            deleting={deletingProjectId === project._id}
            onDelete={handleDeleteProject}
          />
        ))}
      </div>
    </AppShell>
  );
}
