import express from "express";

import { protect } from "../middleware/auth.middleware";
import { addMember, createProject, deleteProject, getProjectById, getProjects, removeMember, updateProject } from "../controller/project.controller";

const projectRoutes = express.Router();

projectRoutes.use(protect);

projectRoutes.post("/", createProject);
projectRoutes.get("/", getProjects);
projectRoutes.get("/:id", getProjectById);
projectRoutes.patch("/:id", updateProject);
projectRoutes.delete("/:id", deleteProject);

projectRoutes.post("/:id/members", addMember);
projectRoutes.delete("/:id/members/:userId", removeMember);

export default projectRoutes;