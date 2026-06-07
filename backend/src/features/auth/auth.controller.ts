import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { generateToken } from "../../utils/jwt";
import { createHttpError, sendSuccess } from "../../utils/response";

function sanitizeUser(user: any) {
  const object = user.toObject ? user.toObject() : user;
  delete object.password;
  delete object.githubAccessToken;
  return object;
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      throw createHttpError("An account with that email already exists", 409);
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10),
    });

    return sendSuccess(
      res,
      { user: sanitizeUser(user), token: generateToken(user._id.toString()) },
      201,
    );
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user?.password || !(await bcrypt.compare(password, user.password))) {
      throw createHttpError("Invalid credentials", 401);
    }

    return sendSuccess(res, {
      user: sanitizeUser(user),
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.user?._id).select("-password -githubAccessToken");
    if (!user) {
      throw createHttpError("User not found", 404);
    }

    return sendSuccess(res, { user });
  } catch (error) {
    next(error);
  }
}
