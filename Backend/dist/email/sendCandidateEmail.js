"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCandidateEmail = void 0;
const env_1 = require("../config/env");
const CandidateEmailTemplate_1 = require("./CandidateEmailTemplate");
const transporter_1 = require("./transporter");
const sendCandidateEmail = async (toEmail, CandidateName, subject, body) => {
    await transporter_1.transporter.sendMail({
        from: `moccy <${env_1.ENV.GMAIL_USER}>`,
        to: toEmail,
        subject: subject,
        html: (0, CandidateEmailTemplate_1.candidateEmailTemplate)(CandidateName, subject, body),
    });
};
exports.sendCandidateEmail = sendCandidateEmail;
//# sourceMappingURL=sendCandidateEmail.js.map