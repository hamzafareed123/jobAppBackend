import { ICreatePositionDTO, IGETALLPOSITIONRESPONSE, IUpdatePositionDTO } from "../../types/positions.types";
export declare const positionRepository: {
    createPosition(jobId: string, createdBy: string, data: ICreatePositionDTO): Promise<any>;
    getPositions(jobId: string, query: string, page: string, limit: string, sortBy: string, sortOrder: string): Promise<IGETALLPOSITIONRESPONSE>;
    updatePosition(positionId: string, data: IUpdatePositionDTO): Promise<any>;
    deletePosition(positionId: string): Promise<any>;
};
//# sourceMappingURL=position-repositories.d.ts.map