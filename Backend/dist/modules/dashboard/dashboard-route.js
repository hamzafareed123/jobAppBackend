"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rateLimiter_1 = require("../../middleware/rateLimiter");
const dashboard_controller_1 = require("./dashboard-controller");
const router = express_1.default.Router();
router.use(auth_middleware_1.protectedRoute);
router.use(rateLimiter_1.Limiter);
router.get("/data", dashboard_controller_1.getDashboardData);
exports.default = router;
//# sourceMappingURL=dashboard-route.js.map