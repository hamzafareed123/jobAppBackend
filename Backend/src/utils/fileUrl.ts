import { ENV } from "../config/env";

export const generatFileUrl = (filePath: any, req: any) => {
  if (!filePath) {
    return null;
  }

  const baseUrl = ENV.BASE_URL || `${req.protocol}://${req.get("host")}`;
  return `${baseUrl}${filePath}`;
};
