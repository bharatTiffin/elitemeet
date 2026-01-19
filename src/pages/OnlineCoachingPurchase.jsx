import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { coachingAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

function OnlineCoachingPurchase() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [coachingInfo, setCoachingInfo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoachingData();
    window.scrollTo(0, 0);
  }, []);

  const fetchCoachingData = async () => {
    try {
      const response = await coachingAPI.getInfo();
      setCoachingInfo(response.data.package);
    } catch (error) {
      console.error('Error fetching coaching info:', error);
      // Fallback to the detailed structure you want to show
      setCoachingInfo({
        name: 'Complete Online Coaching Program',
        price: 4999,
        originalPrice: 9999,
        description: 'Prepare smart with live + recorded classes, a powerful progress tracker app, and 23,000+ topic-wise PYQs — everything you need in one ecosystem.',
      });
    } finally {
      setLoading(false);
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
      alert('Please login first to enroll');
      navigate('/dashboard');
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

      const response = await coachingAPI.createPurchase();
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: 'Complete Coaching Enrollment',
        order_id: order.id,
        handler: async function (razorpayResponse) {
          alert("Payment successful! 🎉 Your coaching access will be activated shortly.");
          navigate('/dashboard');
        },
        prefill: {
          name: user.displayName || 'Student',
          email: user.email,
        },
        theme: { color: '#4f46e5' },
        modal: { ondismiss: () => setProcessing(false) }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Purchase error:', error);
      alert("Error initiating payment. Please contact support.");
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
        <title>Online Coaching - Elite Academy</title>
      </Helmet>

      <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Sales Card */}
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl -z-10"></div>

            <div className="relative">
              {/* Header */}
              <div className="text-center mb-10">
                <span className="inline-block text-sm text-indigo-400 border border-indigo-500/30 px-4 py-1.5 rounded-full bg-indigo-500/10 font-medium mb-4">
                  🎓 Online Coaching Program
                </span>
                <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {coachingInfo?.name}
                </h1>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                  {coachingInfo?.description}
                </p>
              </div>

              {/* Subjects Grid (Directly from your Landing Page) */}
              <div className="mb-12">
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-6 text-center">📚 Subjects Covered Topic-Wise</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Reasoning', icon: '🧠', color: 'from-purple-500/20 to-indigo-500/20' },
                    { name: 'Punjab Grammar', icon: '📘', color: 'from-blue-500/20 to-cyan-500/20' },
                    { name: 'Punjabi GK', icon: '🗺️', color: 'from-orange-500/20 to-yellow-500/20' },
                    { name: 'English', icon: '🇬🇧', color: 'from-red-500/20 to-pink-500/20' },
                    { name: 'Computer', icon: '💻', color: 'from-blue-500/20 to-indigo-500/20' },
                    { name: 'Current Affairs', icon: '📰', color: 'from-green-500/20 to-emerald-500/20' },
                    { name: 'General Studies', icon: '📖', color: 'from-indigo-500/20 to-purple-500/20' },
                    { name: 'Exam Oriented', icon: '✔️', color: 'from-teal-500/20 to-emerald-500/20' },
                  ].map((subject) => (
                    <div key={subject.name} className={`bg-gradient-to-br ${subject.color} border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105`}>
                      <span className="text-3xl">{subject.icon}</span>
                      <span className="text-xs font-bold text-white text-center">{subject.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Split Section */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Classes Info */}
                <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-blue-400">🎥</span> Classes & Learning Mode
                  </h4>
                  <ul className="space-y-4">
                    {[
                      'Live Online Classes (interactive & doubt-friendly)',
                      'Recorded Lectures for revision',
                      '1 Year Validity on all recorded content',
                      'E-Books & Digital Notes provided',
                      'Missed a class? Recordings are always available'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-blue-400 mt-1">⚡</span>
                        <span className="text-sm sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tracker App Bonus */}
                <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl p-8 border border-indigo-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase">
                    Free Bonus
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                    📊 Elite Academy Tracker App
                  </h4>
                  <p className="text-indigo-300 text-sm font-bold mb-6 italic">Worth ₹5,000 — Included Free with Coaching</p>
                  <ul className="space-y-4">
                    {[
                      'Subject-wise & topic-wise progress tracking',
                      '23,000+ Previous Year Questions',
                      'PYQs mapped topic-wise',
                      'Identify weak & strong areas instantly'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-200">
                        <span className="text-green-400">●</span>
                        <span className="text-sm sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Final Pricing & CTA Box */}
              <div className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 border-2 border-indigo-500/50 rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Complete Coaching Package</h3>
                  <div className="flex items-baseline justify-center gap-4 mb-2">
                    <span className="text-6xl font-black text-white">₹{coachingInfo?.price}</span>
                    <span className="text-2xl text-gray-500 line-through">₹{coachingInfo?.originalPrice}</span>
                  </div>
                  <div className="text-indigo-400 font-bold mb-8 text-lg">
                    🔥 Save ₹{coachingInfo?.originalPrice - coachingInfo?.price} Today
                  </div>

                  <button
                    onClick={handlePurchase}
                    disabled={processing}
                    className="w-full max-w-md py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                  >
                    {processing ? 'Connecting to Razorpay...' : '🚀 Enroll Now & Get Instant Access'}
                  </button>
                  
                  <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-400 font-medium">
                    <span>✔️ Full Syllabus Coverage</span>
                    <span>✔️ 1 Year Access</span>
                    <span>✔️ Secured by Razorpay</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Help Section */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              Need help? Email us at <a href="mailto:2025eliteacademy@gmail.com" className="text-indigo-400 hover:underline">2025eliteacademy@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnlineCoachingPurchase;