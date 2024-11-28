import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

// Create a logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    // Write error logs to a file
    new winston.transports.File({ 
      filename: 'error.log', 
      level: 'error' 
    }),
    // Write all logs to a combined log file
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  // Log the request
  logger.info(`Incoming ${req.method} request to ${req.path}`, {
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body
  });

  // Override the original end method to log response
  const originalEnd = res.end;
  res.end = function(...args: any[]) {
    const duration = Date.now() - startTime;

    logger.info(`${req.method} ${req.path} - ${res.statusCode}`, {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`
    });

    // Call the original end method
    return originalEnd.apply(this, args);
  };

  next();
};

export default logger;