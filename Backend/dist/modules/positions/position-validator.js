"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePositionSchema = exports.createPositionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPositionSchema = joi_1.default.object({
    startDate: joi_1.default.date().required().messages({
        "date.base": "Start date must be a valid date",
        "date.empty": "Start date is required",
        "any.required": "Start date is required",
    }),
    endDate: joi_1.default.date().required().messages({
        "date.base": "End date must be a valid date",
        "date.empty": "End date is required",
        "any.required": "End date is required",
    }),
    required: joi_1.default.number().integer().min(0).required().messages({
        "number.base": "Required must be a number",
        "number.min": "Required cannot be negative",
        "any.required": "Required is required",
    }),
    offered: joi_1.default.number().integer().min(0).required().messages({
        "number.base": "Offered must be a number",
        "number.min": "Offered cannot be negative",
        "any.required": "Offered is required",
    }),
    filled: joi_1.default.number().integer().min(0).required().messages({
        "number.base": "Filled must be a number",
        "number.min": "Filled cannot be negative",
        "any.required": "Filled is required",
    }),
});
exports.updatePositionSchema = joi_1.default.object({
    startDate: joi_1.default.date().optional().messages({
        "date.base": "Start date must be a valid date",
    }),
    endDate: joi_1.default.date().optional().messages({
        "date.base": "End date must be a valid date",
    }),
    status: joi_1.default.string().valid("live", "filed", "closed").optional().messages({
        "string.base": "Status must be a string",
        "any.only": "Status must be one of: live, filed, closed",
    }),
    required: joi_1.default.number().integer().min(0).optional().messages({
        "number.base": "Required must be a number",
        "number.min": "Required cannot be negative",
    }),
    offered: joi_1.default.number().integer().min(0).optional().messages({
        "number.base": "Offered must be a number",
        "number.min": "Offered cannot be negative",
    }),
    filled: joi_1.default.number().integer().min(0).optional().messages({
        "number.base": "Filled must be a number",
        "number.min": "Filled cannot be negative",
    }),
});
//# sourceMappingURL=position-validator.js.map