"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.signInSchema = exports.signUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signUpSchema = joi_1.default.object({
    fullName: joi_1.default.string().trim().required().messages({
        "string.empty": "FullName is Required",
        "any.required": "FullName is required",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "Email Should be valid",
        "string.empty": "Email is Required",
        "any.required": "Email is required",
    }),
    password: joi_1.default.string().min(4).max(15).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 4 characters",
        "string.max": "Password must be at most  15 characters",
        "any.required": "Password is required",
    }),
});
exports.signInSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.email": "Email Should be valid",
        "string.empty": "Email is Required",
        "any.required": "Email is required",
    }),
    password: joi_1.default.string().messages({
        "string.empty": "Password is Required",
        "any.required": "Password is Required",
    }),
});
exports.forgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.email": "Email Should be valid",
        "string.empty": "Email is Required",
        "any.required": "Email is required",
    }),
});
exports.resetPasswordSchema = joi_1.default.object({
    resetToken: joi_1.default.string().required().messages({
        "string.empty": "Reset token is required",
        "any.required": "Reset token is required",
    }),
    password: joi_1.default.string().min(4).max(15).required().messages({
        "string.empty": "Password is Required",
        "any.required": "Password is Required",
        "string.min": "Password must be at least 4 characters",
        "string.max": "Password must be at most  15 characters",
    }),
    confirmPassword: joi_1.default.string().required().messages({
        "string.empty": "Confirm Password is Required",
        "any.required": "Confirm Password is Required",
    }),
});
exports.verifyOtpSchema = joi_1.default.object({
    otp: joi_1.default.string().length(6).required().messages({
        "string.empty": "OTP is Required",
        "any.required": "OTP is Required",
    }),
});
//# sourceMappingURL=auth-validator.js.map