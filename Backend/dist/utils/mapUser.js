"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUser = void 0;
const mapUser = (user) => ({
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});
exports.mapUser = mapUser;
//# sourceMappingURL=mapUser.js.map