import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/user.types";
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
export declare const protectedRoute: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map