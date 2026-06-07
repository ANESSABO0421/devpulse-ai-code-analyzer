import { Sidebar } from "@/components/layout/Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell grid gap-6 py-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:py-8">
      <Sidebar />
      <div className="min-w-0 space-y-6">{children}</div>
    </div>
  );
}
