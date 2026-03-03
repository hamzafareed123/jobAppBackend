import { rateLimit } from "express-rate-limit";
import { ERROR_MESSAGE } from "../constants/errorMessages";

export const Limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: { error: ERROR_MESSAGE.TOO_MANY_REQUEST },
});
