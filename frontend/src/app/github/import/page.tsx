"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";

interface Repo {
  id: string;
  name: string;
  fullName: string;
  defaultBranch: string;
}

export default function GithubImportPage() {
  useAuth();
  const router = useRouter();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState("");
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [form, setForm] = useState({
    repoFullName: "",
    branch: "",
    filePath: "",
  });

  useEffect(() => {
    axiosInstance
      .get("/github/repos")
      .then(({ data }) => {
        setRepoError(null);
        setRepos(data.repos);
        if (data.repos[0]) {
          setForm((current) => ({
            ...current,
            repoFullName: data.repos[0].fullName,
            branch: data.repos[0].defaultBranch,
          }));
        }
      })
      .catch((error: unknown) => {
        setRepoError(getApiErrorMessage(error, "Unable to load your GitHub repositories"));
      })
      .finally(() => setLoadingRepos(false));
  }, []);

  const filteredRepos = useMemo(
    () => repos.filter((repo) => repo.fullName.toLowerCase().includes(search.toLowerCase())),
    [repos, search],
  );

  return (
    <AppShell>
      <div>
        <h1 className="text-5xl font-black">GitHub Import</h1>
        <p className="mt-3 text-[var(--muted)]">Search your connected repos, enter a file path, and open it in a new review draft.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="card p-6">
          <input className="mb-4 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Search repos" value={search} onChange={(event) => setSearch(event.target.value)} />
          {repoError ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              {repoError}
              <div className="mt-3">
                <Button
                  variant="secondary"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  Connect GitHub
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-h-[420px] space-y-3 overflow-auto">
              {loadingRepos ? (
                <div className="text-sm text-[var(--muted)]">Loading repositories...</div>
              ) : filteredRepos.length ? (
                filteredRepos.map((repo) => (
                  <button
                    key={repo.id}
                    className="w-full rounded-2xl border border-[var(--line)] bg-white/80 p-4 text-left"
                    onClick={() => setForm({ ...form, repoFullName: repo.fullName, branch: repo.defaultBranch })}
                  >
                    <div className="font-semibold">{repo.fullName}</div>
                    <div className="text-sm text-[var(--muted)]">Default branch: {repo.defaultBranch}</div>
                  </button>
                ))
              ) : (
                <div className="text-sm text-[var(--muted)]">No repositories found.</div>
              )}
            </div>
          )}
        </div>
        <div className="card space-y-4 p-6">
          <h2 className="text-2xl font-semibold">Import file</h2>
          <input className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="owner/repo" value={form.repoFullName} onChange={(event) => setForm({ ...form, repoFullName: event.target.value })} />
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="Branch" value={form.branch} onChange={(event) => setForm({ ...form, branch: event.target.value })} />
            <input className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3" placeholder="src/app/page.tsx" value={form.filePath} onChange={(event) => setForm({ ...form, filePath: event.target.value })} />
          </div>
          <Button
            disabled={Boolean(repoError) || !form.repoFullName || !form.filePath}
            onClick={async () => {
              try {
                const { data } = await axiosInstance.post("/github/import", form);
                router.push(
                  `/reviews/new?fileName=${encodeURIComponent(data.fileName)}&language=${encodeURIComponent(data.language)}&code=${encodeURIComponent(data.code)}`,
                );
              } catch (error: unknown) {
                toast.error(getApiErrorMessage(error, "Import failed"));
              }
            }}
          >
            Import into Review Draft
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
