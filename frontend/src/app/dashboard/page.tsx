"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectStats } from "@/components/features/projects/ProjectStats";
import { ProjectCard } from "@/components/features/projects/ProjectCard";
import { ReviewCard } from "@/components/features/reviews/ReviewCard";
import { Button } from "@/components/ui/Button";
import { axiosInstance } from "@/lib/axios";
import { Project } from "@/types/project";
import { Review } from "@/types/review";
import { User, UserStats } from "@/types/user";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, Plus, FileCode } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
  const container = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<UserStats>({ reviewCount: 0, projectCount: 0, avgScore: 0 });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [openIssues, setOpenIssues] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
      setIsDataLoaded(true);
    });
  }, []);

  useGSAP(() => {
    if (!isDataLoaded) return;

    gsap.set([".dash-header", ".dash-stats", ".dash-section", ".dash-action"], { opacity: 0, y: 20 });

    const tl = gsap.timeline();
    
    tl.to(".dash-header", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    })
    .to(".dash-stats", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .to(".dash-section", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.4")
    .to(".dash-action", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.4");

  }, { scope: container, dependencies: [isDataLoaded] });

  const statsItems = useMemo(() => [
    { label: "Total Reviews", value: stats.reviewCount },
    { label: "Projects", value: stats.projectCount },
    { label: "Avg AI Score", value: stats.avgScore },
    { label: "Open Issues", value: openIssues },
  ], [stats, openIssues]);

  return (
    <AppShell>
      <div ref={container}>
        <section className="dash-header mb-10 flex items-end justify-between gap-4 border-b-[3px] border-[color:var(--edge)] pb-6">
          <div>
            <span className="section-label">Workspace</span>
            <h1 className="mt-3 text-4xl font-black leading-[0.95] tracking-tight text-[color:var(--foreground)] sm:text-5xl md:text-6xl">
              Dashboard<span className="text-[color:var(--accent)]">.</span>
            </h1>
          </div>
          <p className="hidden max-w-[15rem] rotate-1 border-2 border-[color:var(--edge)] bg-[color:var(--accent-tertiary)] px-3 py-2 text-right text-xs font-bold text-[#0b1613] sm:block">
            Track your reviews and projects at a glance.
          </p>
        </section>

        <div className="dash-stats mb-10">
          <ProjectStats items={statsItems} />
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          <section className="dash-section">
            <div className="mb-5 flex items-center justify-between border-b-[3px] border-[color:var(--edge)] pb-3">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[color:var(--foreground)]">Recent Reviews</h2>
              <Link href="/reviews">
                <Button variant="ghost" size="sm" className="group !px-0 text-xs font-semibold">
                  All Reviews <ArrowRight size={14} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => <ReviewCard key={review._id} review={review} />)
              ) : (
                <div className="flex h-32 flex-col items-center justify-center rounded-md border-[3px] border-dashed border-[color:var(--edge)] bg-[color:var(--surface-muted)] p-6 text-center">
                  <p className="font-semibold text-muted">No reviews found yet.</p>
                </div>
              )}
            </div>
          </section>

          <section className="dash-section">
            <div className="mb-5 flex items-center justify-between border-b-[3px] border-[color:var(--edge)] pb-3">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[color:var(--foreground)]">Active Projects</h2>
              <Link href="/projects">
                <Button variant="ghost" size="sm" className="group !px-0 text-xs font-semibold">
                  All Projects <ArrowRight size={14} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {projects.length > 0 ? (
                projects.map((project) => <ProjectCard key={project._id} project={project} />)
              ) : (
                <div className="flex h-32 flex-col items-center justify-center rounded-md border-[3px] border-dashed border-[color:var(--edge)] bg-[color:var(--surface-muted)] p-6 text-center">
                  <p className="font-semibold text-muted">No active projects.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            href="/reviews/new"
            className="dash-action group flex items-center justify-between gap-6 border-[3px] border-[color:var(--edge)] bg-[color:var(--accent)] p-7 text-[#191410] shadow-[var(--shadow-soft)] transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_0_var(--edge)]"
          >
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">New Review</h3>
              <p className="mt-1.5 text-sm font-semibold leading-relaxed">Paste code and get AI feedback.</p>
            </div>
            <FileCode size={26} className="shrink-0 transition-transform group-hover:rotate-6" />
          </Link>
          <Link
            href="/projects/new"
            className="dash-action group flex items-center justify-between gap-6 border-[3px] border-[color:var(--edge)] bg-[color:var(--accent-tertiary)] p-7 text-[#0b1613] shadow-[var(--shadow-soft)] transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_0_var(--edge)]"
          >
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">New Project</h3>
              <p className="mt-1.5 text-sm font-semibold leading-relaxed">Create a workspace for your team.</p>
            </div>
            <Plus size={26} className="shrink-0 transition-transform group-hover:rotate-90" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
