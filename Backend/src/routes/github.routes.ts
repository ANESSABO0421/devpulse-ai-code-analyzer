import express from "express";
import { listRepos, importFile } from "../controller/github.controller";
import { protect } from "../middleware/auth.middleware";

const githubRoutes = express.Router();

githubRoutes.use(protect);

githubRoutes.get("/repos", listRepos);
githubRoutes.post("/import", importFile);

export default githubRoutes;
