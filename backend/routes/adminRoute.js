import express from 'express';
import { 
  getAdminStats,
  getAllAppointments,
  updateAppointmentStatus,
  getStats,
  getAllApplications,
  getAllPayments,
  getAllSubscribers,
  updateApplicationStatus,
  getApplicationDetails,
  getPaymentDetails,
  exportData
} from '../controller/adminController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// Existing routes
router.get('/stats', getAdminStats);
router.get('/appointments', getAllAppointments);
router.put('/appointments/status', updateAppointmentStatus);

// New dashboard routes (require auth)
router.get('/dashboard/stats', protect, getStats);
router.get('/applications', protect, getAllApplications);
router.get('/payments', protect, getAllPayments);
router.get('/subscribers', protect, getAllSubscribers);
router.put('/applications/:id/status', protect, updateApplicationStatus);
router.get('/applications/:id', protect, getApplicationDetails);
router.get('/payments/:id', protect, getPaymentDetails);
router.get('/export', protect, exportData);

export default router;