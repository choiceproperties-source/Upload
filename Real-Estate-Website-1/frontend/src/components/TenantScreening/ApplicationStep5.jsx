import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertCircle, CheckCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const ApplicationStep5 = ({ data, onUpdate, onComplete, onPrevious }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async () => {
    if (!agreeToTerms) {
      alert('Please agree to the terms');
      return;
    }

    setIsSubmitting(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    onComplete();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8 text-green-600" />
          Final Step - Terms & Submission
        </h2>
        <p className="text-gray-600">Review and accept our terms</p>
      </div>

      {/* Security & Privacy */}
      <div className="space-y-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border-l-4 border-green-600 rounded flex gap-3"
        >
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-green-900">Your data is secure</p>
            <p className="text-sm text-green-700">We use end-to-end encryption and never sell your information</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded flex gap-3"
        >
          <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-blue-900">Background check included</p>
            <p className="text-sm text-blue-700">We'll conduct a thorough background and reference check</p>
          </div>
        </motion.div>
      </div>

      {/* Application Data Review */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-gray-900 mb-4">Application Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Full Name</p>
            <p className="font-semibold text-gray-900">{data.firstName} {data.lastName}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-semibold text-gray-900">{data.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-semibold text-gray-900">{data.phone}</p>
          </div>
          <div>
            <p className="text-gray-600">Employment Status</p>
            <p className="font-semibold text-gray-900 capitalize">{data.employmentStatus}</p>
          </div>
          {data.annualIncome && (
            <div>
              <p className="text-gray-600">Annual Income</p>
              <p className="font-semibold text-gray-900">${parseInt(data.annualIncome).toLocaleString()}</p>
            </div>
          )}
          <div>
            <p className="text-gray-600">Desired Move Date</p>
            <p className="font-semibold text-gray-900">{new Date(data.desiredMoveDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="mb-8">
        <label className="flex gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:outline-none"
          />
          <span className="text-sm text-gray-700">
            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>. I also authorize Choice Properties to conduct background, employment, and reference checks.
          </span>
        </label>
      </div>

      {/* Info Box */}
      <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-600 rounded flex gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-yellow-900 mb-1">Processing Timeline</p>
          <p className="text-sm text-yellow-700">We'll contact your references within 24-48 hours and provide results within 3-5 business days</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevious}
          disabled={isSubmitting}
          className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-bold transition-all disabled:opacity-50"
        >
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!agreeToTerms || isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg text-white rounded-lg font-bold transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </motion.button>
      </div>
    </div>
  );
};

ApplicationStep5.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired
};

export default ApplicationStep5;
