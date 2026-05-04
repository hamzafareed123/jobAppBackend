import mongoose, { Document, Types } from "mongoose";
export interface IJobInterviewer extends Document {
    jobId: Types.ObjectId;
    userId: Types.ObjectId;
    role: "Recruiter" | "Hiring Manager";
}
declare const _default: mongoose.Model<IJobInterviewer, {}, {}, {}, mongoose.Document<unknown, {}, IJobInterviewer, {}, mongoose.DefaultSchemaOptions> & IJobInterviewer & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IJobInterviewer>;
export default _default;
//# sourceMappingURL=jobInterviewer.model.d.ts.map