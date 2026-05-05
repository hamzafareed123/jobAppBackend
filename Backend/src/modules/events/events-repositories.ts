import { Event } from "../../models"
import { ICreateEventDTO } from "../../types/events.types"
import { Types } from "mongoose"

export const eventRepository = {

  async createEvent(jobId: string, userId: string, data: ICreateEventDTO) {
    const event = await Event.create({
      jobId: new Types.ObjectId(jobId),
      createdBy: new Types.ObjectId(userId),
      title: data.title,
      description:  data.description || undefined,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      type: data.type,
      isAutoScheduled: false,
    })
 
    return event
  },

}