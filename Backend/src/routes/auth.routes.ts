import express from "express";
import { Login, register } from "../controller/auth.controller";
import { generateToken } from "../utils/jwt";
import passport from "passport";

const authRoutes = express.Router();

authRoutes.post("/login", Login);
authRoutes.post("/register", register);

authRoutes.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

authRoutes.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req: any, res) => {
    const token = generateToken(req.user._id.toString());

    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  },
);

export default authRoutes;
