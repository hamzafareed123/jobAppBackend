import express from "express";
import { protectedRoute } from "../../middleware/auth.middleware";
import { Limiter } from "../../middleware/rateLimiter";
import {
  createPosition,
  getPositions,
  updatePosition,
  deletePosition,
  updateStatus
} from "./position-controller";
import { createPositionSchema } from "./position-validator";
import { validateRequest } from "../../middleware/validation.middleware";
import { checkPositionOwner } from "../../middleware/positionOwner.middleware";

const router = express.Router();

router.use(protectedRoute);
router.use(Limiter);

router.post(
  "/createPosition/:jobId",
  validateRequest(createPositionSchema),
  createPosition,
);
router.get("/getPositions/:jobId", getPositions);
router.put(
  "/updatePosition/:jobId/:positionId",
  checkPositionOwner,
  updatePosition,
);

router.delete(
  "/deletePosition/:jobId/:positionId",
  checkPositionOwner,
  deletePosition,
);

router.put("/updateStatus/:jobId/:positionId",checkPositionOwner,updateStatus);
export default router;
