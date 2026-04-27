export function ProjectStats({
  items,
}: {
  items: Array<{ label: string; value: string | number }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="card p-5">
          <div className="text-sm text-[var(--muted)]">{item.label}</div>
          <div className="mt-2 text-3xl font-semibold">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
