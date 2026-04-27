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
      className="rounded-full border border-[var(--line)] bg-white px-4 py-2"
    >
      <option value="pending">Pending</option>
      <option value="reviewed">Reviewed</option>
      <option value="resolved">Resolved</option>
    </select>
  );
}
