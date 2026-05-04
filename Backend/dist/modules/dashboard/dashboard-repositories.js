"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRepository = void 0;
const models_1 = require("../../models");
const candidate_model_1 = __importDefault(require("../../models/candidate-model"));
exports.DashboardRepository = {
    async getDashboardData(userId) {
        const now = new Date();
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
        const [candidatesLastMonth, liveJobs, stageDistribution] = await Promise.all([
            candidate_model_1.default.countDocuments({
                appliedAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
            }),
            models_1.Job.countDocuments({
                status: "active",
                createdBy: userId,
            }),
            candidate_model_1.default.aggregate([
                { $group: { _id: "$stage", count: { $sum: 1 } } },
            ]),
        ]);
        const pipeline = {};
        stageDistribution.forEach((item) => {
            pipeline[item._id] = item.count;
        });
        return {
            candidatesLastMonth,
            liveJobs,
            pipeline: {
                Applied: pipeline["Applied"] || 0,
                Shortlisted: pipeline["Shortlisted"] || 0,
                Offered: pipeline["Offered"] || 0,
                Hired: pipeline["Hired"] || 0,
            },
        };
    },
};
//# sourceMappingURL=dashboard-repositories.js.map