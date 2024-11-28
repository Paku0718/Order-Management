import { Request, Response, NextFunction } from 'express';
import logger from './requestLogger';

export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // Log the error
  logger.error('Unhandled Error', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path
  });

  // Send error response
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};