"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectStats } from "@/components/project/ProjectStats";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ReviewCard } from "@/components/review/ReviewCard";
import { Button } from "@/components/ui/Button";
import { axiosInstance } from "@/lib/axios";
import { Project } from "@/types/project";
import { Review } from "@/types/review";
import { User, UserStats } from "@/types/user";
import { useAuth } from "@/hooks/useAuth";

interface IssueSummary {
  _id: string;
  status: string;
  projectId: string;
  reporterId: User | string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  useAuth();
  const [stats, setStats] = useState<UserStats>({ reviewCount: 0, projectCount: 0, avgScore: 0 });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [openIssues, setOpenIssues] = useState(0);

  useEffect(() => {
    Promise.all([
      axiosInstance.get("/users/stats"),
      axiosInstance.get("/reviews?page=1&limit=5"),
      axiosInstance.get("/projects?page=1&limit=5"),
      axiosInstance.get("/issues?page=1&limit=50"),
    ]).then(([statsRes, reviewsRes, projectsRes, issuesRes]) => {
      setStats(statsRes.data);
      setReviews(reviewsRes.data.reviews);
      setProjects(projectsRes.data.projects);
      setOpenIssues(
        (issuesRes.data.issues as IssueSummary[]).filter((issue) => issue.status !== "closed").length,
      );
    });
  }, []);

  return (
    <AppShell>
      <section>
        <h1 className="text-5xl font-black">Dashboard</h1>
        <p className="mt-3 text-[var(--muted)]">Track team velocity, recent reviews, and what still needs attention.</p>
      </section>

      <ProjectStats
        items={[
          { label: "Total Reviews", value: stats.reviewCount },
          { label: "Projects", value: stats.projectCount },
          { label: "Avg AI Score", value: stats.avgScore },
          { label: "Open Issues", value: openIssues },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent Reviews</h2>
            <Link href="/reviews"><Button variant="ghost">All Reviews</Button></Link>
          </div>
          <div className="space-y-4">
            {reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
          </div>
        </section>
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Active Projects</h2>
            <Link href="/projects"><Button variant="ghost">All Projects</Button></Link>
          </div>
          <div className="space-y-4">
            {projects.map((project) => <ProjectCard key={project._id} project={project} />)}
          </div>
        </section>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/reviews/new" className="card p-6">
          <h3 className="text-2xl font-semibold">New Review</h3>
          <p className="mt-2 text-[var(--muted)]">Paste code or GitHub-imported content and ask AI for a fresh review.</p>
        </Link>
        <Link href="/projects/new" className="card p-6">
          <h3 className="text-2xl font-semibold">New Project</h3>
          <p className="mt-2 text-[var(--muted)]">Create a workspace for teammates, issues, and review history.</p>
        </Link>
      </div>
    </AppShell>
  );
}
