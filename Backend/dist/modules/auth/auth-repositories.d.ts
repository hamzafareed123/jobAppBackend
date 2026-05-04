import { ISignUpBody } from "../../types/user.types";
export declare const findUserByEmail: (email: string) => Promise<(import("mongoose").Document<unknown, {}, import("../../models/user-models").IUserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user-models").IUserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const findUserByEmails: (emails: string[]) => Promise<(import("mongoose").Document<unknown, {}, import("../../models/user-models").IUserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user-models").IUserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const createUser: (userData: ISignUpBody) => Promise<import("mongoose").Document<unknown, {}, import("../../models/user-models").IUserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user-models").IUserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const findUserByID: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../../models/user-models").IUserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user-models").IUserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const findAllUser: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../../models/user-models").IUserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user-models").IUserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const saveUserOTP: (email: string) => Promise<string>;
export declare const findUserByOTP: (otp: string) => Promise<(import("mongoose").Document<unknown, {}, import("../../models/user-models").IUserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user-models").IUserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const clearUserOtp: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../../models/user-models").IUserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user-models").IUserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const resetUserPassword: (userId: string, hashPassword: string) => Promise<(import("mongoose").Document<unknown, {}, import("../../models/user-models").IUserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user-models").IUserDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const findRefreshToken: (token: string) => Promise<(import("mongoose").Document<unknown, {}, import("../../models/refreshToken-model").IRefreshTokenDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/refreshToken-model").IRefreshTokenDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const deleteRefreshToken: (token: string) => Promise<import("mongodb").DeleteResult>;
export declare const deleteAllRefreshToken: (userId: string) => Promise<import("mongodb").DeleteResult>;
//# sourceMappingURL=auth-repositories.d.ts.map