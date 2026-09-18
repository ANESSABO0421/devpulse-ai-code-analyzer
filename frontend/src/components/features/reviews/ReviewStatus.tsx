export function ReviewStatus({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-md border-2 border-[color:var(--edge)] bg-[color:var(--surface)] px-4 py-2 font-bold text-[color:var(--foreground)]"
    >
      <option value="pending">Pending</option>
      <option value="reviewed">Reviewed</option>
      <option value="resolved">Resolved</option>
    </select>
  );
}
