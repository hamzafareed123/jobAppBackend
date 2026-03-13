export interface IUser {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface ISignUpBody {
  fullName: string;
  email: string;
  password: string;
}

export interface ISignInBody {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}

export interface IForgotPasswordBody{
  email:string
}

export interface IVerifyOtpBody{
    otp:string;
}

export interface IResetPasswordBody{
  password:string,
  confirmPassword:string,
  resetToken:string,
}

