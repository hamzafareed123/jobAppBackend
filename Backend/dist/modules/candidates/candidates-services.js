"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateServices = void 0;
const mongoose_1 = require("mongoose");
const customError_1 = require("../../utils/customError");
const errorMessages_1 = require("../../constants/errorMessages");
const statusCode_1 = require("../../constants/statusCode");
const candidates_repositories_1 = require("./candidates-repositories");
const sendCandidateEmail_1 = require("../../email/sendCandidateEmail");
const job_repositories_1 = require("../jobs/job-repositories");
exports.candidateServices = {
    async applyJob(jobId, userId) {
        if (!mongoose_1.Types.ObjectId.isValid(jobId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const application = await candidates_repositories_1.candidateRepository.applyJob(jobId, userId);
        return application;
    },
    async getCandidates(jobId, stage, status, search) {
        if (!mongoose_1.Types.ObjectId.isValid(jobId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const candidates = await candidates_repositories_1.candidateRepository.getCandidates(jobId, stage, status, search);
        if (!candidates) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return candidates;
    },
    async moveStage(jobId, candidateId, data) {
        if (!mongoose_1.Types.ObjectId.isValid(jobId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        if (!mongoose_1.Types.ObjectId.isValid(candidateId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.CANDIDATE_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const job = await job_repositories_1.jobRepository.getJobOnlyById(jobId.toString());
        if (!job) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const candidate = await candidates_repositories_1.candidateRepository.moveStage(jobId, candidateId, data);
        if (!candidate) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.CANDIDATE_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        if (candidate && data?.email?.subject && data?.email?.body) {
            const user = candidate.userId;
            await (0, sendCandidateEmail_1.sendCandidateEmail)(user.email, user.fullName, data.email.subject, data.email.body);
        }
        return candidate;
    },
    async qualifyCandidate(jobId, candidateId, data) {
        if (!mongoose_1.Types.ObjectId.isValid(jobId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        if (!mongoose_1.Types.ObjectId.isValid(candidateId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.CANDIDATE_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const candidate = await candidates_repositories_1.candidateRepository.qualifyCandidate(jobId, candidateId, data);
        return candidate;
    },
};
//# sourceMappingURL=candidates-services.js.map