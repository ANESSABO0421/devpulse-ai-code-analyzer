import { Router } from "express";
import { importRepoFile, listGithubFiles, listGithubRepos } from "./github.controller";
import { verifyJwt } from "../../middleware/auth.middleware";
import { requireFields } from "../../middleware/validate.middleware";

const router = Router();

router.use(verifyJwt);
router.get("/repos", listGithubRepos);
router.get("/files", listGithubFiles);
router.post("/import", requireFields(["repoFullName", "filePath"]), importRepoFile);

export default router;
