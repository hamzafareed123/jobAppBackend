"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rateLimiter_1 = require("../../middleware/rateLimiter");
const job_controller_1 = require("./job-controller");
const upload_middleware_1 = __importDefault(require("../../middleware/upload-middleware"));
const lookup_controller_1 = require("./lookup.controller");
const router = express_1.default.Router();
router.use(auth_middleware_1.protectedRoute);
router.use(rateLimiter_1.Limiter);
router.post("/", job_controller_1.createJob);
router.get("/", job_controller_1.getAllJobs);
router.get("/skills", lookup_controller_1.getAllSkills);
router.get("/assessments", lookup_controller_1.getAllAssessments);
router.get("/jobTypes", lookup_controller_1.getJobType);
router.get("/:jobId", job_controller_1.getJobById);
router.patch("/:jobId/job-info", upload_middleware_1.default.single("descriptionFile"), job_controller_1.saveJobInfo);
router.patch("/:jobId/assessment", job_controller_1.saveAssessment);
router.patch("/:jobId/stages", job_controller_1.saveStages);
router.patch("/:jobId/interviewers", job_controller_1.saveInterviewers);
router.patch("/:jobId/publish", job_controller_1.publishJob);
router.delete("/:jobId", job_controller_1.deleteJob);
exports.default = router;
//# sourceMappingURL=job-route.js.map