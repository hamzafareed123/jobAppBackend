import { ICreatePositionDTO } from "../../types/positions.types";
import { Position } from "../../models";
import { positionServices } from "./position-services";
import { Types } from "mongoose";

export const positionRepository = {
    async createPosition(jobId: string , createdBy:string, data: ICreatePositionDTO ) {
       
        const underOffer = Number(data.offered) - Number(data.filled);

        const position = await Position.create({
            jobId,
            createdBy,
            startDate: data.startDate,
            endDate: data.endDate,
            status: "live",
            required: data.required,
            offered: data.offered,
            filled: data.filled,
            underOffer,
        });
        return position;
    },

    async getPositions(jobId: string, createdBy: string) {
        const positions = await Position.find({ jobId, createdBy: new Types.ObjectId(createdBy) });
        return positions;
    },

}