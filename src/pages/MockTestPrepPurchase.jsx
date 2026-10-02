import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTestAPI } from '../services/api';
import PageSeo from '../components/PageSeo';

function MockTestPrepPurchase() {
  const navigate = useNavigate();
  const [prepInfo, setPrepInfo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  // status: idle | checking | eligible | regular | owned | error
  const [discount, setDiscount] = useState({ status: 'idle', email: '' });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    fatherName: '',
    agreedToTerms: false,
  });

  useEffect(() => {
    fetchPrepInfo();
    window.scrollTo(0, 0);
  }, []);

  const fetchPrepInfo = async () => {
    try {
      const response = await mockTestAPI.getInfo();
      setPrepInfo(response.data.package);
    } catch (error) {
      setPrepInfo({
        name: '🎯 Prep Mode — Mock Test & Weak Topic Tracker',
        price: 2999,
        originalPrice: 2999,
        description: "For students who've finished the syllabus and want to know exactly where they stand.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    // Editing the email after a check invalidates the discount result
    if (name === 'email' && discount.status !== 'idle' && value.trim().toLowerCase() !== discount.email) {
      setDiscount({ status: 'idle', email: '' });
    }
  };

  const handleCheckDiscount = async () => {
    const email = formData.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setDiscount({ status: 'error', email: '', message: 'Please enter a valid email address.' });
      return;
    }
    setDiscount({ status: 'checking', email });
    try {
      const { data } = await mockTestAPI.checkDiscount(email);
      if (data.alreadyHasAccess) {
        setDiscount({ status: 'owned', email });
      } else if (data.eligible) {
        setDiscount({ status: 'eligible', email, price: data.price, discountPercent: data.discountPercent });
      } else {
        setDiscount({ status: 'regular', email });
      }
    } catch (error) {
      setDiscount({
        status: 'error',
        email: '',
        message: error.response?.data?.message || 'Could not check right now. Please try again.',
      });
    }
  };

  const discounted = discount.status === 'eligible';
  const REGULAR_STRIKE_PRICE = (prepInfo?.price || 0) + 1000; // display-only anchor: backend regular price + ₹1000, shown cut off
  const payPrice = discounted ? discount.price : prepInfo?.price;

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

    if (!formData.agreedToTerms) {
      alert('Please agree to the terms and conditions to continue.');
      return;
    }

    setProcessing(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay.');
        setProcessing(false);
        return;
      }

      const response = await mockTestAPI.createEnrollmentWithUser(formData);
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: 'Prep Mode — Mock Test & Weak Topic Tracker',
        order_id: order.id,
        handler: async function () {
          alert('Payment successful! 🎯 Check your email for app login details.');
          navigate('/');
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: { color: '#059669' },
        modal: { ondismiss: () => setProcessing(false) },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        console.error('Razorpay payment failed:', response);
        alert('Payment failed. Please try again.');
        setProcessing(false);
      });
      try {
        paymentObject.open();
      } catch (err) {
        console.error('Error opening Razorpay checkout:', err);
        alert('Could not open payment window. Please check console for details.');
        setProcessing(false);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      alert(error.response?.data?.message || 'Error during enrollment.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <>
      <PageSeo path="/mock-test-prep" />

      <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 blur-3xl -z-10"></div>

            {!showForm ? (
              <div className="relative animate-in fade-in duration-500">
                <div className="text-center mb-10">
                  <span className="inline-block text-sm text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full bg-emerald-500/10 font-medium mb-4">
                    🎯 Not for beginners — for students ready to test themselves
                  </span>
                  <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                    Prep Mode — Mock Test &amp; Weak Topic Tracker
                  </h1>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                    Already finished the syllabus but your score isn't moving? Prep Mode is built for you — not
                    someone starting from scratch. Take a Mock Test, see exactly which topics are pulling your
                    score down, and drill them with 100+ practice questions each. Your next Mock Test only unlocks
                    once you've actually closed those gaps — so every round, your marks go up, not sideways.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className="text-emerald-400">🧭</span> How It Works
                    </h4>
                    <ul className="space-y-4">
                      {[
                        'Take a full Mock Test inside the app',
                        'Instantly see your weak topics, subject by subject',
                        '100+ practice questions per weak topic to drill',
                        'Next Mock Test unlocks only after you clear the last one\'s weak topics',
                        'Stay consistent and your score climbs, round after round',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="text-emerald-400 mt-1">⚡</span>
                          <span className="text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 rounded-3xl p-8 border border-emerald-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase">
                      Who it's for
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-3">🎓 Already Done with the Syllabus?</h4>
                    <p className="text-emerald-300 text-sm font-bold mb-6 italic">This is your next step.</p>
                    <ul className="space-y-4">
                      {[
                        'You\'ve covered the syllabus at least once',
                        'You want to know exactly where you stand',
                        'You want a plan, not just more random tests',
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-200">
                          <span className="text-green-400">●</span>
                          <span className="text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-2 border-emerald-500/50 rounded-3xl p-8 text-center max-w-xl mx-auto">
                  {!discounted && (
                    <p className="text-sm font-bold text-emerald-300 mb-3">
                      🎉 Launch offer: save ₹{REGULAR_STRIKE_PRICE - payPrice}+ on the regular price!
                    </p>
                  )}
                  <div className="flex items-baseline justify-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white">₹{payPrice}</span>
                    {(discounted ? prepInfo?.price : REGULAR_STRIKE_PRICE) > payPrice && (
                      <span className="text-xl text-gray-400 line-through">
                        ₹{discounted ? prepInfo?.price : REGULAR_STRIKE_PRICE}
                      </span>
                    )}
                    {discounted && (
                      <span className="text-sm font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-1 rounded-full">
                        {Math.round(discount.discountPercent)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Existing-student discount */}
                  <div className="bg-black/30 border border-emerald-500/30 rounded-2xl p-4 mb-6 text-left">
                    <p className="text-sm font-bold text-emerald-300 mb-1">
                      🎓 Already an Elite Academy student?
                    </p>
                    <p className="text-xs text-gray-300 mb-3">
                      Enter the email you enrolled with to unlock the special discounted price on Prep Mode.{' '}
                      <span className="font-bold text-white">🔥 Limited offer: discounted price for the first 10 students only!</span>{' '}
                      {/* <span className="font-bold text-white">₹{prepInfo?.enrolledPrice}</span> instead of ₹{prepInfo?.price}. */}
                      New here? Skip this and continue at the regular price.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === 'Enter' && handleCheckDiscount()}
                        placeholder="Your enrolled email"
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleCheckDiscount}
                        disabled={discount.status === 'checking'}
                        className="px-5 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition-all"
                      >
                        {discount.status === 'checking' ? 'Checking…' : 'Check Discount'}
                      </button>
                    </div>
                    {discount.status === 'eligible' && (
                      <p className="mt-3 text-sm text-emerald-300">
                        ✅ Student found! Discount applied — you pay only ₹{discount.price}.
                      </p>
                    )}
                    {discount.status === 'regular' && (
                      <p className="mt-3 text-sm text-gray-300">
                        No enrollment found for this email, so the regular price of ₹{prepInfo?.price} applies. Double-check the email if you are an enrolled student.
                      </p>
                    )}
                    {discount.status === 'owned' && (
                      <p className="mt-3 text-sm text-amber-300">
                        ⚠️ You already have Prep Mode access with this email. Check your inbox for the login details.
                      </p>
                    )}
                    {discount.status === 'error' && (
                      <p className="mt-3 text-sm text-red-400">{discount.message}</p>
                    )}
                  </div>
                  <ul className="text-sm text-gray-300 mb-6 space-y-2 text-left">
                    <li>✅ Unlocked instantly inside the Elite Academy app</li>
                    <li>✅ Login details sent by email right after payment</li>
                    <li>✅ Secure payment with Razorpay</li>
                  </ul>
                  <button
                    onClick={() => {
                      setShowForm(true);
                      window.scrollTo(0, 0);
                    }}
                    className="w-full py-4 rounded-xl font-black text-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-xl transition-all transform hover:-translate-y-1 text-white"
                  >
                    🎯 Unlock Prep Mode — Pay ₹{payPrice} Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative animate-in slide-in-from-right duration-500">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-emerald-400 mb-8 flex items-center gap-2 hover:text-emerald-300 transition-colors"
                >
                  ← Back
                </button>

                <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl font-black mb-2">Final Step: Unlock Prep Mode</h2>
                  <p className="text-gray-400 mb-10">
                    Fill in your details. This is the account you'll use to log in to the Elite Academy mobile app.
                  </p>

                  <form onSubmit={handleEnrollmentSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                        <input required name="fullName" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-emerald-500 outline-none transition-all" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Father's Name</label>
                        <input required name="fatherName" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-emerald-500 outline-none transition-all" placeholder="Father's name" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={() => formData.email && discount.status === 'idle' && handleCheckDiscount()} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-emerald-500 outline-none transition-all" placeholder="Enter your email" />
                        {discounted && (
                          <p className="text-xs text-emerald-300">✅ Student discount applied — you pay ₹{discount.price}</p>
                        )}
                        {discount.status === 'owned' && (
                          <p className="text-xs text-amber-300">⚠️ This email already has Prep Mode access.</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mobile Number</label>
                        <input required name="mobile" type="tel" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-emerald-500 outline-none transition-all" placeholder="10-digit number" />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer">
                      <input
                        required
                        type="checkbox"
                        name="agreedToTerms"
                        checked={formData.agreedToTerms}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-emerald-500"
                      />
                      <span>
                        I agree to Elite Academy's{' '}
                        <a href="https://www.eliteacademy.pro/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                          Terms &amp; Conditions
                        </a>
                        .
                      </span>
                    </label>

                    <div className="pt-8 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-xl transition-all active:scale-95 disabled:opacity-50"
                      >
                        {processing ? 'Processing…' : `Secure Checkout — Pay ₹${payPrice}`}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-6"></div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                  <p className="text-sm text-emerald-300 mb-2">📧 After Payment</p>
                  <p className="text-xs text-gray-300">
                    Your app login details will be sent to your email within 5 minutes after successful payment.
                    Please check your inbox and spam folder. Didn't get it after 5 minutes?{' '}
                    <a href="tel:7696954686" className="text-emerald-300 font-bold hover:underline">
                      Call us immediately at 7696954686
                    </a>
                    .
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              Need help? Email{' '}
              <a href="mailto:2025eliteacademy@gmail.com" className="text-emerald-400 hover:underline">
                2025eliteacademy@gmail.com
              </a>{' '}
              or call{' '}
              <a href="tel:7696954686" className="text-emerald-400 hover:underline">
                7696954686
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MockTestPrepPurchase;
