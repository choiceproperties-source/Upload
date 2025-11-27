import Application from '../models/applicationModel.js';
import { getApplicationConfirmationTemplate } from '../email.js';
import { sendEmail } from '../config/nodemailer.js';
import crypto from 'crypto';
import {
  validateEmail,
  validatePhone,
  validateSSN
} from '../utils/validation.js';

// Generate unique application ID
const generateApplicationId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  return `APP-${timestamp}-${random}`.toUpperCase();
};

// Validate application data
const validateApplicationData = (data) => {
  const errors = [];

  if (!data.firstName?.trim()) errors.push('First name is required');
  if (!data.lastName?.trim()) errors.push('Last name is required');
  if (!validateEmail(data.email)) errors.push('Valid email is required');
  if (!validatePhone(data.phone)) errors.push('Valid phone number is required');
  if (!validateSSN(data.ssn)) errors.push('Valid SSN (9 digits) is required');
  if (!data.dob) errors.push('Date of birth is required');
  if (!data.employmentStatus) errors.push('Employment status is required');
  if (!data.reference1Name?.trim()) errors.push('Primary reference name is required');
  if (!validatePhone(data.reference1Phone)) errors.push('Valid primary reference phone is required');

  return errors;
};

export const submitApplication = async (req, res) => {
  try {
    const { 
      firstName, lastName, email, phone, ssn, dob,
      employmentStatus, employer, jobTitle, annualIncome, employmentStartDate,
      reference1Name, reference1Phone, reference2Name, reference2Phone,
      petInfo, desiredMoveDate, propertyId, userId
    } = req.body;

    // Validate required fields with detailed validation
    const validationErrors = validateApplicationData({
      firstName, lastName, email, phone, ssn, dob,
      employmentStatus, reference1Name, reference1Phone
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Generate unique application ID
    const applicationId = generateApplicationId();

    // Create application
    const newApplication = new Application({
      applicationId,
      userId,
      firstName,
      lastName,
      email,
      phone,
      ssn,
      dob,
      employmentStatus,
      employer,
      jobTitle,
      annualIncome,
      employmentStartDate,
      reference1Name,
      reference1Phone,
      reference2Name,
      reference2Phone,
      petInfo,
      desiredMoveDate,
      propertyId,
      status: 'submitted',
      backgroundCheckStatus: 'pending'
    });

    await newApplication.save();

    // Send confirmation email
    try {
      const emailContent = getApplicationConfirmationTemplate(applicationId, email);
      await sendEmail({
        from: process.env.EMAIL_FROM || 'noreply@choiceproperties.com',
        to: email,
        subject: `Application Received - ID: ${applicationId}`,
        html: emailContent
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the request if email fails
    }

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId,
      application: newApplication
    });
  } catch (error) {
    console.error('Application submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message
    });
  }
};

export const getApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findOne({ applicationId });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    return res.json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Get application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving application'
    });
  }
};

export const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await Application.find({ userId }).sort({ submittedAt: -1 });

    return res.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Get user applications error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving applications'
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, backgroundCheckStatus } = req.body;

    const application = await Application.findOneAndUpdate(
      { applicationId },
      { status, backgroundCheckStatus, updatedAt: new Date() },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    return res.json({
      success: true,
      message: 'Application status updated',
      application
    });
  } catch (error) {
    console.error('Update application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating application'
    });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: -1 });

    return res.json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    console.error('Get all applications error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving applications'
    });
  }
};
