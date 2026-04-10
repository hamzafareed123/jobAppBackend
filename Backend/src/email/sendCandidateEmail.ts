import { ENV } from "../config/env";
import { candidateEmailTemplate } from "./CandidateEmailTemplate";
import { otpEmailTemplate } from "./otpEmailTemplate";
import { transporter } from "./transporter";

export const sendCandidateEmail = async (
  toEmail: string,
  CandidateName:string,
  subject:string,
  body:string,
 
): Promise<void> => {
  await transporter.sendMail({
    from: `moccy <${ENV.GMAIL_USER}>`,
    to: toEmail,
    subject: subject,
    html: candidateEmailTemplate(CandidateName, subject, body),
  });
};
