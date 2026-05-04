"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    otp: {
        type: String,
        default: null,
    },
    otpExpire: {
        type: Date,
        default: null,
    },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },
    googleId: {
        type: String,
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user-models.js.map