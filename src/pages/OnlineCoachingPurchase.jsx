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
  const [showForm, setShowForm] = useState(false); // Toggle between Sales Page and Form

  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: auth.currentUser?.email || '',
    mobile: '',
    fatherName: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchCoachingData();
    window.scrollTo(0, 0);
  }, []);

  const fetchCoachingData = async () => {
    try {
      console.log("fetchCoachingData...")
      const response = await coachingAPI.getInfo();
      console.log("fetchCoachingData: ",response.data);
      setCoachingInfo(response.data.package);
    } catch (error) {
      setCoachingInfo({
        name: 'Complete Online Coaching Program Starting from 1st Feb',
        price: 4999,
        originalPrice: 9999,
        description: 'Prepare smart with live + recorded classes, a powerful progress tracker app, and 23,000+ topic-wise PYQs — everything you need in one ecosystem.',
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

  // const handleEnrollmentSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (formData.password !== formData.confirmPassword) {
  //     alert("Passwords do not match!");
  //     return;
  //   }

  //   setProcessing(true);
  //   try {
  //     // 1. Send data to your backend to create the user/enrollment record
  //     await coachingAPI.createEnrollmentWithUser(formData);
      
  //     // 2. Load Razorpay
  //     const scriptLoaded = await loadRazorpayScript();
  //     if (!scriptLoaded) {
  //       alert('Failed to load Razorpay.');
  //       setProcessing(false);
  //       return;
  //     }

  //     // 3. Create Order
  //     const response = await coachingAPI.createPurchase();
  //     const { order, razorpayKeyId } = response.data;

  //     const options = {
  //       key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
  //       amount: order.amount,
  //       currency: 'INR',
  //       name: 'Elite Academy',
  //       description: 'Complete Coaching Enrollment',
  //       order_id: order.id,
  //       handler: async function (razorpayResponse) {
  //         alert("Payment successful! 🎉 Use your email and password to login to the mobile app.");
  //         navigate('/dashboard');
  //       },
  //       prefill: {
  //         name: formData.fullName,
  //         email: formData.email,
  //         contact: formData.mobile,
  //       },
  //       theme: { color: '#4f46e5' },
  //       modal: { ondismiss: () => setProcessing(false) }
  //     };

  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.open();
  //   } catch (error) {
  //     console.error('Enrollment/Purchase error:', error);
  //     alert(error.response?.data?.message || "Error during enrollment. Please contact support.");
  //     setProcessing(false);
  //   }
  // };

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

    // 2. ONE SINGLE CALL to the backend
    // This sends the form data AND gets the Razorpay Order back
    const response = await coachingAPI.createEnrollmentWithUser(formData); 
    const { order, razorpayKeyId } = response.data;

    const options = {
      key: razorpayKeyId,
      amount: order.amount,
      currency: 'INR',
      name: 'Elite Academy',
      description: 'Complete Coaching Enrollment',
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
    paymentObject.open();
  } catch (error) {
    console.error('Enrollment error:', error);
    alert(error.response?.data?.message || "Error during enrollment.");
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
          
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl -z-10"></div>

            {!showForm ? (
              /* --- FULL SALES DETAILS VIEW --- */
              <div className="relative animate-in fade-in duration-500">
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

                {/* Subjects Grid */}
                <div className="mb-12">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-6 text-center">📚 All Subjects Covered • Topic-Wise & Exam-Oriented</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Reasoning', icon: '🧠', color: 'from-purple-500/20 to-indigo-500/20' },
                      { name: 'Punjab Grammar', icon: '📘', color: 'from-blue-500/20 to-cyan-500/20' },
                      { name: 'Punjabi GK', icon: '🗺️', color: 'from-orange-500/20 to-yellow-500/20' },
                      { name: 'English', icon: '🇬🇧', color: 'from-red-500/20 to-pink-500/20' },
                      { name: 'Computer', icon: '💻', color: 'from-blue-500/20 to-indigo-500/20' },
                      { name: 'Current Affairs', icon: '📰', color: 'from-green-500/20 to-emerald-500/20' },
                      { name: 'All General Studies', icon: '📖', color: 'from-indigo-500/20 to-purple-500/20' },
                      { name: 'MATHEMATICS', icon: '🔢', color: 'from-teal-500/20 to-emerald-500/20' },
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

                  <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl p-8 border border-indigo-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase">Free Bonus</div>
                    <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-3">📊 Elite Academy Tracker App</h4>
                    <p className="text-indigo-300 text-sm font-bold mb-6 italic">Worth ₹5,000 — Included Free</p>
                    <ul className="space-y-4">
                      {['Subject-wise progress tracking', '23,000+ Topic-wise PYQs', 'Performance Analytics'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-200">
                          <span className="text-green-400">●</span>
                          <span className="text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 border-2 border-indigo-500/50 rounded-3xl p-8 text-center">
                  <div className="flex items-baseline justify-center gap-4 mb-2">
                    <span className="text-4xl font-black text-white">₹{coachingInfo?.price}</span>
                    <span className="text-2xl text-gray-500 line-through">₹{coachingInfo?.originalPrice}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (!user) {
                        alert('Please login first to enroll');
                        navigate('/dashboard');
                      } else {
                        setShowForm(true);
                        window.scrollTo(0, 0);
                      }
                    }}
                    className="w-full max-w-md mt-6 py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl transition-all transform hover:-translate-y-1"
                  >
                     Get Early Access Now
                  </button>
                </div>
              </div>
            ) : (
              /* --- REGISTRATION FORM VIEW --- */
              <div className="relative animate-in slide-in-from-right duration-500">
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-indigo-400 mb-8 flex items-center gap-2 hover:text-indigo-300 transition-colors"
                >
                  ← Back to Course Details
                </button>
                
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl font-black mb-2">Final Step: Enrollment</h2>
                  <p className="text-gray-400 mb-10">Fill in your details. This account will be used to login to our Mobile App.</p>

                  <form onSubmit={handleEnrollmentSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                        <input required name="fullName" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Father's Name</label>
                        <input required name="fatherName" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all" placeholder="Father's name" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email (Sync with Login)</label>
                        <input type="email" readOnly value={formData.email} className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-gray-500 cursor-not-allowed" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mobile Number</label>
                        <input required name="mobile" type="tel" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all" placeholder="10-digit number" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Set Password</label>
                        <input required name="password" type="password" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all" placeholder="••••••••" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Confirm Password</label>
                        <input required name="confirmPassword" type="password" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all" placeholder="••••••••" />
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-xl transition-all active:scale-95 disabled:opacity-50"
                      >
                        {processing ? 'Processing Enrollment...' : `Secure Checkout — Pay ₹${coachingInfo?.price}`}
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className='mt-6'></div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <p className="text-sm text-emerald-300 mb-2">📧 After Payment</p>
              <p className="text-xs text-gray-300">
                Detail will sent to your email within 5 minutes after successful payment.
                Please check your inbox and spam folder.
              </p>
              <p className="text-xs text-gray-300">
                Batch will be starting from 1st Feb
              </p>
            </div>
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              Need help? Email <a href="mailto:2025eliteacademy@gmail.com" className="text-indigo-400 hover:underline">2025eliteacademy@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnlineCoachingPurchase;