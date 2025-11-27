// Performance optimization utilities

// Debounce function for resize/scroll events
export const debounce = (func, delay) => {
  let timeoutId;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeoutId);
      func(...args);
    };
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, delay);
  };
};

// Throttle function for high-frequency events
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Image preloader
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
};

// Batch preload multiple images
export const preloadImages = async (srcs) => {
  try {
    const promises = srcs.map(src => preloadImage(src));
    await Promise.all(promises);
    return true;
  } catch (error) {
    console.warn('Image preload failed:', error);
    return false;
  }
};

// Intersection Observer for lazy loading
export const createLazyLoadObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Performance monitoring
export const logMetric = (name, value, type = 'timing') => {
  if (typeof window !== 'undefined' && window.performance) {
    if (type === 'timing') {
      performance.mark(name);
      console.log(`⏱️ ${name}: ${value}ms`);
    } else {
      console.log(`📊 ${name}: ${value}`);
    }
  }
};

// Check if device prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Check network speed
export const getNetworkSpeed = () => {
  if (typeof navigator === 'undefined') return 'unknown';
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return connection?.effectiveType || 'unknown';
};

// Optimize animations based on device
export const getAnimationVariant = (fullAnimation, reducedAnimation) => {
  return prefersReducedMotion() ? reducedAnimation : fullAnimation;
};

// Cache management
export const cacheData = (key, value, ttl = 3600000) => {
  const data = {
    value,
    timestamp: Date.now(),
    ttl
  };
  localStorage.setItem(key, JSON.stringify(data));
};

export const getCachedData = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { value, timestamp, ttl } = JSON.parse(cached);
  
  if (Date.now() - timestamp > ttl) {
    localStorage.removeItem(key);
    return null;
  }

  return value;
};

// Request batching for API calls
export const batchRequests = (requests, delay = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      Promise.all(requests).then(resolve);
    }, delay);
  });
};
