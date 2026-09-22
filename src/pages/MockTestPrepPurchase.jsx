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
        price: 999,
        originalPrice: 1999,
        description: "For students who've finished the syllabus and want to know exactly where they stand.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
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
                  <div className="flex items-baseline justify-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white">₹{prepInfo?.price}</span>
                    <span className="text-xl text-gray-400 line-through">₹{prepInfo?.originalPrice}</span>
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
                    🎯 Unlock Prep Mode — Pay ₹{prepInfo?.price} Now
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
                        <input required type="email" name="email" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-emerald-500 outline-none transition-all" placeholder="Enter your email" />
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
                        <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
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
                        {processing ? 'Processing…' : `Secure Checkout — Pay ₹${prepInfo?.price}`}
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
