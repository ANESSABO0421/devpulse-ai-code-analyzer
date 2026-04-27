import { NextFunction, Request, Response } from "express";

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  const error = new Error(`Route not found: ${req.originalUrl}`) as Error & {
    statusCode?: number;
  };
  error.statusCode = 404;
  next(error);
}

export function errorHandler(
  error: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong";

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}
