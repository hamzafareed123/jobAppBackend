"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PositionSchema = new mongoose_1.default.Schema({
    jobId: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["live", "filed", "closed"],
        required: true,
    },
    required: {
        type: Number,
        required: true,
    },
    offered: {
        type: Number,
        required: true,
    },
    filled: {
        type: Number,
        required: true,
    },
    underOffer: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
const Position = mongoose_1.default.models.Position ||
    mongoose_1.default.model("Position", PositionSchema);
exports.default = Position;
//# sourceMappingURL=positions-model.js.map