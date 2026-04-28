"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectStats } from "@/components/project/ProjectStats";
import { ReviewCard } from "@/components/review/ReviewCard";
import { IssueCard } from "@/components/issue/IssueCard";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { axiosInstance } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/api";
import { Project } from "@/types/project";
import { Review } from "@/types/review";
import { Issue } from "@/types/issue";
import { User } from "@/types/user";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { DeleteButton } from "@/components/ui/DeleteButton";

const tabs = ["reviews", "issues", "members"] as const;

export default function ProjectOverviewPage() {
  useAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const [tab, setTab] = useState<(typeof tabs)[number]>("reviews");
  const [project, setProject] = useState<Project | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    Promise.all([
      axiosInstance.get(`/projects/${params.id}`),
      axiosInstance.get("/reviews", { params: { projectId: params.id, limit: 8 } }),
      axiosInstance.get("/issues", { params: { projectId: params.id, limit: 8 } }),
    ])
      .then(([projectRes, reviewRes, issueRes]) => {
        setError(null);
        setProject(projectRes.data.project);
        setReviews(reviewRes.data.reviews);
        setIssues(issueRes.data.issues);
      })
      .catch((nextError: unknown) => {
        setError(getApiErrorMessage(nextError, "Failed to load project"));
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const members = useMemo(() => (Array.isArray(project?.members) ? (project?.members as User[]) : []), [project]);
  const isOwner = project?.ownerId === user?._id;

  async function inviteMember(event: React.FormEvent) {
    event.preventDefault();
    try {
      const { data } = await axiosInstance.post(`/projects/${params.id}/members`, { email });
      setProject(data.project);
      setEmail("");
      toast.success("Member invited");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Invite failed"));
    }
  }

  async function handleDeleteProject() {
    if (!project || !isOwner) return;
    if (!window.confirm(`Delete project "${project.name}"? This cannot be undone.`)) return;

    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/projects/${project._id}`);
      toast.success("Project deleted");
      router.push("/projects");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Delete failed"));
      setIsDeleting(false);
    }
  }

  if (loading) {
    return <AppShell><div className="card p-6">Loading project...</div></AppShell>;
  }

  if (error || !project) {
    return (
      <AppShell>
        <div className="card p-6">
          <h2 className="text-2xl font-semibold">Couldn&apos;t load this project</h2>
          <p className="mt-3 text-[var(--muted)]">
            {error || "This project may not exist anymore or you may not have access to it."}
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-5xl font-black">{project.name}</h1>
            <p className="mt-3 max-w-3xl text-[var(--muted)]">{project.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary">{project.language}</Button>
            {isOwner ? (
              <DeleteButton
                pending={isDeleting}
                onClick={handleDeleteProject}
                label="Delete Project"
              />
            ) : null}
          </div>
        </div>
      </section>

      <ProjectStats
        items={[
          { label: "Reviews", value: project.reviewCount },
          { label: "Issues", value: project.issueCount },
          { label: "Members", value: members.length },
        ]}
      />

      <div className="flex gap-3">
        {tabs.map((item) => (
          <Button key={item} variant={tab === item ? "primary" : "secondary"} onClick={() => setTab(item)}>
            {item}
          </Button>
        ))}
      </div>

      {tab === "reviews" ? <div className="grid gap-5">{reviews.map((review) => <ReviewCard key={review._id} review={review} />)}</div> : null}
      {tab === "issues" ? <div className="grid gap-5">{issues.map((issue) => <IssueCard key={issue._id} issue={issue} />)}</div> : null}
      {tab === "members" ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="card p-6">
            <h2 className="mb-5 text-2xl font-semibold">Members</h2>
            <div className="space-y-4">
              {members.map((member) => (
                <div key={member._id} className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white/70 p-4">
                  <Avatar user={member} />
                  <div>
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-sm text-[var(--muted)]">{member.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className="card space-y-4 p-6" onSubmit={inviteMember}>
            <h2 className="text-2xl font-semibold">Invite by Email</h2>
            <input className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="teammate@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Button type="submit">Invite Member</Button>
          </form>
        </div>
      ) : null}
    </AppShell>
  );
}
