import Joi from "joi";

export const signUpSchema = Joi.object({
  fullName: Joi.string().trim().required().messages({
    "string.empty": "FullName is Required",
    "any.required": "FullName is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email Should be valid",
    "string.empty": "Email is Required",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(4).max(15).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 4 characters",
    "string.max": "Password must be at most  15 characters",
    "any.required": "Password is required",
  }),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email Should be valid",
    "string.empty": "Email is Required",
    "any.required": "Email is required",
  }),

  password: Joi.string().messages({
    "string.empty": "Password is Required",
    "any.required": "Password is Required",
  }),
});
