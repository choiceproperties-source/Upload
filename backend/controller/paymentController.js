import Payment from '../models/paymentModel.js';
import { getPaymentConfirmationTemplate } from '../email.js';
import { sendEmail } from '../config/nodemailer.js';
import { validateEmail } from '../utils/validation.js';

// Generate unique transaction ID
const generateTransactionId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `TXN-${timestamp}-${random}`.toUpperCase();
};

// Validate payment data
const validatePaymentData = (data) => {
  const errors = [];

  if (!data.amount || typeof data.amount !== 'number') {
    errors.push('Valid amount is required');
  } else if (data.amount <= 0 || data.amount > 100000) {
    errors.push('Amount must be between $0.01 and $100,000');
  }

  if (!data.description?.trim()) errors.push('Description is required');
  if (!data.cardLastFour || data.cardLastFour.length !== 4) errors.push('Valid card last 4 digits required');
  if (!data.cardholderName?.trim()) errors.push('Cardholder name is required');
  if (!validateEmail(data.email)) errors.push('Valid email is required');

  return errors;
};

export const initiatePayment = async (req, res) => {
  try {
    const { amount, description, cardholderName, cardLastFour, email, userId } = req.body;

    // Validate payment data
    const validationErrors = validatePaymentData({
      amount, description, cardholderName, cardLastFour, email
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    const transactionId = generateTransactionId();

    // Create payment record
    const newPayment = new Payment({
      transactionId,
      userId,
      amount,
      currency: 'USD',
      description,
      cardLastFour,
      cardholderName,
      status: 'processing'
    });

    await newPayment.save();

    return res.status(201).json({
      success: true,
      message: 'Payment initiated',
      transactionId,
      payment: newPayment
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error initiating payment',
      error: error.message
    });
  }
};

export const processPayment = async (req, res) => {
  try {
    const { transactionId, email } = req.body;

    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Simulate payment processing (90% success rate)
    const isSuccess = Math.random() < 0.9;

    if (isSuccess) {
      // Update payment to completed
      payment.status = 'completed';
      payment.authorizationStage = true;
      payment.verificationStage = true;
      payment.processingStage = true;
      payment.finalizationStage = true;
      payment.completedAt = new Date();
      await payment.save();

      // Send success email
      try {
        const emailContent = getPaymentConfirmationTemplate(transactionId, payment.amount, email);
        await sendEmail({
          from: process.env.EMAIL_FROM || 'noreply@choiceproperties.com',
          to: email,
          subject: `Payment Confirmation - Transaction ID: ${transactionId}`,
          html: emailContent
        });
      } catch (emailError) {
        console.error('Email send error:', emailError);
      }

      return res.json({
        success: true,
        message: 'Payment completed successfully',
        transactionId,
        status: 'completed',
        payment
      });
    } else {
      // Simulate payment failure
      payment.status = 'failed';
      payment.errorMessage = 'Payment authorization failed. Please check your card details and try again.';
      payment.retryCount += 1;
      await payment.save();

      return res.status(402).json({
        success: false,
        message: payment.errorMessage,
        transactionId,
        status: 'failed'
      });
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing payment',
      error: error.message
    });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    return res.json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving payment status'
    });
  }
};

export const getUserPayments = async (req, res) => {
  try {
    const { userId } = req.params;

    const payments = await Payment.find({ userId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      payments
    });
  } catch (error) {
    console.error('Get user payments error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving payments'
    });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (error) {
    console.error('Get all payments error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving payments'
    });
  }
};
