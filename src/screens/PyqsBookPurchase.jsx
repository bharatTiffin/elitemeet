import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pyqsAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

function PyqsBookPurchase() {
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    fatherName: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchPyqsData();
    window.scrollTo(0, 0);
  }, []);

  const fetchPyqsData = async () => {
    try {
      const response = await pyqsAPI.getInfo();
      setInfo(response.data.package || response.data);
    } catch (error) {
      setInfo({
        name: '📘 PYQs Book - Subjectwise & Topicwise + Excise Inspector Mock Test',
        price: 299,
        originalPrice: 599,
        description: 'Previous years question papers, subjectwise & topicwise — 20k+ Qs across all Punjabi exam subjects for complete exam preparation.',
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
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
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

      const response = await pyqsAPI.createOrder(formData);
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: 'PYQs Book Purchase',
        order_id: order.id,
        handler: async function (razorpayResponse) {
          alert("Payment successful! 🎉");
          navigate('/dashboard');
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: { color: '#4f46e5' },
        modal: { ondismiss: () => setProcessing(false) }
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
      alert(error.response?.data?.message || "Error during enrollment. Please contact support.");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>PYQs E-Book - Elite Academy</title>
      </Helmet>

      <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-3xl -z-10"></div>

            {!showForm ? (
              /* --- FULL SALES DETAILS VIEW --- */
              <div className="relative animate-in fade-in duration-500">
                <div className="text-center mb-10">
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <span className="inline-block text-sm text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full bg-emerald-500/10 font-bold">
                      📱 DIGITAL E-BOOK
                    </span>
                    <span className="inline-block text-sm text-teal-400 border border-teal-500/30 px-4 py-1.5 rounded-full bg-teal-500/10 font-bold">
                      🖨️ PRINTABLE
                    </span>
                    <span className="inline-block text-sm text-cyan-400 border border-cyan-500/30 px-4 py-1.5 rounded-full bg-cyan-500/10 font-bold">
                      ⚡ INSTANT ACCESS
                    </span>
                  </div>
                  <h1 className="text-xl md:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent leading-tight">
                    {info?.name || '📘 PYQs Book - Subjectwise & Topicwise + Excise Inspector Mock Test'}
                  </h1>
                  <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    {info?.description}
                  </p>
                  <div className="mt-8 max-w-4xl mx-auto rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 text-left">
                    <p className="text-cyan-300 font-black uppercase tracking-widest text-xs mb-2">Included on our app</p>
                    <p className="text-white text-lg font-bold leading-relaxed">
                      You will also get <span className="text-cyan-300">Excise Inspector Mock Test</span> access on our app after purchase.
                    </p>
                    <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                      This includes <strong>5 mock tests</strong>, <strong>100 questions in each test</strong>, and <strong>500 questions in total</strong> for focused practice.
                    </p>
                  </div>
                </div>

                {/* Access Info Banner */}
                <div className="bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 border border-emerald-500/30 rounded-2xl p-6 mb-12">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">💻</span>
                      <div>
                        <p className="font-bold text-white">Website Access</p>
                        <p className="text-sm text-gray-400">Read on any device</p>
                      </div>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-white/20"></div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🖨️</span>
                      <div>
                        <p className="font-bold text-white">Print Friendly</p>
                        <p className="text-sm text-gray-400">Download & print chapters</p>
                      </div>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-white/20"></div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">📱</span>
                      <div>
                        <p className="font-bold text-white">App Access Included</p>
                        <p className="text-sm text-gray-400">Excise Inspector Mock Test on the app</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subjects Grid */}
                <div className="mb-12">
                  <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-6 text-center">📚 Complete Subject Coverage • Topic-Wise Organized</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Maths', icon: '🔢', color: 'from-blue-500/20 to-cyan-500/20' },
                      { name: 'Reasoning', icon: '🧠', color: 'from-purple-500/20 to-indigo-500/20' },
                      { name: 'Punjab Grammar', icon: '📘', color: 'from-orange-500/20 to-yellow-500/20' },
                      { name: 'Punjabi GK', icon: '🗺️', color: 'from-green-500/20 to-emerald-500/20' },
                      { name: 'English', icon: '🇬🇧', color: 'from-red-500/20 to-pink-500/20' },
                      { name: 'Computer', icon: '💻', color: 'from-blue-500/20 to-indigo-500/20' },
                      { name: 'Current Affairs', icon: '📰', color: 'from-rose-500/20 to-red-500/20' },
                      { name: 'History', icon: '📜', color: 'from-amber-500/20 to-orange-500/20' },
                    ].map((subject) => (
                      <div key={subject.name} className={`bg-gradient-to-br ${subject.color} border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105`}>
                        <span className="text-3xl">{subject.icon}</span>
                        <span className="text-xs font-bold text-white text-center">{subject.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                    <h4 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                      <span className="text-emerald-400 text-2xl">📚</span> What's Inside This E-Book
                    </h4>
                    <ul className="space-y-4">
                      {[
                        '20,000+ Previous Year Questions with Solutions',
                        'Subject-wise & Topic-wise Organized Content',
                        'Detailed Explanations for Every Answer',
                        'Print-Ready Format — Download & Study Offline',
                        '1 Year Access — Study at Your Own Pace'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="text-emerald-400 mt-1 text-lg">✓</span>
                          <span className="text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-3xl p-8 border border-emerald-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-black text-xs font-black px-4 py-1.5 rounded-bl-xl uppercase">App Access</div>
                    <h4 className="text-xl font-black text-white mb-2 flex items-center gap-3">🎯 Excise Inspector Mock Test</h4>
                    <p className="text-emerald-300 text-sm font-black mb-6 italic">5 mock tests • 100 questions each • 500 questions total</p>
                    <ul className="space-y-4">
                      {['Direct access on our app after purchase', 'Use the same email used for payment', 'Start practicing from the Courses section'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-200">
                          <span className="text-green-400">●</span>
                          <span className="text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm text-gray-300 leading-relaxed">
                        After login, you will see <strong>Excise Inspector Mock test</strong> marked as <strong>Accessed</strong> in the app.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pricing Options */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {/* ONLINE PAYMENT */}
                  <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/50 rounded-3xl p-8 text-center hover:border-emerald-400 transition-all">
                    <div className="inline-block bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-black mb-4">💳 ONLINE PURCHASE</div>
                    <h3 className="text-2xl font-black text-white mb-4">Buy E-Book Now</h3>
                    <div className="flex items-baseline justify-center gap-4 mb-6">
                      <span className="text-5xl font-black text-white">₹{info?.price}</span>
                      <span className="text-xl text-gray-400 line-through">₹{info?.price+201}</span>
                    </div>
                    <ul className="text-sm text-gray-300 mb-6 space-y-2 text-left">
                      <li>✅ Instant E-book access on website</li>
                      <li>✅ Excise Inspector Mock Test on app</li>
                      <li>✅ Download & print any chapter</li>
                      <li>✅ Digital receipt via email</li>
                      <li>✅ Secure Razorpay payment</li>
                    </ul>
                    <button
                      onClick={() => {
                        setShowForm(true);
                        window.scrollTo(0, 0);
                      }}
                      className="w-full py-4 rounded-xl font-black text-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl transition-all transform hover:-translate-y-1 text-white"
                    >
                      💳 Get E-Book for ₹{info?.price}
                    </button>
                  </div>

                  {/* OFFLINE OPTION */}
                  <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border-2 border-teal-500/50 rounded-3xl p-8 text-center hover:border-teal-400 transition-all">
                    <div className="inline-block bg-teal-600 text-white px-4 py-1.5 rounded-full text-sm font-black mb-4">📞 OFFLINE PURCHASE</div>
                    <h3 className="text-2xl font-black text-white mb-4">Call & Order</h3>
                    <div className="flex items-baseline justify-center gap-4 mb-6">
                      <span className="text-xl text-gray-400">Same Price • Personal Help</span>
                    </div>
                    <ul className="text-sm text-gray-300 mb-6 space-y-2 text-left">
                      <li>✅ Personal assistance for purchase</li>
                      <li>✅ Phone support in local language</li>
                      <li>✅ Bank transfer / UPI accepted</li>
                      <li>✅ Manual account setup help</li>
                    </ul>
                    <a
                      href="tel:7696954686"
                      className="w-full py-4 rounded-xl font-black text-lg bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-xl transition-all transform hover:-translate-y-1 text-white inline-block"
                    >
                      📲 Call: 7696954686
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* --- REGISTRATION FORM VIEW --- */
              <div className="relative animate-in slide-in-from-right duration-500">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-emerald-400 mb-8 flex items-center gap-2 hover:text-emerald-300 transition-colors font-bold"
                >
                  ← Back to E-Book Details
                </button>
                
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">Final Step: Enrollment</h2>
                  <p className="text-gray-400 mb-10 text-lg">Fill in your details. You'll receive E-book access details on your email within 5 minutes.</p>

                  <form onSubmit={handleEnrollmentSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Full Name</label>
                        <input required name="fullName" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-emerald-500 outline-none transition-all text-white placeholder-gray-500" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Father's Name</label>
                        <input required name="fatherName" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-emerald-500 outline-none transition-all text-white placeholder-gray-500" placeholder="Father's name" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Email</label>
                        <input required type="email" name="email" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-emerald-500 outline-none transition-all text-white placeholder-gray-500" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Mobile Number</label>
                        <input required name="mobile" type="tel" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-emerald-500 outline-none transition-all text-white placeholder-gray-500" placeholder="10-digit number" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Set Password</label>
                        <input required name="password" type="password" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-emerald-500 outline-none transition-all text-white placeholder-gray-500" placeholder="••••••••" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Confirm Password</label>
                        <input required name="confirmPassword" type="password" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-emerald-500 outline-none transition-all text-white placeholder-gray-500" placeholder="••••••••" />
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl transition-all active:scale-95 disabled:opacity-50 text-white"
                      >
                        {processing ? 'Processing Enrollment...' : `Secure Checkout — Pay ₹${info?.price}`}
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="mt-6"></div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                  <p className="text-sm text-emerald-300 mb-2 font-bold">📧 After Payment</p>
                  <p className="text-xs text-gray-300">
                    E-book access details will be sent to your email within 5 minutes after successful payment.
                    Please check your inbox and spam folder.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              Need help? Email <a href="mailto:2025eliteacademy@gmail.com" className="text-emerald-400 hover:underline font-medium">2025eliteacademy@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PyqsBookPurchase;
