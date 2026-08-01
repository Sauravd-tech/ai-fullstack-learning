import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@ai-fullstack-learning/types';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqId = req.requestId || 'UNKNOWN_REQ_ID';
  console.error(`[${reqId}] Unhandled Exception:`, err);

  const response: ApiError = {
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred.',
    },
  };

  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json(response);
};
