import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { exciseInspectorAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

function ExciseInspectorPurchase() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    // Check manual auth token first
    const manualAuthToken = localStorage.getItem('manualAuthToken');
    if (manualAuthToken) {
      try {
        return JSON.parse(manualAuthToken);
      } catch (error) {
        console.error('Error parsing manual auth token:', error);
      }
    }
    // Fallback to Firebase auth
    return auth.currentUser;
  });
  const [exciseInfo, setExciseInfo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // Toggle between Sales Page and Form

  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    mobile: ''
  });

  useEffect(() => {
    fetchExciseData();
    window.scrollTo(0, 0);
  }, []);

  const fetchExciseData = async () => {
    try {
      console.log("fetchExciseData...")
      const response = await exciseInspectorAPI.getInfo();
      console.log("fetchExciseData: ", response.data);
      setExciseInfo(response.data.package);
    } catch (error) {
      console.error("API Error fetching Excise Inspector info:", error.response?.data || error.message);
      // Fallback to hardcoded values
      setExciseInfo({
        name: '🎯 Excise Inspector Exam - Complete Strategy Session',
        price: 99,
        originalPrice: 299,
        description: 'Live strategy session on 23rd February with complete roadmap to crack the Excise Inspector exam.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleEnrollmentSubmit = async (e) => {
    e.preventDefault();
    
    setProcessing(true);
    try {
      // 1. Load Razorpay Script first
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay. Please check your internet connection.');
        setProcessing(false);
        return;
      }

      console.log("Creating Excise Inspector enrollment...");
      // 2. ONE SINGLE CALL to the backend
      // This sends the form data AND gets the Razorpay Order back
      const response = await exciseInspectorAPI.enrollAndCreateOrder(formData); 
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Elite Academy',
        description: exciseInfo?.name || 'Excise Inspector Exam Strategy Session',
        order_id: order.id,
        handler: async function (response) {
          try {
            console.log('Payment successful:', response);
            alert(
              '🎉 Payment Successful!\n\n' +
              'Thank you for registering for the Excise Inspector Strategy Session!\n\n' +
              '📧 Please check your email within 5 minutes for:\n' +
              '• WhatsApp community joining link\n' +
              '• Google Meet link for the session\n\n' +
              'The Google Meet link will be shared in the WhatsApp community.\n\n' +
              'If you don\'t receive the email within 5 minutes, please:\n' +
              '• Check your spam folder\n' +
              '• Contact us at 2025eliteacademy@gmail.com\n\n' +
              'For any payment issues, email us at 2025eliteacademy@gmail.com'
            );
            navigate('/dashboard');
          } catch (error) {
            console.error('Payment verification error:', error);
            alert(
              '🎉 Payment Successful!\n\n' +
              'Thank you for registering! Please check your email for details.\n\n' +
              'If any issues, contact us at 2025eliteacademy@gmail.com'
            );
            navigate('/dashboard');
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: '#f97316', // Orange theme for Excise Inspector
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
            alert('Payment cancelled. You can try again later.');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Enrollment error:', error);
      alert(
        error.response?.data?.message || 
        'Failed to process enrollment. Please try again.\n\n' +
        'If the issue persists, email us at 2025eliteacademy@gmail.com'
      );
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mb-4"></div>
          <p className="text-gray-400 text-lg">Loading Excise Inspector Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-white mb-4">Authentication Required</h1>
          <p className="text-gray-400 mb-6">Please login to register for the Excise Inspector Strategy Session</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Excise Inspector Exam Strategy Session | Elite Academy</title>
        <meta name="description" content="Register for the Excise Inspector exam strategy session on 23rd February. Complete roadmap to crack the exam with expert guidance." />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-orange-500/10">
                🔴 Live Strategy Session
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
              Excise Inspector Exam
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Complete Strategy to Crack It • 
              <span className="text-white font-semibold"> 23rd February • Google Meet</span>
            </p>
          </div>

          {!showForm ? (
            /* Sales Page */
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-2 border-white/10 hover:border-white/30 rounded-3xl p-8 transition-all duration-300 hover:scale-105">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 to-red-500/15 blur-3xl rounded-3xl"></div>

              <div className="relative">
                {/* Price Section */}
                <div className="text-center mb-8">
                  <div className="mb-4">
                    <span className="text-gray-400 line-through text-2xl">₹{exciseInfo?.originalPrice || 299}</span>
                    <span className="ml-4 text-5xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      ₹{exciseInfo?.price || 99}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">Limited Time Offer • One-time Payment</p>
                </div>

                {/* Course Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">🎯 What You'll Get:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Complete exam pattern analysis',
                      'Subject-wise preparation strategy',
                      'Time management techniques',
                      'Important topics & weightage',
                      'Previous year questions analysis',
                      'Live Q&A with experts',
                      'Study material recommendations',
                      'Mock test strategy'
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-orange-400">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Session Details */}
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl p-6 mb-8 border border-orange-500/20">
                  <h4 className="text-lg font-bold text-white mb-3">📅 Session Details:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white font-semibold">23rd February</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Platform:</span>
                      <span className="text-white font-semibold">Google Meet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white font-semibold">Live Strategy Session</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 shadow-[0_0_20px_rgba(251,146,60,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
                >
                  Register Now →
                </button>

                <p className="text-center text-gray-400 text-sm mt-4">
                  🔴 Limited Seats Available • WhatsApp Community Access
                </p>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 to-red-500/15 blur-3xl rounded-3xl"></div>

              <div className="relative">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Complete Your Registration
                </h2>

                <form onSubmit={handleEnrollmentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      maxLength="10"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Enter your 10-digit mobile number"
                    />
                  </div>

                  <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/20">
                    <h4 className="text-lg font-bold text-white mb-3">📧 Important Information:</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• After successful payment, you'll receive an email within 5 minutes</li>
                      <li>• Email will contain WhatsApp community joining link</li>
                      <li>• Google Meet link will be shared in WhatsApp community</li>
                      <li>• Please check spam folder if email not received</li>
                      <li>• For payment issues: 2025eliteacademy@gmail.com</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 py-3 rounded-xl font-semibold text-gray-300 border border-gray-600 hover:border-gray-500 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className="flex-1 py-3 rounded-xl font-black text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {processing ? 'Processing...' : `Pay ₹${exciseInfo?.price || 99}`}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ExciseInspectorPurchase;
