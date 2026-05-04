"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const refreshToken_model_1 = require("../models/refreshToken-model");
const generateToken = (userId, SECRET_KEY, expireTime) => {
    return jsonwebtoken_1.default.sign({ userId }, SECRET_KEY, { expiresIn: expireTime });
};
exports.generateToken = generateToken;
const generateRefreshToken = async (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, env_1.ENV.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    await refreshToken_model_1.RefreshToken.create({ userId, token });
    res.cookie("refreshToken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: env_1.ENV.IS_PRODUCTION
    });
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=generateToken.js.map