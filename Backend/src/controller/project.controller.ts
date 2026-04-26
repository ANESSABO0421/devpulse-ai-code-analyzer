import { Request, Response } from "express";
import Projects from "../models/Projects";
import User from "../models/User";

// CREATE PROJECT
export const createProject = async (req: any, res: Response) => {
  try {
    const { name, description, language, githubRepo } = req.body;

    const project = await Projects.create({
      name,
      description,
      language,
      githubRepo,
      ownerId: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json({ project });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PROJECTS (USER PROJECTS)
export const getProjects = async (req: any, res: Response) => {
  try {
    const { page = 1, limit = 10, language } = req.query;

    const query: any = {
      members: req.user.id,
    };

    if (language) query.language = language;

    const projects = await Projects.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Projects.countDocuments(query);

    res.json({
      projects,
      total,
      page: Number(page),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PROJECT
export const getProjectById = async (req: any, res: Response) => {
  try {
    const project = await Projects.findById(req.params.id).populate(
      "members",
      "name email avatar"
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Authorization check
    if (!project.members.includes(req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ project });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROJECT
export const updateProject = async (req: any, res: Response) => {
  try {
    const { name, description } = req.body;

    const project = await Projects.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can update" });
    }

    project.name = name || project.name;
    project.description = description || project.description;

    await project.save();

    res.json({ project });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROJECT
export const deleteProject = async (req: any, res: Response) => {
  try {
    const project = await Projects.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can delete" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ADD MEMBER
export const addMember = async (req: any, res: Response) => {
  try {
    const { email } = req.body;

    const project = await Projects.findById(req.params.id);

    const user = await User.findOne({ email });

    if (!project || !user) {
      return res.status(404).json({ message: "Project or user not found" });
    }

    if (project.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can add members" });
    }

    if (!project.members.includes(user._id)) {
      project.members.push(user._id);
      await project.save();
    }

    res.json({ project });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE MEMBER
export const removeMember = async (req: any, res: Response) => {
  try {
    const { userId } = req.params;

    const project = await Projects.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can remove members" });
    }

    project.members = project.members.filter(
      (member:any) => member.toString() !== userId
    );

    await project.save();

    res.json({ project });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};