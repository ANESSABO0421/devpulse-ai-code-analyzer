import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDb } from "./config/db";
import authRoutes from "./routes/auth.routes";
import passport from "passport";
import "./config/passport";
import projectRoutes from "./routes/project.route";
import reviewRoutes from "./routes/review.routes";
import commentRoutes from "./routes/comment.routes";
import http from "http";
import { initSocket } from "./config/socket";
import issueRouter from "./routes/issue.routes";
import githubRoutes from "./routes/github.routes";

dotenv.config();

const PORT = process.env.PORT || process.env.port || 5001;

const app = express();
const server = http.createServer(app);

initSocket(server);
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

//  passport
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/issues", issueRouter);
app.use("/api/github", githubRoutes);

const startServer = async () => {
  try {
    await connectDb();

    server.listen(PORT, () => {
      console.log(`server is running at http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.log("failed to connect to mongoDb", error.message);
    process.exit(1);
  }
};

startServer();
