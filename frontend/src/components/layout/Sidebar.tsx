import Link from "next/link";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/projects/new", label: "New Project" },
  { href: "/reviews/new", label: "New Review" },
  { href: "/projects", label: "Projects" },
  { href: "/reviews", label: "Reviews" },
];

export function Sidebar() {
  return (
    <aside className="card hidden h-fit p-4 lg:block">
      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Workspace</div>
      <div className="space-y-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded-2xl px-4 py-3 hover:bg-white">
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
