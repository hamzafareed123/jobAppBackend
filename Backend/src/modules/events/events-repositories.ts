import { Event } from "../../models";
import { ICreateEventDTO, IUpdateEventDTO } from "../../types/events.types";
import { Types } from "mongoose";

export const eventRepository = {
  async createEvent(jobId: string, userId: string, data: ICreateEventDTO) {
    const event = await Event.create({
      jobId: new Types.ObjectId(jobId),
      createdBy: new Types.ObjectId(userId),
      title: data.title,
      description: data.description || undefined,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      type: data.type,
      isAutoScheduled: false,
    });

    return event;
  },

  async updateEvent(
    jobId: string,
    eventId: string,
    userId: string,
    data: IUpdateEventDTO,
  ) {
    return await Event.findOneAndUpdate(
      { _id: eventId, createdBy: userId, jobId: jobId },
      { $set: { ...data } },
      { new: true },
    );
  },

  async getEventById(eventId: string, userId: string) {
    return await Event.findOne({ _id: eventId, createdBy: userId });
  },

  async getAllEvents(userId: string) {
    return await Event.find({ createdBy: userId });
  },

  async deleteEvent(jobId: string, userId: string, eventId: string) {
    return await Event.findOneAndDelete({
      _id: eventId,
      jobId: jobId,
      createdBy: userId,
    });
  },
};
