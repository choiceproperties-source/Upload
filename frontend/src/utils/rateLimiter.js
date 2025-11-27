// Rate limiting utilities to prevent abuse

class RateLimiter {
  constructor(maxRequests = 5, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  isAllowed() {
    const now = Date.now();
    // Remove old requests outside the time window
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    // Check if we've exceeded the limit
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    this.requests.push(now);
    return true;
  }

  getRemainingRequests() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxRequests - this.requests.length);
  }

  getResetTime() {
    if (this.requests.length === 0) return 0;
    const oldestRequest = this.requests[0];
    return Math.max(0, this.windowMs - (Date.now() - oldestRequest));
  }

  reset() {
    this.requests = [];
  }
}

// Create specific limiters for different actions
export const searchLimiter = new RateLimiter(20, 60000); // 20 searches per minute
export const signupLimiter = new RateLimiter(5, 3600000); // 5 signups per hour
export const loginLimiter = new RateLimiter(10, 300000); // 10 attempts per 5 minutes
export const applicationLimiter = new RateLimiter(3, 3600000); // 3 applications per hour
export const paymentLimiter = new RateLimiter(3, 600000); // 3 payment attempts per 10 minutes
export const newsletterLimiter = new RateLimiter(1, 3600000); // 1 signup per hour

// Hook for checking rate limits
export const useRateLimit = (limiter) => {
  return {
    isAllowed: () => limiter.isAllowed(),
    getRemainingRequests: () => limiter.getRemainingRequests(),
    getResetTime: () => limiter.getResetTime(),
    formatResetTime: () => {
      const ms = limiter.getResetTime();
      const seconds = Math.ceil(ms / 1000);
      if (seconds < 60) return `${seconds}s`;
      return `${Math.ceil(seconds / 60)}m`;
    }
  };
};

// Express-like middleware for APIs
export const rateLimitMiddleware = (limiter, onLimitExceeded) => {
  return (req, res, next) => {
    if (!limiter.isAllowed()) {
      const resetTime = limiter.getResetTime();
      onLimitExceeded?.(resetTime);
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil(resetTime / 1000)
      });
    }
    next();
  };
};

export default RateLimiter;
