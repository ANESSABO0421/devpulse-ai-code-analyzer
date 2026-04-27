"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { axiosInstance } from "@/lib/axios";
import { Issue } from "@/types/issue";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export default function IssueDetailPage() {
  useAuth();
  const params = useParams<{ issueId: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    axiosInstance.get(`/issues/${params.issueId}`).then(({ data }) => setIssue(data.issue));
  }, [params.issueId]);

  if (!issue) {
    return <AppShell><div className="card p-6">Loading issue...</div></AppShell>;
  }

  return (
    <AppShell>
      <div className="card p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h1 className="text-4xl font-black">{issue.title}</h1>
          <Badge tone={issue.severity === "critical" || issue.severity === "high" ? "danger" : "warning"}>{issue.severity}</Badge>
        </div>
        <p className="text-[var(--muted)]">{issue.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {issue.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
        <div className="mt-6 text-sm text-[var(--muted)]">Created {formatDate(issue.createdAt)}</div>
      </div>
      <div className="card flex items-center justify-between p-6">
        <div>
          <div className="text-sm text-[var(--muted)]">Current status</div>
          <div className="mt-1 text-2xl font-semibold">{issue.status}</div>
        </div>
        <Button
          onClick={async () => {
            const nextStatus = issue.status === "resolved" ? "closed" : "resolved";
            await axiosInstance.patch(`/issues/${issue._id}`, { status: nextStatus });
            setIssue({ ...issue, status: nextStatus });
            toast.success(`Issue moved to ${nextStatus}`);
          }}
        >
          Mark {issue.status === "resolved" ? "Closed" : "Resolved"}
        </Button>
      </div>
    </AppShell>
  );
}
