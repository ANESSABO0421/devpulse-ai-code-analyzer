"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/AppShell";
import { IssueCard } from "@/components/features/issues/IssueCard";
import { IssueForm } from "@/components/features/issues/IssueForm";
import { axiosInstance } from "@/lib/axios";
import { Issue } from "@/types/issue";
import { Review } from "@/types/review";
import { useAuth } from "@/hooks/useAuth";

export default function ProjectIssuesPage() {
  useAuth();
  const params = useParams<{ id: string }>();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("");

  const loadIssues = useCallback(() => {
    axiosInstance
      .get("/issues", { params: { projectId: params.id, status, severity } })
      .then(({ data }) => setIssues(data.issues));
  }, [params.id, severity, status]);

  useEffect(() => {
    loadIssues();
    axiosInstance
      .get("/reviews", { params: { projectId: params.id, limit: 50 } })
      .then(({ data }) => setReviews(data.reviews));
  }, [loadIssues, params.id]);

  return (
    <AppShell>
      <div>
        <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl break-words">Issue Tracker</h1>
        <p className="mt-3 text-[var(--muted)]">Convert review findings into a visible, trackable backlog.</p>
      </div>
      <div className="card grid gap-4 p-5 md:grid-cols-2">
        <select className="rounded-2xl border border-[var(--line)] px-4 py-3" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="">All statuses</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select className="rounded-2xl border border-[var(--line)] px-4 py-3" value={severity} onChange={(event) => setSeverity(event.target.value)}>
          <option value="">All severity levels</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <IssueForm
        linkedReviewOptions={reviews.map((review) => ({ value: review._id, label: review.title }))}
        onSubmit={async (payload) => {
          await axiosInstance.post("/issues", { ...payload, projectId: params.id });
          toast.success("Issue created");
          loadIssues();
        }}
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {issues.map((issue) => <IssueCard key={issue._id} issue={issue} />)}
      </div>
    </AppShell>
  );
}
