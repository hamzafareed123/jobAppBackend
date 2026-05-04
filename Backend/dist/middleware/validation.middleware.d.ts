import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
export declare const validateRequest: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.middleware.d.ts.map