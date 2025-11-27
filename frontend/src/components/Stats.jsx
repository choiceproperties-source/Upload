import { motion } from 'framer-motion';
import { Users, Star, Home, Award, TrendingUp } from 'lucide-react';

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

const Stats = () => {
  const stats = [
    { icon: Users, value: "50K+", label: "Satisfied Renters", color: "from-blue-500 to-cyan-500", bgGradient: "from-blue-50 to-cyan-50", badgeText: "✓ Verified" },
    { icon: Home, value: "25K+", label: "Rental Properties", color: "from-green-500 to-emerald-500", bgGradient: "from-green-50 to-emerald-50", badgeText: "✓ Curated" },
    { icon: Star, value: "4.9", label: "Average Rating", color: "from-yellow-500 to-orange-500", bgGradient: "from-yellow-50 to-orange-50", badgeText: "★ Top Rated" },
    { icon: TrendingUp, value: "100%", label: "Qualified Landlords", color: "from-purple-500 to-pink-500", bgGradient: "from-purple-50 to-pink-50", badgeText: "✓ Screened" }
  ];

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -6 }}
              className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 sm:p-8 text-center border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
            >
              {/* Background glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="mb-3 inline-block"
              >
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${stat.color} text-white shadow-md`}>
                  {stat.badgeText}
                </span>
              </motion.div>

              <motion.div
                animate={floatingAnimation}
                className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all`}
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </motion.div>
              
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-gray-700 font-semibold">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
