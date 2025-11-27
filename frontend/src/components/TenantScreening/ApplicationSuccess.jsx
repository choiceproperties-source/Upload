import { motion } from 'framer-motion';
import { CheckCircle, Mail, Clock, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ApplicationSuccess = ({ applicationId }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-16 h-16 text-white" />
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Application Submitted!</h1>
        <p className="text-xl text-gray-600 mb-2">
          Your tenant application has been successfully submitted
        </p>
        <p className="text-gray-500 mb-8">Application ID: <span className="font-mono font-bold text-gray-900">{applicationId}</span></p>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8 text-left"
      >
        <h2 className="font-bold text-gray-900 mb-4">What happens next?</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
            <div>
              <p className="font-semibold text-gray-900">We'll contact your references</p>
              <p className="text-sm text-gray-700">Within 24-48 hours</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
            <div>
              <p className="font-semibold text-gray-900">Background check</p>
              <p className="text-sm text-gray-700">We'll conduct employment and reference verification</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
            <div>
              <p className="font-semibold text-gray-900">Get your results</p>
              <p className="text-sm text-gray-700">Within 3-5 business days via email</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Boxes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <Mail className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="font-semibold text-gray-900 mb-1">Check Your Email</p>
          <p className="text-sm text-gray-700">Confirmation sent to your inbox</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="font-semibold text-gray-900 mb-1">Fast Processing</p>
          <p className="text-sm text-gray-700">Results within 3-5 business days</p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-bold transition-colors"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate('/properties')}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white rounded-lg font-bold transition-all"
        >
          Browse More Properties
        </button>
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs text-gray-500 mt-8"
      >
        Save your Application ID for reference: <span className="font-mono font-bold">{applicationId}</span>
      </motion.p>
    </motion.div>
  );
};

ApplicationSuccess.propTypes = {
  applicationId: PropTypes.string.isRequired
};

export default ApplicationSuccess;
