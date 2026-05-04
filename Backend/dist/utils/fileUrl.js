"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileUrl = void 0;
const generateFileUrl = (filePath, req) => {
    if (!filePath) {
        return null;
    }
    return `${req.protocol}://${req.get("host")}/files/${filePath}`;
};
exports.generateFileUrl = generateFileUrl;
//# sourceMappingURL=fileUrl.js.map