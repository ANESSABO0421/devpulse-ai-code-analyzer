"use client";

import { useEffect, useState, useMemo, useRef } from "react";
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

    // Initial states
    gsap.set([".dash-header", ".dash-stats", ".dash-section", ".dash-action"], { opacity: 0, y: 30 });

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
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.4")
    .to(".dash-action", {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.6");

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
        <section className="dash-header mb-10">
          <h1 className="text-4xl font-black text-white md:text-5xl">Dashboard</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Track team velocity, recent reviews, and what still needs attention in your workspaces.
          </p>
        </section>

        <div className="dash-stats mb-10">
          <ProjectStats items={statsItems} />
        </div>

        <div className="grid gap-10 xl:grid-cols-2">
          <section className="dash-section">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Recent Reviews</h2>
              <Link href="/reviews">
                <Button variant="ghost" className="group text-sm">
                  All Reviews <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => <ReviewCard key={review._id} review={review} />)
              ) : (
                <div className="glass-card flex h-32 flex-col items-center justify-center p-6 text-center">
                  <p className="text-muted">No reviews found yet.</p>
                </div>
              )}
            </div>
          </section>

          <section className="dash-section">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Active Projects</h2>
              <Link href="/projects">
                <Button variant="ghost" className="group text-sm">
                  All Projects <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {projects.length > 0 ? (
                projects.map((project) => <ProjectCard key={project._id} project={project} />)
              ) : (
                <div className="glass-card flex h-32 flex-col items-center justify-center p-6 text-center">
                  <p className="text-muted">No active projects.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link href="/reviews/new" className="dash-action glass-card group flex flex-col p-8 hover:border-accent/40">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
              <FileCode size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-accent">New Review</h3>
            <p className="mt-3 text-muted leading-relaxed">
              Paste code or GitHub-imported content and ask AI for a fresh review.
            </p>
          </Link>
          <Link href="/projects/new" className="dash-action glass-card group flex flex-col p-8 hover:border-accent/40">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
              <Plus size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-accent">New Project</h3>
            <p className="mt-3 text-muted leading-relaxed">
              Create a workspace for teammates, issues, and review history.
            </p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
