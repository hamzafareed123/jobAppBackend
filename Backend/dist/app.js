"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/config");
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const auth_routes_1 = __importDefault(require("../src/modules/auth/auth.routes"));
const job_route_1 = __importDefault(require("../src/modules/jobs/job-route"));
const candidates_route_1 = __importDefault(require("../src/modules/candidates/candidates-route"));
const dashboard_route_1 = __importDefault(require("../src/modules/dashboard/dashboard-route"));
const position_route_1 = __importDefault(require("../src/modules/positions/position-route"));
const db_1 = require("./config/db");
const outputHandler_1 = require("./middleware/outputHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
(0, db_1.dbConnect)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.ENV.CLIENT_URL,
    credentials: true,
}));
app.use("/files", express_1.default.static(path_1.default.join(__dirname, "../upload/Job-Files")));
app.use("/auth", auth_routes_1.default);
app.use("/api/jobs", job_route_1.default);
app.use("/api/candidate", candidates_route_1.default);
app.use("/api/dashboard", dashboard_route_1.default);
app.use("/api/position", position_route_1.default);
app.use((error, req, res, next) => {
    res.error = error;
    const status = error instanceof Error &&
        "statusCode" in error &&
        typeof error.statusCode === "number"
        ? error.statusCode
        : 500;
    (0, outputHandler_1.OutputHandler)(status, req, res, next);
});
app.listen(env_1.ENV.PORT, () => {
    console.log("Sever Running on Port", env_1.ENV.PORT);
});
//# sourceMappingURL=app.js.map