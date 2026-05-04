"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const dashboard_services_1 = require("./dashboard-services");
const outputHandler_1 = require("../../middleware/outputHandler");
const statusCode_1 = require("../../constants/statusCode");
const getDashboardData = async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log("User id is", userId);
        const dashboardStats = await dashboard_services_1.DashboardServices.getDashboardData(userId);
        res.result = {
            data: dashboardStats,
            message: "Dashboard Stats fetched successfully",
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
exports.getDashboardData = getDashboardData;
//# sourceMappingURL=dashboard-controller.js.map