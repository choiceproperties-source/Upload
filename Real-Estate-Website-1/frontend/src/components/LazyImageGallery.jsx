import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import ImageKitImage from './ImageKitImage';
import { getImageKitUrl } from '../utils/imagekitConfig';

const LazyImageGallery = ({ images, alt, autoPlay = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));
  const galleryRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Preload adjacent images
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    
    setLoadedImages(prev => new Set([...prev, nextIndex, prevIndex]));
  }, [currentIndex, images.length]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % images.length);
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    galleryRef.current?.addEventListener('keydown', handleKeyPress);
    return () => galleryRef.current?.removeEventListener('keydown', handleKeyPress);
  }, [handlePrev, handleNext]);

  return (
    <div 
      ref={galleryRef}
      className="relative w-full bg-gray-100 overflow-hidden rounded-lg"
      role="region"
      aria-label="Image gallery"
    >
      {/* Main Image Container */}
      <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-300 ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {loadedImages.has(idx) ? (
              <ImageKitImage
                src={img}
                alt={`${alt} - Image ${idx + 1}`}
                width={1200}
                height={675}
                loading={idx === currentIndex ? 'eager' : 'lazy'}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1}/{images.length}
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

LazyImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  alt: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool
};

export default LazyImageGallery;
