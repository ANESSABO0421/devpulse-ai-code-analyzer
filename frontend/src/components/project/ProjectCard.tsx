import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Project } from "@/types/project";
import { Layers, AlertCircle } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project._id}`} className="glass-card group block p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{project.name}</h3>
        <Badge tone="info" className="bg-accent/10 text-accent border-accent/20">{project.language}</Badge>
      </div>
      <p className="mb-6 text-sm leading-relaxed text-muted line-clamp-2">{project.description}</p>
      <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-muted">
        <span className="flex items-center gap-1.5">
          <Layers size={14} className="text-accent" />
          {project.reviewCount} Reviews
        </span>
        <span className="flex items-center gap-1.5">
          <AlertCircle size={14} className="text-rose-400" />
          {project.issueCount} Issues
        </span>
      </div>
    </Link>
  );
}
