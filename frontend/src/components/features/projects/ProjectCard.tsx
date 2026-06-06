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
    <div className="glass-card group p-6 hover:border-[#00CFFF]/30 transition-all duration-300 hover:-translate-y-1">
      <div className="mb-4 flex items-start justify-between gap-4">
        <Link href={`/projects/${project._id}`} className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-white transition-colors group-hover:text-[#00CFFF]">{project.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-400 line-clamp-2">{project.description}</p>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <Badge tone="info" className="border-[#00CFFF]/30 bg-[#00CFFF]/10 text-[#00CFFF]">{project.language}</Badge>
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
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
          <span className="flex items-center gap-1.5">
            <Layers size={14} className="text-[#00CFFF]" />
            {project.reviewCount} Reviews
          </span>
          <span className="flex items-center gap-1.5">
            <AlertCircle size={14} className="text-[#ef4444]" />
            {project.issueCount} Issues
          </span>
        </div>
      </Link>
    </div>
  );
}
