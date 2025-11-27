import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check, AlertCircle } from 'lucide-react';
import { validateNewsletterEmail } from '@/utils/validation';
import { newsletterLimiter } from '@/utils/rateLimiter';
import { trackNewsletterSignup } from '@/utils/analytics';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Backendurl } from '@/App.jsx';

const NewsletterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');
  const [showHasShown, setShowHasShown] = useState(false);

  // Show modal after 15 seconds or on exit intent
  useEffect(() => {
    if (!showHasShown && !isOpen) {
      const timer = setTimeout(() => {
        if (!localStorage.getItem('newsletterDismissed')) {
          setShowHasShown(true);
        }
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [showHasShown, isOpen]);

  const handleMouseLeave = () => {
    if (typeof document !== 'undefined' && document.documentElement) {
      const top = document.documentElement.scrollTop;
      if (top === 0) {
        // User is leaving from top - exit intent detected
        setShowHasShown(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!validateNewsletterEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    // Check rate limit
    if (!newsletterLimiter.isAllowed()) {
      setErrorMessage(`Please wait ${newsletterLimiter.formatResetTime()} before trying again`);
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // Send to backend
      const response = await axios.post(`${Backendurl}/api/newsletter/subscribe`, { email });

      if (response.data.success) {
        setStatus('success');
        trackNewsletterSignup(email);
        
        // Clear form
        setEmail('');
        
        // Hide modal after 3 seconds
        setTimeout(() => {
          onClose();
          localStorage.setItem('newsletterDismissed', 'true');
        }, 3000);
      } else {
        setErrorMessage(response.data.message || 'Failed to subscribe');
        setStatus('error');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to subscribe. Please try again.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    localStorage.setItem('newsletterDismissed', 'true');
    onClose();
  };

  const isVisible = isOpen || showHasShown;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-40"
            onMouseLeave={handleMouseLeave}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-bold text-white">Never Miss an Update!</h2>
                </div>
                <p className="text-blue-100">
                  Get exclusive deals, market insights, and new listings delivered to your inbox.
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Check className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Welcome to Choice Properties!
                    </h3>
                    <p className="text-gray-600">
                      Check your email for confirmation. Special offers on the way!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setStatus(null);
                        }}
                        placeholder="Your email address"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                        disabled={loading}
                      />
                    </div>

                    {/* Error Message */}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-red-50 border-l-4 border-red-600 flex gap-2"
                      >
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600">{errorMessage}</p>
                      </motion.div>
                    )}

                    {/* Subscribe Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          Subscribe Now
                        </>
                      )}
                    </button>

                    {/* Trust Message */}
                    <p className="text-xs text-gray-500 text-center mt-4">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

NewsletterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default NewsletterModal;
