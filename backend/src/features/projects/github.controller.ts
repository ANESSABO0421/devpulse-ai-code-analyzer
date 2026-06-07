import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { fetchGithubFiles, fetchGithubRepos, importGithubFile } from "../../services/github.service";
import { createHttpError, sendSuccess } from "../../utils/response";

async function getGithubToken(userId?: string) {
  const user = await User.findById(userId).select("githubAccessToken");
  if (!user?.githubAccessToken) {
    throw createHttpError("Connect GitHub first to use import features", 400);
  }
  return user.githubAccessToken;
}

export async function listGithubRepos(req: Request, res: Response, next: NextFunction) {
  try {
    const repos = await fetchGithubRepos(await getGithubToken(req.user?._id?.toString()));
    return sendSuccess(res, { repos });
  } catch (error) {
    next(error);
  }
}

export async function listGithubFiles(req: Request, res: Response, next: NextFunction) {
  try {
    const repoFullName = req.query.repoFullName as string | undefined;
    const branch = req.query.branch as string | undefined;

    if (!repoFullName) {
      throw createHttpError("Repository is required", 400);
    }

    const files = await fetchGithubFiles(await getGithubToken(req.user?._id?.toString()), repoFullName, branch);
    return sendSuccess(res, { files });
  } catch (error) {
    next(error);
  }
}

export async function importRepoFile(req: Request, res: Response, next: NextFunction) {
  try {
    const { repoFullName, filePath, branch } = req.body;
    const result = await importGithubFile(
      await getGithubToken(req.user?._id?.toString()),
      repoFullName,
      filePath,
      branch,
    );

    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
}
