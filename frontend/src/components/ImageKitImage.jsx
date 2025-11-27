import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getImageKitUrl, getResponsiveSrcSet } from '../utils/imagekitConfig';

/**
 * ImageKitImage Component
 * Automatically optimizes images via ImageKit CDN
 * Handles responsive sizing, lazy loading, automatic format selection
 */
const ImageKitImage = ({
  src,
  alt,
  width = 600,
  height = 400,
  crop = true,
  quality = 'auto',
  format = 'auto',
  className = '',
  loading = 'lazy',
  objectFit = 'cover',
  sizes = "(max-width: 768px) 100vw, 50vw",
  responsive = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Generate optimized URL
  const optimizedUrl = getImageKitUrl(src, {
    width,
    height,
    crop,
    quality,
    format,
  });

  // Generate responsive srcSet if enabled
  const srcSet = responsive
    ? getResponsiveSrcSet(src, [320, 640, 1024, 1920, width])
    : null;

  useEffect(() => {
    // Preload image for faster rendering
    const img = new Image();
    img.src = optimizedUrl;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };
  }, [optimizedUrl]);

  return (
    <picture>
      {/* WebP format for modern browsers */}
      {srcSet && (
        <source srcSet={srcSet} type="image/webp" sizes={sizes} />
      )}

      {/* Fallback format */}
      <img
        src={optimizedUrl}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        style={{ objectFit }}
        className={`${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
      />

      {/* Placeholder while loading */}
      {isLoading && (
        <div
          className={`${className} bg-gray-200 animate-pulse absolute inset-0`}
          style={{ width, height }}
        />
      )}
    </picture>
  );
};

ImageKitImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  crop: PropTypes.bool,
  quality: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  format: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  objectFit: PropTypes.string,
  sizes: PropTypes.string,
  responsive: PropTypes.bool,
};

export default ImageKitImage;
