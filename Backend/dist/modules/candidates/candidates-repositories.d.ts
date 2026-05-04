import { IMovingStageDTO, IQualifyDTO } from "../../types/candidates.types";
export declare const candidateRepository: {
    applyJob(jobId: string, userId: string): Promise<any>;
    getCandidates(jobId: string, stage: string, status: string, search: string): Promise<{
        Applied: any[];
        Shortlisted: any[];
        Offered: any[];
        Hired: any[];
        "Not Moving Forward": any[];
    }>;
    moveStage(jobId: string, candidateId: string, data: IMovingStageDTO): Promise<any>;
    qualifyCandidate(jobId: string, candidateId: string, data: IQualifyDTO): Promise<any>;
};
//# sourceMappingURL=candidates-repositories.d.ts.map