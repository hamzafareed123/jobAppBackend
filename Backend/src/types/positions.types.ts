export type PositionStatus = "live" | "filed" | "closed";

export interface IPosition {
  jobId: string;
  startDate: Date;
  endDate: Date;
  status: PositionStatus;
  required: Number;
  offered: Number;
  filled: Number;
  underOffer: Number;
}

export interface ICreatePositionDTO{
    jobId:string;
    startDate:Date;
    endDate:Date;
    required:Number;
    offered:Number;
    filled:Number;
}

export interface IUpdatePositionDTO{
    startDate?:Date;
    endDate?:Date;
    required?:Number;
    offered?:Number;
    filled?:Number;
}




