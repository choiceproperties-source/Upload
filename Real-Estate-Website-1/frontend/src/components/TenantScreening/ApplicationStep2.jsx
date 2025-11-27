import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';

const ApplicationStep2 = ({ data, onUpdate, onNext, onPrevious }) => {
  const [localErrors, setLocalErrors] = useState({});

  const handleValidate = () => {
    const newErrors = {};
    
    if (!data.employmentStatus) newErrors.employmentStatus = 'Please select employment status';
    if (data.employmentStatus === 'employed') {
      if (!data.employer?.trim()) newErrors.employer = 'Employer name required';
      if (!data.jobTitle?.trim()) newErrors.jobTitle = 'Job title required';
      if (!data.annualIncome) newErrors.income = 'Annual income required';
    }

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
          <Briefcase className="w-8 h-8 text-blue-600" />
          Employment Information
        </h2>
        <p className="text-gray-600">Tell us about your current employment</p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Employment Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Employment Status *</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['employed', 'self-employed', 'retired', 'student', 'unemployed'].map(status => (
              <motion.label
                key={status}
                whileHover={{ scale: 1.02 }}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  data.employmentStatus === status
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="employmentStatus"
                  value={status}
                  checked={data.employmentStatus === status}
                  onChange={(e) => onUpdate({ employmentStatus: e.target.value })}
                  className="mr-2"
                />
                <span className="font-semibold text-gray-900 capitalize">{status}</span>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Employer Details (if employed) */}
        {data.employmentStatus === 'employed' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5 p-4 bg-blue-50 rounded-lg border border-blue-200"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Employer Name *</label>
              <input
                type="text"
                value={data.employer}
                onChange={(e) => onUpdate({ employer: e.target.value })}
                placeholder="ABC Corporation"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                value={data.jobTitle}
                onChange={(e) => onUpdate({ jobTitle: e.target.value })}
                placeholder="Software Engineer"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Income *</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={data.annualIncome}
                    onChange={(e) => onUpdate({ annualIncome: e.target.value })}
                    placeholder="60000"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={data.employmentStartDate}
                    onChange={(e) => onUpdate({ employmentStartDate: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Income Note */}
        {data.employmentStatus === 'employed' && (
          <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded">
            <p className="text-sm text-green-700">
              <strong>Good to know:</strong> Most landlords require income to be 3x the monthly rent
            </p>
          </div>
        )}
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

ApplicationStep2.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired
};

export default ApplicationStep2;
