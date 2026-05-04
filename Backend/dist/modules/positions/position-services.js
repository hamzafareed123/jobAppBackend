"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionServices = void 0;
const errorMessages_1 = require("../../constants/errorMessages");
const statusCode_1 = require("../../constants/statusCode");
const customError_1 = require("../../utils/customError");
const job_repositories_1 = require("../jobs/job-repositories");
const position_repositories_1 = require("./position-repositories");
exports.positionServices = {
    async createPosition(jobId, createdBy, data) {
        if (!jobId) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const job = await job_repositories_1.jobRepository.getJobById(jobId, createdBy);
        if (!job) {
            throw new customError_1.customError("Only Job creator can create position", statusCode_1.STATUS_CODE.FORBIDDEN);
        }
        const position = await position_repositories_1.positionRepository.createPosition(jobId, createdBy, data);
        if (!position) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.POSITION_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return position;
    },
    async getPositions(jobId, query, page, limit, sortBy, sortOrder) {
        if (!jobId) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const position = await position_repositories_1.positionRepository.getPositions(jobId, query, page, limit, sortBy, sortOrder);
        if (!position) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.POSITION_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return position;
    },
    async updatePosition(positionId, data) {
        if (!positionId) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.POSITION_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const position = await position_repositories_1.positionRepository.updatePosition(positionId, data);
        if (!position) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.POSITION_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return position;
    },
    async deletePosition(positionId) {
        if (!positionId) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.POSITION_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        const position = await position_repositories_1.positionRepository.deletePosition(positionId);
        if (!position) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.POSITION_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return position;
    },
};
//# sourceMappingURL=position-services.js.map