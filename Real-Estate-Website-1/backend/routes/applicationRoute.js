import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  submitApplication,
  getApplication,
  getUserApplications,
  updateApplicationStatus,
  getAllApplications
} from '../controller/applicationController.js';
import { protect } from '../middleware/authmiddleware.js';

const applicationRouter = express.Router();

// Rate limiting for applications
const applicationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 applications per hour
  message: { success: false, message: 'Too many applications. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Public routes
applicationRouter.post('/submit', applicationLimiter, submitApplication);
applicationRouter.get('/get/:applicationId', getApplication);
applicationRouter.get('/status/:applicationId', getApplication);

// Authenticated user routes
applicationRouter.get('/user/:userId', protect, getUserApplications);

// Admin routes
applicationRouter.get('/all', protect, getAllApplications);
applicationRouter.put('/update/:applicationId', protect, updateApplicationStatus);

export default applicationRouter;
