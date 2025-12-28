// src/pages/PolityBookPurchase.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { polityAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

function PolityBookPurchase() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [polityInfo, setPolityInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const hardcodedPrice = 199; // Hardcoded for now

  useEffect(() => {
    fetchPolityInfo();
  }, []);

  const fetchPolityInfo = async () => {
    try {
      setLoading(true);
      const response = await polityAPI.getInfo();
      setPolityInfo(response.data.polity);
    } catch (error) {
      console.error('Error fetching Polity info:', error);
      // Set default info if API fails
      setPolityInfo({
        title: 'Complete Polity Package',
        price: hardcodedPrice,
        description: 'Complete PSSSB & Punjab Exams Polity Package'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePurchase = async () => {
    if (!user) {
      alert('Please sign in to purchase the Polity Book');
      navigate('/');
      return;
    }

    setProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        alert('Failed to load Razorpay. Please check your internet connection.');
        setProcessing(false);
        return;
      }

      const response = await polityAPI.createPurchase();
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: 'Complete Polity Package for PSSSB & Punjab Exams',
        order_id: order.id,
        handler: async function (razorpayResponse) {
          try {
            alert(
              "Payment successful! 🎉\n\n" +
              "The Polity Book PDF has been sent to your email (" + user.email + ").\n" +
              "Please check your inbox and spam folder.\n\n" +
              "If you don't receive the email within 5 minutes, please contact us at 2025eliteacademy@gmail.com."
            );
            setProcessing(false);
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert(
              'Payment successful but verification failed.\n\n' +
              'The Polity Book PDF should be sent to your email shortly.\n' +
              'If you don\'t receive it, please email us at 2025eliteacademy@gmail.com with your payment details.'
            );
            setProcessing(false);
          }
        },
        prefill: {
          name: user.displayName,
          email: user.email,
        },
        theme: {
          color: '#3b82f6',
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert('Payment failed. Please try again.');
        setProcessing(false);
      });

      paymentObject.open();
    } catch (error) {
      console.error('Error creating purchase:', error);
      alert(
        "There was an issue processing your payment.\n\n" +
        "If the amount was debited but you don't receive the PDF, " +
        "please email us at 2025eliteacademy@gmail.com with your payment details."
      );
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Complete Polity Package - Elite Academy</title>
        <meta name="description" content="Complete Polity Package for PSSSB & Punjab Exams - 90 Pages Notes + 20 Pages PYQs" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              📘 Complete Polity Package
            </h1>
            <p className="text-xl text-gray-600">
              For PSSSB & Punjab Exams
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
              <h2 className="text-3xl font-bold mb-4 text-center">
                🎯 SCORE FULL MARKS – NO EXTRA BOOKS NEEDED
              </h2>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Get:</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">90 Pages Full Polity Notes</p>
                      <p className="text-gray-600">Complete coverage of all polity topics</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">20 Pages PYQs (2012–2025)</p>
                      <p className="text-gray-600">December Updated - Latest questions included</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">100% PSSSB + Punjab Exam Oriented</p>
                      <p className="text-gray-600">Specifically designed for your exam success</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-gray-700 leading-relaxed">
                  {polityInfo?.description || 
                    'Get the complete polity preparation package designed specifically for PSSSB and Punjab government exams. This comprehensive guide includes detailed notes covering all polity topics and previous year questions from 2012 to 2025, updated till December 2025. Score full marks in polity section without needing any additional books.'}
                </p>
              </div>

              {/* Price Section */}
              <div className="mb-8 text-center">
                <div className="inline-block bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <p className="text-gray-600 mb-2">Special Price</p>
                  <p className="text-5xl font-bold text-green-600 mb-2">
                    ₹{polityInfo?.price || hardcodedPrice}
                  </p>
                  <p className="text-sm text-gray-600">One-time payment • Instant delivery</p>
                </div>
              </div>

              {/* Purchase Button */}
              <div className="text-center mb-8">
                <button
                  onClick={handlePurchase}
                  disabled={processing}
                  className={`
                    px-12 py-4 rounded-xl text-xl font-semibold text-white
                    ${processing 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105'
                    }
                    transition-all duration-200 shadow-lg
                  `}
                >
                  {processing ? 'Processing...' : 'Buy Now - Get Instant Access'}
                </button>
              </div>

              {/* After Payment Info */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">📧 After Payment</h4>
                <p className="text-gray-700 mb-2">
                  The Polity Book PDF will be sent to your email ({user?.email || 'your email'}) within 5 minutes after successful payment.
                </p>
                <p className="text-gray-700">
                  Please check your inbox and spam folder.
                </p>
              </div>

              {/* Security Badge */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center space-x-2 text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure payment via Razorpay</span>
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-6 text-center text-gray-600 text-sm">
                💡 Need help? Email us at{' '}
                <a href="mailto:2025eliteacademy@gmail.com" className="text-blue-600 hover:underline">
                  2025eliteacademy@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PolityBookPurchase;
