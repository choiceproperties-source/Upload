import PropTypes from 'prop-types';

export const PropertyCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
    {/* Image Skeleton */}
    <div className="w-full h-48 bg-gray-300" />
    
    {/* Content Skeleton */}
    <div className="p-4">
      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3" />
      
      {/* Price */}
      <div className="h-8 bg-gray-300 rounded w-1/2 mb-3" />
      
      {/* Location */}
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-3" />
      
      {/* Details */}
      <div className="flex gap-4 mb-4">
        <div className="h-4 bg-gray-300 rounded w-16" />
        <div className="h-4 bg-gray-300 rounded w-16" />
      </div>
      
      {/* Button */}
      <div className="h-10 bg-gray-300 rounded w-full" />
    </div>
  </div>
);

export const PropertyCardSkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <PropertyCardSkeleton key={i} />
    ))}
  </div>
);

PropertyCardSkeletonGrid.propTypes = {
  count: PropTypes.number
};

export const TextSkeleton = ({ lines = 3, width = 'w-full' }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className={`h-4 bg-gray-300 rounded ${i === lines - 1 ? 'w-2/3' : width} animate-pulse`} />
    ))}
  </div>
);

TextSkeleton.propTypes = {
  lines: PropTypes.number,
  width: PropTypes.string
};

export const ImageSkeleton = ({ width = 'w-full', height = 'h-48' }) => (
  <div className={`${width} ${height} bg-gray-300 rounded animate-pulse`} />
);

ImageSkeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};
