const steps = [
  ["Paste Code", "Start a review from scratch or import a file from GitHub."],
  ["AI Reviews", "Claude analyzes the code and returns a score, summary, and suggestions."],
  ["Team Comments", "Collaborate live with threaded comments and track follow-up issues."],
];

export function HowItWorks() {
  return (
    <section className="shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">How it works</p>
        <h2 className="mt-2 text-4xl font-black">Three steps from snippet to shipped fix</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map(([title, body], index) => (
          <div key={title} className="card p-6">
            <div className="mb-4 text-sm font-semibold text-[var(--accent)]">0{index + 1}</div>
            <h3 className="mb-3 text-2xl font-semibold">{title}</h3>
            <p className="text-[var(--muted)]">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
