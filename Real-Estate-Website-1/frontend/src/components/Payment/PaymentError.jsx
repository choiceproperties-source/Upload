import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PaymentError = ({ message, onRetry }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      {/* Error Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-16 h-16 text-red-600" />
        </div>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Failed</h1>
        <p className="text-lg text-gray-700 mb-6">{message || 'An error occurred during payment processing'}</p>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8 max-w-md mx-auto text-left"
      >
        <h2 className="font-bold text-yellow-900 mb-3">Please try the following:</h2>
        <ul className="space-y-2 text-sm text-yellow-800">
          <li>✓ Check that your card information is correct</li>
          <li>✓ Ensure your card is not expired</li>
          <li>✓ Verify sufficient funds in your account</li>
          <li>✓ Check with your bank for any restrictions</li>
        </ul>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <button
          onClick={onRetry}
          className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:shadow-lg text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </motion.div>

      {/* Support Info */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-gray-600 mt-8"
      >
        Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a>
      </motion.p>
    </motion.div>
  );
};

PaymentError.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired
};

export default PaymentError;
