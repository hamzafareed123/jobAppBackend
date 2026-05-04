"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.resetPassword = exports.verifyOtp = exports.forgotPassword = exports.getAllUsers = exports.Logout = exports.getAuthUser = exports.SignIn = exports.SignUp = void 0;
const auth_services_1 = require("./auth-services");
const successMessages_1 = require("../../constants/successMessages");
const outputHandler_1 = require("../../middleware/outputHandler");
const customError_1 = require("../../utils/customError");
const errorMessages_1 = require("../../constants/errorMessages");
const statusCode_1 = require("../../constants/statusCode");
const SignUp = async (req, res, next) => {
    try {
        const body = req.body;
        const { accessToken, user } = await (0, auth_services_1.signUpUser)(body, res);
        res.result = {
            data: { user, accessToken },
            message: successMessages_1.SUCCESS_MESSAGE.USER_CREATED,
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
exports.SignUp = SignUp;
const SignIn = async (req, res, next) => {
    try {
        const body = req.body;
        const { accessToken, user } = await (0, auth_services_1.signInUser)(body, res);
        res.result = {
            data: { user, accessToken },
            message: successMessages_1.SUCCESS_MESSAGE.LOGIN_SUCCESSFUL,
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
exports.SignIn = SignIn;
const getAuthUser = async (req, res, next) => {
    try {
        const user = req.user;
        res.result = { data: user };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.OK, req, res, next);
    }
    catch (error) {
        res.error = error;
        const status = error instanceof Error && "statusCode" in error
            ? res.statusCode
            : statusCode_1.STATUS_CODE.INTERNAL_SERVER_ERROR;
        (0, outputHandler_1.OutputHandler)(status, req, res, next);
    }
};
exports.getAuthUser = getAuthUser;
const Logout = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        await (0, auth_services_1.logoutService)(token, res);
        res.result = {
            data: null,
            message: successMessages_1.SUCCESS_MESSAGE.LOGOUT_SUCCESSFUL,
        };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.OK, req, res, next);
    }
    catch (error) {
        res.error = error;
        const status = statusCode_1.STATUS_CODE.INTERNAL_SERVER_ERROR;
        (0, outputHandler_1.OutputHandler)(status, req, res, next);
    }
};
exports.Logout = Logout;
const getAllUsers = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return next(new customError_1.customError(errorMessages_1.ERROR_MESSAGE.USERID_NOT_FOUND, statusCode_1.STATUS_CODE.UNAUTHORIZED));
        }
        const user = await (0, auth_services_1.fetchAllUser)(userId);
        res.result = { data: user, message: "Request Successfull" };
        (0, outputHandler_1.OutputHandler)(200, req, res, next);
    }
    catch (error) {
        res.error = error;
        const status = error instanceof Error && "statusCode" in error
            ? error.statusCode
            : statusCode_1.STATUS_CODE.INTERNAL_SERVER_ERROR;
        (0, outputHandler_1.OutputHandler)(status, req, res, next);
    }
};
exports.getAllUsers = getAllUsers;
const forgotPassword = async (req, res, next) => {
    try {
        const data = req.body;
        await (0, auth_services_1.forgotPasswordService)(data);
        res.result = { data: null, message: successMessages_1.SUCCESS_MESSAGE.OTP_SENT };
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
exports.forgotPassword = forgotPassword;
const verifyOtp = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await (0, auth_services_1.verifyOtpService)(data);
        res.result = {
            data: { resetToken: result.resetToken },
            message: successMessages_1.SUCCESS_MESSAGE.OTP_VERIFIED,
        };
        (0, outputHandler_1.OutputHandler)(statusCode_1.STATUS_CODE.OK, req, res, next);
    }
    catch (error) {
        const status = error instanceof Error && "statusCode" in error
            ? error.statusCode
            : statusCode_1.STATUS_CODE.INTERNAL_SERVER_ERROR;
        (0, outputHandler_1.OutputHandler)(status, req, res, next);
    }
};
exports.verifyOtp = verifyOtp;
const resetPassword = async (req, res, next) => {
    try {
        const data = req.body;
        await (0, auth_services_1.resetPasswordService)(data);
        res.result = {
            data: null,
            message: successMessages_1.SUCCESS_MESSAGE.PASSWORD_RESET_SUCCESS,
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
exports.resetPassword = resetPassword;
const refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        const { accessToken } = await (0, auth_services_1.refreshTokenService)(token);
        res.result = {
            data: { accessToken: accessToken },
            message: "Token is Refreshed",
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
exports.refreshToken = refreshToken;
//# sourceMappingURL=auth-controller.js.map