const features = [
  ["AI Review", "Claude-generated summaries, scoring, and line-by-line suggestions."],
  ["Real-time Comments", "Threaded comments and typing indicators inside each review room."],
  ["GitHub Import", "Bring in file content from connected repositories without switching tabs."],
  ["Bug Tracker", "Turn review findings into issues with severity, status, and ownership."],
];

export function Features() {
  return (
    <section className="shell py-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Features</p>
          <h2 className="mt-2 text-4xl font-black">Everything your review loop needs</h2>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {features.map(([title, body]) => (
          <div key={title} className="card p-6">
            <h3 className="mb-3 text-2xl font-semibold">{title}</h3>
            <p className="text-[var(--muted)]">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
