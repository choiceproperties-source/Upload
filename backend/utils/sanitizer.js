/**
 * Input Sanitization Utilities
 * Prevents XSS attacks and normalizes user input
 */

import DOMPurify from 'isomorphic-dompurify';

// Sanitize string input - removes HTML/scripts
export const sanitizeString = (str) => {
  if (!str) return '';
  return DOMPurify.sanitize(str.trim(), { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

// Sanitize email
export const sanitizeEmail = (email) => {
  if (!email) return '';
  return email.toLowerCase().trim();
};

// Sanitize phone number - keep only digits and common formatting
export const sanitizePhone = (phone) => {
  if (!phone) return '';
  return phone.replace(/[^\d-().+\s]/g, '').trim();
};

// Sanitize SSN - keep only digits
export const sanitizeSSN = (ssn) => {
  if (!ssn) return '';
  return ssn.replace(/\D/g, '');
};

// Sanitize credit card - remove spaces and special chars
export const sanitizeCreditCard = (card) => {
  if (!card) return '';
  return card.replace(/\s/g, '').replace(/[^\d]/g, '');
};

// Sanitize CVV - only digits
export const sanitizeCVV = (cvv) => {
  if (!cvv) return '';
  return cvv.replace(/\D/g, '');
};

// Sanitize full object (recursive)
export const sanitizeObject = (obj) => {
  if (!obj) return {};
  
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

// Prevent NoSQL injection by escaping special MongoDB characters
export const escapeMongo = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/[$\.]/g, '\\$&');
};

export default {
  sanitizeString,
  sanitizeEmail,
  sanitizePhone,
  sanitizeSSN,
  sanitizeCreditCard,
  sanitizeCVV,
  sanitizeObject,
  escapeMongo
};
