import {
  ICreatePositionDTO,
  IGETALLPOSITIONRESPONSE,
  IUpdatePositionDTO,
} from "../../types/positions.types";
import { Position } from "../../models";

export const positionRepository = {
  async createPosition(
    jobId: string,
    createdBy: string,
    data: ICreatePositionDTO,
  ) {
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

  async getPositions(
    jobId: string,
    query: string,
    page: string,
    limit: string,
    sortBy: string,
    sortOrder: string,
  ): Promise<IGETALLPOSITIONRESPONSE> {
    const filter: any = {
      jobId: jobId,
      ...(query && {
        $or: [
          { status: { $regex: query, $options: "i" } },
          ...(!isNaN(Number(query)) ? [{ required: Number(query) }] : []),
          ...(!isNaN(Number(query)) ? [{ offered: Number(query) }] : []),
          ...(!isNaN(Number(query)) ? [{ filled: Number(query) }] : []),
        ],
      }),
    };

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 8;
    const skip = (pageNum - 1) * limitNum;

    const sortFields: Record<string, string> = {
      createdAt: "createdAt",
      startDate: "startDate",
      endDate: "endDate",
      remaining: "underOffer",
      required: "required",
      offered: "offered",
      filled: "filled",
      status: "status",
    };

    const sortField = sortFields[sortBy] || "createdAt";
    const sortDirection = sortOrder === "desc" ? -1 : 1;
    const sort: any = { [sortField]: sortDirection };

    const [positions, total] = await Promise.all([
      Position.find(filter).sort(sort).skip(skip).limit(limitNum),
      Position.countDocuments(filter),
    ]);

    return {
      position: positions,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1,
      },
    };
  },

  async updatePosition(positionId: string, data: IUpdatePositionDTO) {
    const updateData: any = { ...data };

    if (data.offered !== undefined || data.filled !== undefined) {
      const position = await Position.findById(positionId);
      if (!position) {
        return null;
      }
      const offered =
        data.offered !== undefined
          ? Number(data.offered)
          : Number(position.offered);
      const filled =
        data.filled !== undefined
          ? Number(data.filled)
          : Number(position.filled);
      updateData.underOffer = offered - filled;
    }

    const position = await Position.findByIdAndUpdate(positionId, updateData, {
      new: true,
    });
    return position;
  },

  async deletePosition(positionId: string) {
    const position = await Position.findByIdAndDelete(positionId);
    return position;
  },

  async updatePositionStatus(positionId:string,jobId:string,status:string){
    const position = await Position.findOneAndUpdate(
        {_id:positionId,jobId},
        {status},
        {new:true}
    )
    return position;
  }
};
