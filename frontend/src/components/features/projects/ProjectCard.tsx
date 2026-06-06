import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Project } from "@/types/project";
import { Layers, AlertCircle } from "lucide-react";
import { DeleteButton } from "@/components/ui/DeleteButton";

export function ProjectCard({
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
    <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-6 hover:border-[#3B82F6] transition-colors">
      <div className="mb-4 flex items-start justify-between gap-4">
        <Link href={`/projects/${project._id}`} className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-[#F1F5F9] transition-colors group-hover:text-[#3B82F6]">{project.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-[#94A3B8] line-clamp-2">{project.description}</p>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <Badge tone="info" className="border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6]">{project.language}</Badge>
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
        <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
          <span className="flex items-center gap-1.5">
            <Layers size={14} className="text-[#3B82F6]" />
            {project.reviewCount} Reviews
          </span>
          <span className="flex items-center gap-1.5">
            <AlertCircle size={14} className="text-[#EF4444]" />
            {project.issueCount} Issues
          </span>
        </div>
      </Link>
    </div>
  );
}
