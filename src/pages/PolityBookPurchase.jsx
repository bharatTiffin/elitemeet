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
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolityInfo();
  }, []);

  const fetchPolityInfo = async () => {
    try {
      const response = await polityAPI.getInfo();
      console.log('Polity info fetched:', response.data);
      // setPolityInfo(response.data.polity);
      setPolityInfo({
        ...response.data.polity,
        originalPrice: response.data.polity.price + 100  // Add this line
      });
    } catch (error) {
      console.error('Error fetching polity info:', error);
      // Set default info if API fails
      setPolityInfo({
        name: 'Complete Polity Package',
        description: 'Complete PSSSB & Punjab Exams Polity Package for scoring full marks',
        price: 199,
        originalPrice: 299,
        features: [
          '90 Pages Full Polity Notes',
          '20 Pages PYQs (2012–2025)',
          'December 2025 Updated',
          '100% PSSSB + Punjab Exam Oriented'
        ],
        highlights: [
          'Score full marks - No extra books needed',
          'Complete coverage of all polity topics',
          'Latest PYQs updated till December 2025',
          'Exam-specific preparation material'
        ]
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
      alert('Please login first to purchase the Polity Book');
      navigate('/dashboard');
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
              "The Polity Book PDF will be sent to your email (" + user.email + ") within 5 minutes.\n\n" +
              "✅ 90 Pages Full Polity Notes\n" +
              "✅ 20 Pages PYQs (2012–2025)\n\n" +
              "Please check your inbox and spam folder.\n\n" +
              "If you don't receive the email, please contact us at 2025eliteacademy@gmail.com."
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
          name: user.displayName || user.email?.split('@')[0] || 'Student',
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
      console.error('Error creating polity purchase:', error);
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Complete Polity Package - Elite Academy</title>
        <meta name="description" content="Get the complete PSSSB & Punjab Exams Polity Package. 90 Pages Full Polity Notes + 20 Pages PYQs (2012-2025)" />
      </Helmet>

      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-400 hover:text-blue-300 flex items-center space-x-2 transition-all duration-300 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Dashboard</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Elite Academy
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4 sm:mb-6 shadow-lg shadow-purple-900/50">
              <span className="text-3xl sm:text-4xl">📘</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              {polityInfo?.name || 'Complete Polity Package'}
            </h1>
            <p className="text-lg sm:text-xl text-gray-400">
              For PSSSB & Punjab Exams
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
            
            {/* What You'll Get Badge */}
            <div className="p-6 sm:p-8 md:p-12">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-semibold mb-6 sm:mb-8 shadow-lg">
                🎯 What You'll Get
              </div>
              
              {/* Features Grid */}
              <div className="grid gap-4 sm:gap-6 mb-8 sm:mb-12">
                {polityInfo?.features?.map((feature, index) => {
                  const icons = ['📖', '📝', '🔥', '✅'];
                  return (
                    <div 
                      key={index} 
                      className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
                    >
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <span className="text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                          {icons[index]}
                        </span>
                        <div className="flex-1">
                          <p className="font-bold text-base sm:text-lg text-white">
                            {feature}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Description */}
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 sm:p-6 mb-8 sm:mb-12 border border-blue-700/30">
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {polityInfo?.description || 
                    'Get the complete polity preparation package designed specifically for PSSSB and Punjab government exams. This comprehensive guide includes detailed notes covering all polity topics and previous year questions from 2012 to 2025, updated till December 2025. Score full marks in polity section without needing any additional books.'}
                </p>
              </div>

              {/* Key Highlights */}
              {polityInfo?.highlights && polityInfo.highlights.length > 0 && (
                <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 mb-8 sm:mb-12 border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                    <span className="text-xl sm:text-2xl mr-2">🌟</span>
                    Key Highlights
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {polityInfo.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm sm:text-base text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Section */}
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 border border-blue-700/50 shadow-lg">
                {/* <div className="text-center">
                  <p className="text-base sm:text-lg text-gray-400 mb-2">Special Price</p>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                      ₹{polityInfo?.price || 199}
                    </span>
                    <span className="text-lg sm:text-xl text-gray-400">only</span>
                  </div> */}
                  <div className="text-center">
                  <p className="text-base sm:text-lg text-gray-400 mb-2">Special Price</p>
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-500 line-through">
                      ₹{polityInfo?.originalPrice || 299}
                    </span>
                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                      ₹{polityInfo?.price || 199}
                    </span>
                    <span className="text-lg sm:text-xl text-gray-400">only</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-400 mb-6">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      One-time payment
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Instant delivery
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handlePurchase}
                disabled={processing}
                className={`w-full py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 ${
                  processing
                    ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-purple-900/50 hover:shadow-xl hover:shadow-purple-900/70 transform hover:scale-[1.02]'
                }`}
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  '🎯 Buy Now - Get Instant Access'
                )}
              </button>

              {/* After Payment Info */}
              <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-600/50 rounded-lg p-4 sm:p-6">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl sm:text-3xl flex-shrink-0">📧</span>
                  <div>
                    <p className="font-semibold text-blue-300 mb-2">After Payment</p>
                    <p className="text-sm sm:text-base text-blue-400 leading-relaxed">
                      The Polity Book PDF will be sent to your email <strong className="text-white">({user?.email || 'your email'})</strong> within 5 minutes after successful payment.
                    </p>
                    <p className="text-xs sm:text-sm text-blue-400 mt-2">
                      Please check your inbox and spam folder.
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure payment via Razorpay</span>
              </div>
            </div>
          </div>

          {/* Why Choose Section */}
          <div className="mt-8 sm:mt-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-gray-700">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 sm:mb-8 text-center">
              Why This Polity Package?
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/50 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 text-white">Exam Focused</h4>
                <p className="text-sm sm:text-base text-gray-400">100% aligned with PSSSB & Punjab exam patterns</p>
              </div>
              
              <div className="text-center group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-900/50 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 text-white">Complete Coverage</h4>
                <p className="text-sm sm:text-base text-gray-400">All polity topics in 90 pages comprehensive notes</p>
              </div>
              
              <div className="text-center group sm:col-span-2 md:col-span-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-900/50 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 text-white">Latest Updates</h4>
                <p className="text-sm sm:text-base text-gray-400">December 2025 updated with latest PYQs</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm sm:text-base text-gray-500">
              Need help? Email us at{' '}
              <a 
                href="mailto:2025eliteacademy@gmail.com" 
                className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors"
              >
                2025eliteacademy@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PolityBookPurchase;