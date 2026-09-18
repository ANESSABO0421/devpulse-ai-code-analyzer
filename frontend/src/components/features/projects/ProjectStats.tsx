const TILE_COLORS = ["var(--accent)", "var(--accent-tertiary)", "var(--accent-quaternary)", "var(--accent-secondary)"];
const TILE_INK = ["#191410", "#0b1613", "#1a0715", "#191410"];
const TILT = ["-1deg", "0.8deg", "-0.6deg", "1.1deg"];

export function ProjectStats({
  items,
}: {
  items: Array<{ label: string; value: string | number }>;
}) {
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.label}
          className="stat-tile border-[3px] border-[color:var(--edge)] px-5 py-5 shadow-[var(--shadow-soft-sm)] transition-transform duration-150"
          style={{
            background: TILE_COLORS[index % TILE_COLORS.length],
            color: TILE_INK[index % TILE_INK.length],
            ["--tilt" as string]: TILT[index % TILT.length],
          }}
        >
          <div className="text-[11px] font-extrabold uppercase tracking-wider opacity-80">{item.label}</div>
          <div className="mt-2 font-mono text-[2rem] font-black leading-none">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
