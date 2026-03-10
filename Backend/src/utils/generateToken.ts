import jwt from "jsonwebtoken";
import { Response } from "express";
import { ENV } from "../config/env";
import { RefreshToken } from "../models/refreshToken-model";

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, ENV.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = async (
  userId: string,
  res: Response,
): Promise<void> => {
  const token = jwt.sign({ userId }, ENV.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  await RefreshToken.create({ userId, token });
  res.cookie("refreshToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  });
};
