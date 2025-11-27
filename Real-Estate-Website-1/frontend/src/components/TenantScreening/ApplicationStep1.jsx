import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Shield } from 'lucide-react';
import { validateEmail, validatePhone, validateSSN } from '@/utils/validation';
import PropTypes from 'prop-types';

const ApplicationStep1 = ({ data, onUpdate, onNext }) => {
  const [localErrors, setLocalErrors] = useState({});

  const handleValidate = () => {
    const newErrors = {};
    
    if (!data.firstName?.trim()) newErrors.firstName = 'First name required';
    if (!data.lastName?.trim()) newErrors.lastName = 'Last name required';
    if (!validateEmail(data.email)) newErrors.email = 'Valid email required';
    if (!validatePhone(data.phone)) newErrors.phone = 'Valid phone required';
    if (!validateSSN(data.ssn)) newErrors.ssn = 'Format: XXX-XX-XXXX';
    if (!data.dob) newErrors.dob = 'Date of birth required';

    setLocalErrors(newErrors);
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
          <User className="w-8 h-8 text-blue-600" />
          Personal Information
        </h2>
        <p className="text-gray-600">Let's start with your basic information. No judgment—we focus on your complete story.</p>
      </div>

      {/* Security Note */}
      <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded flex gap-3">
        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-900">Your data is secure</p>
          <p className="text-sm text-blue-700">We use SSL encryption and never share your information</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Names Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
              placeholder="John"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                localErrors.firstName ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
            />
            {localErrors.firstName && <p className="text-xs text-red-600 mt-1">{localErrors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
              placeholder="Doe"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                localErrors.lastName ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
            />
            {localErrors.lastName && <p className="text-xs text-red-600 mt-1">{localErrors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              placeholder="john@example.com"
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                localErrors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
            />
          </div>
          {localErrors.email && <p className="text-xs text-red-600 mt-1">{localErrors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              placeholder="(555) 123-4567"
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                localErrors.phone ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
            />
          </div>
          {localErrors.phone && <p className="text-xs text-red-600 mt-1">{localErrors.phone}</p>}
        </div>

        {/* DOB & SSN Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={data.dob}
                onChange={(e) => onUpdate({ dob: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                  localErrors.dob ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
                }`}
              />
            </div>
            {localErrors.dob && <p className="text-xs text-red-600 mt-1">{localErrors.dob}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">SSN *</label>
            <input
              type="text"
              value={data.ssn}
              onChange={(e) => onUpdate({ ssn: e.target.value })}
              placeholder="123-45-6789"
              maxLength="11"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                localErrors.ssn ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
              }`}
            />
            {localErrors.ssn && <p className="text-xs text-red-600 mt-1">{localErrors.ssn}</p>}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-end">
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

ApplicationStep1.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default ApplicationStep1;
