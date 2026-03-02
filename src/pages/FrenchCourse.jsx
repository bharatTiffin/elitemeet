import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { frenchCourseAPI } from '../services/api';

const COUNTRIES = [
  'India', 'Canada', 'France', 'USA', 'UK', 'Australia', 'Other'
];

const PLANS = [
  { 
    value: '1month', 
    label: '1 Month', 
    price: 200, 
    period: 'Basic to Intermediate',
    color: 'from-emerald-400 to-teal-500',
    border: 'emerald-400',
    focus: 'focus:border-emerald-400/70',
    savings: null
  },
  { 
    value: '3month', 
    label: '3 Months', 
    price: 500, 
    period: 'Basic to Advanced - PR Ready',
    color: 'from-amber-400 to-orange-500', 
    border: 'amber-400',
    focus: 'focus:border-amber-400/70',
    savings: '$100'
  }
];

export default function FrenchCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    plan: '3month',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [courseInfo, setCourseInfo] = useState({ price1Month: 200, price3Month: 500, currency: 'USD' });

  useEffect(() => {
    frenchCourseAPI.getInfo().then((res) => {
      if (res.data) {
        setCourseInfo({
          price1Month: res.data.price1Month || 200,
          price3Month: res.data.price3Month || 500,
          currency: res.data.currency || 'USD'
        });
      }
    }).catch(() => {
      setCourseInfo({ price1Month: 200, price3Month: 500, currency: 'USD' });
    });
  }, []);

  const selectedPlan = PLANS.find(p => p.value === formData.plan) || PLANS[1];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setError('Could not load payment. Please try again.');
        setSubmitting(false);
        return;
      }

      const { data } = await frenchCourseAPI.createOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        plan: formData.plan,
      });

      const { order, razorpayKeyId } = data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Elite Academy',
        description: `French Course - ${selectedPlan.label}`,
        order_id: order.id,
        handler: function () {
          setSubmitting(false);
          setSuccess(true);
        },
        prefill: { 
          name: formData.name, 
          email: formData.email, 
          contact: formData.phone 
        },
        theme: { 
          color: formData.plan === '1month' ? '#10b981' : '#f59e0b' 
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-x-hidden">
      {/* Animated BG */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className={`max-w-2xl w-full mx-auto mt-16 mb-8 p-8 rounded-3xl border-2 shadow-xl bg-white/5 backdrop-blur-xl transition-all duration-300 ${formData.plan === '1month' ? 'border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.1)]'}`}>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h1 className={`text-3xl sm:text-4xl font-extrabold text-center mb-2 bg-gradient-to-r ${selectedPlan.color} bg-clip-text text-transparent`}>
          🇫🇷 Learn French Language
        </h1>
        <p className="text-center text-gray-400 mb-8">Master French & Accelerate Your PR Journey</p>

        {/* Course Features */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-sm font-semibold text-blue-300">3 Month Program</div>
            <div className="text-xs text-gray-400">Basic to Advanced</div>
          </div>
          <div className="bg-indigo-500/10 border border-indigo-400/20 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🎓</div>
            <div className="text-sm font-semibold text-indigo-300">Expert Teachers</div>
            <div className="text-xs text-gray-400">Native & Indian</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-400/20 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">📺</div>
            <div className="text-sm font-semibold text-purple-300">Live + Recorded</div>
            <div className="text-xs text-gray-400">Full Access</div>
          </div>
          <div className="bg-pink-500/10 border border-pink-400/20 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">⏰</div>
            <div className="text-sm font-semibold text-pink-300">Mon-Fri | 7PM IST</div>
            <div className="text-xs text-gray-400">Daily Classes</div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1 text-white">Full Name *</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="Your Name" 
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${selectedPlan.focus}`} 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-white">Email *</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                type="email" 
                placeholder="you@email.com" 
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${selectedPlan.focus}`} 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-white">Phone Number *</label>
              <input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
                placeholder="e.g. +1 (416) 555-0123" 
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${selectedPlan.focus}`} 
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold mb-1 text-white">Country *</label>
              <select 
                name="country" 
                value={formData.country} 
                onChange={handleChange} 
                required 
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all appearance-none pr-10 ${selectedPlan.focus}`}
              >
                <option value="" className="bg-black">Select Country</option>
                {COUNTRIES.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
              </select>
              <span className="pointer-events-none absolute right-3 top-9 transform -translate-y-1/2">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </div>

          {/* Plan Selection */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-white">Select Your Plan *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PLANS.map((plan) => {
                const isSelected = formData.plan === plan.value;
                const currentPrice = plan.value === '1month' ? courseInfo.price1Month : courseInfo.price3Month;
                return (
                  <label 
                    key={plan.value} 
                    className={`cursor-pointer relative rounded-2xl border-2 p-5 transition-all duration-300 ${
                      isSelected 
                        ? `border-transparent bg-gradient-to-r ${plan.color} text-black shadow-lg` 
                        : 'border-white/10 bg-white/5 hover:border-white/20 text-white'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="plan" 
                      value={plan.value} 
                      checked={isSelected} 
                      onChange={handleChange} 
                      className="hidden" 
                    />
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-lg">{plan.label}</span>
                        {plan.savings && (
                          <span className="text-xs font-bold bg-black/20 px-2 py-1 rounded-full">
                            Save {plan.savings}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm mb-3 ${isSelected ? 'text-black/70' : 'text-gray-400'}`}>
                        {plan.period}
                      </p>
                      <div className="mt-auto">
                        <span className="text-2xl font-black">
                          {courseInfo.currency === 'USD' ? '$' : '₹'}{currentPrice}
                        </span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="text-center mt-6">
            <div className="mb-2 text-lg font-bold text-white">
              Pay: <span className={formData.plan === '1month' ? 'text-emerald-400' : 'text-amber-400'}>
                {courseInfo.currency === 'USD' ? '$' : '₹'}{formData.plan === '1month' ? courseInfo.price1Month : courseInfo.price3Month}
              </span>
              <span className="text-sm text-gray-400 font-normal"> {formData.plan === '1month' ? '/month' : ' one-time'}</span>
            </div>
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-gray-300">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="#0f9d58"/>
                <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> 
              Secured by Razorpay
            </div>
            
            <button 
              type="submit" 
              disabled={submitting} 
              className={`w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r ${selectedPlan.color} shadow-lg hover:opacity-90 transition-all duration-300 ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {submitting ? 'Processing...' : `Pay ${courseInfo.currency === 'USD' ? '$' : '₹'}${formData.plan === '1month' ? courseInfo.price1Month : courseInfo.price3Month} & Enroll`}
            </button>
            
            {error && <div className="mt-3 text-red-400 font-semibold bg-red-500/10 p-3 rounded-lg">{error}</div>}
            {success && (
              <div className="mt-3 text-emerald-400 font-semibold bg-emerald-500/10 p-3 rounded-lg">
                ✅ Enrollment successful! Check your email for course access details and class schedule.
              </div>
            )}
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-4 border-t border-white/10">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Certificate</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
