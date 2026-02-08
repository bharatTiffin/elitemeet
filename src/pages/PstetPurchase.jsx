import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { pstetAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

function PstetPurchase() {
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
  const [pstetInfo, setPstetInfo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // Toggle between Sales Page and Form
  const [seatsFull] = useState(true); // Force seats to be full

  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: auth.currentUser?.email || '',
    mobile: '',
    fatherName: ''
  });

  useEffect(() => {
    fetchPstetData();
    window.scrollTo(0, 0);
  }, []);

  const fetchPstetData = async () => {
    try {
      console.log("fetchPstetData...")
      const response = await pstetAPI.getInfo();
      console.log("fetchPstetData: ",response.data);
      setPstetInfo(response.data.package);
    } catch (error) {
      console.error("API Error fetching PSTET info:", error.response?.data || error.message);
      setPstetInfo({
        name: '🎯 PSTET & CTET 1 Month Crash Course starting from 5th Feb',
        price: 2999,
        originalPrice: 5999,
        description: 'Complete syllabus coverage with live classes on Zoom till exam.',
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
      alert('Failed to load Razorpay.');
      setProcessing(false);
      return;
    }

    console.log("Creating PSTET enrollment...");
    // 2. ONE SINGLE CALL to the backend
    // This sends the form data AND gets the Razorpay Order back
    const response = await pstetAPI.enrollAndCreateOrder(formData); 
    const { order, razorpayKeyId } = response.data;

    const options = {
      key: razorpayKeyId,
      amount: order.amount,
      currency: order.currency,
      name: 'Elite Academy',
      description: pstetInfo?.name || 'PSTET & CTET 1 Month Crash Course',
      order_id: order.id,
      handler: async function (response) {
        try {
          console.log('Payment successful:', response);
          alert('🎉 Payment Successful! Please check your email for course details and WhatsApp community link. If any issue, email us at 2025eliteacademy@gmail.com or call 7696954686');
          navigate('/dashboard');
        } catch (error) {
          console.error('Payment verification error:', error);
          alert('Payment successful! Please check your email for course details.');
          navigate('/dashboard');
        }
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.mobile,
      },
      theme: {
        color: '#ec4899', // Pink theme for PSTET
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
    alert(error.response?.data?.message || 'Failed to process enrollment. Please try again.');
    setProcessing(false);
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mb-4"></div>
          <p className="text-gray-400 text-lg">Loading PSTET Course...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-white mb-4">Authentication Required</h1>
          <p className="text-gray-400 mb-6">Please login to enroll in PSTET & CTET course</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
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
        <title>PSTET & CTET 1 Month Crash Course | Elite Academy</title>
        <meta name="description" content="Join PSTET & CTET 1 Month Crash Course starting 5th Feb. Complete syllabus coverage with live classes on Zoom till exam." />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm text-pink-400 border border-pink-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-pink-500/10">
                🎯 PSTET & CTET Exam Preparation
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              1 Month Crash Course
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Complete syllabus coverage with live classes on Zoom till exam • 
              <span className="text-white font-semibold"> Expert guidance • Instant access</span>
            </p>
          </div>

          {!showForm ? (
            /* Sales Page */
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-2 border-white/10 hover:border-white/30 rounded-3xl p-8 transition-all duration-300 hover:scale-105">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-3xl rounded-3xl opacity-30"></div>
              
              <div className="relative">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {pstetInfo?.name}
                    </h2>
                    <p className="text-gray-300 text-lg mb-6">{pstetInfo?.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      ₹{pstetInfo?.price}
                    </div>
                    <div className="text-gray-500 line-through text-lg">₹{pstetInfo?.originalPrice}</div>
                    <div className="bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full text-sm font-bold mt-2 inline-block">
                      <span className="text-green-400">Save ₹{pstetInfo?.originalPrice - pstetInfo?.price}</span>
                    </div>
                  </div>
                </div>

                {/* Course Features */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-4 border border-pink-500/30">
                    <div className="flex items-center space-x-3">
                      <div className="bg-pink-500/20 p-3 rounded-lg">
                        <span className="text-2xl">📅</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Start Date</h3>
                        <p className="text-gray-300">5th February 2026</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-500/20 p-3 rounded-lg">
                        <span className="text-2xl">⏱️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Duration</h3>
                        <p className="text-gray-300">1 Month (Till Exam)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-4 border border-pink-500/30">
                    <div className="flex items-center space-x-3">
                      <div className="bg-pink-500/20 p-3 rounded-lg">
                        <span className="text-2xl">💻</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Mode</h3>
                        <p className="text-gray-300">Online via Zoom Meet</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-500/20 p-3 rounded-lg">
                        <span className="text-2xl">📚</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Syllabus</h3>
                        <p className="text-gray-300">Complete Syllabus with Exam</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Community */}
                {/* <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 mb-8">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-400 text-lg">Join WhatsApp Community</h3>
                      <p className="text-green-300">Get live class links, updates & study materials</p>
                    </div>
                  </div>
                  <a 
                    href="https://chat.whatsapp.com/HoRxQj00hItCfWgEQbnc7t"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105"
                  >
                    <span>Join WhatsApp Group</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div> */}

                {/* CTA Button - Seats Full */}
                <div className="text-center">
                  <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <span className="text-4xl">🚫</span>
                      <h3 className="text-2xl font-bold text-red-400">All Seats Full</h3>
                    </div>
                    <p className="text-red-300 text-lg mb-2">
                      Unfortunately, all seats for this course have been filled.
                    </p>
                    <p className="text-gray-400">
                      Please contact us at 2025eliteacademy@gmail.com or call 7696954686 for future batches.
                    </p>
                  </div>
                  <button
                    disabled
                    className="w-full py-4 rounded-xl font-bold text-lg bg-gray-700 text-gray-500 cursor-not-allowed opacity-50"
                  >
                    � Enrollment Closed - All Seats Full
                  </button>
                  <p className="text-gray-500 mt-4 text-sm">
                    Seats are currently full • Contact support for future batches
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-2 border-white/10 hover:border-white/30 rounded-3xl p-8 transition-all duration-300">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-3xl rounded-3xl opacity-30"></div>
              
              <div className="relative">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    Complete Your Enrollment
                  </h2>
                  <p className="text-gray-300">Fill in your details to proceed with payment</p>
                </div>

                <form onSubmit={handleEnrollmentSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">
                        Father's Name *
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="Enter your father's name"
                      />
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-6 border border-pink-500/30">
                    <h3 className="font-semibold text-white mb-4">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Course:</span>
                        <span className="font-medium text-gray-200">{pstetInfo?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Original Price:</span>
                        <span className="line-through text-gray-500">₹{pstetInfo?.originalPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Discount:</span>
                        <span className="text-green-400 font-medium">-₹{pstetInfo?.originalPrice - pstetInfo?.price}</span>
                      </div>
                      <div className="border-t border-gray-600 pt-2 mt-2">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-white">Total Amount:</span>
                          <span className="text-pink-400">₹{pstetInfo?.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Support Info */}
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-blue-300 text-sm">
                      <strong>Need Help?</strong> Email us at 2025eliteacademy@gmail.com or call 7696954686
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-gray-700 text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {processing ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </span>
                      ) : (
                        `Pay ₹${pstetInfo?.price}`
                      )}
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

export default PstetPurchase;