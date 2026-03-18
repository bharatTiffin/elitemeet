import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { sectionalTestAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

function SectionalTestSeriesPurchase() {
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
        sectionalTestAPI.getInfo_Online(),
        sectionalTestAPI.getInfo_Offline()
      ]);
      setTestInfo({
        online: onlineRes.data.package || onlineRes.data,
        offline: offlineRes.data.package || offlineRes.data
      });
    } catch (error) {
      console.error('Error fetching test info:', error);
      setTestInfo({
        online: {
          name: '📝 Sectional Test Series - Online Mode',
          price: 3000,
          originalPrice: 5000,
          description: 'Monday-Thursday: Sectional Tests | Friday: Full Mock Test. Complete coverage of all Punjab Government Exams.',
        },
        offline: {
          name: '📝 Sectional Test Series - Offline Mode',
          price: 3000,
          originalPrice: 5000,
          description: 'Monday-Thursday: Sectional Tests | Friday: Full Mock Test. Visit our institute to give tests.',
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
        response = await sectionalTestAPI.createEnrollmentWithUserOnline(enrollmentData);
      } else {
        response = await sectionalTestAPI.createEnrollmentWithUserOffline(enrollmentData);
      }
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: `Sectional Test Series - ${selectedPlan === 'online' ? 'Online' : 'Offline'} Mode`,
        order_id: order.id,
        handler: async function (razorpayResponse) {
          alert("Payment successful! 🎉 Use your email and password to login to the mobile app. Check your email for confirmation.");
          navigate('/dashboard');
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: { color: '#f97316' },
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900/20 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Sectional Test Series - Elite Academy</title>
        <meta name="description" content="Join Elite Academy Sectional Test Series for Punjab Government Exams. Monday-Thursday: Sectional Tests | Friday: Full Mock Tests. Available in Online & Offline modes." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900/20 to-gray-900">

        {/* Hero Section */}
        <div className="relative pt-20 pb-12 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent"></div>

          <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-8">
              <span className="inline-block text-sm text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-orange-500/10 font-medium mb-4">
                📝 Sectional Test Series
              </span>
              <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Complete Sectional Test Series for Punjab Government Exams
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
                Monday-Thursday: Sectional Tests | Friday: Full Mock Test. Complete coverage of all Punjab Government Exams.
              </p>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-full px-6 py-2">
                <span className="text-orange-400">📅</span>
                <span className="text-white font-bold">3 Months Duration</span>
                <span className="text-gray-400">•</span>
                <span className="text-orange-300 font-semibold">Starting from 7th March 2026</span>
              </div>
            </div>

            {/* Plan Selection Cards */}
            {!showForm && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Online Plan */}
                <div 
                  onClick={() => handlePlanSelection('online')}
                  className={`relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border-2 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedPlan === 'online' 
                      ? 'border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.4)]' 
                      : 'border-white/10 hover:border-orange-500/50'
                  }`}
                >
                  <div className="absolute top-4 right-4">
                    <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'online' ? 'border-orange-500 bg-orange-500' : 'border-gray-500'
                    }`}>
                      {selectedPlan === 'online' && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-4xl mb-2 block">📱</span>
                    <h3 className="text-2xl font-bold text-white mb-2">Online Mode</h3>
                    <p className="text-gray-400 text-sm">Tests available on mobile app</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-orange-400">₹{testInfo.online?.price || 3000}</span>
                      <span className="text-lg text-gray-500 line-through">₹{testInfo.online?.originalPrice || 5000}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      'Mon-Thu: Sectional Tests',
                      'Friday: Full Mock Tests',
                      'Instant results & solutions',
                      'All India rank tracking',
                      'Performance analytics',
                      'Mobile app access'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-orange-400">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Offline Plan */}
                <div 
                  className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border-2 rounded-3xl p-8 border-white/10"
                >
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-3xl">
                    CALL TO REGISTER
                  </div>

                  <div className="mb-4 mt-4">
                    <span className="text-4xl mb-2 block">🏢</span>
                    <h3 className="text-2xl font-bold text-white mb-2">Offline Mode</h3>
                    <p className="text-gray-400 text-sm">Give tests at our institute</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      'Mon-Thu: Sectional Tests',
                      'Friday: Full Mock Tests',
                      'Institute-based testing',
                      'Real exam hall experience',
                      'Instant evaluation & feedback',
                      'Performance analytics'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-green-400">✓</span> {item}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <a 
                      href="tel:7696954686"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                    >
                      <span>📞</span> Call Now: 7696954686
                    </a>
                    <a 
                      href="https://wa.me/917696954686?text=Hi%2C%20I%20want%20to%20register%20for%20Offline%20Sectional%20Test%20Series"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-colors"
                    >
                      <span>💬</span> WhatsApp Us
                    </a>
                  </div>

                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <p className="text-blue-200 text-xs">
                      <strong>📍 Institute:</strong> Elite Academy, SCO-144 Sector 24D Chandigarh<br />
                      <strong>⏰ Timing:</strong> Monday to Saturday, 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Continue Button - Only for Online */}
            {!showForm && (
              <>
                <div className="text-center mb-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-10 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
                  >
                    Enroll for Online Mode (₹{testInfo.online?.price || 3000}) →
                  </button>
                </div>
              </>
            )}

            {/* Registration Form */}
            {showForm && (
              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="mb-6">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Change Plan
                  </button>
                </div>

                <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-bold">Online Mode - Sectional Test Series</h4>
                      <p className="text-orange-300 text-sm">3 Months • Starting 7th March 2026</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-orange-400">
                        ₹{testInfo.online?.price || 3000}
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Re-enter password"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processing ? 'Processing...' : `Pay ₹${testInfo.online?.price || 3000} & Enroll Now`}
                    </button>
                  </div>
                </form>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <span>📧</span> After Payment
                  </h4>
                  <p className="text-blue-200 text-sm">
                    Confirmation email will be sent within 5 minutes after successful payment. 
                    Please check your inbox and spam folder. If you don't receive it, contact us immediately at 7696954686.
                  </p>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-gray-400 text-sm">
                    Need help? Call/WhatsApp <a href="tel:7696954686" className="text-orange-400 hover:underline">7696954686</a> or Email <a href="mailto:2025eliteacademy@gmail.com" className="text-orange-400 hover:underline">2025eliteacademy@gmail.com</a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        {!showForm && (
          <div className="max-w-6xl mx-auto px-4 pb-16">
            <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Why Choose Our Sectional Test Series?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '📊',
                  title: 'Comprehensive Coverage',
                  description: 'All subjects covered with sectional tests Monday-Thursday and full mocks on Friday'
                },
                {
                  icon: '🏆',
                  title: 'All India Ranking',
                  description: 'Compare your performance with thousands of students preparing for Punjab exams'
                },
                {
                  icon: '📱',
                  title: 'Flexible Modes',
                  description: 'Choose between online (app-based) or offline (institute-based) testing modes'
                }
              ].map((feature, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300">
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

export default SectionalTestSeriesPurchase;
