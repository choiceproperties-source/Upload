import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Phone } from 'lucide-react';
import { validatePhone } from '@/utils/validation';
import PropTypes from 'prop-types';

const ApplicationStep3 = ({ data, onUpdate, onNext, onPrevious }) => {
  const [localErrors, setLocalErrors] = useState({});

  const handleValidate = () => {
    const newErrors = {};
    
    if (!data.reference1Name?.trim()) newErrors.ref1Name = 'Reference name required';
    if (!validatePhone(data.reference1Phone)) newErrors.ref1Phone = 'Valid phone required';

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (handleValidate()) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-600" />
          References
        </h2>
        <p className="text-gray-600">Provide references we can contact about you</p>
      </div>

      {/* Form */}
      <div className="space-y-8">
        {/* Reference 1 */}
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-4">Reference #1 (Required)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={data.reference1Name}
                onChange={(e) => onUpdate({ reference1Name: e.target.value })}
                placeholder="Jane Smith"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={data.reference1Phone}
                  onChange={(e) => onUpdate({ reference1Phone: e.target.value })}
                  placeholder="(555) 987-6543"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reference 2 */}
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-4">Reference #2 (Optional)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={data.reference2Name}
                onChange={(e) => onUpdate({ reference2Name: e.target.value })}
                placeholder="John Johnson"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={data.reference2Phone}
                  onChange={(e) => onUpdate({ reference2Phone: e.target.value })}
                  placeholder="(555) 246-8135"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-600 rounded">
          <p className="text-sm text-yellow-700">
            <strong>Tip:</strong> Choose references who know you well - former landlords, employers, or colleagues work great
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevious}
          className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-bold transition-all"
        >
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white rounded-lg font-bold transition-all"
        >
          Next Step
        </motion.button>
      </div>
    </div>
  );
};

ApplicationStep3.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired
};

export default ApplicationStep3;
