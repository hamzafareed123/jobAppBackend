"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutService = exports.refreshTokenService = exports.resetPasswordService = exports.verifyOtpService = exports.forgotPasswordService = exports.fetchAllUser = exports.signInUser = exports.signUpUser = void 0;
const errorMessages_1 = require("../../constants/errorMessages");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mapUser_1 = require("../../utils/mapUser");
const auth_repositories_1 = require("./auth-repositories");
const customError_1 = require("../../utils/customError");
const generateToken_1 = require("../../utils/generateToken");
const sendOTPEmail_1 = require("../../email/sendOTPEmail");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const auth_repositories_2 = require("./auth-repositories");
const statusCode_1 = require("../../constants/statusCode");
const signUpUser = async (body, res) => {
    const { fullName, email, password } = body;
    const existingUser = await (0, auth_repositories_1.findUserByEmail)(email);
    if (existingUser) {
        throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.USER_ALREADY_EXIST, statusCode_1.STATUS_CODE.CONFLICT);
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hashPassword = await bcrypt_1.default.hash(password, salt);
    const newUser = await (0, auth_repositories_1.createUser)({
        fullName,
        email,
        password: hashPassword,
    });
    const accessToken = (0, generateToken_1.generateToken)(newUser._id.toString(), env_1.ENV.ACCESS_TOKEN_SECRET, "15m");
    await (0, generateToken_1.generateRefreshToken)(newUser._id.toString(), res);
    return { accessToken, user: (0, mapUser_1.mapUser)(newUser) };
};
exports.signUpUser = signUpUser;
const signInUser = async (body, res) => {
    const { email, password } = body;
    const user = await (0, auth_repositories_1.findUserByEmail)(email);
    if (!user) {
        throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.INVALID_CREDENTIALS, statusCode_1.STATUS_CODE.UNAUTHORIZED);
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.INVALID_CREDENTIALS, statusCode_1.STATUS_CODE.UNAUTHORIZED);
    }
    const accessToken = (0, generateToken_1.generateToken)(user._id.toString(), env_1.ENV.ACCESS_TOKEN_SECRET, "35m");
    await (0, generateToken_1.generateRefreshToken)(user._id.toString(), res);
    return { accessToken, user: (0, mapUser_1.mapUser)(user) };
};
exports.signInUser = signInUser;
const fetchAllUser = async (userId) => {
    const allUsers = await (0, auth_repositories_1.findAllUser)(userId);
    if (!allUsers || allUsers.length === 0) {
        throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.USER_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
    }
    return allUsers.map((user) => (0, mapUser_1.mapUser)(user));
};
exports.fetchAllUser = fetchAllUser;
const forgotPasswordService = async (data) => {
    const { email } = data;
    const user = await (0, auth_repositories_1.findUserByEmail)(email);
    if (!user) {
        throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.USER_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
    }
    const otp = await (0, auth_repositories_1.saveUserOTP)(email);
    await (0, sendOTPEmail_1.sendOTPEmail)(email, otp);
};
exports.forgotPasswordService = forgotPasswordService;
const verifyOtpService = async (data) => {
    const { otp } = data;
    const user = await (0, auth_repositories_1.findUserByOTP)(otp);
    if (!user) {
        throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.INVALID_OR_EXPIRED_OTP, statusCode_1.STATUS_CODE.NOT_FOUND);
    }
    const resetToken = (0, generateToken_1.generateToken)(user._id.toString(), env_1.ENV.OTP_TOKEN_SECRET, "15m");
    await (0, auth_repositories_1.clearUserOtp)(user._id.toString());
    return { resetToken };
};
exports.verifyOtpService = verifyOtpService;
const resetPasswordService = async (data) => {
    const { password, confirmPassword, resetToken } = data;
    if (password !== confirmPassword) {
        throw new customError_1.customError("Confirm password Not Match", statusCode_1.STATUS_CODE.BAD_REQUEST);
    }
    let decode;
    try {
        decode = jsonwebtoken_1.default.verify(resetToken, env_1.ENV.OTP_TOKEN_SECRET);
    }
    catch (err) {
        throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.INVALID_TOKEN, statusCode_1.STATUS_CODE.UNAUTHORIZED);
    }
    const user = await (0, auth_repositories_1.findUserByID)(decode.userId);
    if (!user) {
        throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.USER_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hashPassword = await bcrypt_1.default.hash(password, salt);
    await (0, auth_repositories_1.resetUserPassword)(user._id.toString(), hashPassword);
};
exports.resetPasswordService = resetPasswordService;
const refreshTokenService = async (token) => {
    if (!token) {
        throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.NO_TOKEN_FOUND, statusCode_1.STATUS_CODE.UNAUTHORIZED);
    }
    let decode;
    try {
        decode = jsonwebtoken_1.default.verify(token, env_1.ENV.REFRESH_TOKEN_SECRET);
    }
    catch {
        throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.NO_TOKEN_FOUND, statusCode_1.STATUS_CODE.UNAUTHORIZED);
    }
    const storedToken = await (0, auth_repositories_2.findRefreshToken)(token);
    if (!storedToken)
        throw new customError_1.customError("Invalid Refresh Token", statusCode_1.STATUS_CODE.UNAUTHORIZED);
    const accessToken = (0, generateToken_1.generateToken)(decode.userId, env_1.ENV.ACCESS_TOKEN_SECRET, "15m");
    return { accessToken };
};
exports.refreshTokenService = refreshTokenService;
const logoutService = async (userId, res) => {
    await (0, auth_repositories_1.deleteRefreshToken)(userId);
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax" });
};
exports.logoutService = logoutService;
//# sourceMappingURL=auth-services.js.map