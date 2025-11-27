// Email validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Phone validation (10 digits, with optional formatting)
export const validatePhone = (phone) => {
  const cleaned = phone?.replace(/\D/g, '') || '';
  return cleaned.length === 10;
};

// SSN validation (9 digits)
export const validateSSN = (ssn) => {
  const cleaned = ssn?.replace(/\D/g, '') || '';
  return cleaned.length === 9;
};

// Credit card validation (Luhn algorithm)
export const validateCreditCard = (cardNumber) => {
  const cleaned = cardNumber?.replace(/\s/g, '') || '';
  if (!/^\d+$/.test(cleaned) || cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// CVV validation
export const validateCVV = (cvv) => {
  const cleaned = cvv?.replace(/\D/g, '') || '';
  return cleaned.length >= 3 && cleaned.length <= 4;
};

// Amount validation
export const validateAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && num <= 100000;
};
