import { Request, Response, NextFunction } from 'express';
import HttpCodes from '../constants/HttpCodes';
import { ApiError } from '../errors/ApiError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Database foreign key errors
  if (err.code === '23503' || err.message?.includes('foreign key')) {
    return res.status(HttpCodes.Conflict).json({
      error: 'This item cannot be deleted because it is being used.',
    });
  }

  // return a 500 error if we get here - was not caught be something else
  return res.status(HttpCodes.ServerError).json({ error: 'Something went wrong' });
};

export const notFoundHandler = (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(HttpCodes.NotFound).json({ error: 'Not found' });
};
