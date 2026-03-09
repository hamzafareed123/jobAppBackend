export const otpEmailTemplate = (otp: string): string => {
  return `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 500px; margin: auto; background: white; border-radius: 8px; padding: 30px;">
      
      <h2 style="color: #4A1A4A;">Password Reset Request</h2>
      <p>You requested a password reset. Use the OTP below:</p>

      <div style="
        text-align: center;
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 10px;
        background: #4A1A4A;
        padding: 16px;
        border-radius: 8px;
        margin: 20px 0;
        color: white;
      ">
        ${otp}
      </div>

      <p>This OTP expires in <b>10 minutes</b>.</p>
      <p style="color: #999; font-size: 13px;">
        If you didn't request this, you can safely ignore this email.
      </p>

    </div>
  </body>
</html>
`;
};
