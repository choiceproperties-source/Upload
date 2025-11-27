import { motion } from 'framer-motion';
import { Shield, TrendingUp, Star, Users, Award } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
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
  y: [-2, 2, -2],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const Companies = () => {
  const propertyTypes = [
    { icon: "🏢", title: "Apartments", description: "Modern urban living" },
    { icon: "🏡", title: "Single-Family Homes", description: "Perfect for families" },
    { icon: "🏘️", title: "Townhomes", description: "Stylish & spacious" },
    { icon: "🏠", title: "Duplexes", description: "Affordable & flexible" },
    { icon: "🐾", title: "Pet-Friendly", description: "Pets welcome here" }
  ];

  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        {/* Property Types Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-gray-200 shadow-2xl"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center mb-8 sm:mb-10"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Trusted by Landlords & Property Managers Nationwide
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Leading property management companies and independent landlords across the USA trust Choice Properties to connect them with qualified renters
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {propertyTypes.map((property, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm p-8 border border-blue-100 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {/* Background accent */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="text-5xl mb-4">{property.icon}</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {property.title}
                    </h4>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                      {property.description}
                    </p>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200"
          >
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Tenant Screening</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Fast Approvals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Fair Chances</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Nationwide Network</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 lg:mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl sm:rounded-2xl 
              shadow-2xl hover:shadow-blue-500/25 transition-all font-bold text-sm sm:text-lg inline-flex items-center group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              List Your Properties Today
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
          
          <p className="text-gray-500 mt-3 text-xs sm:text-sm">
            Connect with thousands of qualified renters looking for their next home
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Companies;
