import { useState } from "react";
import { Search, MapPin, ArrowRight, Star, Users, Home, Shield, Sparkles, TrendingUp, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getHeroImageUrl } from "../utils/imagekitConfig";
import heroimage from "../assets/images/heroimage.png";
import { RadialGradient } from "react-text-gradients";

const popularLocations = [
  "New York",
  "Los Angeles", 
  "Chicago",
  "Houston",
  "Phoenix",
  "Dallas",
  "Miami"
];

const quickFilters = [
  { label: "Apartments", icon: Home, count: "2,547", verified: true },
  { label: "Single-Family", icon: Home, count: "1,823", verified: true },
  { label: "Townhomes", icon: Home, count: "1,234", verified: true }
];

const liveStats = [
  { number: "50K+", label: "Renters Approved", color: "text-emerald-600" },
  { number: "25K+", label: "Verified Properties", color: "text-blue-600" },
  { number: "5-7 Days", label: "Fast Approvals", color: "text-emerald-600" }
];


// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.6
    }
  }
};

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const sparkleAnimation = {
  scale: [1, 1.2, 1],
  rotate: [0, 180, 360],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Check if animations should be disabled (mobile/low-power devices)
const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const Hero = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const reduceMotion = shouldReduceMotion();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [propertyType, setPropertyType] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSubmit = (location = searchQuery) => {
    if (location.trim()) {
      navigate(`/properties?location=${encodeURIComponent(location)}&type=${propertyType}`);
    }
  };

  const handleLocationClick = (location) => {
    setSearchQuery(location);
    setShowSuggestions(false);
    handleSubmit(location);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50"></div>
        
        {/* Hero image with overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${getHeroImageUrl(heroimage)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10" />
        </motion.div>

        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={floatingAnimation}
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [10, -10, 10],
              transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [-15, 15, -15],
              x: [-10, 10, -10],
              transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"
          />
        </div>

        {/* Sparkle effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={sparkleAnimation}
              transition={{ delay: i * 0.5 }}
              className={`absolute w-6 h-6 text-yellow-400/60 ${
                i % 2 === 0 ? 'top-1/4' : 'top-3/4'
              } ${
                i % 3 === 0 ? 'left-1/4' : i % 3 === 1 ? 'left-1/2' : 'left-3/4'
              }`}
            >
              <Sparkles className="w-full h-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top spacing */}
        <div className="pt-16 lg:pt-20"></div>
        
        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              {/* Trust Badge */}
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-5 py-2 bg-white/90 backdrop-blur-md text-emerald-700 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-lg border border-emerald-100"
              >
                <Shield className="w-3 h-3" />
                <span>Second Chances. Fair Housing. No Judgment.</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.div variants={itemVariants} className="mb-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-[1]">
                  <RadialGradient
                    gradient={["circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%"]}
                  >
                    Find Your Next
                  </RadialGradient>
                  <br />
                  <span className="text-gray-900 bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent">
                    Home Today
                  </span>
                </h1>

                <motion.p 
                  variants={itemVariants}
                  className="text-gray-700 text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed font-medium"
                >
                  Approved even with bad credit, evictions, or broken leases. Get
                  <span className="text-emerald-600 font-semibold"> fair chances renters deserve</span>. 
                  <span className="text-blue-600 font-semibold"> 5-7 day approvals</span>,
                  <span className="text-emerald-600 font-semibold"> no judgment</span>
                </motion.p>
              </motion.div>

              {/* Enhanced Search Section */}
              <motion.div
                variants={itemVariants}
                className="relative max-w-4xl mx-auto mb-12"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-2xl border border-white/50">
                  {/* Property Type Filters - Compact */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {quickFilters.map((filter) => (
                      <motion.button
                        key={filter.label}
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPropertyType(filter.label)}
                        className={`px-4 sm:px-5 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 ${
                          propertyType === filter.label
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <filter.icon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{filter.label}</span>
                        <span className="sm:hidden text-xs">{filter.label.split('-')[0]}</span>
                        <span className="text-xs opacity-75">({filter.count})</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                          isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                        }`} />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => {
                            setShowSuggestions(true);
                            setIsSearchFocused(true);
                          }}
                          onBlur={() => setIsSearchFocused(false)}
                          placeholder="Enter city or state..."
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-white/90 
                            focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 transition-all duration-300 
                            text-base placeholder-gray-500 font-medium"
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 
                            transition-all flex items-center gap-1.5 font-medium text-sm"
                        >
                          <Filter className="w-4 h-4" />
                          <span className="hidden sm:inline">Filters</span>
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleSubmit()}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 
                            text-white rounded-xl hover:shadow-2xl transition-all flex items-center gap-2 
                            font-bold text-sm sm:text-base shadow-xl"
                        >
                          <Search className="w-4 h-4" />
                          <span>Find</span>
                          <ArrowRight className="w-4 h-4 hidden sm:inline" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Location Suggestions */}
                  <AnimatePresence>
                    {showSuggestions && searchQuery.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute left-6 right-6 top-full mt-4 bg-white/98 backdrop-blur-md 
                          rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-orange-500" />
                              Popular Locations
                            </h3>
                            <span className="text-sm text-gray-500">Choose from trending areas</span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {popularLocations.map((location, index) => (
                              <motion.button
                                key={location}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleLocationClick(location)}
                                className="flex items-center justify-between p-4 hover:bg-blue-50 rounded-xl 
                                  transition-all duration-300 text-left group border border-transparent 
                                  hover:border-blue-200 hover:shadow-md"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 
                                    rounded-full flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 
                                      transition-colors">{location}</span>
                                    <div className="text-xs text-gray-500">
                                      {Math.floor(Math.random() * 500) + 100}+ properties
                                    </div>
                                  </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 
                                  group-hover:translate-x-1 transition-all duration-300" />
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="pb-8 lg:pb-12"></div>
      </div>
    </div>
  );
};

export default Hero;