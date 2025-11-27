import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, Calendar, Code2 } from 'lucide-react';
import { validateCreditCard, validateCVV, validateExpiryDate, formatCardDisplay } from '@/utils/validation';
import { paymentLimiter } from '@/utils/rateLimiter';
import PropTypes from 'prop-types';

const PaymentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    amount: '29.99',
    description: 'Application Fee'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleValidate = () => {
    const newErrors = {};

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email required';
    }

    if (!formData.cardNumber?.trim()) {
      newErrors.cardNumber = 'Card number required';
    } else if (!validateCreditCard(formData.cardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!formData.cardholderName?.trim()) {
      newErrors.cardholderName = 'Cardholder name required';
    }

    if (!formData.expiryMonth || !formData.expiryYear) {
      newErrors.expiry = 'Expiry date required';
    } else if (!validateExpiryDate(parseInt(formData.expiryMonth), parseInt(formData.expiryYear))) {
      newErrors.expiry = 'Card has expired';
    }

    if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'Valid CVV required (3-4 digits)';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = handleValidate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check rate limit
    if (!paymentLimiter.isAllowed()) {
      setErrors({
        submit: `Too many attempts. Please wait ${paymentLimiter.formatResetTime()}`
      });
      return;
    }

    setIsSubmitting(true);
    onSubmit(formData);
  };

  const maskCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount Summary */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">{formData.description}</span>
          <span className="text-2xl font-bold text-blue-600">${formData.amount}</span>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
          }`}
        />
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number *</label>
        <div className="relative">
          <CreditCard className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="cardNumber"
            value={maskCardNumber(formData.cardNumber)}
            onChange={(e) => handleChange({
              target: {
                name: 'cardNumber',
                value: e.target.value.replace(/\s/g, '')
              }
            })}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors font-mono ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
            }`}
          />
        </div>
        {errors.cardNumber && <p className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>}
      </div>

      {/* Cardholder Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name *</label>
        <input
          type="text"
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleChange}
          placeholder="John Doe"
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
            errors.cardholderName ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
          }`}
        />
        {errors.cardholderName && <p className="text-xs text-red-600 mt-1">{errors.cardholderName}</p>}
      </div>

      {/* Expiry & CVV Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date *</label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="number"
                name="expiryMonth"
                value={formData.expiryMonth}
                onChange={handleChange}
                placeholder="MM"
                min="1"
                max="12"
                maxLength="2"
                className={`w-full pl-9 pr-2 py-3 border-2 rounded-lg focus:outline-none transition-colors text-center ${
                  errors.expiry ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
                }`}
              />
            </div>
            <span className="flex items-center text-gray-400">/</span>
            <div className="flex-1">
              <input
                type="number"
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleChange}
                placeholder="YY"
                min="24"
                max="50"
                maxLength="2"
                className={`w-full px-2 py-3 border-2 rounded-lg focus:outline-none transition-colors text-center ${
                  errors.expiry ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
                }`}
              />
            </div>
          </div>
          {errors.expiry && <p className="text-xs text-red-600 mt-1">{errors.expiry}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">CVV *</label>
          <div className="relative">
            <Code2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              maxLength="4"
              className={`w-full pl-9 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-center font-mono ${
                errors.cvv ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
            />
          </div>
          {errors.cvv && <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>}
        </div>
      </div>

      {/* Security Note */}
      <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded flex gap-3">
        <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-green-900 text-sm">Your payment is secure</p>
          <p className="text-xs text-green-700">We use SSL encryption and never store card details</p>
        </div>
      </div>

      {/* Error */}
      {errors.submit && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border-l-4 border-red-600 rounded"
        >
          <p className="text-sm text-red-600">{errors.submit}</p>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Pay ${formData.amount}
          </>
        )}
      </motion.button>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 text-center">
        This is a demonstration. No actual payment will be charged to your card.
      </p>
    </form>
  );
};

PaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default PaymentForm;
