import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const OptimizedImage = ({ 
  src, 
  alt, 
  srcSet, 
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
  loading = "lazy",
  width,
  height
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Preload image for faster rendering
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };
  }, [src]);

  return (
    <picture>
      {/* WebP format for modern browsers */}
      {srcSet && (
        <source 
          srcSet={srcSet.replace(/\.jpg/g, '.webp').replace(/\.png/g, '.webp')}
          type="image/webp"
          sizes={sizes}
        />
      )}
      
      {/* Fallback format */}
      <img
        src={imageSrc}
        alt={alt}
        srcSet={srcSet}
        sizes={sizes}
        loading={loading}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
      />
      
      {/* Placeholder while loading */}
      {isLoading && (
        <div className={`${className} bg-gray-200 animate-pulse absolute inset-0`} />
      )}
    </picture>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  width: PropTypes.number,
  height: PropTypes.number
};

export default OptimizedImage;
