import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true, index: true },
  subscriptionStatus: { type: String, enum: ['active', 'unsubscribed'], default: 'active', index: true },
  subscribedAt: { type: Date, default: Date.now, index: true },
  unsubscribedAt: Date,
  
  // Engagement tracking
  emailsReceived: { type: Number, default: 0 },
  lastEmailSent: Date,
  
  // Preferences
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'weekly' },
  preferences: {
    newListings: { type: Boolean, default: true },
    marketTrends: { type: Boolean, default: true },
    tips: { type: Boolean, default: true },
    promotions: { type: Boolean, default: false }
  }
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

export default Newsletter;
