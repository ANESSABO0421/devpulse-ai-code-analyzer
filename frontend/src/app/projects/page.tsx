"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Button } from "@/components/ui/Button";
import { axiosInstance } from "@/lib/axios";
import { Project } from "@/types/project";
import { useAuth } from "@/hooks/useAuth";

export default function ProjectsPage() {
  useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/projects", { params: { search, language } })
      .then(({ data }) => setProjects(data.projects));
  }, [language, search]);

  return (
    <AppShell>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-5xl font-black">Projects</h1>
          <p className="mt-3 text-[var(--muted)]">Filter by language, scan activity, and jump into a workspace.</p>
        </div>
        <Link href="/projects/new"><Button>New Project</Button></Link>
      </div>
      <div className="card grid gap-4 p-5 md:grid-cols-[1fr_220px]">
        <input className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Search projects" value={search} onChange={(event) => setSearch(event.target.value)} />
        <select className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3" value={language} onChange={(event) => setLanguage(event.target.value)}>
          <option value="">All languages</option>
          <option value="typescript">TypeScript</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="go">Go</option>
        </select>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => <ProjectCard key={project._id} project={project} />)}
      </div>
    </AppShell>
  );
}
