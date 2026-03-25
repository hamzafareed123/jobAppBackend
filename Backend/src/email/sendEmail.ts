import { ENV } from "../config/env";
import { otpEmailTemplate } from "./otpEmailTemplate";
import { transporter } from "./transporter";

export const sendOTPEmail = async (
  toEmail: string,
  otp: string,
): Promise<void> => {
  await transporter.sendMail({
    from: `moccy <${ENV.GMAIL_USER}>`,
    to: toEmail,
    subject: "Password Reset OTP",
    html: otpEmailTemplate(otp),
  });
};
