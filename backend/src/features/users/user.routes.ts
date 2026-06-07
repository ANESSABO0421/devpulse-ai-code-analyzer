import { Router } from "express";
import {
  getProfile,
  getUserStats,
  updateProfile,
} from "./user.controller";
import { verifyJwt } from "../../middleware/auth.middleware";

const router = Router();

router.use(verifyJwt);
router.get("/profile", getProfile);
router.patch("/profile", updateProfile);
router.get("/stats", getUserStats);

export default router;
