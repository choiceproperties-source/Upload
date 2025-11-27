import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const applicationSchema = new mongoose.Schema({
  applicationId: { type: String, unique: true, required: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  
  // Personal Info
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, index: true },
  phone: { type: String, required: true },
  ssn: { type: String, required: true }, // Encrypted before storage
  dob: { type: Date, required: true },
  
  // Employment
  employmentStatus: { type: String, required: true },
  employer: String,
  jobTitle: String,
  annualIncome: Number,
  employmentStartDate: Date,
  
  // References
  reference1Name: { type: String, required: true },
  reference1Phone: { type: String, required: true },
  reference2Name: String,
  reference2Phone: String,
  
  // Additional
  petInfo: String,
  desiredMoveDate: { type: Date, required: true },
  propertyId: String,
  
  // Status
  status: { type: String, enum: ['submitted', 'screening', 'approved', 'rejected'], default: 'submitted', index: true },
  backgroundCheckStatus: { type: String, enum: ['pending', 'passed', 'failed'], default: 'pending' },
  
  // Timestamps
  submittedAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash SSN before saving
applicationSchema.pre('save', async function(next) {
  if (this.isModified('ssn')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.ssn = await bcrypt.hash(this.ssn, salt);
    } catch (error) {
      next(error);
    }
  }
  next();
});

// Add indexes for common queries
applicationSchema.index({ createdAt: -1 });
applicationSchema.index({ email: 1, status: 1 });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
