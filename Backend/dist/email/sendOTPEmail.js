"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTPEmail = void 0;
const env_1 = require("../config/env");
const otpEmailTemplate_1 = require("./otpEmailTemplate");
const transporter_1 = require("./transporter");
const sendOTPEmail = async (toEmail, otp) => {
    await transporter_1.transporter.sendMail({
        from: `moccy <${env_1.ENV.GMAIL_USER}>`,
        to: toEmail,
        subject: "Password Reset OTP",
        html: (0, otpEmailTemplate_1.otpEmailTemplate)(otp),
    });
};
exports.sendOTPEmail = sendOTPEmail;
//# sourceMappingURL=sendOTPEmail.js.map