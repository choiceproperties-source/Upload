import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Check } from 'lucide-react';
import PropTypes from 'prop-types';

const PaymentProcessing = ({ amount }) => {
  const [stage, setStage] = useState('authorizing');

  useEffect(() => {
    const stages = ['authorizing', 'verifying', 'processing', 'finalizing'];
    let currentStageIndex = 0;

    const interval = setInterval(() => {
      currentStageIndex++;
      if (currentStageIndex < stages.length) {
        setStage(stages[currentStageIndex]);
      }
    }, 750);

    return () => clearInterval(interval);
  }, []);

  const stages = [
    { id: 'authorizing', label: 'Authorizing Card', description: 'Verifying card information' },
    { id: 'verifying', label: 'Verifying Identity', description: 'Running security checks' },
    { id: 'processing', label: 'Processing Payment', description: 'Communicating with bank' },
    { id: 'finalizing', label: 'Finalizing', description: 'Completing transaction' }
  ];

  return (
    <div className="text-center py-16">
      {/* Amount */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-12"
      >
        <p className="text-gray-600 text-sm mb-2">Processing Amount</p>
        <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ${amount}
        </p>
      </motion.div>

      {/* Progress Stages */}
      <div className="space-y-4 max-w-md mx-auto mb-12">
        {stages.map((s, idx) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-lg border-2 transition-all ${
              stage === s.id
                ? 'border-blue-600 bg-blue-50'
                : stage > s.id
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm ${
                stage === s.id
                  ? 'bg-blue-600 text-white'
                  : stage > s.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}>
                {stage > s.id ? (
                  <Check className="w-4 h-4" />
                ) : stage === s.id ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Zap className="w-4 h-4" />
                  </motion.div>
                ) : (
                  idx + 1
                )}
              </div>
              <div className="text-left">
                <p className={`font-semibold ${stage === s.id ? 'text-blue-900' : stage > s.id ? 'text-green-900' : 'text-gray-700'}`}>
                  {s.label}
                </p>
                <p className="text-xs text-gray-600">{s.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Security Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-gray-600"
      >
        <p className="mb-2">🔒 Your payment information is secure</p>
        <p className="text-xs text-gray-500">We use industry-standard encryption to protect your data</p>
      </motion.div>
    </div>
  );
};

PaymentProcessing.propTypes = {
  amount: PropTypes.string
};

export default PaymentProcessing;
