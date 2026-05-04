"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rateLimiter_1 = require("../../middleware/rateLimiter");
const position_controller_1 = require("./position-controller");
const position_validator_1 = require("./position-validator");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const positionOwner_middleware_1 = require("../../middleware/positionOwner.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.protectedRoute);
router.use(rateLimiter_1.Limiter);
router.post("/createPosition/:jobId", (0, validation_middleware_1.validateRequest)(position_validator_1.createPositionSchema), position_controller_1.createPosition);
router.get("/getPositions/:jobId", position_controller_1.getPositions);
router.put("/updatePosition/:jobId/:positionId", positionOwner_middleware_1.checkPositionOwner, position_controller_1.updatePosition);
router.delete("/deletePosition/:jobId/:positionId", positionOwner_middleware_1.checkPositionOwner, position_controller_1.deletePosition);
exports.default = router;
//# sourceMappingURL=position-route.js.map