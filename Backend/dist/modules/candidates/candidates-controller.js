"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qualifyCandidate = exports.moveStage = exports.getCandidates = exports.applyJob = void 0;
const outputHandler_1 = require("../../middleware/outputHandler");
const statusCode_1 = require("../../constants/statusCode");
const candidates_services_1 = require("./candidates-services");
const applyJob = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id;
        const application = await candidates_services_1.candidateServices.applyJob(jobId, userId);
        res.result = {
            data: application,
            message: "Applied for Job Successfully",
        };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.CREATED, req, res, next);
    }
    catch (error) {
        res.error = error;
        const status = error instanceof Error && "statusCode" in error
            ? error.statusCode
            : 500;
        (0, outputHandler_1.OutputHandler)(status, req, res, next);
    }
};
exports.applyJob = applyJob;
const getCandidates = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const { stage, status, search } = req.query;
        const application = await candidates_services_1.candidateServices.getCandidates(jobId, stage || "", status || "", search || "");
        res.result = {
            data: application,
            message: "Fetched Candidates successfully",
        };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.OK, req, res, next);
    }
    catch (error) {
        res.error = error;
        const status = error instanceof Error && "statusCode" in error
            ? error.statusCode
            : 500;
        (0, outputHandler_1.OutputHandler)(status, req, res, next);
    }
};
exports.getCandidates = getCandidates;
const moveStage = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const candidateId = req.params.candidateId;
        const body = req.body;
        const candidate = await candidates_services_1.candidateServices.moveStage(jobId, candidateId, body);
        res.result = {
            data: candidate,
            message: "Stages Update successfully",
        };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.OK, req, res, next);
    }
    catch (error) {
        res.error = error;
        const status = error instanceof Error && "statusCode" in error
            ? error.statusCode
            : 500;
        (0, outputHandler_1.OutputHandler)(status, req, res, next);
    }
};
exports.moveStage = moveStage;
const qualifyCandidate = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const candidateId = req.params.candidateId;
        const body = req.body;
        const candidate = await candidates_services_1.candidateServices.qualifyCandidate(jobId, candidateId, body);
        res.result = {
            data: candidate,
            message: "Status Update successfully",
        };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.OK, req, res, next);
    }
    catch (error) {
        res.error = error;
        const status = error instanceof Error && "statusCode" in error
            ? error.statusCode
            : 500;
        (0, outputHandler_1.OutputHandler)(status, req, res, next);
    }
};
exports.qualifyCandidate = qualifyCandidate;
//# sourceMappingURL=candidates-controller.js.map