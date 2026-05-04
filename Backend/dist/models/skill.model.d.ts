import mongoose, { Document } from "mongoose";
export interface ISkill extends Document {
    name: string;
}
declare const _default: mongoose.Model<ISkill, {}, {}, {}, mongoose.Document<unknown, {}, ISkill, {}, mongoose.DefaultSchemaOptions> & ISkill & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISkill>;
export default _default;
//# sourceMappingURL=skill.model.d.ts.map