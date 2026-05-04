"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePosition = exports.updatePosition = exports.getPositions = exports.createPosition = void 0;
const successMessages_1 = require("../../constants/successMessages");
const outputHandler_1 = require("../../middleware/outputHandler");
const statusCode_1 = require("../../constants/statusCode");
const position_services_1 = require("./position-services");
const createPosition = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const createdBy = req.user.id;
        const data = req.body;
        const position = await position_services_1.positionServices.createPosition(jobId, createdBy, data);
        res.result = {
            data: position,
            message: successMessages_1.SUCCESS_MESSAGE.POSITION_CREATED,
        };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.CREATED, req, res, next);
    }
    catch (error) {
        res.error = error;
        const status = error instanceof Error && "statusCode" in error
            ? error.statusCode
            : statusCode_1.STATUS_CODE.INTERNAL_SERVER_ERROR;
        (0, outputHandler_1.OutputHandler)(status, req, res, next);
    }
};
exports.createPosition = createPosition;
const getPositions = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const { query, page, limit, sortBy, sortOrder } = req.query;
        const positions = await position_services_1.positionServices.getPositions(jobId, query || "", page || "1", limit || "8", sortBy || "", sortOrder || "asc");
        res.result = {
            data: positions,
            message: successMessages_1.SUCCESS_MESSAGE.POSITION_FETCHED,
        };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.OK, req, res, next);
    }
    catch (error) {
        res.error = error;
        const status = error instanceof Error && "statusCode" in error
            ? error.statusCode
            : statusCode_1.STATUS_CODE.INTERNAL_SERVER_ERROR;
        (0, outputHandler_1.OutputHandler)(status, req, res, next);
    }
};
exports.getPositions = getPositions;
const updatePosition = async (req, res, next) => {
    try {
        const positionId = req.params.positionId;
        const data = req.body;
        const position = await position_services_1.positionServices.updatePosition(positionId, data);
        res.result = {
            data: position,
            message: successMessages_1.SUCCESS_MESSAGE.POSITION_UPDATED,
        };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.OK, req, res, next);
    }
    catch (error) {
        res.error = error;
        const status = error instanceof Error && "statusCode" in error
            ? error.statusCode
            : statusCode_1.STATUS_CODE.INTERNAL_SERVER_ERROR;
        (0, outputHandler_1.OutputHandler)(status, req, res, next);
    }
};
exports.updatePosition = updatePosition;
const deletePosition = async (req, res, next) => {
    try {
        const positionId = req.params.positionId;
        const position = await position_services_1.positionServices.deletePosition(positionId);
        res.result = {
            data: position,
            message: successMessages_1.SUCCESS_MESSAGE.POSITION_DELETED,
        };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.OK, req, res, next);
    }
    catch (error) {
        res.error = error;
        const status = error instanceof Error && "statusCode" in error
            ? error.statusCode
            : statusCode_1.STATUS_CODE.INTERNAL_SERVER_ERROR;
        (0, outputHandler_1.OutputHandler)(status, req, res, next);
    }
};
exports.deletePosition = deletePosition;
//# sourceMappingURL=position-controller.js.map