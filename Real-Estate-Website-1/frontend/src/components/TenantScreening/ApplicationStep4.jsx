import { motion } from 'framer-motion';
import { ClipboardList, Zap, Check } from 'lucide-react';
import PropTypes from 'prop-types';

const ApplicationStep4 = ({ data, onUpdate, onNext, onPrevious }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-blue-600" />
          Additional Information
        </h2>
        <p className="text-gray-600">Tell us about pets and your move timeline</p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Pets */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Do you have any pets?</label>
          <div className="space-y-3">
            {[
              { value: 'none', label: 'No pets' },
              { value: 'dogs', label: '🐕 Dogs' },
              { value: 'cats', label: '🐱 Cats' },
              { value: 'other', label: '🦜 Other' }
            ].map(option => (
              <motion.label
                key={option.value}
                whileHover={{ scale: 1.01 }}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex items-center ${
                  data.petInfo === option.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="petInfo"
                  value={option.value}
                  checked={data.petInfo === option.value}
                  onChange={(e) => onUpdate({ petInfo: e.target.value })}
                  className="mr-3"
                />
                <span className="font-semibold text-gray-900">{option.label}</span>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Move Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Desired Move Date *</label>
          <input
            type="date"
            value={data.desiredMoveDate}
            onChange={(e) => onUpdate({ desiredMoveDate: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Timeline */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">Fast Approval Process</p>
              <p className="text-sm text-gray-700">We'll review your application and contact your references within 48 hours</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
          <div className="flex gap-3 mb-4">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            <h3 className="font-bold text-gray-900">Application Summary</h3>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Employment:</strong> {data.employmentStatus}</p>
            {data.annualIncome && <p><strong>Annual Income:</strong> ${parseInt(data.annualIncome).toLocaleString()}</p>}
            <p><strong>References:</strong> {data.reference1Name}{data.reference2Name ? ` + ${data.reference2Name}` : ''}</p>
          </div>
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
          onClick={onNext}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white rounded-lg font-bold transition-all"
        >
          Review & Submit
        </motion.button>
      </div>
    </div>
  );
};

ApplicationStep4.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired
};

export default ApplicationStep4;
