import { ICreateJobDTO, IGetAllJobResponse, IJob, IPublishJobDTO, ISaveAssessmentDTO, ISaveInterviewersDTO, ISaveJobInfoDTO, ISaveStagesDTO } from "../../types";
import { Types } from "mongoose";
export declare const jobRepository: {
    createJob(data: ICreateJobDTO, userId: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, never>>;
    getAllJobs(userId: string, status: string, query: string, page: string, limit: string): Promise<IGetAllJobResponse>;
    getJobById(jobId: string, userId: string): Promise<IJob | null>;
    getJobOnlyById(jobId: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    saveJobInfo(data: ISaveJobInfoDTO, jobId: string, userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    saveAssessment(data: ISaveAssessmentDTO, jobId: string, userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    saveStages(data: ISaveStagesDTO, jobId: string, userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    saveInterviewers(data: ISaveInterviewersDTO, jobId: string, userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    publishJob(data: IPublishJobDTO, jobId: string, userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteJob(jobId: string, userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
};
//# sourceMappingURL=job-repositories.d.ts.map