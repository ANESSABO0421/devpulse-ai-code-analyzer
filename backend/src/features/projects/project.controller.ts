import { NextFunction, Request, Response } from "express";
import Project from "../../models/Project";
import User from "../../models/User";
import { createHttpError, sendSuccess } from "../../utils/response";

function isOwner(project: any, userId?: string) {
  return project.ownerId.toString() === userId;
}

function isMember(project: any, userId?: string) {
  return project.members.some((member: any) => member.toString() === userId);
}

function canAccessProject(project: any, userId?: string) {
  return isOwner(project, userId) || isMember(project, userId);
}

export async function createProject(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = req.user?._id;
    const project = await Project.create({
      ...req.body,
      ownerId,
      members: [ownerId],
    });

    return sendSuccess(res, { project }, 201);
  } catch (error) {
    next(error);
  }
}

export async function listProjects(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const language = req.query.language as string | undefined;
    const search = req.query.search as string | undefined;

    const query: Record<string, unknown> = {
      $or: [{ ownerId: req.user?._id }, { members: req.user?._id }],
    };
    if (language) {
      query.language = language;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Project.countDocuments(query),
    ]);

    return sendSuccess(res, {
      projects,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProjectById(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findById(req.params.id).populate("members", "name email avatar");
    if (!project) {
      throw createHttpError("Project not found", 404);
    }

    if (!canAccessProject(project, req.user?._id?.toString())) {
      throw createHttpError("Forbidden", 403);
    }

    return sendSuccess(res, { project, members: project.members });
  } catch (error) {
    next(error);
  }
}

export async function updateProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      throw createHttpError("Project not found", 404);
    }
    if (!isOwner(project, req.user?._id?.toString())) {
      throw createHttpError("Only the owner can update this project", 403);
    }

    project.name = req.body.name ?? project.name;
    project.description = req.body.description ?? project.description;
    await project.save();

    return sendSuccess(res, { project });
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      throw createHttpError("Project not found", 404);
    }
    if (!isOwner(project, req.user?._id?.toString())) {
      throw createHttpError("Only the owner can delete this project", 403);
    }

    await project.deleteOne();
    return sendSuccess(res, { message: "Project deleted" });
  } catch (error) {
    next(error);
  }
}

export async function addProjectMember(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      throw createHttpError("Project not found", 404);
    }
    if (!isOwner(project, req.user?._id?.toString())) {
      throw createHttpError("Only the owner can invite members", 403);
    }

    const user = await User.findOne({ email: req.body.email?.toLowerCase() });
    if (!user) {
      throw createHttpError("User not found", 404);
    }

    if (!isMember(project, user._id.toString())) {
      project.members.push(user._id);
      await project.save();
    }

    await project.populate("members", "name email avatar");

    return sendSuccess(res, { project });
  } catch (error) {
    next(error);
  }
}

export async function removeProjectMember(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      throw createHttpError("Project not found", 404);
    }
    if (!isOwner(project, req.user?._id?.toString())) {
      throw createHttpError("Only the owner can remove members", 403);
    }

    project.members = project.members.filter(
      (member) => member.toString() !== req.params.userId && member.toString() !== project.ownerId.toString(),
    );
    await project.save();

    await project.populate("members", "name email avatar");

    return sendSuccess(res, { project });
  } catch (error) {
    next(error);
  }
}
