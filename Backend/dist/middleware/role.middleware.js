"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const customError_1 = require("../utils/customError");
const errorMessages_1 = require("../constants/errorMessages");
const roleMiddleware = (req, res, next) => {
    const user = req.user;
    if (!user) {
        return next(new customError_1.customError(errorMessages_1.ERROR_MESSAGE.UNAUTHORIZED, 401));
    }
    if (user.role !== "admin") {
        return next(new customError_1.customError(errorMessages_1.ERROR_MESSAGE.ADMIN_ACCESS, 403));
    }
    next();
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=role.middleware.js.map