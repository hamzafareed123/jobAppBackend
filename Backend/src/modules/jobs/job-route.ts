import express from "express";
import { protectedRoute } from "../../middleware/auth.middleware";
import { Limiter } from "../../middleware/rateLimiter";
import { createJob, getAllJobs, getJobById, saveJobInfo } from "./job-controller";
import uploadJobDoc from "../../middleware/upload-middleware";


const router = express.Router();

router.use(protectedRoute);
router.use(Limiter);

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:jobId", getJobById);
router.patch("/:jobId/job-info", uploadJobDoc.single("document"), saveJobInfo);

export default router;
