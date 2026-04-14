import { ICreatePositionDTO } from "../../types/positions.types";
import { Position } from "../../models";

export const positionRepository = {
    async createPosition(jobId: string, data: ICreatePositionDTO) {
       
        const underOffer = Number(data.offered) - Number(data.filled);

        const position = await Position.create({
            jobId,
            startDate: data.startDate,
            endDate: data.endDate,
            status: "live",
            required: data.required,
            offered: data.offered,
            filled: data.filled,
            underOffer,
        });
        return position;
    }
}