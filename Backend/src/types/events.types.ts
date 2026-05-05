import { Types } from "mongoose"

export type EventType = "interview" | "meeting" | "task" | "other"

export interface IEvent {
  _id?: Types.ObjectId
  jobId: Types.ObjectId
  createdBy: Types.ObjectId
  candidateId?: Types.ObjectId
  title: string
  description?: string
  startTime: Date
  endTime: Date
  type: EventType
  isAutoScheduled: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface ICreateEventDTO {
  title: string
  description?: string
  startTime: string
  endTime: string
  type: EventType
 
}

export interface IUpdateEventDTO {
  title?: string
  description?: string
  startTime?: string
  endTime?: string
  type?: EventType

}

export interface IQueryEventDTO {
  startDate?: string
  endDate?: string
  type?: EventType
}