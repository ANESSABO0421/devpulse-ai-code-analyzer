import axios from "axios";
import { detectLanguage } from "../utils/language";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

export async function fetchGithubRepos(accessToken: string) {
  const { data } = await githubApi.get("/user/repos", {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { sort: "updated", per_page: 100 },
  });

  return data.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    private: repo.private,
    defaultBranch: repo.default_branch,
    owner: repo.owner?.login,
    htmlUrl: repo.html_url,
  }));
}

export async function fetchGithubBranches(accessToken: string, repoFullName: string) {
  const { data } = await githubApi.get(`/repos/${repoFullName}/branches`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data.map((branch: any) => ({
    name: branch.name,
  }));
}

export async function fetchGithubFiles(accessToken: string, repoFullName: string, branch?: string) {
  const { data } = await githubApi.get(`/repos/${repoFullName}/git/trees/${branch || "HEAD"}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { recursive: "1" },
  });

  return (data.tree || [])
    .filter((item: any) => item.type === "blob")
    .map((item: any) => ({
      path: item.path,
      name: item.path.split("/").pop(),
      size: item.size,
    }));
}

export async function importGithubFile(
  accessToken: string,
  repoFullName: string,
  filePath: string,
  branch?: string,
) {
  const { data } = await githubApi.get(`/repos/${repoFullName}/contents/${filePath}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: branch ? { ref: branch } : undefined,
  });

  const code = Buffer.from(data.content, "base64").toString("utf8");

  return {
    code,
    language: detectLanguage(data.name, code),
    fileName: data.name,
  };
}
