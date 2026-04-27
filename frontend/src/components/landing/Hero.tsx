import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="shell grid items-center gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--accent)]">
          AI code reviews with a live team pulse
        </div>
        <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
          Review code faster, catch more, and keep the whole team in sync.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          DevPulse combines Claude-powered review feedback, real-time threaded comments, GitHub imports, and issue tracking in one workspace.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
          <Link href="/reviews/new">
            <Button variant="secondary">View Demo</Button>
          </Link>
        </div>
      </div>
      <div className="card grid-dots relative overflow-hidden p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-semibold text-white">Monaco Preview</span>
          <span className="text-sm text-[var(--muted)]">Live AI scan</span>
        </div>
        <div className="rounded-[22px] bg-[#1b2230] p-5 font-mono text-sm text-slate-200">
          <div className="mb-4 text-emerald-300">function createReview(req, res) {"{"}</div>
          <div className="mb-2 text-slate-400">  const project = await Project.findById(projectId);</div>
          <div className="mb-2 bg-amber-400/15 px-2 py-1 text-amber-200">  if (!project) throw new Error(&quot;Project not found&quot;);</div>
          <div className="mb-2 bg-sky-400/15 px-2 py-1 text-sky-200">  const analysis = await analyzeCode(code, language);</div>
          <div className="mb-2 bg-emerald-400/15 px-2 py-1 text-emerald-200">  return sendSuccess(res, {"{"} review {"}"});</div>
          <div>{"}"}</div>
        </div>
        <div className="absolute -right-6 bottom-6 rounded-3xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-xl">
          Score 84
        </div>
      </div>
    </section>
  );
}
