"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRepository = void 0;
const models_1 = require("../../models");
const mongoose_1 = require("mongoose");
exports.jobRepository = {
    async createJob(data, userId) {
        const job = await models_1.Job.create({
            jobTitle: data.jobTitle,
            jobType: new mongoose_1.Types.ObjectId(data.jobType),
            createdBy: new mongoose_1.Types.ObjectId(userId),
            status: "draft",
        });
        const populateJob = await job.populate("jobType", "name");
        return populateJob;
    },
    async getAllJobs(userId, status, query, page, limit) {
        const filter = {
            createdBy: userId,
            ...(status && { status: status }),
            ...(query && {
                $or: [
                    { jobTitle: { $regex: query, $options: "i" } },
                    { location: { $regex: query, $options: "i" } },
                    { "interviewers.role": { $regex: query, $options: "i" } },
                    ...(!isNaN(Number(query)) ? [{ noOfPositions: Number(query) }] : []),
                ],
            }),
        };
        const pageNum = Number(page) || 1;
        const limitNum = Number(limit) || 10;
        const skip = (pageNum - 1) * limitNum;
        const [jobs, total] = await Promise.all([
            models_1.Job.find(filter)
                .populate("assessmentId", "name")
                .populate("skillIds", "name")
                .populate("jobType", "name")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum),
            models_1.Job.countDocuments(filter),
        ]);
        return {
            jobs,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
                hasNextPage: pageNum < Math.ceil(total / limitNum),
                hasPrevPage: pageNum > 1,
            },
        };
    },
    async getJobById(jobId, userId) {
        return await models_1.Job.findOne({
            _id: jobId,
            createdBy: userId,
        })
            .populate("assessmentId", "name")
            .populate("skillIds", "name")
            .populate("jobType", "name");
    },
    async getJobOnlyById(jobId) {
        return await models_1.Job.findById(jobId);
    },
    async saveJobInfo(data, jobId, userId) {
        return await models_1.Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, { $set: { ...data } }, { new: true });
    },
    async saveAssessment(data, jobId, userId) {
        return await models_1.Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, {
            $set: {
                assessmentId: data.assessmentId,
                skillIds: data.skillIds,
            },
        }, { new: true })
            .populate("assessmentId", "name")
            .populate("skillIds", "name");
    },
    async saveStages(data, jobId, userId) {
        const stagesWithOrder = data.stages.map((stage, index) => ({
            name: stage.name,
            description: stage.description || null,
            order: index + 1,
        }));
        return await models_1.Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, {
            $set: {
                stages: stagesWithOrder,
            },
        }, { new: true });
    },
    async saveInterviewers(data, jobId, userId) {
        return await models_1.Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, {
            $set: {
                interviewers: data.interviewers,
            },
        }, { new: true });
    },
    async publishJob(data, jobId, userId) {
        return await models_1.Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, {
            $set: {
                ...data,
                status: "active",
                publishedAt: new Date(),
            },
        }, { new: true });
    },
    async deleteJob(jobId, userId) {
        return await models_1.Job.findOneAndDelete({ _id: jobId, createdBy: userId });
    },
};
//# sourceMappingURL=job-repositories.js.map