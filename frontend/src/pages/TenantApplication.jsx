import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import ApplicationStep1 from '@/components/TenantScreening/ApplicationStep1';
import ApplicationStep2 from '@/components/TenantScreening/ApplicationStep2';
import ApplicationStep3 from '@/components/TenantScreening/ApplicationStep3';
import ApplicationStep4 from '@/components/TenantScreening/ApplicationStep4';
import ApplicationStep5 from '@/components/TenantScreening/ApplicationStep5';
import ApplicationSuccess from '@/components/TenantScreening/ApplicationSuccess';
import { trackApplicationStart, trackApplicationComplete } from '@/utils/analytics';
import { Backendurl } from '@/App.jsx';

const TenantApplication = () => {
  const [step, setStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ssn: '',
    dob: '',
    
    // Employment
    employmentStatus: '',
    employer: '',
    jobTitle: '',
    annualIncome: '',
    employmentStartDate: '',
    
    // References
    reference1Name: '',
    reference1Phone: '',
    reference2Name: '',
    reference2Phone: '',
    
    // Additional
    petInfo: '',
    desiredMoveDate: '',
    propertyId: '' // If applying for specific property
  });
  const [applicationId, setApplicationId] = useState(null);

  const handleUpdateData = (newData) => {
    setApplicationData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (step === 1) trackApplicationStart('step-1-personal');
    if (step === 2) trackApplicationStart('step-2-employment');
    if (step === 3) trackApplicationStart('step-3-references');
    if (step === 4) trackApplicationStart('step-4-review');
    
    setStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const handleComplete = async () => {
    try {
      // Submit to backend
      const response = await axios.post(
        `${Backendurl}/api/applications/submit`,
        applicationData
      );

      if (response.data.success) {
        const { applicationId } = response.data;
        setApplicationId(applicationId);
        trackApplicationComplete(applicationId);
        toast.success('Application submitted successfully!');
        setStep(6); // Success screen
      } else {
        toast.error(response.data.message || 'Error submitting application');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error(error.response?.data?.message || 'Error submitting application');
    }
  };

  return (
    <>
      <Helmet>
        <title>Tenant Application | Choice Properties</title>
        <meta name="description" content="Complete your tenant application with our fast and secure screening process." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Screen */}
          {step === 6 ? (
            <ApplicationSuccess applicationId={applicationId} />
          ) : (
            <>
              {/* Fair Process Banner */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-2xl p-4 text-center"
              >
                <p className="text-emerald-700 font-semibold text-sm">
                  ✓ Fair Evaluation • No Judgment • 5-7 Day Approvals
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  We look at your complete story, not just your past. Let's find you a home.
                </p>
              </motion.div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between mb-4">
                  {[1, 2, 3, 4, 5].map(s => (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex-1 h-2 mx-1 rounded-full transition-all ${
                        s <= step ? 'bg-gradient-to-r from-blue-600 to-emerald-600' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600">
                  Step {step} of 5
                </p>
              </div>

              {/* Content */}
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <ApplicationStep1
                    data={applicationData}
                    onUpdate={handleUpdateData}
                    onNext={handleNext}
                  />
                )}
                {step === 2 && (
                  <ApplicationStep2
                    data={applicationData}
                    onUpdate={handleUpdateData}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                  />
                )}
                {step === 3 && (
                  <ApplicationStep3
                    data={applicationData}
                    onUpdate={handleUpdateData}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                  />
                )}
                {step === 4 && (
                  <ApplicationStep4
                    data={applicationData}
                    onUpdate={handleUpdateData}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                  />
                )}
                {step === 5 && (
                  <ApplicationStep5
                    data={applicationData}
                    onUpdate={handleUpdateData}
                    onComplete={handleComplete}
                    onPrevious={handlePrevious}
                  />
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TenantApplication;
