"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = void 0;
const customError_1 = require("../utils/customError");
const errorMessages_1 = require("../constants/errorMessages");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const auth_repositories_1 = require("../modules/auth/auth-repositories");
const protectedRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return next(new customError_1.customError(errorMessages_1.ERROR_MESSAGE.NO_TOKEN_FOUND, 401));
        }
        const decode = jsonwebtoken_1.default.verify(token, env_1.ENV.ACCESS_TOKEN_SECRET);
        const user = await (0, auth_repositories_1.findUserByID)(decode.userId);
        if (!user) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.USER_NOT_FOUND);
        }
        req.user = user;
        next();
    }
    catch (error) {
        return next(new customError_1.customError(errorMessages_1.ERROR_MESSAGE.NO_TOKEN_FOUND, 401));
    }
};
exports.protectedRoute = protectedRoute;
//# sourceMappingURL=auth.middleware.js.map