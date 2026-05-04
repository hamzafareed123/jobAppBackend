"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Limiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
const errorMessages_1 = require("../constants/errorMessages");
exports.Limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: { error: errorMessages_1.ERROR_MESSAGE.TOO_MANY_REQUEST },
});
//# sourceMappingURL=rateLimiter.js.map