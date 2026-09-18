"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api";
import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";
import { FileCode, FolderGit2, Search } from "lucide-react";

interface Repo {
  id: string;
  name: string;
  fullName: string;
  defaultBranch: string;
}

interface GithubFile {
  path: string;
  name: string;
  size?: number;
}

export default function GithubImportPage() {
  useAuth();
  const router = useRouter();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState("");
  const [fileSearch, setFileSearch] = useState("");
  const [files, setFiles] = useState<GithubFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [branches, setBranches] = useState<{name: string}[]>([]);
  const [loadingBranches, setLoadingBranches] = useState(false);
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

  useEffect(() => {
    if (!form.repoFullName) {
      setBranches([]);
      return;
    }

    const request = new AbortController();
    setLoadingBranches(true);

    axiosInstance
      .get("/github/branches", {
        params: { repoFullName: form.repoFullName },
        signal: request.signal,
      })
      .then(({ data }) => {
        setBranches(data.branches || []);
      })
      .catch((error: unknown) => {
        if (!request.signal.aborted) {
          toast.error(getApiErrorMessage(error, "Unable to load branches"));
        }
      })
      .finally(() => {
        if (!request.signal.aborted) {
          setLoadingBranches(false);
        }
      });

    return () => request.abort();
  }, [form.repoFullName]);

  useEffect(() => {
    if (!form.repoFullName) {
      setFiles([]);
      return;
    }

    const request = new AbortController();
    setLoadingFiles(true);
    setFileError(null);
    setFiles([]);
    setFileSearch("");

    axiosInstance
      .get("/github/files", {
        params: { repoFullName: form.repoFullName, branch: form.branch },
        signal: request.signal,
      })
      .then(({ data }) => {
        setFiles(data.files || []);
      })
      .catch((error: unknown) => {
        if (!request.signal.aborted) {
          setFileError(getApiErrorMessage(error, "Unable to load repository files"));
        }
      })
      .finally(() => {
        if (!request.signal.aborted) {
          setLoadingFiles(false);
        }
      });

    return () => request.abort();
  }, [form.repoFullName, form.branch]);

  const filteredRepos = useMemo(
    () => repos.filter((repo) => repo.fullName.toLowerCase().includes(search.toLowerCase())),
    [repos, search],
  );

  const filteredFiles = useMemo(
    () => files.filter((file) => file.path.toLowerCase().includes(fileSearch.toLowerCase())),
    [files, fileSearch],
  );

  const selectedFile = files.find((file) => file.path === form.filePath);

  function selectRepo(repo: Repo) {
    setForm({ repoFullName: repo.fullName, branch: repo.defaultBranch, filePath: "" });
  }

  return (
    <AppShell>
      <div>
        <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl break-words">GitHub Import</h1>
        <p className="mt-3 text-[var(--muted)]">Pick a connected repository, choose a file, and open it in a new review draft.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="card space-y-4 p-5">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted">
            <FolderGit2 size={16} className="text-accent" />
            Repositories
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              className="input-premium"
              placeholder="Search repos"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
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
            <div
              data-lenis-prevent
              className="max-h-[420px] space-y-3 overflow-y-auto overscroll-contain pr-2"
            >
              {loadingRepos ? (
                <div className="text-sm text-[var(--muted)]">Loading repositories...</div>
              ) : filteredRepos.length ? (
                filteredRepos.map((repo) => (
                  <button
                    key={repo.id}
                    className={`w-full rounded-xl border p-4 text-left transition-colors ${
                      form.repoFullName === repo.fullName
                        ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)]"
                        : "border-[var(--line)] bg-[color:var(--glass)] hover:border-[color:var(--accent)]/35"
                    }`}
                    onClick={() => selectRepo(repo)}
                  >
                    <div className="font-semibold truncate" title={repo.fullName}>{repo.fullName}</div>
                    <div className="truncate text-sm text-[var(--muted)]">Default branch: {repo.defaultBranch}</div>
                  </button>
                ))
              ) : (
                <div className="text-sm text-[var(--muted)]">No repositories found.</div>
              )}
            </div>
          )}
        </section>
        <section className="card space-y-5 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted">
                <FileCode size={16} className="text-accent" />
                Repository Files
              </div>
              <p className="mt-2 break-all text-sm text-muted">
                {form.repoFullName ? form.repoFullName : "Select a repository to browse files"}
              </p>
            </div>
            <select
              className="w-full md:w-48"
              value={form.branch}
              disabled={!form.repoFullName || loadingBranches}
              onChange={(event) => setForm({ ...form, branch: event.target.value, filePath: "" })}
            >
              {loadingBranches ? (
                <option value="">Loading...</option>
              ) : branches.length ? (
                branches.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))
              ) : (
                <option value={form.branch || ""}>{form.branch || "Branch"}</option>
              )}
            </select>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              className="input-premium"
              placeholder="Search files"
              value={fileSearch}
              disabled={!form.repoFullName || loadingFiles}
              onChange={(event) => setFileSearch(event.target.value)}
            />
          </div>

          <div className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-muted)]">
            <div data-lenis-prevent className="max-h-[410px] overflow-y-auto overscroll-contain">
              {!form.repoFullName ? (
                <div className="p-5 text-sm text-muted">Choose a repository from the left.</div>
              ) : loadingFiles ? (
                <div className="p-5 text-sm text-muted">Loading files...</div>
              ) : fileError ? (
                <div className="p-5 text-sm text-amber-600">{fileError}</div>
              ) : filteredFiles.length ? (
                filteredFiles.map((file) => (
                  <button
                    key={file.path}
                    className={`flex w-full items-center gap-3 border-b border-[color:var(--line)] px-4 py-3 text-left text-sm transition last:border-b-0 ${
                      form.filePath === file.path
                        ? "bg-[color:var(--accent-soft)] text-[color:var(--foreground)]"
                        : "hover:bg-[color:var(--glass)]"
                    }`}
                    onClick={() => setForm({ ...form, filePath: file.path })}
                  >
                    <FileCode size={16} className="shrink-0 text-accent" />
                    <span className="min-w-0 flex-1 truncate">{file.path}</span>
                    {file.size ? <span className="shrink-0 text-xs text-muted">{Math.ceil(file.size / 1024)} KB</span> : null}
                  </button>
                ))
              ) : (
                <div className="p-5 text-sm text-muted">No files found.</div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-[color:var(--line)] bg-[color:var(--glass)] p-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-widest text-muted">Selected file</div>
              <div className="mt-1 truncate font-semibold">{selectedFile?.path || "No file selected"}</div>
            </div>
            <Button
              className="shrink-0"
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
        </section>
      </div>
    </AppShell>
  );
}
