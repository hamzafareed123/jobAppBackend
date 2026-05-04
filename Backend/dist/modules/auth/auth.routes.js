"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth-controller");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const auth_validator_1 = require("./auth-validator");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const role_middleware_1 = require("../../middleware/role.middleware");
const rateLimiter_1 = require("../../middleware/rateLimiter");
const router = express_1.default.Router();
router.use(rateLimiter_1.Limiter);
router.post("/signup", (0, validation_middleware_1.validateRequest)(auth_validator_1.signUpSchema), auth_controller_1.SignUp);
router.post("/signin", (0, validation_middleware_1.validateRequest)(auth_validator_1.signInSchema), auth_controller_1.SignIn);
router.post("/logout", auth_controller_1.Logout);
router.get("/getAuthUser", auth_middleware_1.protectedRoute, auth_controller_1.getAuthUser);
router.get("/getAllUsers", auth_middleware_1.protectedRoute, role_middleware_1.roleMiddleware, auth_controller_1.getAllUsers);
router.post("/forgotPassword", (0, validation_middleware_1.validateRequest)(auth_validator_1.forgotPasswordSchema), auth_controller_1.forgotPassword);
router.post("/verifyOtp", (0, validation_middleware_1.validateRequest)(auth_validator_1.verifyOtpSchema), auth_controller_1.verifyOtp);
router.post("/resetPassword", (0, validation_middleware_1.validateRequest)(auth_validator_1.resetPasswordSchema), auth_controller_1.resetPassword);
router.post("/refreshToken", auth_controller_1.refreshToken);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map