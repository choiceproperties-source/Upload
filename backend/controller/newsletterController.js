import Newsletter from '../models/newsletterModel.js';
import { getNewsletterWelcomeTemplate } from '../email.js';
import { sendEmail } from '../config/nodemailer.js';
import { validateEmail } from '../utils/validation.js';

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email with detailed validation
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address required'
      });
    }

    // Check if already subscribed
    let subscriber = await Newsletter.findOne({ email });

    if (subscriber) {
      if (subscriber.subscriptionStatus === 'active') {
        return res.status(200).json({
          success: true,
          message: 'Already subscribed',
          subscriber
        });
      } else {
        // Reactivate subscription
        subscriber.subscriptionStatus = 'active';
        subscriber.subscribedAt = new Date();
        subscriber.unsubscribedAt = null;
        await subscriber.save();
      }
    } else {
      // Create new subscriber
      subscriber = new Newsletter({
        email,
        subscriptionStatus: 'active',
        subscribedAt: new Date(),
        frequency: 'weekly'
      });
      await subscriber.save();
    }

    // Send welcome email
    try {
      const emailContent = getNewsletterWelcomeTemplate(email);
      await sendEmail({
        from: process.env.EMAIL_FROM || 'noreply@choiceproperties.com',
        to: email,
        subject: 'Welcome to Choice Properties Newsletter!',
        html: emailContent
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
    }

    return res.status(201).json({
      success: true,
      message: 'Subscribed successfully',
      subscriber
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error subscribing to newsletter',
      error: error.message
    });
  }
};

export const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    const subscriber = await Newsletter.findOneAndUpdate(
      { email },
      { 
        subscriptionStatus: 'unsubscribed',
        unsubscribedAt: new Date()
      },
      { new: true }
    );

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }

    return res.json({
      success: true,
      message: 'Unsubscribed successfully',
      subscriber
    });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error unsubscribing from newsletter'
    });
  }
};

export const updateNewsletterPreferences = async (req, res) => {
  try {
    const { email, preferences, frequency } = req.body;

    const subscriber = await Newsletter.findOneAndUpdate(
      { email },
      { 
        preferences: preferences || undefined,
        frequency: frequency || undefined
      },
      { new: true }
    );

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }

    return res.json({
      success: true,
      message: 'Preferences updated',
      subscriber
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating preferences'
    });
  }
};

export const getSubscriber = async (req, res) => {
  try {
    const { email } = req.params;

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }

    return res.json({
      success: true,
      subscriber
    });
  } catch (error) {
    console.error('Get subscriber error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving subscriber'
    });
  }
};

export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ subscriptionStatus: 'active' });

    return res.json({
      success: true,
      count: subscribers.length,
      subscribers
    });
  } catch (error) {
    console.error('Get all subscribers error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving subscribers'
    });
  }
};
