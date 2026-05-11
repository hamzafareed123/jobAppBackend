import { Types } from "mongoose";
import { customError } from "../../utils/customError";
import { ERROR_MESSAGE } from "../../constants/errorMessages";
import { STATUS_CODE } from "../../constants/statusCode";
import {
  ICreateEventDTO,
  IQueryEventDTO,
  IUpdateEventDTO,
} from "../../types/events.types";
import { eventRepository } from "./events-repositories";
import { jobRepository } from "../jobs/job-repositories";

export const eventServices = {
  async createEvent(jobId: string, userId: string, data: ICreateEventDTO) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const job = await jobRepository.getJobOnlyById(jobId);
    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    if (job.createdBy.toString() !== userId) {
      throw new customError(
        "Only job creator can create events",
        STATUS_CODE.FORBIDDEN,
      );
    }

    if (new Date(data.startTime) >= new Date(data.endTime)) {
      throw new customError(
        ERROR_MESSAGE.TIME_CONFLICT,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    const event = await eventRepository.createEvent(jobId, userId, data);
    if (!event) {
      throw new customError(
        ERROR_MESSAGE.EVENT_CREATION_FAILED,
        STATUS_CODE.NOT_FOUND,
      );
    }
    return event;
  },

  async updateEvent(
    jobId: string,
    eventId: string,
    userId: string,
    data: IUpdateEventDTO,
  ) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const job = await jobRepository.getJobOnlyById(jobId);

    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    if (job.createdBy.toString() !== userId) {
      throw new customError(
        "Only Job Creator Can Update Event",
        STATUS_CODE.FORBIDDEN,
      );
    }

    const event = await eventRepository.getEventById(eventId, userId);

    if (!event) {
      throw new customError(
        ERROR_MESSAGE.EVENT_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    const updatedEvent = await eventRepository.updateEvent(
      jobId,
      eventId,
      userId,
      data,
    );
    if (!updatedEvent) {
      throw new customError(
        ERROR_MESSAGE.EVENT_UPDATE_FAILED,
        STATUS_CODE.NOT_MODIFIED,
      );
    }
  },

  async getAllEvents(userId: string, body: IQueryEventDTO) {
    const events = await eventRepository.getAllEvents(userId);
    if (!events) {
      throw new customError(
        ERROR_MESSAGE.EVENT_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    return events;
  },
  async getEventById(userId: string, eventId: string) {
    const event = await eventRepository.getEventById(eventId, userId);

    if (!event) {
      throw new customError(
        ERROR_MESSAGE.EVENT_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    return event;
  },
  async deleteEvent(jobId: string, userId: string, eventId: string) {
    if (!Types.ObjectId.isValid(jobId)) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const job = await jobRepository.getJobOnlyById(jobId);

    if (!job) {
      throw new customError(ERROR_MESSAGE.JOB_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    if (job.createdBy.toString() !== userId) {
      throw new customError(
        "Only Job Creator Can Update Event",
        STATUS_CODE.FORBIDDEN,
      );
    }

    const event = await eventRepository.deleteEvent(jobId, eventId, userId);

    if (!event) {
      throw new customError(
        ERROR_MESSAGE.EVENT_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    return event;
  },
};
