"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllRefreshToken = exports.deleteRefreshToken = exports.findRefreshToken = exports.resetUserPassword = exports.clearUserOtp = exports.findUserByOTP = exports.saveUserOTP = exports.findAllUser = exports.findUserByID = exports.createUser = exports.findUserByEmails = exports.findUserByEmail = void 0;
const refreshToken_model_1 = require("../../models/refreshToken-model");
const user_models_1 = require("../../models/user-models");
const crypto_1 = __importDefault(require("crypto"));
const findUserByEmail = async (email) => {
    return await user_models_1.User.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
const findUserByEmails = async (emails) => {
    return await user_models_1.User.find({ email: { $in: emails } });
};
exports.findUserByEmails = findUserByEmails;
const createUser = async (userData) => {
    return await user_models_1.User.create(userData);
};
exports.createUser = createUser;
const findUserByID = async (userId) => {
    return await user_models_1.User.findById(userId).select("-password");
};
exports.findUserByID = findUserByID;
const findAllUser = async (userId) => {
    return await user_models_1.User.find({ _id: { $ne: userId } }).select("-password");
};
exports.findAllUser = findAllUser;
const saveUserOTP = async (email) => {
    const otp = crypto_1.default.randomInt(100000, 999999).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user_models_1.User.findOneAndUpdate({ email }, { otp, otpExpire });
    return otp;
};
exports.saveUserOTP = saveUserOTP;
const findUserByOTP = async (otp) => {
    return await user_models_1.User.findOne({
        otp,
        otpExpire: { $gt: Date.now() },
    });
};
exports.findUserByOTP = findUserByOTP;
const clearUserOtp = async (userId) => {
    return await user_models_1.User.findByIdAndUpdate(userId, {
        $set: { otp: null, otpExpiry: null },
    });
};
exports.clearUserOtp = clearUserOtp;
const resetUserPassword = async (userId, hashPassword) => {
    return await user_models_1.User.findByIdAndUpdate(userId, {
        password: hashPassword,
        otp: null,
        otpExpire: null,
    });
};
exports.resetUserPassword = resetUserPassword;
const findRefreshToken = async (token) => {
    return await refreshToken_model_1.RefreshToken.findOne({ token });
};
exports.findRefreshToken = findRefreshToken;
const deleteRefreshToken = async (token) => {
    return await refreshToken_model_1.RefreshToken.deleteOne({ token });
};
exports.deleteRefreshToken = deleteRefreshToken;
const deleteAllRefreshToken = async (userId) => {
    return await refreshToken_model_1.RefreshToken.deleteMany({ userId });
};
exports.deleteAllRefreshToken = deleteAllRefreshToken;
//# sourceMappingURL=auth-repositories.js.map