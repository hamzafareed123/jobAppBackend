import mongoose, { Document } from "mongoose";
export interface IAssessment extends Document {
    name: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<IAssessment, {}, {}, {}, mongoose.Document<unknown, {}, IAssessment, {}, mongoose.DefaultSchemaOptions> & IAssessment & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IAssessment>;
export default _default;
//# sourceMappingURL=assessment.model.d.ts.map