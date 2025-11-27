import { motion } from 'framer-motion';
import { Zap, Shield, Users, TrendingUp, Clock, Award } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const WhyChooseUs = () => {
  const comparisons = [
    {
      title: "Fast Approvals",
      description: "5-7 days vs 14+ days industry average",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-500",
      stat: "3x Faster"
    },
    {
      title: "Fair Chances",
      description: "We accept more applicants than competitors",
      icon: Users,
      gradient: "from-green-500 to-emerald-500",
      stat: "60% More"
    },
    {
      title: "Transparent Pricing",
      description: "Zero hidden fees, all costs upfront",
      icon: Award,
      gradient: "from-blue-500 to-cyan-500",
      stat: "100% Honest"
    },
    {
      title: "24/7 Professional Support",
      description: "Expert team ready to help anytime",
      icon: Clock,
      gradient: "from-purple-500 to-pink-500",
      stat: "Always Ready"
    },
    {
      title: "Verified Properties",
      description: "Every listing inspected and verified",
      icon: Shield,
      gradient: "from-indigo-500 to-blue-500",
      stat: "100% Verified"
    },
    {
      title: "Top Rated Service",
      description: "Consistently 4.9+ stars from renters",
      icon: TrendingUp,
      gradient: "from-rose-500 to-pink-500",
      stat: "4.9★ Rating"
    }
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choice Properties
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We outperform Zillow, Rently, and Realtor.com with faster approvals, fairer chances, and professional service
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`bg-gradient-to-br ${item.gradient} p-0.5 rounded-2xl`}
            >
              <div className="bg-white rounded-2xl p-8 h-full flex flex-col">
                <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{item.description}</p>
                
                <div className={`text-sm font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                  {item.stat}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg shadow-blue-600/20 transition-all duration-300 text-lg">
            Start Your Search Today →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
