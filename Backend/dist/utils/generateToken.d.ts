import { SignOptions } from "jsonwebtoken";
import { Response } from "express";
export declare const generateToken: (userId: string, SECRET_KEY: string, expireTime: SignOptions["expiresIn"]) => string;
export declare const generateRefreshToken: (userId: string, res: Response) => Promise<void>;
//# sourceMappingURL=generateToken.d.ts.map