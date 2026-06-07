import "./config/env";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import passport from "passport";
import { connectDb } from "./config/db";
import "./config/passport";
import { initSocket } from "./config/socket";
import authRoutes from "./features/auth/auth.routes";
import commentRoutes from "./features/reviews/comment.routes";
import githubRoutes from "./features/projects/github.routes";
import issueRoutes from "./features/issues/issue.routes";
import projectRoutes from "./features/projects/project.routes";
import reviewRoutes from "./features/reviews/review.routes";
import userRoutes from "./features/users/user.routes";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";

const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "DevPulse backend is healthy" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/issues", issueRoutes);
app.use("/api/v1/github", githubRoutes);

// Backward-compatible aliases for older frontend/env setups.
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/github", githubRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  await connectDb();
  server.listen(port, () => {
    console.log(`DevPulse backend listening on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
