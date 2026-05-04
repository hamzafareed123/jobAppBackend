"use strict";
// src/utils/candidateEmailTemplate.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateEmailTemplate = void 0;
const candidateEmailTemplate = (candidateName, subject, body) => {
    const personalizedBody = body.replace("{Candidate_name}", candidateName);
    return `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 500px; margin: auto; background: white; border-radius: 8px; padding: 30px;">
      
    
      <h2 style="color: #4A1A4A;">${subject}</h2>
      
      <div style="font-size: 15px; color: #333; line-height: 1.6;">
        ${personalizedBody}
      </div>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #999; font-size: 12px;">
        This email was sent regarding your job application. 
        Please do not reply to this email.
      </p>

    </div>
  </body>
</html>
`;
};
exports.candidateEmailTemplate = candidateEmailTemplate;
//# sourceMappingURL=CandidateEmailTemplate.js.map