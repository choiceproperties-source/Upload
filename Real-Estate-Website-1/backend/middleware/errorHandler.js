/**
 * Centralized Error Handler Middleware
 * Provides consistent error responses across the API
 */

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Log error with context
  console.error(`[${new Date().toISOString()}] Error:`, {
    statusCode,
    message: err.message,
    path: req.path,
    method: req.method,
    userId: req.user?.id || 'anonymous',
    ip: req.ip,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: messages,
      statusCode: 400,
      timestamp: new Date().toISOString()
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
      statusCode: 409,
      timestamp: new Date().toISOString()
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token',
      statusCode: 401,
      timestamp: new Date().toISOString()
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Authentication token expired',
      statusCode: 401,
      timestamp: new Date().toISOString()
    });
  }

  // Default error response
  res.status(statusCode).json({
    success: false,
    message: isProduction ? 'An error occurred' : err.message,
    ...(process.env.NODE_ENV === 'development' && { error: err }),
    statusCode,
    timestamp: new Date().toISOString()
  });
};

export default errorHandler;
