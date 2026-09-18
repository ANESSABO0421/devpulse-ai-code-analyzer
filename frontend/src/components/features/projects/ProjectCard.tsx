import Link from "next/link";
import { memo } from "react";
import { Badge } from "@/components/ui/Badge";
import { Project } from "@/types/project";
import { Layers, AlertCircle } from "lucide-react";
import { DeleteButton } from "@/components/ui/DeleteButton";

export const ProjectCard = memo(function ProjectCard({
  project,
  canDelete = false,
  deleting = false,
  onDelete,
}: {
  project: Project;
  canDelete?: boolean;
  deleting?: boolean;
  onDelete?: (project: Project) => void | Promise<void>;
}) {
  return (
    <div className="premium-card pl-6 pr-6 py-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <Link href={`/projects/${project._id}`} className="min-w-0 flex-1">
          <h3 className="break-all text-lg font-extrabold text-[color:var(--foreground)] transition-colors group-hover:text-[color:var(--accent)]">{project.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{project.description}</p>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <Badge tone="info" className="border-2 border-[color:var(--edge)] bg-[color:var(--accent-quaternary)] font-extrabold text-[#1a0715]">{project.language}</Badge>
          {canDelete && onDelete ? (
            <DeleteButton
              pending={deleting}
              onClick={() => onDelete(project)}
              className="h-10 px-4 text-sm"
              label="Delete"
            />
          ) : null}
        </div>
      </div>
      <Link href={`/projects/${project._id}`} className="block">
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-muted">
          <span className="flex items-center gap-1.5">
            <Layers size={14} />
            {project.reviewCount} Reviews
          </span>
          <span className="flex items-center gap-1.5">
            <AlertCircle size={14} />
            {project.issueCount} Issues
          </span>
        </div>
      </Link>
    </div>
  );
});
