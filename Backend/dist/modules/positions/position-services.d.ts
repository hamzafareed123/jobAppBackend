import { ICreatePositionDTO, IUpdatePositionDTO } from "../../types/positions.types";
export declare const positionServices: {
    createPosition(jobId: string, createdBy: string, data: ICreatePositionDTO): Promise<any>;
    getPositions(jobId: string, query: string, page: string, limit: string, sortBy: string, sortOrder: string): Promise<import("../../types/positions.types").IGETALLPOSITIONRESPONSE>;
    updatePosition(positionId: string, data: IUpdatePositionDTO): Promise<any>;
    deletePosition(positionId: string): Promise<any>;
};
//# sourceMappingURL=position-services.d.ts.map