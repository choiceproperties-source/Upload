import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import PaymentForm from '@/components/Payment/PaymentForm';
import PaymentProcessing from '@/components/Payment/PaymentProcessing';
import PaymentSuccess from '@/components/Payment/PaymentSuccess';
import PaymentError from '@/components/Payment/PaymentError';
import { trackPaymentStart, trackPaymentComplete } from '@/utils/analytics';
import { Backendurl } from '@/App.jsx';

const Payment = () => {
  const [step, setStep] = useState('form'); // 'form', 'processing', 'success', 'error'
  const [paymentData, setPaymentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const handleSubmitPayment = async (data) => {
    try {
      setPaymentData(data);
      trackPaymentStart(data.amount, 'USD');
      setStep('processing');

      // Initiate payment on backend
      const initiateResponse = await axios.post(`${Backendurl}/api/payments/initiate`, {
        amount: data.amount,
        description: data.description,
        cardholderName: data.cardholderName,
        cardLastFour: data.cardNumber.slice(-4),
        email: data.email
      });

      if (!initiateResponse.data.success) {
        throw new Error(initiateResponse.data.message);
      }

      const txId = initiateResponse.data.transactionId;

      // Process payment
      const processResponse = await axios.post(`${Backendurl}/api/payments/process`, {
        transactionId: txId,
        email: data.email
      });

      if (processResponse.data.success) {
        setTransactionId(txId);
        trackPaymentComplete(txId, data.amount);
        setStep('success');
      } else {
        setErrorMessage(processResponse.data.message || 'Payment authorization failed');
        setStep('error');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage(error.response?.data?.message || error.message || 'Payment processing failed');
      setStep('error');
      toast.error('Payment failed');
    }
  };

  const handleRetry = () => {
    setStep('form');
    setErrorMessage('');
  };

  return (
    <>
      <Helmet>
        <title>Secure Payment | Choice Properties</title>
        <meta name="description" content="Secure payment processing for Choice Properties applications and services." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Secure Payment</h1>
              <p className="text-blue-100">Complete your payment safely and securely</p>
            </div>

            {/* Content */}
            <div className="p-8">
              {step === 'form' && <PaymentForm onSubmit={handleSubmitPayment} />}
              {step === 'processing' && <PaymentProcessing amount={paymentData?.amount} />}
              {step === 'success' && <PaymentSuccess transactionId={transactionId} amount={paymentData?.amount} />}
              {step === 'error' && <PaymentError message={errorMessage} onRetry={handleRetry} />}
            </div>

            {/* Security Info */}
            <div className="bg-gray-50 border-t border-gray-200 p-6">
              <p className="text-xs text-gray-500 text-center">
                Your payment information is encrypted and never stored on our servers. 
                We use industry-standard SSL encryption to protect your data.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Payment;
