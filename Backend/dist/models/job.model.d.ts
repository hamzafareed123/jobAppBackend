import mongoose, { Document, Types } from "mongoose";
export interface IPay {
    min?: number;
    max?: number;
    currency?: string;
    payPer?: "Hour" | "Month" | "Year";
    noSalary: boolean;
}
export interface IJob extends Document {
    createdBy: Types.ObjectId;
    status: "draft" | "active" | "closed" | "archived";
    jobTitle: string;
    jobType: Types.ObjectId;
    function?: string;
    role?: string;
    postCategory?: string;
    level?: string;
    employmentType?: string;
    noOfPositions?: number;
    startDate?: Date;
    endDate?: Date;
    remote?: "Yes" | "No" | "Hybrid";
    department?: string;
    keywords?: string[];
    pay?: IPay;
    location?: string;
    jobSummary?: string;
    descriptionText?: string;
    descriptionFile?: string;
    assessmentId?: Types.ObjectId;
    skillIds?: Types.ObjectId[];
    stages?: {
        name: string;
        description?: string;
        order: number;
    }[];
    interviewers?: {
        userId: Types.ObjectId;
        role: "Recruiter" | "Hiring Manager";
    };
    jobRequirements?: string;
    jobDescription?: string;
    elevatorPitch?: string;
    aboutUs?: boolean;
    companyBenefits?: boolean;
    additionalNotes?: string;
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IJob, {}, {}, {}, mongoose.Document<unknown, {}, IJob, {}, mongoose.DefaultSchemaOptions> & IJob & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IJob>;
export default _default;
//# sourceMappingURL=job.model.d.ts.map