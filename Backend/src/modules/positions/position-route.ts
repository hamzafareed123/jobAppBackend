import express from "express";
import { protectedRoute } from "../../middleware/auth.middleware";
import { Limiter } from "../../middleware/rateLimiter";
import { createPosition ,getPositions} from "./position-controller";
import { createPositionSchema } from "./position-validator";
import { validateRequest } from "../../middleware/validation.middleware";

const router = express.Router();

router.use(protectedRoute);
router.use(Limiter);

router.post(
  "/createPosition/:jobId",
  validateRequest(createPositionSchema),
  createPosition,
);
router.get("/getPositions/:jobId",getPositions);
export default router;
