import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Issue } from "@/types/issue";

export function IssueCard({ issue }: { issue: Issue }) {
  const assignee = typeof issue.assigneeId === "string" ? undefined : issue.assigneeId;

  return (
    <Link href={`/projects/${issue.projectId}/issues/${issue._id}`} className="card block p-5 transition hover:-translate-y-1">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="min-w-0 flex-1 break-words text-lg font-semibold">{issue.title}</h3>
        <Badge tone={issue.severity === "critical" || issue.severity === "high" ? "danger" : issue.severity === "medium" ? "warning" : "info"} className="shrink-0">
          {issue.severity}
        </Badge>
      </div>
      <div className="mb-3 text-sm text-[var(--muted)]">{issue.status}</div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap gap-2">
          {issue.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        {assignee ? <Avatar user={assignee} size={34} /> : <span className="shrink-0 text-sm text-[var(--muted)]">Unassigned</span>}
      </div>
    </Link>
  );
}
