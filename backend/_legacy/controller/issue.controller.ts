import { Response } from "express";
import Issue from "../models/Issue";
import Projects from "../models/Projects";

// CREATE ISSUE
export const createIssue = async (req: any, res: Response) => {
  try {
    const {
      projectId,
      title,
      description,
      severity,
      tags,
      linkedReviewId,
      assigneeId,
    } = req.body;

    const project = await Projects.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isMember = project.members.some((m) => m.toString() === req.user.id);

    if (!isMember) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const issue = await Issue.create({
      projectId,
      reporterId: req.user.id,
      assigneeId,
      title,
      description,
      severity,
      tags,
      linkedReviewId,
    });

    // increment issue count
    project.issueCount += 1;
    await project.save();

    res.status(201).json({ issue });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET ISSUES (IMPORTANT LOGIC)
export const getIssues = async (req: any, res: Response) => {
  try {
    const { projectId, status, severity, page = 1, limit = 10 } = req.query;

    const query: any = {};

    // ⚠️ If projectId is passed → verify access
    if (projectId) {
      const project = await Projects.findById(projectId);

      const isMember = project?.members.some(
        (m) => m.toString() === req.user.id,
      );

      if (!isMember) {
        return res.status(403).json({ message: "Not authorized" });
      }

      query.projectId = projectId;
    } else {
      // 🔥 Fetch all projects where user is member
      const projects = await Projects.find({
        members: req.user.id,
      }).select("_id");

      query.projectId = { $in: projects.map((p) => p._id) };
    }

    if (status) query.status = status;
    if (severity) query.severity = severity;

    const issues = await Issue.find(query)
      .populate("reporterId", "name avatar")
      .populate("assigneeId", "name avatar")
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Issue.countDocuments(query);

    res.json({ issues, total });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE ISSUE
export const getIssueById = async (req: any, res: Response) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("reporterId", "name avatar")
      .populate("assigneeId", "name avatar");

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const project = await Projects.findById(issue.projectId);

    const isMember = project?.members.some((m) => m.toString() === req.user.id);

    if (!isMember) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ issue });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ISSUE
export const updateIssue = async (req: any, res: Response) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const project = await Projects.findById(issue.projectId);

    const isMember = project?.members.some(
      (m: any) => m.toString() === req.user.id,
    );

    if (!isMember) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(issue, req.body);

    await issue.save();

    res.json({ issue });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ISSUE
export const deleteIssue = async (req: any, res: Response) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const project = await Projects.findById(issue.projectId);

    if (project?.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can delete" });
    }

    await issue.deleteOne();

    res.json({ message: "Issue deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
