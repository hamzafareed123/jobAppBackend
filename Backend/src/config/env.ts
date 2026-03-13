import dotenv from "dotenv";

dotenv.config();
export const ENV = {
  PORT: parseInt(process.env.PORT || "8000", 10),
  MONGO_URL: process.env.MONGO_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  BASE_URL: process.env.BASE_URL,
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET as string,
  OTP_TOKEN_SECRET:process.env.OTP_TOKEN_SECRET as string,
};
