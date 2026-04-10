import express from "express";
import { protectedRoute } from "../../middleware/auth.middleware";
import { Limiter } from "../../middleware/rateLimiter";
import { getDashboardData } from "./dashboard-controller";


const router = express.Router();

router.use(protectedRoute);
router.use(Limiter);

router.get("/data",getDashboardData);



export default router;