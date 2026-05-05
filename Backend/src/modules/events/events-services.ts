import { Types } from "mongoose"
import { customError } from "../../utils/customError"
import { ERROR_MESSAGE } from "../../constants/errorMessages"
import { STATUS_CODE } from "../../constants/statusCode"
import { ICreateEventDTO } from "../../types/events.types"
import { eventRepository } from "./events-repositories"
import { jobRepository } from "../jobs/job-repositories"

export const eventServices = {

  async createEvent(jobId: string, userId: string, data: ICreateEventDTO) {

 
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND)
    }


    const job = await jobRepository.getJobOnlyById(jobId)
    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND)
    }

  
    if (job.createdBy.toString() !== userId) {
      throw new customError(
        "Only job creator can create events",
        STATUS_CODE.FORBIDDEN
      )
    }

   
    if (new Date(data.startTime) >= new Date(data.endTime)) {
      throw new customError(
        "Start time must be before end time",
        STATUS_CODE.BAD_REQUEST
      )
    }

    const event = await eventRepository.createEvent(jobId, userId, data)
    return event
  },

}