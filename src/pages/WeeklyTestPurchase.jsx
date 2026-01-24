import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { weeklyTestAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

function WeeklyTestPurchase() {
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

  const [testInfo, setTestInfo] = useState({ online: null, offline: null });
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('online'); // 'online' or 'offline'

  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    fatherName: '',
    password: '',
    confirmPassword: '',
    planType: 'online' // will be updated based on selectedPlan
  });

  useEffect(() => {
    fetchBothTestData();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  const fetchBothTestData = async () => {
    setLoading(true);
    try {
      const [onlineRes, offlineRes] = await Promise.all([
        weeklyTestAPI.getInfo_Online(),
        weeklyTestAPI.getInfo_Offline()
      ]);
      setTestInfo({
        online: onlineRes.data.package || onlineRes.data,
        offline: offlineRes.data.package || offlineRes.data
      });
    } catch (error) {
      setTestInfo({
        online: {
          name: '📅 Weekly Mock Tests & Analysis',
          price: 799,
          originalPrice: 1999,
          validityMonths: 3,
          description: 'Stay exam-ready with weekly full-length mock tests, detailed performance analytics, and AI-powered insights.',
        },
        offline: {
          name: '📅 Weekly Mock Tests & Analysis',
          price: 999,
          originalPrice: 1999,
          validityMonths: 3,
          description: 'Stay exam-ready with weekly full-length mock tests, detailed performance analytics, and AI-powered insights.',
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setFormData({
      ...formData,
      planType: plan
    });
    // No need to setLoading here, prices are already fetched
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setProcessing(true);

    try {
      // 1. Load Razorpay Script first
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay.');
        setProcessing(false);
        return;
      }

      // 2. Send enrollment data with selected plan
      const enrollmentData = {
        ...formData,
        planType: selectedPlan
      };

      let response;
      if (selectedPlan === 'online') {
        response = await weeklyTestAPI.createEnrollmentWithUserOnline(enrollmentData);
      } else {
        response = await weeklyTestAPI.createEnrollmentWithUserOffline(enrollmentData);
      }
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: `Weekly Test Series - ${selectedPlan === 'online' ? 'Online' : 'Offline'} Mode`,
        order_id: order.id,
        handler: async function (razorpayResponse) {
          alert("Payment successful! 🎉 Use your email and password to login to the mobile app.");
          navigate('/dashboard');
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: { color: '#10b981' },
        modal: { ondismiss: () => setProcessing(false) }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Enrollment error:', error);
      alert(error.response?.data?.message || "Error during enrollment. Please contact support.");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Weekly Test Series - Elite Academy</title>
        <meta name="description" content="Join Elite Academy Weekly Test Series for Punjab Government Exams. Get weekly mock tests, detailed analytics, and performance tracking." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900">

        {/* Hero Section */}
        <div className="relative pt-20 pb-12 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent"></div>

          <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-8">
              <span className="inline-block text-sm text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-emerald-500/10 font-medium mb-4">
                📝 Weekly Test Series
              </span>
              <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {testInfo[selectedPlan]?.name || '📅 Weekly Mock Tests & Analysis'}
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {testInfo[selectedPlan]?.description || 'Stay exam-ready with weekly full-length mock tests, detailed performance analytics, and AI-powered insights.'}
              </p>
            </div>

            {/* Plan Selection Cards */}
            {!showForm && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Online Plan */}
                <div 
                  onClick={() => handlePlanSelection('online')}
                  className={`relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border-2 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 \${
                    selectedPlan === 'online' 
                      ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]' 
                      : 'border-white/10 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="absolute top-4 right-4">
                    <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'online' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-500'
                    }`}>
                      {selectedPlan === 'online' && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-4xl mb-2 block">💻</span>
                    <h3 className="text-2xl font-bold text-white mb-2">Online Mode</h3>
                    <p className="text-gray-400 text-sm">Tests available on mobile app</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-emerald-400">₹{testInfo.online?.price || 799}</span>
                      <span className="text-lg text-gray-500 line-through">₹{testInfo.online?.originalPrice || 1999}</span>
                    </div>
                    <p className="text-emerald-300 text-sm mt-2">Valid for {testInfo.online?.validityMonths || 3} months</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      'Weekly full-length mock tests',
                      'Instant results & solutions',
                      'All India rank tracking',
                      'Performance analytics',
                      'Topic-wise analysis',
                      'Mobile app access'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-emerald-400">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Offline Plan */}
                <div 
                  onClick={() => handlePlanSelection('offline')}
                  className={`relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border-2 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 \${
                    selectedPlan === 'offline' 
                      ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]' 
                      : 'border-white/10 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-3xl">
                    RECOMMENDED
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center \${
                      selectedPlan === 'offline' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-500'
                    }`}>
                      {selectedPlan === 'offline' && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 mt-6">
                    <span className="text-4xl mb-2 block">📄</span>
                    <h3 className="text-2xl font-bold text-white mb-2">Offline Mode</h3>
                    <p className="text-gray-400 text-sm">Printed test papers at center</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-emerald-400">₹{testInfo.offline?.price || 999}</span>
                      <span className="text-lg text-gray-500 line-through">₹{testInfo.offline?.originalPrice || 1999}</span>
                    </div>
                    <p className="text-emerald-300 text-sm mt-2">Valid for {testInfo.offline?.validityMonths || 3} months</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      'All Online Mode features',
                      'Printed test papers',
                      'Exam hall experience',
                      'Answer sheet evaluation',
                      'Detailed marking analysis',
                      'Center-based testing'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-emerald-400">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Continue Button */}
            {!showForm && (
              <div className="text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="px-10 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
                >
                  Continue with {selectedPlan === 'online' ? `Online (₹${testInfo.online?.price || 799})` : `Offline (₹${testInfo.offline?.price || 999})`} Mode →
                </button>
              </div>
            )}

            {/* Registration Form */}
            {showForm && (
              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="mb-6">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Change Plan
                  </button>
                </div>

                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-bold">
                        {selectedPlan === 'online' ? 'Online Mode' : 'Offline Mode'}
                      </h4>
                      <p className="text-emerald-300 text-sm">Valid for {testInfo[selectedPlan]?.validityMonths || 3} months</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-emerald-400">
                        ₹{selectedPlan === 'online' ? (testInfo.online?.price || 799) : (testInfo.offline?.price || 999)}
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">Complete Your Enrollment</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Fill in your details. This account will be used to login to our Mobile App.
                </p>

                <form onSubmit={handleEnrollmentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Father's Name *</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="Enter father's name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="10-digit mobile number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Create Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength="6"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="Min 6 characters"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      minLength="6"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="Re-enter password"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processing ? 'Processing...' : `Pay ₹${selectedPlan === 'online' ? (testInfo.online?.price || 799) : (testInfo.offline?.price || 999)} & Enroll Now`}
                    </button>
                  </div>
                </form>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <span>📧</span> After Payment
                  </h4>
                  <p className="text-blue-200 text-sm">
                    Details will be sent to your email within 5 minutes after successful payment. 
                    Please check your inbox and spam folder.
                  </p>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-gray-400 text-sm">
                    Need help? Email <a href="mailto:2025eliteacademy@gmail.com" className="text-emerald-400 hover:underline">2025eliteacademy@gmail.com</a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        {!showForm && (
          <div className="max-w-6xl mx-auto px-4 pb-16">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '📊',
                  title: 'Detailed Analytics',
                  description: 'Track your performance with topic-wise accuracy and speed analysis'
                },
                {
                  icon: '🏆',
                  title: 'All India Ranking',
                  description: 'Compare your performance with thousands of students nationwide'
                },
                {
                  icon: '📱',
                  title: 'Mobile App Access',
                  description: 'Take tests anytime, anywhere with our powerful mobile application'
                }
              ].map((feature, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default WeeklyTestPurchase;