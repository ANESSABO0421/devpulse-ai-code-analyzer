import { Router } from "express";
import passport from "passport";
import { getCurrentUser, login, register } from "./auth.controller";
import { verifyJwt } from "../../middleware/auth.middleware";
import { requireFields } from "../../middleware/validate.middleware";
import { generateToken } from "../../utils/jwt";

const router = Router();

router.post("/register", requireFields(["name", "email", "password"]), register);
router.post("/login", requireFields(["email", "password"]), login);
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"], session: false }),
);
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req: any, res) => {
    const token = generateToken(req.user._id.toString());
    res.redirect(
      `${process.env.CLIENT_URL || "http://localhost:3000"}/auth/callback?token=${token}`,
    );
  },
);
router.get(
  "/github/callback-legacy",
  passport.authenticate("github", { session: false }),
  (req: any, res) => {
    const token = generateToken(req.user._id.toString());
    res.redirect(
      `${process.env.CLIENT_URL || "http://localhost:3000"}/auth/callback?token=${token}`,
    );
  },
);
router.get("/me", verifyJwt, getCurrentUser);

export default router;
