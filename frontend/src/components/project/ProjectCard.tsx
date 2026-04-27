import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project._id}`} className="card block p-5 transition hover:-translate-y-1">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <Badge>{project.language}</Badge>
      </div>
      <p className="mb-4 text-sm leading-6 text-[var(--muted)]">{project.description}</p>
      <div className="flex gap-4 text-sm text-[var(--muted)]">
        <span>{project.reviewCount} reviews</span>
        <span>{project.issueCount} issues</span>
      </div>
    </Link>
  );
}
