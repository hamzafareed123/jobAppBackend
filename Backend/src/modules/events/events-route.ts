import express from "express";
import { protectedRoute } from "../../middleware/auth.middleware";
import { Limiter } from "../../middleware/rateLimiter";
import {
  createEvent,
  updateEvent,
  getAllEvents,
  getEventById,
  deleteEvent
} from "./events-controller";

const router = express.Router();

router.use(protectedRoute);
router.use(Limiter);

router.post("/:jobId", createEvent);
router.put("/updateEvents/:eventId/:jobId", updateEvent);
router.get("/getEventById/:eventId", getEventById);
router.get("/getAllEvents", getAllEvents);
router.delete("/deleteEvent/:eventId",deleteEvent);

export default router;
