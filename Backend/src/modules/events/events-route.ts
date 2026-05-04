import express from "express"
import { protectedRoute } from "../../middleware/auth.middleware";
import { Limiter } from "../../middleware/rateLimiter";
import { createEvent } from "./events-controller";


const router = express.Router();

router.use(protectedRoute);
router.use(Limiter);


router.post("/:jobId",createEvent);


export default router;


