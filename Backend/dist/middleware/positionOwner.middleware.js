"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPositionOwner = void 0;
const models_1 = require("../models");
const statusCode_1 = require("../constants/statusCode");
const customError_1 = require("../utils/customError");
const checkPositionOwner = async (req, res, next) => {
    try {
        const positionId = req.params.positionId;
        if (!positionId) {
            throw new customError_1.customError("Position ID is required", statusCode_1.STATUS_CODE.BAD_REQUEST);
        }
        const position = await models_1.Position.findById(positionId);
        if (!position) {
            throw new customError_1.customError("Position not found", statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        if (position.createdBy.toString() !== req.user.id) {
            throw new customError_1.customError("You do not have permission to access this position", statusCode_1.STATUS_CODE.FORBIDDEN);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkPositionOwner = checkPositionOwner;
//# sourceMappingURL=positionOwner.middleware.js.map