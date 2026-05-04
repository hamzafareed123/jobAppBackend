"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rateLimiter_1 = require("../../middleware/rateLimiter");
const candidates_controller_1 = require("./candidates-controller");
const router = express_1.default.Router();
router.use(auth_middleware_1.protectedRoute);
router.use(rateLimiter_1.Limiter);
router.post("/:jobId/apply", candidates_controller_1.applyJob);
router.get("/:jobId/candidates", candidates_controller_1.getCandidates);
router.patch("/:jobId/move/:candidateId", candidates_controller_1.moveStage);
router.patch("/:jobId/qualify/:candidateId", candidates_controller_1.qualifyCandidate);
exports.default = router;
//# sourceMappingURL=candidates-route.js.map