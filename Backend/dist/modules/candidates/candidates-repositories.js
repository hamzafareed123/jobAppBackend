"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateRepository = void 0;
const mongoose_1 = require("mongoose");
const errorMessages_1 = require("../../constants/errorMessages");
const statusCode_1 = require("../../constants/statusCode");
const models_1 = require("../../models");
const candidate_model_1 = __importDefault(require("../../models/candidate-model"));
const customError_1 = require("../../utils/customError");
exports.candidateRepository = {
    async applyJob(jobId, userId) {
        const job = await models_1.Job.findById(jobId);
        if (!job) {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_FOUND, statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        if (job.status === "draft") {
            throw new customError_1.customError(errorMessages_1.ERROR_MESSAGE.JOB_NOT_ACTIVE, statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        if (job.createdBy.toString() === userId) {
            throw new customError_1.customError("You can't apply you own Job", statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        const existingCandidate = await candidate_model_1.default.findOne({
            jobId: new mongoose_1.Types.ObjectId(jobId),
            userId: new mongoose_1.Types.ObjectId(userId),
        });
        if (existingCandidate) {
            throw new customError_1.customError("You Alreay Applied for this job", statusCode_1.STATUS_CODE.CONFLICT);
        }
        const application = await candidate_model_1.default.create({
            jobId: new mongoose_1.Types.ObjectId(jobId),
            userId: new mongoose_1.Types.ObjectId(userId),
            stage: "Applied",
            status: "qualified",
            appliedAt: new Date(),
        });
        return application;
    },
    async getCandidates(jobId, stage, status, search) {
        const matchStage = { jobId: new mongoose_1.Types.ObjectId(jobId) };
        if (stage)
            matchStage.stage = stage;
        if (status)
            matchStage.status = status;
        const pipeline = [
            { $match: matchStage },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userId",
                },
            },
            { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
            ...(search
                ? [{ $match: { "userId.fullName": { $regex: search, $options: "i" } } }]
                : []),
            {
                $project: {
                    stage: 1,
                    status: 1,
                    "userId._id": 1,
                    "userId.fullName": 1,
                    "userId.email": 1,
                    appliedAt: 1,
                    createdAt: 1,
                },
            },
        ];
        const filteredCandidates = await candidate_model_1.default.aggregate(pipeline);
        const grouped = {
            Applied: filteredCandidates.filter((c) => c.stage === "Applied"),
            Shortlisted: filteredCandidates.filter((c) => c.stage === "Shortlisted"),
            Offered: filteredCandidates.filter((c) => c.stage === "Offered"),
            Hired: filteredCandidates.filter((c) => c.stage === "Hired"),
            "Not Moving Forward": filteredCandidates.filter((c) => c.stage === "Not Moving Forward"),
        };
        return grouped;
    },
    async moveStage(jobId, candidateId, data) {
        return await candidate_model_1.default.findOneAndUpdate({ _id: candidateId, jobId }, { $set: { stage: data.stage } }, { new: true }).populate("userId", "fullName email");
    },
    async qualifyCandidate(jobId, candidateId, data) {
        return await candidate_model_1.default.findOneAndUpdate({ _id: candidateId, jobId }, { $set: { status: data.status } }, { new: true });
    },
};
//# sourceMappingURL=candidates-repositories.js.map