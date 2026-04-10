import { STATUS_CODE } from "../../constants/statusCode";
import { customError } from "../../utils/customError";
import { DashboardRepository } from "./dashboard-repositories";

export const DashboardServices =  {
    async getDashboardData(userId:string){
        const dashboardData = await DashboardRepository.getDashboardData(userId);

        if(!dashboardData){
            throw new customError("Dashboard Data not found",STATUS_CODE.NOT_FOUND);
        }
        return dashboardData;
    }
}