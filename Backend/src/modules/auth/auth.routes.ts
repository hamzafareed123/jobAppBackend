import express from "express";
import {
  SignUp,
  SignIn,
  getAuthUser,
  Logout,
  getAllUsers,
  forgotPassword,
  resetPassword,
  refreshToken,
  verifyOtp
} from "./auth-controller";
import { validateRequest } from "../../middleware/validation.middleware";
import {
  signUpSchema,
  signInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "./auth-validator";
import { protectedRoute } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import { Limiter } from "../../middleware/rateLimiter";

const router = express.Router();

router.use(Limiter);
router.post("/signup", validateRequest(signUpSchema), SignUp);
router.post("/signin", validateRequest(signInSchema), SignIn);
router.post("/logout", Logout);
router.get("/getAuthUser", protectedRoute, getAuthUser);
router.get("/getAllUsers", protectedRoute, roleMiddleware, getAllUsers);
router.post(
  "/forgotPassword",
  validateRequest(forgotPasswordSchema),
  forgotPassword,
);

router.post("/verifyOtp",validateRequest(verifyOtpSchema),verifyOtp)

router.post(
  "/resetPassword",
  validateRequest(resetPasswordSchema),
  resetPassword,
);
router.post("/refreshToken", refreshToken);

export default router;
