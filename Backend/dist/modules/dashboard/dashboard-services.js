"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardServices = void 0;
const statusCode_1 = require("../../constants/statusCode");
const customError_1 = require("../../utils/customError");
const dashboard_repositories_1 = require("./dashboard-repositories");
exports.DashboardServices = {
    async getDashboardData(userId) {
        const dashboardData = await dashboard_repositories_1.DashboardRepository.getDashboardData(userId);
        if (!dashboardData) {
            throw new customError_1.customError("Dashboard Data not found", statusCode_1.STATUS_CODE.NOT_FOUND);
        }
        return dashboardData;
    }
};
//# sourceMappingURL=dashboard-services.js.map