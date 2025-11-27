import { useState } from 'react';
import { Heart, MapPin, DollarSign, BedDouble, Bath, ArrowRight, Trash2, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useFavorites } from '@/context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageKitImage from '@/components/ImageKitImage';

const Favorites = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const navigate = useNavigate();

  const handleRemove = (propertyId) => {
    removeFavorite(propertyId);
    toast.success('Property removed from favorites');
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/properties/single/${propertyId}`);
  };

  const handleShare = async (property) => {
    try {
      const text = `Check out this property on Choice Properties: ${property.title} - $${property.price}/month`;
      if (navigator.share) {
        await navigator.share({ title: 'Choice Properties', text });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Saved Properties | Choice Properties</title>
        <meta name="description" content="View your saved favorite properties on Choice Properties." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Heart className="w-10 h-10 text-red-600" />
              My Saved Properties
            </h1>
            <p className="text-gray-600">
              {favorites.length === 0 
                ? 'No saved properties yet. Start saving your favorites!' 
                : `You have ${favorites.length} saved properties`}
            </p>
          </div>

          {favorites.length === 0 ? (
            // Empty State
            <div className="text-center py-16">
              <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No Favorites Yet</h2>
              <p className="text-gray-600 mb-8">Start exploring and save properties you love!</p>
              <button
                onClick={() => navigate('/properties')}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <>
              {/* Action Buttons */}
              <div className="mb-8 flex justify-between items-center">
                <div>
                  {/* Filter/Sort could go here */}
                </div>
                <button
                  onClick={() => clearFavorites()}
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((property, index) => (
                  <motion.div
                    key={property._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <ImageKitImage
                        src={property.image?.[0] || 'https://via.placeholder.com/300x200'}
                        alt={property.title}
                        width={400}
                        height={300}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() => handleShare(property)}
                          className="p-2 bg-white/90 hover:bg-white rounded-full shadow transition-colors"
                        >
                          <Share2 className="w-4 h-4 text-gray-900" />
                        </button>
                        <button
                          onClick={() => handleRemove(property._id)}
                          className="p-2 bg-red-500 hover:bg-red-600 rounded-full shadow transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                        {property.title}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-1 text-2xl font-bold text-blue-600 mb-3">
                        <DollarSign className="w-5 h-5" />
                        {property.price?.toLocaleString()}
                        <span className="text-xs text-gray-600 font-normal">/mo</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-gray-600 mb-3 text-sm">
                        <MapPin className="w-4 h-4" />
                        {property.location}
                      </div>

                      {/* Details */}
                      <div className="flex gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <BedDouble className="w-4 h-4" />
                          {property.beds} bed
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          {property.baths} bath
                        </div>
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => handleViewProperty(property._id)}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
