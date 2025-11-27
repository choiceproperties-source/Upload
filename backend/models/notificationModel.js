import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['application', 'payment', 'message', 'system'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  relatedId: String, // Application ID, Payment ID, etc.
  read: { type: Boolean, default: false, index: true },
  actionUrl: String,
  createdAt: { type: Date, default: Date.now, index: true },
  expiresAt: { type: Date, default: () => new Date(+new Date() + 30*24*60*60*1000) } // 30 days
});

// TTL index - auto-delete after 30 days
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
