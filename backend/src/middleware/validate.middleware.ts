import { NextFunction, Request, Response } from "express";
import { createHttpError } from "../utils/response";

export function requireFields(fields: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const missing = fields.filter((field) => req.body?.[field] === undefined || req.body?.[field] === "");

    if (missing.length) {
      return next(createHttpError(`Missing required fields: ${missing.join(", ")}`, 400));
    }

    next();
  };
}
