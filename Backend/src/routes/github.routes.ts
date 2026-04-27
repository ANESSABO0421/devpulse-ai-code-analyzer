import { Router } from "express";
import { importRepoFile, listGithubRepos } from "../controllers/github.controller";
import { verifyJwt } from "../middleware/auth.middleware";
import { requireFields } from "../middleware/validate.middleware";

const router = Router();

router.use(verifyJwt);
router.get("/repos", listGithubRepos);
router.post("/import", requireFields(["repoFullName", "filePath"]), importRepoFile);

export default router;
