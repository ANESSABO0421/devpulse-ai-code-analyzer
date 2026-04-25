import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDb } from "./config/db";
import authRoutes from "./routes/auth.routes";
import passport from "passport";
import "./config/passport";

dotenv.config();

const PORT = process.env.PORT || process.env.port || 5001;

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

//  passport
app.use(passport.initialize());

app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.log("failed to connect to mongoDb", error.message);
    process.exit(1);
  }
};

startServer();
