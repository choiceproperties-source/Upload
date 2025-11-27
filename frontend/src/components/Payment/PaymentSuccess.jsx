import { motion } from 'framer-motion';
import { CheckCircle, Download, Mail, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PaymentSuccess = ({ transactionId, amount }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="mb-6 flex justify-center"
      >
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-green-100 rounded-full" />
          <CheckCircle className="absolute inset-0 w-24 h-24 text-green-600" />
        </div>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-xl text-gray-600 mb-1">Transaction completed</p>
        <p className="text-2xl font-bold text-green-600 mb-6">${amount}</p>
      </motion.div>

      {/* Transaction Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 max-w-md mx-auto text-left"
      >
        <h2 className="font-bold text-gray-900 mb-4">Transaction Details</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Transaction ID:</span>
            <span className="font-mono font-bold text-gray-900">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Amount:</span>
            <span className="font-bold text-gray-900">${amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Date & Time:</span>
            <span className="font-bold text-gray-900">{new Date().toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Status:</span>
            <span className="font-bold text-green-600">✓ Completed</span>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8"
      >
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="font-semibold text-gray-900 text-sm">Receipt Sent</p>
          <p className="text-xs text-gray-700 mt-1">Check your email</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <CheckCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="font-semibold text-gray-900 text-sm">Payment Verified</p>
          <p className="text-xs text-gray-700 mt-1">Instantly confirmed</p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <button
          onClick={() => navigate('/')}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
        <button
          onClick={() => window.print()}
          className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download Receipt
        </button>
      </motion.div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-6">
        This transaction ID has been saved to your account for future reference
      </p>
    </motion.div>
  );
};

PaymentSuccess.propTypes = {
  transactionId: PropTypes.string.isRequired,
  amount: PropTypes.string
};

export default PaymentSuccess;
