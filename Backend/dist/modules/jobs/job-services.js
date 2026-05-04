"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobServices = void 0;
const mongoose_1 = require("mongoose");
const errorMessages_1 = require("../../constants/errorMessages");
const statusCode_1 = require("../../constants/statusCode");
const customError_1 = require("../../utils/customError");
const job_repositories_1 = require("./job-repositories");
const user_models_1 = require("../../models/user-models");
exports.jobServices = {
    async createJob(data, userId) {
        if (!data.jobTitle || data.jobTitle.trim() === "") {
            throw new customError_1.customError("Job title is required", statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        if (!data.jobType || data.jobType.trim() === "") {
            throw new customError_1.customError("Job type is required", statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        if (!mongoose_1.Types.ObjectId.isValid(data.jobType)) {
            throw new customError_1.customError("Invalid JOb Type", statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        const job = await job_repositories_1.jobRepository.createJob(data, userId);
        return job;
    },
    async getAllJobs(userId, status, query, page, limit) {
        return await job_repositories_1.jobRepository.getAllJobs(userId, status, query, page, limit);
    },
    async getJobById(jobId, userId) {
        if (!mongoose_1.Types.ObjectId.isValid(jobId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const job = await job_repositories_1.jobRepository.getJobById(jobId, userId);
        if (!job) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return job;
    },
    async saveJobInfo(data, jobId, userId) {
        if (!mongoose_1.Types.ObjectId.isValid(jobId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const job = await job_repositories_1.jobRepository.saveJobInfo(data, jobId, userId);
        if (!job) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return job;
    },
    async saveAssessment(data, jobId, userId) {
        if (!mongoose_1.Types.ObjectId.isValid(jobId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const invalidSkill = data.skillIds.find((id) => !mongoose_1.Types.ObjectId.isValid(id));
        if (invalidSkill) {
            throw new customError_1.customError("Invalid skill id", statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        const job = await job_repositories_1.jobRepository.saveAssessment(data, jobId, userId);
        if (!job) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return job;
    },
    async saveStages(data, jobId, userId) {
        if (!mongoose_1.Types.ObjectId.isValid(jobId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const job = await job_repositories_1.jobRepository.saveStages(data, jobId, userId);
        if (!job) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return job;
    },
    async saveInterviewers(data, jobId, userId) {
        if (!mongoose_1.Types.ObjectId.isValid(jobId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const userIds = data.interviewers.map((i) => i.userId);
        const existingUser = await user_models_1.User.find({ _id: { $in: userIds } });
        if (existingUser.length !== userIds.length) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.USER_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const job = await job_repositories_1.jobRepository.saveInterviewers(data, jobId, userId);
        if (!job) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return job;
    },
    async publishJob(data, jobId, userId) {
        if (!mongoose_1.Types.ObjectId.isValid(jobId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        if (!data.jobDescription) {
            throw new customError_1.customError("Add Job Description", statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        if (!data.jobRequirements) {
            throw new customError_1.customError("Add Job Requirements", statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        if (!data.elevatorPitch) {
            throw new customError_1.customError("Enter Evelator Pitch", statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const job = await job_repositories_1.jobRepository.publishJob(data, jobId, userId);
        if (!job) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return job;
    },
    async deleteJob(jobId, userId) {
        if (!mongoose_1.Types.ObjectId.isValid(jobId)) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const job = await job_repositories_1.jobRepository.deleteJob(jobId, userId);
        if (!job) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return job;
    },
};
//# sourceMappingURL=job-services.js.map