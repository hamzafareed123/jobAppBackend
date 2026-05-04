import mongoose, { Document } from "mongoose";
export interface IUserDocument extends Document {
    fullName: string;
    email: string;
    password: string;
    profilePic?: string;
    role: "user" | "admin";
    otp?: string;
    otpExpire?: Date;
    provider: "local" | "google";
    googleId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, mongoose.DefaultSchemaOptions> & IUserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUserDocument>;
//# sourceMappingURL=user-models.d.ts.map