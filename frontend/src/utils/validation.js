// Comprehensive input validation utilities

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[\d\-\+\(\)\s]{10,}$/;
  return regex.test(phone?.toString() || '');
};

export const validateCity = (city) => {
  return city?.trim().length >= 2;
};

export const validateZipCode = (zipCode) => {
  const regex = /^\d{5}(-\d{4})?$/;
  return regex.test(zipCode);
};

export const validatePassword = (password) => {
  // Min 8 chars, 1 upper, 1 lower, 1 number, 1 special
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const validateUsername = (username) => {
  // 3-20 chars, alphanumeric + underscore
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
};

export const validateSSN = (ssn) => {
  // Format: XXX-XX-XXXX (don't validate real SSNs, just format)
  const regex = /^\d{3}-\d{2}-\d{4}$/;
  return regex.test(ssn);
};

export const validateCreditCard = (cardNumber) => {
  // Remove spaces and hyphens
  const cleaned = cardNumber.replace(/\s/g, '').replace(/-/g, '');
  // Luhn algorithm for credit card validation
  if (!/^\d{13,19}$/.test(cleaned)) return false;
  
  let sum = 0;
  let isEven = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
};

export const validateCVV = (cvv) => {
  const regex = /^\d{3,4}$/;
  return regex.test(cvv);
};

export const validateExpiryDate = (month, year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  if (month < 1 || month > 12) return false;
  return true;
};

export const validatePropertySearch = (filters) => {
  const errors = {};
  
  if (!filters.location || filters.location.trim() === '') {
    errors.location = 'Location is required';
  }
  
  if (filters.priceMin && filters.priceMax && parseInt(filters.priceMin) > parseInt(filters.priceMax)) {
    errors.price = 'Minimum price cannot exceed maximum price';
  }
  
  return errors;
};

export const validateApplicationForm = (data) => {
  const errors = {};
  
  if (!data.firstName?.trim()) errors.firstName = 'First name is required';
  if (!data.lastName?.trim()) errors.lastName = 'Last name is required';
  if (!validateEmail(data.email)) errors.email = 'Valid email is required';
  if (!validatePhone(data.phone)) errors.phone = 'Valid phone number is required';
  if (!data.desiredMoveDate) errors.moveDate = 'Desired move date is required';
  if (!data.employmentStatus) errors.employment = 'Employment status is required';
  if (data.employmentStatus === 'employed' && !data.employer?.trim()) {
    errors.employer = 'Employer name is required';
  }
  
  return errors;
};

export const validateContactForm = (data) => {
  const errors = {};
  
  if (!data.name?.trim()) errors.name = 'Name is required';
  if (!validateEmail(data.email)) errors.email = 'Valid email is required';
  if (!data.subject?.trim()) errors.subject = 'Subject is required';
  if (!data.message?.trim() || data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return errors;
};

export const validateNewsletterEmail = (email) => {
  return validateEmail(email);
};

// Sanitize user input to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Format credit card display (hide most digits)
export const formatCardDisplay = (cardNumber) => {
  if (!cardNumber) return '';
  const lastFour = cardNumber.slice(-4);
  return `•••• •••• •••• ${lastFour}`;
};

// Format phone for display
export const formatPhoneDisplay = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};
