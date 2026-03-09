import nodemailer from "nodemailer";
import { ENV } from "../config/env";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: ENV.GMAIL_USER,
    pass: ENV.GMAIL_APP_PASSWORD,
  },
});
