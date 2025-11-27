// ImageKit image transformation utility
// This centralizes all image optimization logic

const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || '';
const IMAGEKIT_PUBLIC_KEY = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || '';

/**
 * Generate optimized ImageKit URL with transformations
 * @param {string} imagePath - Image path in ImageKit
 * @param {object} options - Transformation options
 */
export const getImageKitUrl = (imagePath, options = {}) => {
  if (!IMAGEKIT_URL_ENDPOINT) {
    console.warn('ImageKit not configured. Using fallback.');
    return imagePath;
  }

  const {
    width = 'auto',
    height = 'auto',
    crop = true,
    quality = 'auto',
    format = 'auto',
    progressive = true,
  } = options;

  // Build transformation string
  const transforms = [];
  
  if (width !== 'auto') transforms.push(`w-${width}`);
  if (height !== 'auto') transforms.push(`h-${height}`);
  if (crop) transforms.push('c-force');
  if (quality === 'auto') transforms.push('q-auto');
  else if (quality) transforms.push(`q-${quality}`);
  if (format === 'auto') transforms.push('f-auto');
  else if (format) transforms.push(`f-${format}`);
  if (progressive) transforms.push('pr-true');

  const transformPath = transforms.length > 0 ? `/tr:${transforms.join(',')}` : '';
  
  return `${IMAGEKIT_URL_ENDPOINT}${transformPath}/${imagePath}`;
};

/**
 * Generate responsive srcSet for multiple screen sizes
 * @param {string} imagePath - Image path in ImageKit
 * @param {array} sizes - Array of widths (e.g., [320, 640, 1280])
 */
export const getResponsiveSrcSet = (imagePath, sizes = [320, 640, 1024, 1920]) => {
  return sizes
    .map((size) => {
      const url = getImageKitUrl(imagePath, { width: size, height: 'auto' });
      return `${url} ${size}w`;
    })
    .join(', ');
};

/**
 * Get optimized URL for property images
 * Automatically handles compression, format, and responsiveness
 */
export const getPropertyImageUrl = (imagePath, width = 600) => {
  return getImageKitUrl(imagePath, {
    width,
    height: 400,
    crop: true,
    quality: 'auto',
    format: 'auto',
  });
};

/**
 * Get hero image URL (large, optimized)
 */
export const getHeroImageUrl = (imagePath) => {
  return getImageKitUrl(imagePath, {
    width: 1920,
    height: 600,
    crop: true,
    quality: 'auto',
    format: 'auto',
  });
};

/**
 * Get thumbnail URL (small, highly compressed)
 */
export const getThumbnailUrl = (imagePath) => {
  return getImageKitUrl(imagePath, {
    width: 300,
    height: 200,
    crop: true,
    quality: 75,
    format: 'auto',
  });
};

/**
 * Get avatar URL (for user profiles)
 */
export const getAvatarUrl = (imagePath, size = 128) => {
  return getImageKitUrl(imagePath, {
    width: size,
    height: size,
    crop: true,
    quality: 'auto',
    format: 'auto',
  });
};

/**
 * Batch transform multiple images
 */
export const batchTransformImages = (imagePaths, transformOptions = {}) => {
  return imagePaths.map((path) => getImageKitUrl(path, transformOptions));
};

export default {
  getImageKitUrl,
  getResponsiveSrcSet,
  getPropertyImageUrl,
  getHeroImageUrl,
  getThumbnailUrl,
  getAvatarUrl,
  batchTransformImages,
};
