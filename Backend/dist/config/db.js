"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const dbConnect = async () => {
    try {
        if (!env_1.ENV.MONGO_URL) {
            throw new Error("MONGO_URL not set in environment variables");
        }
        await mongoose_1.default.connect(env_1.ENV.MONGO_URL);
        console.log(" Database Connected Successfully");
    }
    catch (error) {
        console.error("Error in connecting Database:", error);
    }
};
exports.dbConnect = dbConnect;
//# sourceMappingURL=db.js.map