import { Request, Response, NextFunction } from "express";
export declare const createJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllJobs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getJobById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const saveJobInfo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const saveAssessment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const saveStages: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const saveInterviewers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const publishJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteJob: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=job-controller.d.ts.map