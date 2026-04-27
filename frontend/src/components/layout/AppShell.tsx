import { Sidebar } from "@/components/layout/Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell grid gap-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
      <Sidebar />
      <div className="space-y-6">{children}</div>
    </div>
  );
}
