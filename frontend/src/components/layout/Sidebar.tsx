"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, FileText, Briefcase, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/projects/new", label: "New Project", icon: PlusCircle },
  { href: "/reviews/new", label: "New Review", icon: MessageSquare },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/reviews", label: "Reviews", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-card hidden h-fit p-6 lg:block min-w-[240px]">
      <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-muted opacity-60">Workspace</div>
      <div className="space-y-1.5">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "sidebar-item-active" 
                  : "sidebar-item"
              )}
            >
              <item.icon size={18} className={cn("transition-transform group-hover:scale-110", isActive ? "text-white" : "text-muted group-hover:text-white")} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
