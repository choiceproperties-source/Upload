import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  subscribeNewsletter,
  unsubscribeNewsletter,
  updateNewsletterPreferences,
  getSubscriber,
  getAllSubscribers
} from '../controller/newsletterController.js';
import { protect } from '../middleware/authmiddleware.js';

const newsletterRouter = express.Router();

// Rate limiting for newsletter
const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 2, // 2 subscriptions per hour per IP
  message: { success: false, message: 'Too many subscription attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Public routes
newsletterRouter.post('/subscribe', newsletterLimiter, subscribeNewsletter);
newsletterRouter.post('/unsubscribe', newsletterLimiter, unsubscribeNewsletter);
newsletterRouter.put('/preferences', newsletterLimiter, updateNewsletterPreferences);
newsletterRouter.get('/get/:email', getSubscriber);

// Admin routes
newsletterRouter.get('/all', protect, getAllSubscribers);

export default newsletterRouter;
