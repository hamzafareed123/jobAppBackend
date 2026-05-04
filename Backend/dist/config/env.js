"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
exports.ENV = {
    PORT: parseInt(process.env.PORT || "8000", 10),
    MONGO_URL: process.env.MONGO_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    BASE_URL: process.env.BASE_URL,
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    OTP_TOKEN_SECRET: process.env.OTP_TOKEN_SECRET,
};
//# sourceMappingURL=env.js.map