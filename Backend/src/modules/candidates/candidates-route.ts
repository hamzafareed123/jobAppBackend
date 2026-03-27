import express from "express";
import { protectedRoute } from "../../middleware/auth.middleware";
import { Limiter } from "../../middleware/rateLimiter";
import {
  applyJob,
  getCandidates,
  moveStage,
  qualifyCandidate,
} from "./candidates-controller";

const router = express.Router();

router.use(protectedRoute);
router.use(Limiter);

router.post("/:jobId/apply", applyJob);
router.get("/:jobId/candidates", getCandidates);
router.patch("/:jobId/move/:candidateId", moveStage);
router.patch("/:jobId/qualify/:candidateId", qualifyCandidate);
export default router;
