import mongoose, { Document } from "mongoose";
export interface IJobType extends Document {
    name: string;
}
declare const JobType: mongoose.Model<IJobType, {}, {}, {}, mongoose.Document<unknown, {}, IJobType, {}, mongoose.DefaultSchemaOptions> & IJobType & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IJobType>;
export default JobType;
//# sourceMappingURL=jobType-model.d.ts.map