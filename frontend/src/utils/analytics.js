// Google Analytics and tracking utilities

export const initializeAnalytics = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.REACT_APP_GA_ID || 'G-XXXXXXXXXX', {
      page_path: window.location.pathname
    });
  }
};

export const trackPageView = (pageName, pagePath) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_path: pagePath
    });
  }
};

export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  }
};

// Specific tracking events

export const trackPropertyView = (propertyId, propertyTitle, price) => {
  trackEvent('view_item', {
    items: [{
      item_id: propertyId,
      item_name: propertyTitle,
      price: price,
      item_category: 'property'
    }]
  });
};

export const trackSearch = (searchQuery, filterCount) => {
  trackEvent('search', {
    search_term: searchQuery,
    filter_count: filterCount
  });
};

export const trackNewsletterSignup = (email) => {
  trackEvent('newsletter_signup', {
    email_domain: email.split('@')[1]
  });
};

export const trackPropertyComparison = (propertyCount) => {
  trackEvent('property_comparison', {
    property_count: propertyCount
  });
};

export const trackApplicationStart = (applicationStep) => {
  trackEvent('application_start', {
    step: applicationStep
  });
};

export const trackApplicationComplete = (applicationId) => {
  trackEvent('application_complete', {
    application_id: applicationId
  });
};

export const trackPaymentStart = (amount, currency = 'USD') => {
  trackEvent('payment_start', {
    value: amount,
    currency: currency
  });
};

export const trackPaymentComplete = (transactionId, amount) => {
  trackEvent('payment_complete', {
    transaction_id: transactionId,
    value: amount,
    currency: 'USD'
  });
};

export const trackCTAClick = (ctaName, ctaLocation) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation
  });
};

export const trackError = (errorType, errorMessage) => {
  trackEvent('app_error', {
    error_type: errorType,
    error_message: errorMessage
  });
};

export const trackFavoriteToggle = (propertyId, isFavorite) => {
  trackEvent('favorite_toggle', {
    property_id: propertyId,
    is_favorite: isFavorite
  });
};

export const trackLiveChat = (action) => {
  trackEvent('live_chat_' + action);
};

// Custom user properties
export const setUserProperty = (propertyName, propertyValue) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', { [propertyName]: propertyValue });
  }
};

export const trackUserSignup = (userId, method = 'email') => {
  setUserProperty('user_id', userId);
  trackEvent('sign_up', {
    method: method
  });
};

export const trackUserLogin = (userId) => {
  setUserProperty('user_id', userId);
  trackEvent('login', {
    method: 'email'
  });
};
