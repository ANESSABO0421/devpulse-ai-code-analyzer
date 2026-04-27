export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--line)] py-10 text-sm text-[var(--muted)]">
      <div className="shell flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <span>DevPulse helps teams review, discuss, and track code decisions together.</span>
        <span>Built for AI-assisted reviews with real-time collaboration.</span>
      </div>
    </footer>
  );
}
