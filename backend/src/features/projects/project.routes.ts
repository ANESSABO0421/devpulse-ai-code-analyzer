import { Router } from "express";
import {
  addProjectMember,
  createProject,
  deleteProject,
  getProjectById,
  listProjects,
  removeProjectMember,
  updateProject,
} from "../controllers/project.controller";
import { verifyJwt } from "../middleware/auth.middleware";
import { requireFields } from "../middleware/validate.middleware";

const router = Router();

router.use(verifyJwt);
router.post("/", requireFields(["name", "description", "language"]), createProject);
router.get("/", listProjects);
router.get("/:id", getProjectById);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);
router.post("/:id/members", requireFields(["email"]), addProjectMember);
router.delete("/:id/members/:userId", removeProjectMember);

export default router;
