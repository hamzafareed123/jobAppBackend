"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.publishJob = exports.saveInterviewers = exports.saveStages = exports.saveAssessment = exports.saveJobInfo = exports.getJobById = exports.getAllJobs = exports.createJob = void 0;
const job_services_1 = require("./job-services");
const outputHandler_1 = require("../../middleware/outputHandler");
const statusCode_1 = require("../../constants/statusCode");
const successMessages_1 = require("../../constants/successMessages");
const fileUrl_1 = require("../../utils/fileUrl");
const createJob = async (req, res, next) => {
    try {
        const data = req.body;
        const userId = req.user.id;
        const job = await job_services_1.jobServices.createJob(data, userId);
        res.result = { data: job, message: "Job Created Successfully" };
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
exports.createJob = createJob;
const getAllJobs = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { status, query, page, limit } = req.query;
        const result = await job_services_1.jobServices.getAllJobs(userId, status || "", query || "", page || "1", limit || "10");
        res.result = {
            data: result.jobs,
            pagination: result.pagination,
            message: successMessages_1.SUCCESS_MESSAGE.JOBS_FETCHED,
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
exports.getAllJobs = getAllJobs;
const getJobById = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id;
        const job = await job_services_1.jobServices.getJobById(jobId, userId);
        res.result = { data: job, message: successMessages_1.SUCCESS_MESSAGE.JOB_FETCHED };
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
exports.getJobById = getJobById;
const saveJobInfo = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id;
        const data = req.body;
        if (req.file) {
            data.descriptionFile = (0, fileUrl_1.generateFileUrl)(req.file.filename, req);
        }
        const job = await job_services_1.jobServices.saveJobInfo(data, jobId, userId);
        res.result = { data: job, message: "Job Saved Successfully" };
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
exports.saveJobInfo = saveJobInfo;
const saveAssessment = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id;
        const data = req.body;
        const job = await job_services_1.jobServices.saveAssessment(data, jobId, userId);
        res.result = { data: job, message: "Assement and skills Saved" };
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
exports.saveAssessment = saveAssessment;
const saveStages = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id;
        const data = req.body;
        const job = await job_services_1.jobServices.saveStages(data, jobId, userId);
        res.result = { data: job, message: "stages saved successfully" };
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
exports.saveStages = saveStages;
const saveInterviewers = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id;
        const data = req.body;
        const job = await job_services_1.jobServices.saveInterviewers(data, jobId, userId);
        res.result = {
            data: job,
            message: "Interviewers saved successfully",
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
exports.saveInterviewers = saveInterviewers;
const publishJob = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id;
        const data = req.body;
        const job = await job_services_1.jobServices.publishJob(data, jobId, userId);
        res.result = {
            data: job,
            message: "Job Successfully Publish",
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
exports.publishJob = publishJob;
const deleteJob = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id;
        const job = await job_services_1.jobServices.deleteJob(jobId, userId);
        res.result = {
            data: job,
            message: "Job deleted Successfully ",
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
exports.deleteJob = deleteJob;
//# sourceMappingURL=job-controller.js.map