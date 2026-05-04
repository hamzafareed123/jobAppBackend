import mongoose, { Document } from "mongoose";
export interface IRefreshTokenDocument extends Document {
    userId: mongoose.Types.ObjectId;
    token: string;
    createdAt: Date;
}
export declare const RefreshToken: mongoose.Model<IRefreshTokenDocument, {}, {}, {}, mongoose.Document<unknown, {}, IRefreshTokenDocument, {}, mongoose.DefaultSchemaOptions> & IRefreshTokenDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IRefreshTokenDocument>;
//# sourceMappingURL=refreshToken-model.d.ts.map