import { useState } from 'react';
import { X, Check, AlertCircle, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const PropertyComparison = ({ properties = [], isOpen, onClose }) => {
  const [sortBy, setSortBy] = useState('price');

  if (!properties || properties.length === 0) {
    return null;
  }

  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'beds') return b.beds - a.beds;
    if (sortBy === 'sqft') return (b.sqft || 0) - (a.sqft || 0);
    return 0;
  });

  const amenitiesSet = new Set();
  properties.forEach(p => {
    if (p.amenities) {
      p.amenities.forEach(a => amenitiesSet.add(a));
    }
  });
  const amenities = Array.from(amenitiesSet);

  const handleShare = () => {
    const text = `Comparing ${properties.length} properties on Choice Properties`;
    if (navigator.share) {
      navigator.share({ title: 'Property Comparison', text });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Comparison link copied!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 bg-white rounded-2xl shadow-2xl z-50 overflow-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-white text-2xl font-bold">
                  Comparing {sortedProperties.length} Properties
                </h2>
                <p className="text-blue-100 text-sm">Side-by-side property comparison</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <Share2 className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Sort Controls */}
              <div className="mb-6 flex gap-3">
                <label className="text-sm font-semibold text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="price">Price (Low to High)</option>
                  <option value="beds">Bedrooms (High to Low)</option>
                  <option value="sqft">Square Feet (High to Low)</option>
                </select>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Header */}
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-bold text-gray-900 w-40 bg-gray-50">Property</th>
                      {sortedProperties.map(property => (
                        <th key={property._id} className="text-center py-4 px-4 font-bold text-gray-900 min-w-48">
                          <div className="text-sm text-gray-600 mb-1">
                            {property.type}
                          </div>
                          <div className="text-lg text-blue-600 font-bold">
                            ${property.price?.toLocaleString()}/mo
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Body */}
                  <tbody>
                    {/* Title */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50">Title</td>
                      {sortedProperties.map(property => (
                        <td key={property._id} className="py-4 px-4 text-center text-gray-700">
                          {property.title}
                        </td>
                      ))}
                    </tr>

                    {/* Location */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50">Location</td>
                      {sortedProperties.map(property => (
                        <td key={property._id} className="py-4 px-4 text-center text-gray-700">
                          {property.location}
                        </td>
                      ))}
                    </tr>

                    {/* Bedrooms */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50">Bedrooms</td>
                      {sortedProperties.map(property => (
                        <td key={property._id} className="py-4 px-4 text-center text-gray-700">
                          {property.beds}
                        </td>
                      ))}
                    </tr>

                    {/* Bathrooms */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50">Bathrooms</td>
                      {sortedProperties.map(property => (
                        <td key={property._id} className="py-4 px-4 text-center text-gray-700">
                          {property.baths}
                        </td>
                      ))}
                    </tr>

                    {/* Square Feet */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50">Sq. Feet</td>
                      {sortedProperties.map(property => (
                        <td key={property._id} className="py-4 px-4 text-center text-gray-700">
                          {property.sqft ? `${property.sqft.toLocaleString()} ft²` : 'N/A'}
                        </td>
                      ))}
                    </tr>

                    {/* Amenities */}
                    {amenities.map(amenity => (
                      <tr key={amenity} className="border-b border-gray-100">
                        <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 text-sm">
                          {amenity}
                        </td>
                        {sortedProperties.map(property => (
                          <td key={property._id} className="py-4 px-4 text-center">
                            {property.amenities?.includes(amenity) ? (
                              <Check className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Verification */}
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50">Verified</td>
                      {sortedProperties.map(property => (
                        <td key={property._id} className="py-4 px-4 text-center">
                          {property.verified ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-600 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-colors"
                >
                  Close Comparison
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

PropertyComparison.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.object),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default PropertyComparison;
