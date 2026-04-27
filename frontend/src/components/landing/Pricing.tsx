export function Pricing() {
  return (
    <section className="shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Pricing</p>
        <h2 className="mt-2 text-4xl font-black">Start free, upgrade when the team grows</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-2xl font-semibold">Free</h3>
          <p className="mt-2 text-5xl font-black">$0</p>
          <p className="mt-4 text-[var(--muted)]">Perfect for solo builders and early-stage teams.</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>Up to 3 projects</li>
            <li>Basic AI review runs</li>
            <li>Live comments and issues</li>
          </ul>
        </div>
        <div className="card border-[var(--accent)] p-6">
          <h3 className="text-2xl font-semibold">Pro</h3>
          <p className="mt-2 text-5xl font-black">$19</p>
          <p className="mt-4 text-[var(--muted)]">For teams that want unlimited reviews and richer collaboration.</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>Unlimited projects</li>
            <li>Priority AI review runs</li>
            <li>GitHub import and workspace scale-up</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
