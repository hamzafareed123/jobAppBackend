"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputHandler = void 0;
const OutputHandler = (statusCode, req, res, next) => {
    if (res.headersSent)
        return;
    const result = res.result;
    const error = res.error;
    if (!error) {
        res.status(statusCode).json({
            success: true,
            data: result?.data,
            ...(result?.pagination && { pagination: result.pagination }),
            message: result?.message || "Request Successfully",
        });
        return;
    }
    const message = typeof error == "string" ? error : error?.message || "Something went wrong";
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.OutputHandler = OutputHandler;
//# sourceMappingURL=outputHandler.js.map