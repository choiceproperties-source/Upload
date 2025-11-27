import express from 'express';
import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  sendBulkNotification
} from '../controller/notificationController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

// Get user notifications
router.get('/:userId', protect, getUserNotifications);

// Mark notification as read
router.put('/:id/read', protect, markAsRead);

// Mark all as read
router.put('/:userId/read-all', protect, markAllAsRead);

// Delete notification
router.delete('/:id', protect, deleteNotification);

// Send bulk notifications (admin only)
router.post('/send/bulk', protect, sendBulkNotification);

export default router;
