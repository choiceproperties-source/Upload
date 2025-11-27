import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true, required: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  
  // Payment Details
  amount: { type: Number, required: true, min: 0.01, max: 100000 },
  currency: { type: String, default: 'USD' },
  description: { type: String, required: true, trim: true },
  
  // Card Details (last 4 digits only - for security)
  cardLastFour: { type: String, required: true },
  cardholderName: { type: String, required: true, trim: true },
  
  // Status
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending', index: true },
  
  // Processing stages
  authorizationStage: { type: Boolean, default: false },
  verificationStage: { type: Boolean, default: false },
  processingStage: { type: Boolean, default: false },
  finalizationStage: { type: Boolean, default: false },
  
  // Error tracking
  errorMessage: String,
  retryCount: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now, index: true },
  completedAt: Date,
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Add indexes for common queries
paymentSchema.index({ status: 1, createdAt: -1 });
paymentSchema.index({ userId: 1, createdAt: -1 });

// TTL index: auto-delete pending payments after 24 hours
paymentSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400, partialFilterExpression: { status: 'pending' } });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
