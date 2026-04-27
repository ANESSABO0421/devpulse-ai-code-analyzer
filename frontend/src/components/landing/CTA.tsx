import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="shell py-16">
      <div className="card overflow-hidden bg-[var(--foreground)] p-10 text-white">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-200">Ready to build?</p>
            <h2 className="mt-2 text-4xl font-black">Spin up your first review room in minutes.</h2>
          </div>
          <Link href="/register">
            <Button className="bg-white text-[var(--foreground)]">Create Workspace</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
