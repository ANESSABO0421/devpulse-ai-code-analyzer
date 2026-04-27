import { Response } from "express";
import User from "../models/User";
import { getUserRepos, getRepoContent } from "../services/github.service";

// GET USER REPOS
export const listRepos = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user?.githubAccessToken) {
      return res.status(400).json({
        message: "GitHub not connected",
      });
    }

    const repos = await getUserRepos(user.githubAccessToken);

    res.json({ repos });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// IMPORT FILE
export const importFile = async (req: any, res: Response) => {
  try {
    const { repoFullName, filePath, branch } = req.body;

    const user = await User.findById(req.user.id);

    if (!user?.githubAccessToken) {
      return res.status(400).json({
        message: "GitHub not connected",
      });
    }

    const data = await getRepoContent(
      user.githubAccessToken,
      repoFullName,
      filePath,
      branch
    );

    res.json({
      code: data.code,
      fileName: data.fileName,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};