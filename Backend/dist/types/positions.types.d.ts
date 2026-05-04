import { Document, Types } from "mongoose";
import { IPaganation } from "./job.types";
export type PositionStatus = "live" | "filed" | "closed";
export interface IPosition {
    jobId: string;
    createdBy: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: PositionStatus;
    required: Number;
    offered: Number;
    filled: Number;
    underOffer: Number;
}
export interface ICreatePositionDTO {
    jobId: string;
    startDate: Date;
    endDate: Date;
    required: Number;
    offered: Number;
    filled: Number;
}
export interface IUpdatePositionDTO {
    startDate?: Date;
    endDate?: Date;
    required?: Number;
    offered?: Number;
    filled?: Number;
}
export interface IPositionQueryParams {
    query?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface IGETALLPOSITIONRESPONSE {
    position: (IPosition & Document)[];
    pagination: IPaganation;
}
//# sourceMappingURL=positions.types.d.ts.map