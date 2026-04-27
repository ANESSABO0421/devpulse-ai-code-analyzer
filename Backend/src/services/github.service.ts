import axios from "axios";

export const getUserRepos = async (token: string) => {
  const res = await axios.get("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getRepoContent = async (
  token: string,
  repoFullName: string,
  path: string,
  branch = "main"
) => {
  const res = await axios.get(
    `https://api.github.com/repos/${repoFullName}/contents/${path}?ref=${branch}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // decode base64 content
  const content = Buffer.from(res.data.content, "base64").toString("utf-8");

  return {
    code: content,
    fileName: res.data.name,
  };
};