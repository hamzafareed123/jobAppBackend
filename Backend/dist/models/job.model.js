"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const PaySchema = new mongoose_1.Schema({
    min: { type: Number, default: null },
    max: { type: Number, default: null },
    currency: { type: String, default: null },
    payPer: {
        type: String,
        enum: ["Hour", "Month", "Year"],
        default: null,
    },
    noSalary: { type: Boolean, default: false },
}, { _id: false });
const JobSchema = new mongoose_1.Schema({
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "CreatedBy is required"],
    },
    status: {
        type: String,
        enum: ["draft", "active", "closed", "archived"],
        default: "draft",
    },
    jobTitle: {
        type: String,
        required: [true, "Job title is required"],
        trim: true,
    },
    jobType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "JobType",
        required: [true, "Job type is required"],
    },
    function: { type: String, default: null },
    role: { type: String, default: null },
    postCategory: { type: String, default: null },
    level: { type: String, default: null },
    employmentType: { type: String, default: null },
    noOfPositions: { type: Number, default: null },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    remote: {
        type: String,
        enum: ["Yes", "No", "Hybrid"],
        default: null,
    },
    department: { type: String, default: null },
    keywords: { type: [String], default: [] },
    pay: { type: PaySchema, default: () => ({ noSalary: false }) },
    location: { type: String, default: null },
    jobSummary: { type: String, default: null },
    descriptionText: { type: String, default: null },
    descriptionFile: { type: String, default: null },
    assessmentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Assessment",
        default: null,
    },
    skillIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Skill",
        },
    ],
    stages: [
        {
            name: { type: String, required: true },
            description: { type: String, default: null },
            order: { type: Number, required: true },
        },
    ],
    interviewers: [
        {
            userId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            role: {
                type: String,
                enum: ["Recruiter", "Hiring Manager"],
                required: true,
            },
        },
    ],
    jobRequirements: { type: String, default: null },
    jobDescription: { type: String, default: null },
    elevatorPitch: { type: String, default: null },
    aboutUs: { type: Boolean, default: false },
    companyBenefits: { type: Boolean, default: false },
    additionalNotes: { type: String, default: null },
    publishedAt: { type: Date, default: null },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Job", JobSchema);
//# sourceMappingURL=job.model.js.map