import { IAuthResponse, IForgotPasswordBody, IResetPasswordBody, ISignInBody, ISignUpBody, IUser, IVerifyOtpBody } from "../../types/user.types";
import { Response } from "express";
export declare const signUpUser: (body: ISignUpBody, res: Response) => Promise<IAuthResponse>;
export declare const signInUser: (body: ISignInBody, res: Response) => Promise<{
    accessToken: string;
    user: IUser;
}>;
export declare const fetchAllUser: (userId: string) => Promise<IUser[]>;
export declare const forgotPasswordService: (data: IForgotPasswordBody) => Promise<void>;
export declare const verifyOtpService: (data: IVerifyOtpBody) => Promise<{
    resetToken: string;
}>;
export declare const resetPasswordService: (data: IResetPasswordBody) => Promise<void>;
export declare const refreshTokenService: (token: string) => Promise<{
    accessToken: string;
}>;
export declare const logoutService: (userId: string, res: Response) => Promise<void>;
//# sourceMappingURL=auth-services.d.ts.map