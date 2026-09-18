"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function IssueForm({
  onSubmit,
  linkedReviewOptions = [],
}: {
  onSubmit: (payload: {
    title: string;
    description: string;
    severity: string;
    tags: string[];
    linkedReviewId?: string;
  }) => Promise<void>;
  linkedReviewOptions?: Array<{ label: string; value: string }>;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "medium",
    tags: "",
    linkedReviewId: "",
  });

  return (
    <form
      className="card space-y-4 p-6"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({
          title: form.title,
          description: form.description,
          severity: form.severity,
          tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
          linkedReviewId: form.linkedReviewId || undefined,
        });
        setForm({ title: "", description: "", severity: "medium", tags: "", linkedReviewId: "" });
      }}
    >
      <h3 className="text-xl font-semibold">Create Issue</h3>
      <input className="w-full rounded-2xl border border-[var(--line)] px-4 py-3" placeholder="Issue title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
      <textarea className="min-h-32 w-full rounded-2xl border border-[var(--line)] px-4 py-3" placeholder="Describe the bug or follow-up task" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
      <div className="grid gap-4 md:grid-cols-3">
        <select className="rounded-2xl border border-[var(--line)] px-4 py-3" value={form.severity} onChange={(event) => setForm({ ...form, severity: event.target.value })}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        <input className="rounded-2xl border border-[var(--line)] px-4 py-3" placeholder="frontend, api, auth" value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} />
        <select className="rounded-2xl border border-[var(--line)] px-4 py-3" value={form.linkedReviewId} onChange={(event) => setForm({ ...form, linkedReviewId: event.target.value })}>
          <option value="">No linked review</option>
          {linkedReviewOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit">Create Issue</Button>
    </form>
  );
}
