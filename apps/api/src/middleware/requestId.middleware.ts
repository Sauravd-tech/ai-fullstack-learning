import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// Extend Express Request interface to include requestId
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const reqId = crypto.randomUUID();
  req.requestId = reqId;
  res.locals.requestId = reqId;
  next();
};
