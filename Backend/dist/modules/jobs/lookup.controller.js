"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobType = exports.getAllAssessments = exports.getAllSkills = void 0;
const skill_model_1 = __importDefault(require("../../models/skill.model"));
const assessment_model_1 = __importDefault(require("../../models/assessment.model"));
const outputHandler_1 = require("../../middleware/outputHandler");
const statusCode_1 = require("../../constants/statusCode");
const jobType_model_1 = __importDefault(require("../../models/jobType-model"));
const getAllSkills = async (req, res, next) => {
    try {
        const skills = await skill_model_1.default.find().sort({ name: 1 });
        res.result = { data: skills, message: "Skills fetched" };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.OK, req, res, next);
    }
    catch (error) {
        res.error = error;
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.INTERNAL_SERVER_ERROR, req, res, next);
    }
};
exports.getAllSkills = getAllSkills;
const getAllAssessments = async (req, res, next) => {
    try {
        const assessments = await assessment_model_1.default.find().sort({ name: 1 });
        res.result = { data: assessments, message: "Assessments fetched" };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.OK, req, res, next);
    }
    catch (error) {
        res.error = error;
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.INTERNAL_SERVER_ERROR, req, res, next);
    }
};
exports.getAllAssessments = getAllAssessments;
const getJobType = async (req, res, next) => {
    try {
        const jobTypes = await jobType_model_1.default.find().sort({ name: 1 });
        res.result = { data: jobTypes, message: "Job Types fetched" };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.OK, req, res, next);
    }
    catch (error) {
        res.error = error;
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.INTERNAL_SERVER_ERROR, req, res, next);
    }
};
exports.getJobType = getJobType;
//# sourceMappingURL=lookup.controller.js.map