import Joi from "joi";


export const createPositionSchema = Joi.object({
    startDate: Joi.date().required().messages({
        "date.base": "Start date must be a valid date",
        "date.empty": "Start date is required",
        "any.required": "Start date is required",
    }),

    endDate: Joi.date().required().messages({
        "date.base": "End date must be a valid date",
        "date.empty": "End date is required",
        "any.required": "End date is required",
    }),

    required: Joi.number().integer().min(0).required().messages({
        "number.base": "Required must be a number",
        "number.min": "Required cannot be negative",
        "any.required": "Required is required",
    }),

    offered: Joi.number().integer().min(0).required().messages({
        "number.base": "Offered must be a number",
        "number.min": "Offered cannot be negative",
        "any.required": "Offered is required",
    }),

    filled: Joi.number().integer().min(0).required().messages({
        "number.base": "Filled must be a number",
        "number.min": "Filled cannot be negative",
        "any.required": "Filled is required",
    }),
})


export const updatePositionSchema = Joi.object({
    startDate: Joi.date().optional().messages({
        "date.base": "Start date must be a valid date",
    }),

    endDate: Joi.date().optional().messages({
        "date.base": "End date must be a valid date",
    }),

    status: Joi.string().valid("live", "filed", "closed").optional().messages({
        "string.base": "Status must be a string",
        "any.only": "Status must be one of: live, filed, closed",
    }),

    required: Joi.number().integer().min(0).optional().messages({
        "number.base": "Required must be a number",
        "number.min": "Required cannot be negative",
    }),

    offered: Joi.number().integer().min(0).optional().messages({
        "number.base": "Offered must be a number",
        "number.min": "Offered cannot be negative",
    }),

    filled: Joi.number().integer().min(0).optional().messages({
        "number.base": "Filled must be a number",
        "number.min": "Filled cannot be negative",
    }),
})