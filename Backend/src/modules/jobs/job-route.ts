import express from "express";
import { protectedRoute } from "../../middleware/auth.middleware";
import { Limiter } from "../../middleware/rateLimiter";
import {
  createJob,
  getAllJobs,
  getJobById,
  saveJobInfo,
  saveAssessment,
  saveStages,
  saveInterviewers,
  publishJob,
  deleteJob,
} from "./job-controller";
import uploadJobDoc from "../../middleware/upload-middleware";
import { getAllAssessments, getAllSkills } from "./lookup.controller";

const router = express.Router();

router.use(protectedRoute);
router.use(Limiter);

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/skills", getAllSkills);
router.get("/assessments", getAllAssessments);
router.get("/:jobId", getJobById);
router.patch(
  "/:jobId/job-info",
  uploadJobDoc.single("descriptionFile"),
  saveJobInfo,
);
router.patch("/:jobId/assessment", saveAssessment);
router.patch("/:jobId/stages", saveStages);
router.patch("/:jobId/interviewers", saveInterviewers);
router.patch("/:jobId/publish", publishJob);
router.delete("/:jobId", deleteJob);

export default router;
