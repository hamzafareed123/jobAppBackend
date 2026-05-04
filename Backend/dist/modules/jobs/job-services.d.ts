import { Types } from "mongoose";
import { ICreateJobDTO, IPublishJobDTO, ISaveAssessmentDTO, ISaveInterviewersDTO, ISaveJobInfoDTO, ISaveStagesDTO } from "../../types";
export declare const jobServices: {
    createJob(data: ICreateJobDTO, userId: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, never>>;
    getAllJobs(userId: string, status: string, query: string, page: string, limit: string): Promise<import("../../types").IGetAllJobResponse>;
    getJobById(jobId: string, userId: string): Promise<import("../../types").IJob>;
    saveJobInfo(data: ISaveJobInfoDTO, jobId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saveAssessment(data: ISaveAssessmentDTO, jobId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saveStages(data: ISaveStagesDTO, jobId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    saveInterviewers(data: ISaveInterviewersDTO, jobId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    publishJob(data: IPublishJobDTO, jobId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteJob(jobId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../../models").IJob, {}, import("mongoose").DefaultSchemaOptions> & import("../../models").IJob & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=job-services.d.ts.map