import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { createHttpError } from "../utils/response";

export async function verifyJwt(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      throw createHttpError("Unauthorized", 401);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw createHttpError("JWT secret is not configured", 500);
    }

    const payload = jwt.verify(token, secret) as { userId: string };
    const user = await User.findById(payload.userId).select("_id name email");

    if (!user) {
      throw createHttpError("User not found", 401);
    }

    req.user = { _id: user._id, name: user.name, email: user.email };
    next();
  } catch (error) {
    next(error);
  }
}
