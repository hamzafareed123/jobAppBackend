"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
exports.transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: env_1.ENV.GMAIL_USER,
        pass: env_1.ENV.GMAIL_APP_PASSWORD,
    },
});
//# sourceMappingURL=transporter.js.map