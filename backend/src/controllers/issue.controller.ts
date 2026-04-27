import { NextFunction, Request, Response } from "express";
import Issue from "../models/Issue";
import Project from "../models/Project";
import { createHttpError, sendSuccess } from "../utils/response";

async function ensureProjectMember(projectId: string, userId?: string) {
  const project = await Project.findById(projectId);
  if (!project) {
    throw createHttpError("Project not found", 404);
  }
  const allowed =
    project.ownerId.toString() === userId ||
    project.members.some((member) => member.toString() === userId);
  if (!allowed) {
    throw createHttpError("Forbidden", 403);
  }
  return project;
}

export async function createIssue(req: Request, res: Response, next: NextFunction) {
  try {
    const { projectId } = req.body;
    await ensureProjectMember(projectId, req.user?._id?.toString());

    const issue = await Issue.create({
      ...req.body,
      reporterId: req.user?._id,
    });

    await Project.findByIdAndUpdate(projectId, { $inc: { issueCount: 1 } });

    return sendSuccess(res, { issue }, 201);
  } catch (error) {
    next(error);
  }
}

export async function listIssues(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const query: Record<string, unknown> = {};

    if (req.query.projectId) {
      await ensureProjectMember(String(req.query.projectId), req.user?._id?.toString());
      query.projectId = req.query.projectId;
    } else {
      const projects = await Project.find({
        $or: [{ ownerId: req.user?._id }, { members: req.user?._id }],
      }).select("_id");
      query.projectId = { $in: projects.map((project) => project._id) };
    }
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.severity) {
      query.severity = req.query.severity;
    }

    const [issues, total] = await Promise.all([
      Issue.find(query)
        .populate("assigneeId", "name avatar")
        .populate("reporterId", "name avatar")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Issue.countDocuments(query),
    ]);

    return sendSuccess(res, {
      issues,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    next(error);
  }
}

export async function getIssueById(req: Request, res: Response, next: NextFunction) {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("assigneeId", "name avatar")
      .populate("reporterId", "name avatar");

    if (!issue) {
      throw createHttpError("Issue not found", 404);
    }

    await ensureProjectMember(issue.projectId.toString(), req.user?._id?.toString());

    return sendSuccess(res, { issue });
  } catch (error) {
    next(error);
  }
}

export async function updateIssue(req: Request, res: Response, next: NextFunction) {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      throw createHttpError("Issue not found", 404);
    }

    await ensureProjectMember(issue.projectId.toString(), req.user?._id?.toString());
    Object.assign(issue, req.body);
    await issue.save();

    return sendSuccess(res, { issue });
  } catch (error) {
    next(error);
  }
}

export async function deleteIssue(req: Request, res: Response, next: NextFunction) {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      throw createHttpError("Issue not found", 404);
    }

    await ensureProjectMember(issue.projectId.toString(), req.user?._id?.toString());
    await issue.deleteOne();
    await Project.findByIdAndUpdate(issue.projectId, { $inc: { issueCount: -1 } });

    return sendSuccess(res, { message: "Issue deleted" });
  } catch (error) {
    next(error);
  }
}
