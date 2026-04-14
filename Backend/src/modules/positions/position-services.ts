import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { STATUS_CODE } from "../../constants/statusCode";
import { ICreatePositionDTO } from "../../types/positions.types";
import { customError } from "../../utils/customError";
import { positionRepository } from "./position-repositories";

export const positionServices = {
    async createPosition(jobId: string, data: ICreatePositionDTO) {
     
        if (!jobId) {
            throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
        }
       
    

        const position = await positionRepository.createPosition(jobId, data);

        if (!position) {
            throw new customError(ERROR_MESSAGE.POSITION_NOT_FOUND, STATUS_CODE.NOT_FOUND);
        }

        return position;
    }
}