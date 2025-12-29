// src/pages/PunjabiTypingPurchase.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { typingAPI } from '../services/api';
import punjabiTypingImage from '../assets/punjabi-typing.jpg';
import { Helmet } from '@dr.pogodin/react-helmet';

function PunjabiTypingPurchase() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [typingInfo, setTypingInfo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTypingInfo();
    if (user) {
      checkAccess();
    }
  }, [user]);

  const fetchTypingInfo = async () => {
    try {
      const response = await typingAPI.getInfo();
      // setTypingInfo(response.data.typing);
    const typingData = {
      ...response.data.typing,
      originalPrice: 399,  // OLD PRICE (cut-off)
      // response.data.typing.price will be 299 (new backend price)
    };
    setTypingInfo(typingData);
    } catch (error) {
      console.error('Error fetching typing info:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAccess = async () => {
    try {
      const response = await typingAPI.checkAccess();
      setHasAccess(response.data.hasAccess);
    } catch (error) {
      console.error('Error checking access:', error);
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
      alert('Please login first to purchase the course');
      navigate('/dashboard');
      return;
    }

    if (hasAccess) {
      window.open('https://elite-academy-punjabi-typing.vercel.app', '_blank');
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

      const response = await typingAPI.createPurchase();
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: 'Punjabi & English Typing Training',
        order_id: order.id,
        handler: async function (razorpayResponse) {
          try {
            alert(
              "Payment successful! 🎉\n\n" +
              "Please check your email (" + user.email + ") within the next 5 minutes.\n" +
              "You will receive:\n" +
              "✅ Course website link\n" +
              "✅ Login instructions\n\n" +
              "Course Website: elite-academy-punjabi-typing.vercel.app\n\n" +
              "If you don't receive the email, please contact us at 2025eliteacademy@gmail.com."
            );
            setHasAccess(true);
            setProcessing(false);
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert(
              'Payment successful but verification failed.\n\n' +
              'You should receive course access via email shortly.\n' +
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
      console.error('Error creating typing purchase:', error);
      
      if (error.response?.data?.message === "Check your email for access details") {
        alert(
          "You have already purchased this course!\n\n" +
          "Please check your email for access details.\n" +
          "Course Website: elite-academy-punjabi-typing.vercel.app"
        );
        setHasAccess(true);
      } else {
        alert(
          "There was an issue processing your payment.\n\n" +
          "If the amount was debited but you don't receive access, " +
          "please email us at 2025eliteacademy@gmail.com with your payment details."
        );
      }
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
      <title>Punjabi Typing Course - Elite Academy Pro</title>
      <meta name="description" content="Elite Academy's Punjabi & English typing training for PSSSB Clerk and Senior Assistant exams" />
      <meta name="keywords" content="Elite Academy typing, punjabi typing course, PSSSB typing test" />
    </Helmet>

    <div className="min-h-screen bg-black">

<div className="text-center mb-4">
  <span className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-lg font-bold animate-pulse">
    🎊 New Year Special: {Math.round(((typingInfo?.originalPrice - typingInfo?.price) / typingInfo?.originalPrice) * 100)}% OFF! 🎊
  </span>
</div>
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-blue-400 hover:text-blue-300 flex items-center space-x-2 transition-all duration-300 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Home</span>
            </button>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Elite Academy
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-64 md:h-auto">
              <img
                src={punjabiTypingImage}
                alt="Punjabi Typing Training"
                className="w-full h-full object-fit"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-semibold mb-2 shadow-lg">
                  ⌨️ Government Exam Preparation
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 bg-gradient-to-br from-gray-800 to-gray-900">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                {typingInfo?.title}
              </h2>
              <p className="text-lg text-gray-400 mb-6 font-semibold">
                {typingInfo?.subtitle}
              </p>

              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {typingInfo?.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {typingInfo?.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 group-hover:text-gray-200 transition-colors">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6 mb-6 border border-blue-700/50 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Course Price</p>
                    <p className="text-4xl font-bold text-white">
                      ₹{typingInfo?.price}
                      <span className="text-lg font-normal text-gray-400 ml-2">only</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">One-time payment</p>
                    <p className="text-sm font-semibold text-green-400">Lifetime access</p>
                  </div>
                </div>
              </div> */}
              {/* Course Price */}
<div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-6 mb-6 border-2 border-red-500/50 shadow-lg">
  <div className="text-center mb-3">
    <div className="inline-block px-4 py-1 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full text-xs font-bold animate-pulse">
      🎉 NEW YEAR SPECIAL! 🎉
    </div>
  </div>
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-400 mb-1">Course Price</p>
      <div className="flex items-center gap-3">
        <p className="text-2xl font-bold text-gray-500 line-through">
          ₹{typingInfo?.originalPrice}
        </p>
        <p className="text-4xl font-bold text-green-400">
          ₹{typingInfo?.price}
        </p>
      </div>
      <p className="text-sm text-red-400 font-semibold mt-1">
        Save ₹{typingInfo?.originalPrice - typingInfo?.price}!
      </p>
    </div>
    <div className="text-right">
      <p className="text-sm text-gray-400">One-time payment</p>
      <p className="text-sm font-semibold text-green-400">Lifetime access</p>
    </div>
  </div>
</div>


              {/* Access Note */}
              {hasAccess ? (
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-600/50 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-green-300">You have access to this course! 🎉</p>
                      <p className="text-sm text-green-400 mt-1">Click the button below to access the typing platform.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-600/50 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-blue-300">After Payment</p>
                      <p className="text-sm text-blue-400 mt-1">
                        Please check your email within 5 minutes after payment. We will send you the website link and login instructions.
                      </p>
                      <p className="text-sm text-blue-400 mt-2">
                        Course website:{' '}
                        <a
                          href="https://elite-academy-punjabi-typing.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold underline text-blue-300 hover:text-blue-200"
                        >
                          elite-academy-punjabi-typing.vercel.app
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <button
                onClick={handlePurchase}
                disabled={processing}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  processing
                    ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                    : hasAccess
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-900/50 hover:shadow-xl hover:shadow-green-900/70 transform hover:scale-[1.02]'
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
                ) : hasAccess ? (
                  '🎯 Access Course Platform'
                ) : (
                  '🚀 Enroll Now - Secure Your Success'
                )}
              </button>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure payment via Razorpay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-700">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8 text-center">
            Why Choose Our Typing Training?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/50 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">Exam Pattern Match</h4>
              <p className="text-gray-400">Practice with the same format, difficulty, and time limits as real exams</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-900/50 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">Beginner Friendly</h4>
              <p className="text-gray-400">Start from zero - comprehensive step-by-step Punjabi typing lessons</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-900/50 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">Speed & Accuracy</h4>
              <p className="text-gray-400">Specialized drills to improve both typing speed and accuracy simultaneously</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 text-center text-gray-500">
          <p>
            Need help? Email us at{' '}
            <a href="mailto:2025eliteacademy@gmail.com" className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors">
              2025eliteacademy@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default PunjabiTypingPurchase;
