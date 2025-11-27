import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Home } from 'lucide-react';

const MarketTrends = () => {
  const trends = [
    {
      label: "Average Rent (NYC)",
      value: "$2,500",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "Available Properties",
      value: "25K+",
      change: "+8%",
      trend: "up",
      icon: Home,
      color: "from-green-500 to-emerald-500"
    },
    {
      label: "Active Renters",
      value: "50K+",
      change: "+24%",
      trend: "up",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      label: "Avg Approval Time",
      value: "6 Days",
      change: "-40%",
      trend: "down",
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
        >
          Market Trends & Live Data
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {trends.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-br ${item.color} p-0.5 rounded-xl`}
            >
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-sm font-bold ${item.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`}>
                    {item.change}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{item.label}</p>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketTrends;
