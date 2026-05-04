"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const customError_1 = require("../utils/customError");
const statusCode_1 = require("../constants/statusCode");
const uploadPath = "upload";
if (!fs_1.default.existsSync(uploadPath)) {
    fs_1.default.mkdirSync(uploadPath);
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const subFolder = "Job-Files";
        const folder = path_1.default.join(uploadPath, subFolder);
        if (!fs_1.default.existsSync(folder)) {
            fs_1.default.mkdirSync(folder, { recursive: true });
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}${path_1.default.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    if (!allowedMimeTypes.includes(file.mimetype) ||
        !allowedExtensions.includes(ext)) {
        return cb(new customError_1.customError("Only PDF and Word documents are allowed", statusCode_1.STATUS_CODE.UNSUPPORTED_MEDIA_TYPE));
    }
    cb(null, true);
};
const uploadJobDoc = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
exports.default = uploadJobDoc;
//# sourceMappingURL=upload-middleware.js.map