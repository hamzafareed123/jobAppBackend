"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionRepository = void 0;
const models_1 = require("../../models");
exports.positionRepository = {
    async createPosition(jobId, createdBy, data) {
        const underOffer = Number(data.offered) - Number(data.filled);
        const position = await models_1.Position.create({
            jobId,
            createdBy,
            startDate: data.startDate,
            endDate: data.endDate,
            status: "live",
            required: data.required,
            offered: data.offered,
            filled: data.filled,
            underOffer,
        });
        return position;
    },
    async getPositions(jobId, query, page, limit, sortBy, sortOrder) {
        const filter = {
            jobId: jobId,
            ...(query && {
                $or: [
                    { status: { $regex: query, $options: "i" } },
                    ...(!isNaN(Number(query)) ? [{ required: Number(query) }] : []),
                    ...(!isNaN(Number(query)) ? [{ offered: Number(query) }] : []),
                    ...(!isNaN(Number(query)) ? [{ filled: Number(query) }] : []),
                ],
            }),
        };
        const pageNum = Number(page) || 1;
        const limitNum = Number(limit) || 8;
        const skip = (pageNum - 1) * limitNum;
        const sort = {};
        sort[sortBy || "createdAt"] = sortOrder === "asc" ? 1 : -1;
        const [positions, total] = await Promise.all([
            models_1.Position.find(filter).sort(sort).skip(skip).limit(limitNum),
            models_1.Position.countDocuments(filter),
        ]);
        return {
            position: positions,
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
    async updatePosition(positionId, data) {
        const updateData = { ...data };
        if (data.offered !== undefined || data.filled !== undefined) {
            const position = await models_1.Position.findById(positionId);
            if (!position) {
                return null;
            }
            const offered = data.offered !== undefined
                ? Number(data.offered)
                : Number(position.offered);
            const filled = data.filled !== undefined
                ? Number(data.filled)
                : Number(position.filled);
            updateData.underOffer = offered - filled;
        }
        const position = await models_1.Position.findByIdAndUpdate(positionId, updateData, {
            new: true,
        });
        return position;
    },
    async deletePosition(positionId) {
        const position = await models_1.Position.findByIdAndDelete(positionId);
        return position;
    },
};
//# sourceMappingURL=position-repositories.js.map