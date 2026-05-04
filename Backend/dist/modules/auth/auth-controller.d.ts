import { NextFunction, Request, Response } from "express";
export declare const SignUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const SignIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAuthUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const Logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const forgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyOtp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const resetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth-controller.d.ts.map