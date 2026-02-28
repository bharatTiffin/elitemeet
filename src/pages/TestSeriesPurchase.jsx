
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { testSeriesAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

function TestSeriesPurchase() {
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

  const [testInfo, setTestInfo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('online');

  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    fatherName: '',
    password: '',
    confirmPassword: '',
    planType: 'online'
  });

  useEffect(() => {
    fetchTestSeriesData();
    window.scrollTo(0, 0);
  }, []);

  const fetchTestSeriesData = async () => {
    setLoading(true);
    try {
      const res = await testSeriesAPI.getInfo();
      setTestInfo(res.data.package || res.data);
    } catch (error) {
      setTestInfo({
        name: 'Punjab Govt Exam Test Series',
        price: 1800,
        description: 'Monthly subscription for all Punjab state-level exams. Daily subject-wise mocks, full-length tests, solutions, and real-time ranking.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setFormData((prev) => ({ ...prev, planType: plan }));
  };

  const handleOfflineCall = () => {
    window.location.href = 'tel:7696954686';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setProcessing(true);
    try {
      // Create order API call
      const orderRes = await testSeriesAPI.createOrder({ ...formData, user });
      // Razorpay integration
      const options = {
        key: orderRes.data.razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderRes.data.amount,
        currency: 'INR',
        name: 'Punjab Govt Exam Test Series',
        description: 'Monthly Test Series Subscription',
        order_id: orderRes.data.orderId,
        handler: function (response) {
          alert('Payment successful!');
          navigate('/user-dashboard');
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile
        },
        theme: {
          color: '#059669'
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Error creating order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-cyan-100 to-white">
      <span className="text-emerald-700 text-xl font-bold animate-pulse">Loading...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500/10 via-teal-400/10 to-cyan-400/10 py-10 px-2">
      <Helmet>
        <title>Punjab Govt Exam Test Series Purchase</title>
      </Helmet>
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-2xl rounded-3xl z-0"></div>
        <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl z-10">
          <div className="inline-block mb-4">
            <span className="text-sm text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-emerald-500/10 font-medium">
              📝 Daily Test Series
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            🎯 Master Punjab Exams with Daily Real-Time Testing
          </h2>
          <p className="text-base text-gray-300 mb-8 max-w-4xl leading-relaxed">
            Don't just study—test your knowledge every single day. Our comprehensive test series is designed specifically for <span className="text-white font-bold">Punjab Government Exams</span>, covering every subject with exam-level difficulty.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-emerald-400">📊</span> Test Features
              </h4>
              <ul className="space-y-3">
                {[
                  'Daily Subject-wise Mock Tests',
                  'Full-length Punjab Govt Exam mocks',
                  'Detailed solutions & performance analysis',
                  'Real-time ranking among competitors',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-emerald-400">✅</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">🎯</span> Exams Covered
              </h4>
              <div className="flex flex-wrap gap-2">
                {['PSSSB Clerk', 'Punjab Police', 'Patwari', 'Excise Inspector', 'VDO', 'Senior Assistant'].map((exam) => (
                  <span key={exam} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs font-semibold text-emerald-300">
                    {exam}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-400">All Punjab State level exams covered in one single subscription.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10 mb-8">
            <div>
              <div className="text-lg font-bold text-white">Daily Consistency • Weekly Progress • Final Selection</div>
              <p className="text-sm text-gray-400">The most relevant test series for PSSSB & Punjab Police.</p>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <span className="text-2xl font-bold text-emerald-300">₹{testInfo?.price || 1800}/month</span>
              <span className="text-xs text-gray-400">(All Punjab State Exams)</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Online Registration Card */}
            <div className={`flex-1 p-6 rounded-2xl border border-emerald-600/30 bg-gradient-to-br from-emerald-900/60 to-gray-900/60 shadow-lg transition-all duration-200 ${selectedPlan === 'online' ? 'ring-2 ring-emerald-400' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-emerald-400 text-xl">🌐</span>
                <span className="text-lg font-bold text-white">Online Registration</span>
              </div>
              <p className="text-sm text-gray-300 mb-4">Register and pay online to get instant access to the full test series platform. All tests, solutions, and analytics are available digitally.</p>
              <button
                className={`w-full px-6 py-3 rounded-xl font-bold border transition-all duration-200 ${selectedPlan === 'online' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white/10 text-emerald-300 border-emerald-600 hover:bg-emerald-600/20'}`}
                onClick={() => handlePlanSelect('online')}
              >
                {selectedPlan === 'online' ? 'Selected' : 'Choose Online Registration'}
              </button>
            </div>
            {/* Offline Registration Card */}
            <div className={`flex-1 p-6 rounded-2xl border border-cyan-600/30 bg-gradient-to-br from-cyan-900/60 to-gray-900/60 shadow-lg transition-all duration-200 ${selectedPlan === 'offline' ? 'ring-2 ring-cyan-400' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-cyan-400 text-xl">🏢</span>
                <span className="text-lg font-bold text-white">Offline Registration</span>
              </div>
              <p className="text-sm text-gray-300 mb-4">Prefer to register in person? Call us and complete your registration at our center. No online payment required for offline registration.</p>
              <button
                className={`w-full px-6 py-3 rounded-xl font-bold border transition-all duration-200 ${selectedPlan === 'offline' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-white/10 text-cyan-300 border-cyan-600 hover:bg-cyan-600/20'}`}
                onClick={() => { handlePlanSelect('offline'); handleOfflineCall(); }}
              >
                {selectedPlan === 'offline' ? 'Call Now' : 'Choose Offline Registration'}
              </button>
            </div>
          </div>
          {/* Only show the form if online is selected */}
          {selectedPlan === 'online' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-900/60 text-white placeholder:text-emerald-200" required />
                <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-900/60 text-white placeholder:text-emerald-200" required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-900/60 text-white placeholder:text-emerald-200" required />
                <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-900/60 text-white placeholder:text-emerald-200" required />
                <input type="password" name="password" placeholder="Set Password" value={formData.password} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-900/60 text-white placeholder:text-emerald-200" required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-900/60 text-white placeholder:text-emerald-200" required />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl font-black text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg transition-all duration-300 disabled:opacity-60" disabled={processing}>
                {processing ? 'Processing...' : 'Pay & Register Now'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestSeriesPurchase;
