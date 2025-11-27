import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  initiatePayment,
  processPayment,
  getPaymentStatus,
  getUserPayments,
  getAllPayments
} from '../controller/paymentController.js';
import { protect } from '../middleware/authmiddleware.js';

const paymentRouter = express.Router();

// Rate limiting for payments (strict)
const paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3, // 3 payment attempts per 10 minutes
  message: { success: false, message: 'Too many payment attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Public routes
paymentRouter.post('/initiate', paymentLimiter, initiatePayment);
paymentRouter.post('/process', paymentLimiter, processPayment);
paymentRouter.get('/status/:transactionId', getPaymentStatus);

// Authenticated user routes
paymentRouter.get('/user/:userId', protect, getUserPayments);

// Admin routes
paymentRouter.get('/all', protect, getAllPayments);

export default paymentRouter;
