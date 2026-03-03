import { ENV } from "../config/env";
import { Request } from "express";

export const generateFileUrl = (filePath: any, req: Request) => {
  if (!filePath) {
    return null;
  }

  return `${req.protocol}://${req.get("host")}/files/${filePath}`;
};
