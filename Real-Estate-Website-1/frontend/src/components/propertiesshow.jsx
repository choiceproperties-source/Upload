import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  MapPin, 
  DollarSign, 
  BedDouble, 
  Bath, 
  Maximize, 
  Heart,
  Eye,
  ArrowRight,
  Building,
  Search,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Backendurl } from '../App';
import PropTypes from "prop-types";

// Sample featured properties for fallback
const sampleProperties = [
  {
    _id: "sample1",
    title: "Modern Luxury Apartment",
    location: "Manhattan, New York",
    price: 4500,
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "Apartment",
    availability: "Rent",
    image: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
    acceptanceCriteria: ["All Credit Scores", "Eviction-Friendly", "No Judgment"]
  },
  {
    _id: "sample2",
    title: "Contemporary Single-Family Home",
    location: "Beverly Hills, Los Angeles",
    price: 3800,
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    type: "Single-Family",
    availability: "Rent",
    image: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
    acceptanceCriteria: ["Broken Lease OK", "Fair Evaluation", "All Credit Types"]
  },
  {
    _id: "sample3",
    title: "Spacious Townhome",
    location: "Lincoln Park, Chicago",
    price: 2500,
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "Townhome",
    availability: "Rent",
    image: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
    acceptanceCriteria: ["Second Chance Housing", "Fast Approval (5-7 days)", "Verified & Safe"]
  }
];

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageControls, setShowImageControls] = useState(false);

  const handleNavigate = () => {
    navigate(`/properties/single/${property._id}`);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleImageNavigation = (e, direction) => {
    e.stopPropagation();
    const totalImages = property.image?.length || 1;
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'Apartment': 'from-blue-500 to-cyan-500',
      'Single-Family': 'from-green-500 to-emerald-500',
      'Townhome': 'from-purple-500 to-pink-500',
      'Duplex': 'from-orange-500 to-red-500'
    };
    return colors[type] || 'from-blue-500 to-indigo-600';
  };

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200"
      onClick={handleNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Property Image Container with Carousel */}
      <div 
        className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300"
        onMouseEnter={() => setShowImageControls(true)}
        onMouseLeave={() => setShowImageControls(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={property.image[currentImageIndex] || property.image[0]}
            alt={property.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
            loading="lazy"
          />
        </AnimatePresence>

        {/* Image Navigation - Multiple Images */}
        {property.image?.length > 1 && showImageControls && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => handleImageNavigation(e, 'prev')}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => handleImageNavigation(e, 'next')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-lg transition-all"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </motion.button>
          </>
        )}

        {/* Image Counter */}
        {property.image?.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {property.image.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Image Count Badge */}
        {property.image?.length > 1 && (
          <div className="absolute top-4 left-4 bg-black/40 text-white px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm">
            {currentImageIndex + 1}/{property.image.length}
          </div>
        )}
        
        {/* Price Badge + Verification */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl shadow-lg font-bold text-lg">
            ${property.price ? Math.floor(property.price / 100) * 100 : 'POA'}
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg"
          >
            <BadgeCheck className="w-4 h-4" />
            Verified
          </motion.div>
        </div>
        
        {/* Property Type Badge */}
        <div className={`absolute top-4 left-4 bg-gradient-to-r ${getTypeColor(property.type)} text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg uppercase tracking-wide`}>
          {property.type}
        </div>
        
        {/* Favorite Button */}
        <motion.button 
          onClick={toggleFavorite}
          whileTap={{ scale: 0.9 }}
          className={`absolute bottom-4 right-4 p-3 rounded-full transition-all duration-300 shadow-lg min-h-12 min-w-12 flex items-center justify-center
            ${isFavorite 
              ? 'bg-red-500 text-white shadow-red-500/30' 
              : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-red-50 hover:text-red-500 hover:shadow-red-500/20'}`}
        >
          <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
        </motion.button>
        
        {/* View Details Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center pb-6"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                className="px-6 py-3 bg-white/95 backdrop-blur-md text-blue-600 rounded-xl font-bold flex items-center gap-2 shadow-2xl border border-white/50 hover:bg-white transition-all duration-300 min-h-12"
              >
                <Eye className="w-5 h-5" />
                View Full Details
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Property Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600 mt-2 text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>
        
        {/* Property Features Grid */}
        <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center text-blue-600 font-bold text-lg mb-1">
              <BedDouble className="w-4 h-4 mr-1" />
              {property.beds}
            </div>
            <span className="text-xs text-gray-600 font-medium">Beds</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-green-600 font-bold text-lg mb-1">
              <Bath className="w-4 h-4 mr-1" />
              {property.baths}
            </div>
            <span className="text-xs text-gray-600 font-medium">Baths</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-purple-600 font-bold text-lg mb-1">
              <Maximize className="w-4 h-4 mr-1" />
              {property.sqft}
            </div>
            <span className="text-xs text-gray-600 font-medium">sqft</span>
          </div>
        </div>

        {/* Acceptance Criteria Tags */}
        {property.acceptanceCriteria && property.acceptanceCriteria.length > 0 && (
          <div className="py-4 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-600 mb-2">Fair Housing Standards:</p>
            <div className="flex flex-wrap gap-2">
              {property.acceptanceCriteria.map((criteria, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200"
                >
                  ✓ {criteria}
                </motion.span>
              ))}
            </div>
          </div>
        )}
        
        {/* CTA Button */}
        <motion.button
          onClick={handleNavigate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg shadow-blue-600/20 group flex items-center justify-center gap-2 min-h-12"
        >
          <span>See This Property</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const PropertiesShow = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return properties.length;
    return properties.filter(p => p.type.toLowerCase() === categoryId).length;
  };

  const categories = [
    { id: 'all', label: 'All Properties', icon: 'all' },
    { id: 'apartment', label: 'Apartments', icon: 'apt' },
    { id: 'single-family', label: 'Single-Family', icon: 'home' },
    { id: 'townhome', label: 'Townhomes', icon: 'town' }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${Backendurl}/api/products/list`);
        
        if (response.data.success) {
          // Take only the first 6 properties for featured section
          const featuredProperties = response.data.property.slice(0, 6);
          setProperties(featuredProperties);
        } else {
          setError('Failed to fetch properties');
          // Fallback to sample data in case of API error
          setProperties(sampleProperties);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Using sample data instead.');
        // Fallback to sample data
        setProperties(sampleProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = activeCategory === 'all' 
    ? properties 
    : properties.filter(property => property.type.toLowerCase() === activeCategory);

  const viewAllProperties = () => {
    navigate('/properties');
  };

  if (loading) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4 mx-auto mb-16"></div>
            
            <div className="h-10 bg-gray-100 rounded-lg w-full max-w-md mx-auto mb-8 flex justify-center gap-4">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="h-8 bg-gray-200 rounded-full w-24"></div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-xl shadow h-96">
                  <div className="h-64 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-8"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300"
          >
            <span className="text-lg">⭐</span>
            <span>Featured Rentals</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Your Perfect Rental <br/>Awaits
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Explore our handpicked collection of quality rentals across the USA. Fast approvals, fair chances, real homes.
          </motion.p>
        </motion.div>

        {/* Category filter with counters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-14 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-full font-semibold text-sm transition-all duration-200 flex items-center gap-2 min-h-12 min-w-max shadow-sm hover:shadow-md
                ${activeCategory === category.id 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'}`}
            >
              <span>{category.label}</span>
              <span className={`inline-flex items-center justify-center min-w-6 h-6 text-xs font-bold rounded-full
                ${activeCategory === category.id 
                  ? 'bg-white/20' 
                  : 'bg-gray-200 text-gray-700'}`}>
                {getCategoryCount(category.id)}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-amber-700 bg-amber-50 p-4 rounded-lg border border-amber-200 mb-8 max-w-md mx-auto text-center"
          >
            <p className="font-medium mb-1">Note: {error}</p>
            <p className="text-sm">Showing sample properties for demonstration.</p>
          </motion.div>
        )}

        {properties.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredProperties.slice(0, 6).map((property) => (
              <motion.div key={property._id} variants={itemVariants}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl shadow-sm">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">No properties available</h3>
            <p className="text-gray-600 mb-6">No properties found in this category.</p>
            <button 
              onClick={() => setActiveCategory('all')} 
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              View All Properties
            </button>
          </div>
        )}

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={viewAllProperties}
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 font-medium"
          >
            Browse All Properties
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          <p className="text-gray-600 mt-4 text-sm">
            Discover our complete collection of premium properties
          </p>
        </motion.div>
      </div>
    </section>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired
};

export default PropertiesShow;