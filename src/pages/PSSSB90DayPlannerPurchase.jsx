import { useState, useEffect, useRef } from 'react';
import { plannerBookAPI } from '../services/api';
import PageSeo from '../components/PageSeo';

const WHATS_INSIDE = [
  { icon: '📅', title: '90-Day Study Planner', desc: 'A complete day-by-day roadmap so you never have to wonder what to study.' },
  { icon: '🎯', title: 'Daily Targets', desc: 'Clear, achievable goals for every single day of your preparation.' },
  { icon: '🔁', title: 'Revision Planner', desc: 'Built-in revision cycles so nothing you study is ever forgotten.' },
  { icon: '🗂️', title: 'Topic-wise Planning', desc: 'Every topic broken down and scheduled by priority and weightage.' },
  { icon: '📚', title: 'Subject-wise Planning', desc: 'Balanced coverage across every subject in the PSSSB syllabus.' },
  { icon: '✅', title: 'Daily Checklist', desc: 'Tick off tasks as you go and stay accountable every day.' },
  { icon: '📝', title: 'MCQ Tracker', desc: 'Log daily MCQ practice and track your accuracy over time.' },
  { icon: '📄', title: 'Previous Year Question Practice', desc: 'Dedicated space to practice and review PYQs by topic.' },
  { icon: '🔥', title: 'Habit Tracker', desc: 'Build the daily habits that separate selected candidates from the rest.' },
  { icon: '💧', title: 'Water Tracker', desc: 'Stay hydrated and sharp through 90 days of intense preparation.' },
  { icon: '😴', title: 'Sleep Tracker', desc: 'Track your sleep to make sure your body keeps up with your ambition.' },
  { icon: '🙂', title: 'Mood Tracker', desc: 'Keep an eye on your mental state through the highs and lows of prep.' },
  { icon: '🏆', title: 'Daily Achievement', desc: 'Note your daily wins, however small, to stay motivated.' },
  { icon: '💬', title: 'Motivational Quotes', desc: 'A dose of motivation on every page to keep you going.' },
];

const SUBJECTS = [
  { name: 'Mathematics', icon: '🔢', color: 'from-teal-500/20 to-emerald-500/20' },
  { name: 'Reasoning', icon: '🧠', color: 'from-purple-500/20 to-indigo-500/20' },
  { name: 'Punjab GK', icon: '🗺️', color: 'from-orange-500/20 to-yellow-500/20' },
  { name: 'English', icon: '🇬🇧', color: 'from-red-500/20 to-pink-500/20' },
  { name: 'Punjabi Grammar', icon: '📘', color: 'from-blue-500/20 to-cyan-500/20' },
  { name: 'Computer', icon: '💻', color: 'from-blue-500/20 to-indigo-500/20' },
  { name: 'General Science', icon: '🔬', color: 'from-green-500/20 to-emerald-500/20' },
  { name: 'Indian Polity', icon: '🏛️', color: 'from-indigo-500/20 to-purple-500/20' },
  { name: 'History', icon: '📜', color: 'from-amber-500/20 to-orange-500/20' },
  { name: 'Geography', icon: '🌍', color: 'from-cyan-500/20 to-blue-500/20' },
  { name: 'Economy', icon: '💹', color: 'from-emerald-500/20 to-teal-500/20' },
  { name: 'Environment', icon: '🌱', color: 'from-lime-500/20 to-green-500/20' },
];

const WHO_SHOULD_BUY = [
  { name: 'Beginners', icon: '🌱' },
  { name: 'Working Professionals', icon: '💼' },
  { name: 'College Students', icon: '🎓' },
  { name: 'PSSSB Aspirants', icon: '📋' },
  { name: 'Punjab Police Aspirants', icon: '👮' },
  { name: 'Patwari Aspirants', icon: '📐' },
  { name: 'Naib Tehsildar Aspirants', icon: '🏢' },
  { name: 'Senior Assistant Aspirants', icon: '🗃️' },
  { name: 'Inspector Aspirants', icon: '🎖️' },
];

const WITHOUT_PLANNER = ['Random Study', 'Miss Revision', 'No Tracking', 'No Discipline', 'Forget Topics'];
const WITH_PLANNER = ['Daily Roadmap', 'Daily Revision', 'Progress Tracking', 'Habit Tracking', 'Topic Completion', 'Consistency'];

const FAQS = [
  {
    question: 'Is this a physical book or a PDF/eBook?',
    answer: 'This is a premium physical printed planner. It is not a PDF, eBook, or online course — a real book will be shipped to your address.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Your planner is dispatched within 1–3 working days of successful payment via India Post / a trusted courier partner.',
  },
  {
    question: 'Will I get a tracking ID?',
    answer: 'Yes. Once your order is dispatched, you will receive a second email containing your India Post / Courier Tracking ID.',
  },
  {
    question: 'What if I don\u2019t receive any email?',
    answer: 'Please check your Inbox and Spam folder first. If you still don\u2019t see it, contact us on WhatsApp immediately and our team will help.',
  },
  {
    question: 'Can I return or get a refund after payment?',
    answer: 'All purchases are non-refundable once payment is successful, since printing and dispatch begin immediately after your order.',
  },
  {
    question: 'Which exams does this planner cover?',
    answer: 'It is designed for PSSSB, Punjab Police, Patwari, Naib Tehsildar, Senior Assistant, Inspector and other Punjab Government exams.',
  },
  {
    question: 'Do I need to buy any other book alongside this?',
    answer: 'No. The planner is a standalone daily companion designed to organise your existing study material into a structured 90-day routine.',
  },
];

function PSSSB90DayPlannerPurchase() {
  const [bookInfo, setBookInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [purchaseType, setPurchaseType] = useState('softcopy'); // 'hardcopy' or 'softcopy'

  const whatsInsideRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    flatNo: '',
    area: '',
    landmark: '',
    district: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });

  // Helper to dynamically check the active price
  const getActivePrice = () => {
    if (purchaseType === 'hardcopy') {
      return {
        price: bookInfo?.hardcopyPrice || 799,
        original: bookInfo?.hardcopyOriginalPrice || 1199
      };
    } else {
      return {
        price: bookInfo?.softcopyPrice || 399,
        original: bookInfo?.softcopyOriginalPrice || 599
      };
    }
  };

  useEffect(() => {
    fetchBookInfo();
    window.scrollTo(0, 0);
  }, []);

  const fetchBookInfo = async () => {
    try {
      console.log('fetchBookInfo...');
      const response = await plannerBookAPI.getInfo();
      console.log('fetchBookInfo:', response.data);
      setBookInfo(response.data.book);
    } catch (error) {
      console.error('plannerBookAPI.getInfo failed, using fallback values:', error);
      setDemoMode(true);
      setBookInfo({
        name: 'PSSSB 90-Day Master Success Planner',
        hardcopyPrice: 799,
        hardcopyOriginalPrice: 1199,
        softcopyPrice: 399,
        softcopyOriginalPrice: 599,
        description:
          "Stop wondering what to study every day. Most students don't fail because they lack ability — they fail because they study randomly, with no plan and no tracking. The Elite Academy 90-Day Master Success Planner tells you exactly what to study every single day for 90 days, designed after analysing previous year papers, the latest exam pattern, and high-weightage topics.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }

    if (purchaseType === 'hardcopy') {
      if (!formData.flatNo.trim()) newErrors.flatNo = 'Required';
      if (!formData.area.trim()) newErrors.area = 'Required';
      if (!formData.district.trim()) newErrors.district = 'Required';
      if (!formData.city.trim()) newErrors.city = 'Required';
      if (!formData.state.trim()) newErrors.state = 'Required';

      if (!formData.pincode.trim()) {
        newErrors.pincode = 'PIN code is required';
      } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
        newErrors.pincode = 'Enter a valid 6-digit PIN code';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setProcessing(true);
    try {
      // 1. Load Razorpay Script first
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay. Please check your internet connection.');
        setProcessing(false);
        return;
      }

      let order;
      let razorpayKeyId;
      let usingDemoOrder = false;

      const currentPricing = getActivePrice();
      try {
        const response = await plannerBookAPI.createOrder({ ...formData, purchaseType, amount: currentPricing.price });
        console.log('plannerBookAPI.createOrder response:', response?.data);
        order = response.data.order;
        razorpayKeyId = response.data.razorpayKeyId;
      } catch (apiError) {
        console.error('plannerBookAPI.createOrder failed, using demo order:', apiError);
        setDemoMode(true);
        usingDemoOrder = true;
        order = {
          id: `demo_order_${Date.now()}`,
          amount: currentPricing.price * 100,
        };
        razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
      }

      if (!razorpayKeyId) {
        alert('Backend unavailable — using demo mode. Payment gateway key is not configured yet, please try again later or contact us on WhatsApp.');
        setProcessing(false);
        return;
      }

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: 'PSSSB 90-Day Master Success Planner',
        order_id: usingDemoOrder ? undefined : order.id,
        handler: async function (razorpayResponse) {
          // TODO: Backend not ready. Payment signature verification
          // (plannerBookAPI.verifyPayment or similar) will be wired up here
          // once the /planner-book endpoints are deployed.
          console.log('Razorpay response:', razorpayResponse);
          setPaymentSuccess(true);
          setShowForm(false);
          window.scrollTo(0, 0);
          setProcessing(false);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          purchaseType: purchaseType,
          address: purchaseType === 'hardcopy' 
            ? `${formData.flatNo}, ${formData.area}, ${formData.landmark}, ${formData.district}, ${formData.city}, ${formData.state} - ${formData.pincode}, ${formData.country}`
            : 'Digital E-Book Delivery (No Physical Shipping)',
        },
        theme: { color: '#4f46e5' },
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
      console.error('Purchase error:', error);
      console.error('Server response data:', error.response?.data);
      alert(error.response?.data?.message || JSON.stringify(error.response?.data) || 'Error during purchase. Please contact support.');
      setProcessing(false);
    }
  };

  const scrollToWhatsInside = () => {
    whatsInsideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <PageSeo
        path="/psssb-90-day-master-planner"
        titleOverride="Elite Academy PSSSB 90-Day Master Success Planner"
        descriptionOverride="Buy Elite Academy's Premium 90-Day Study Planner for Punjab Government Exams. Complete day-wise preparation roadmap, revision planner, habit tracker and subject-wise study schedule."
      />

      <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {demoMode && (
            <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-5 py-3 text-center">
              <p className="text-sm text-yellow-300">
                ⚠️ Backend unavailable — showing demo content. You can still test the purchase flow below.
              </p>
            </div>
          )}

          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl -z-10"></div>

            {paymentSuccess ? (
              /* --- PAYMENT SUCCESS VIEW --- */
              <div className="relative animate-in fade-in duration-500 max-w-2xl mx-auto text-center py-8">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-3xl sm:text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Order Placed Successfully!
                </h2>
                <p className="text-gray-300 mb-10 leading-relaxed">
                  Thank you for purchasing the PSSSB 90-Day Master Success Planner. Here's what happens next.
                </p>

                {purchaseType === 'hardcopy' ? (
                  <>
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-left mb-6">
                      <p className="text-sm font-bold text-emerald-300 mb-2">📧 Confirmation Email</p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        A confirmation email will be sent to <span className="text-white font-semibold">{formData.email}</span> within 5 minutes. If you don't receive it, please call us at{' '}
                        <a href="tel:7696954686" className="text-white font-semibold underline">7696954686</a>.
                      </p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 text-left mb-6">
                      <p className="text-sm font-bold text-blue-300 mb-2">📦 Dispatch & Tracking</p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Once dispatched, you will receive another email containing your India Post / Courier Tracking ID. Please check your Inbox and Spam folder.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 text-left mb-6">
                    <p className="text-sm font-bold text-blue-300 mb-2">📥 Digital PDF Delivery</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      You'll get the PDF delivered to <span className="text-white font-semibold">{formData.email}</span> within 5 minutes. Download it and print it at your nearest shop! If you don't receive it, please call us at{' '}
                      <a href="tel:7696954686" className="text-white font-semibold underline">7696954686</a>.
                    </p>
                  </div>
                )}

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 text-left mb-8">
                  <p className="text-sm font-bold text-orange-300 mb-2">💬 Didn't receive an email?</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    If you don't receive any email within 5 minutes, please call us at 7696954686 or contact us on WhatsApp and our team will assist you right away.
                  </p>
                </div>

                <a
                  href="https://wa.me/917696954686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-xl font-black text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-xl transition-all transform hover:-translate-y-1 text-white"
                >
                  📲 Contact Us on WhatsApp
                </a>
              </div>
            ) : !showForm ? (
              /* --- FULL SALES DETAILS VIEW --- */
              <div className="relative animate-in fade-in duration-500">
                {/* HERO */}
                <div className="text-center mb-12">
                  <span className="inline-block text-sm text-indigo-400 border border-indigo-500/30 px-4 py-1.5 rounded-full bg-indigo-500/10 font-medium mb-4">
                    ⚡ Now Available in Hardcopy & Printable PDF Formats
                  </span>
                  <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Elite Academy
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-black mb-6 text-white">
                    PSSSB 90-Day Master Success Planner
                  </h2>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                    Your Daily Roadmap to Punjab Government Exam Success
                  </p>

                  {/* Book Image Placeholder */}
<div className="mx-auto mb-12
    w-[270px]
    sm:w-[340px]
    md:w-[420px]
    lg:w-[500px]
    xl:w-[540px]
    rounded-3xl
    overflow-hidden
    relative
    border border-indigo-500/30
    shadow-[0_25px_80px_rgba(99,102,241,0.35)]">
    
    <div className="absolute top-4 right-4 z-20 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
        🔥 35% OFF
    </div>

    <img
        src="/psssb_90day.png"
        alt="PSSSB 90-Day Planner"
        className="block w-full h-auto"
    />
</div>

                  {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        setShowForm(true);
                        window.scrollTo(0, 0);
                      }}
                      className="w-full sm:w-auto px-10 py-4 rounded-xl font-black text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl transition-all transform hover:-translate-y-1 text-white"
                    >
                      💳 Buy Now — ₹{getActivePrice().price}
                    </button>
                    <button
                      onClick={scrollToWhatsInside}
                      className="w-full sm:w-auto px-10 py-4 rounded-xl font-black text-lg bg-white/5 border border-white/10 hover:border-indigo-400 hover:bg-white/10 transition-all transform hover:-translate-y-1 text-white"
                    >
                      👀 Preview Book
                    </button>
                  </div> */}
                </div>

                {/* PRICE CARD */}
                {/* <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl p-8 border border-indigo-500/30 relative overflow-hidden mb-12">
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase">
                    Save ₹{(bookInfo?.originalPrice || 999) - (bookInfo?.price || 650)}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div className="flex items-baseline gap-4">
                      <span className="text-5xl font-black text-white">₹{bookInfo?.price}</span>
                      <span className="text-2xl text-gray-400 line-through">₹{bookInfo?.originalPrice}</span>
                      <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                        {bookInfo?.discountPercent || 35}% OFF
                      </span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-200">
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400">●</span> Free Shipping
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400">●</span> Cashless Secure Payment
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-400">●</span> Dispatch within 1–3 working days
                      </li>
                    </ul>
                  </div>
                </div> */}

                <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto mb-10 text-left">
                    {/* Hardcopy Card */}
                    <div 
                      onClick={() => setPurchaseType('hardcopy')}
                      className={`cursor-pointer p-4 sm:p-6 rounded-2xl border transition-all relative flex flex-col justify-between ${purchaseType === 'hardcopy' ? 'border-indigo-500 bg-indigo-500/15 ring-2 ring-indigo-500' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                    >
                      <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-600 text-[8px] sm:text-[10px] text-white px-1.5 py-0.5 rounded-full font-bold uppercase">Best Value</span>
                      <div>
                        <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📦</div>
                        <h4 className="font-bold text-white text-sm sm:text-lg leading-tight">Premium Hardcopy</h4>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-1 mb-4 hidden xs:block">Real book printed & delivered directly to your doorstep.</p>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mt-auto">
                        <span className="text-lg sm:text-2xl font-black text-white">₹{bookInfo?.hardcopyPrice || 799}</span>
                        <span className="text-xs sm:text-sm text-gray-500 line-through">₹{bookInfo?.hardcopyOriginalPrice || 1199}</span>
                      </div>
                    </div>

                    {/* Softcopy Card */}
                    <div 
                      onClick={() => setPurchaseType('softcopy')}
                      className={`cursor-pointer p-4 sm:p-6 rounded-2xl border transition-all relative flex flex-col justify-between ${purchaseType === 'softcopy' ? 'border-indigo-500 bg-indigo-500/15 ring-2 ring-indigo-500' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                    >
                      <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-green-600 text-[8px] sm:text-[10px] text-white px-1.5 py-0.5 rounded-full font-bold uppercase">Instant</span>
                      <div>
                        <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📥</div>
                        <h4 className="font-bold text-white text-sm sm:text-lg leading-tight">Printable PDF</h4>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-1 mb-4 hidden xs:block">Instant PDF link via email. Print it out from your nearest shop!</p>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mt-auto">
                        <span className="text-lg sm:text-2xl font-black text-white">₹{bookInfo?.softcopyPrice || 399}</span>
                        <span className="text-xs sm:text-sm text-gray-500 line-through">₹{bookInfo?.softcopyOriginalPrice || 599}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        setShowForm(true);
                        window.scrollTo(0, 0);
                      }}
                      className="w-full sm:w-auto px-10 py-4 rounded-xl font-black text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl transition-all transform hover:-translate-y-1 text-white"
                    >
                      💳 Buy Selected — ₹{getActivePrice().price}
                    </button>
                    <button
                      onClick={scrollToWhatsInside}
                      className="w-full sm:w-auto px-10 py-4 rounded-xl font-black text-lg bg-white/5 border border-white/10 hover:border-indigo-400 hover:bg-white/10 transition-all transform hover:-translate-y-1 text-white"
                    >
                      👀 Preview Book Features
                    </button>
                  </div>
<div className='mt-6'></div>


                {/* BOOK DESCRIPTION */}
                <div className="bg-white/5 rounded-3xl p-8 sm:p-10 border border-white/10 mb-12">
                  <h3 className="text-2xl font-black text-white mb-6 text-center">
                    Stop Wondering What to Study Every Day
                  </h3>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto text-center mb-6">
                    {bookInfo?.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {['Previous Year Papers', 'Latest Exam Pattern', 'High Weightage Topics'].map((item) => (
                      <span
                        key={item}
                        className="text-sm font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-4 py-2 rounded-full"
                      >
                        📊 Designed after analysing {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* WHAT'S INSIDE */}
                <div ref={whatsInsideRef} className="mb-12">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-6 text-center">
                    📦 What's Inside the Planner
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {WHATS_INSIDE.map((feature) => (
                      <div
                        key={feature.title}
                        className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-6 overflow-hidden group hover:border-indigo-500/30 transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10">
                          <span className="text-3xl mb-4 block">{feature.icon}</span>
                          <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SUBJECTS GRID */}
                <div className="mb-12">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-6 text-center">
                    📚 Subjects Covered • Topic-Wise & Exam-Oriented
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {SUBJECTS.map((subject) => (
                      <div
                        key={subject.name}
                        className={`bg-gradient-to-br ${subject.color} border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105`}
                      >
                        <span className="text-3xl">{subject.icon}</span>
                        <span className="text-xs font-bold text-white text-center">{subject.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WHO SHOULD BUY */}
                <div className="mb-12">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-6 text-center">
                    🙋 Who Should Buy This Planner
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {WHO_SHOULD_BUY.map((who) => (
                      <div
                        key={who.name}
                        className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-5 flex flex-col items-center justify-center gap-2 text-center transition-all duration-300 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10"
                      >
                        <span className="text-2xl">{who.icon}</span>
                        <span className="text-xs sm:text-sm font-semibold text-white">{who.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WHY THIS BOOK - COMPARISON */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white/5 rounded-3xl p-8 border border-red-500/20">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className="text-red-400">❌</span> Without This Planner
                    </h4>
                    <ul className="space-y-4">
                      {WITHOUT_PLANNER.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="text-red-400 mt-1">✕</span>
                          <span className="text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl p-8 border border-indigo-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase">
                      With Planner
                    </div>
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className="text-emerald-400">✅</span> With This Planner
                    </h4>
                    <ul className="space-y-4">
                      {WITH_PLANNER.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-200">
                          <span className="text-emerald-400">●</span>
                          <span className="text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* POLICY CARD */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-sm font-bold text-blue-300 mb-3 flex items-center gap-2">🚚 Shipping Policy</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Dispatch within 1–3 working days</li>
                      <li>• Shipped via India Post / trusted courier</li>
                      <li>• Tracking ID sent to your email once dispatched</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-sm font-bold text-orange-300 mb-3 flex items-center gap-2">🔒 Refund Policy</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      All purchases are <span className="font-semibold text-white">non-refundable</span> after successful payment, as printing and dispatch begin right away.
                    </p>
                  </div>
                </div>

                {/* FINAL CTA */}
                <div className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 border-2 border-indigo-500/50 rounded-3xl p-8 text-center mb-12">
                  <div className="flex items-baseline justify-center gap-4 mb-2">
                    <span className="text-4xl font-black text-white">₹{getActivePrice().price}</span>
                    <span className="text-2xl text-gray-500 line-through">₹{getActivePrice().original}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Currently Selected variant: <span className="text-indigo-400 font-bold capitalize">{purchaseType}</span></p>
                  <button
                    onClick={() => {
                      setShowForm(true);
                      window.scrollTo(0, 0);
                    }}
                    className="w-full max-w-md mt-4 py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    💳 Proceed to Payment — ₹{getActivePrice().price}
                  </button>
                </div>

                {/* FAQ */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-8 text-center text-white">Frequently Asked Questions</h3>
                  <div className="space-y-4 max-w-3xl mx-auto">
                    {FAQS.map(({ question, answer }) => (
                      <details
                        key={question}
                        className="group rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black overflow-hidden"
                      >
                        <summary className="cursor-pointer px-6 py-4 font-semibold text-white list-none flex justify-between items-center gap-4">
                          {question}
                          <span className="text-gray-500 group-open:rotate-45 transition-transform text-xl leading-none shrink-0">
                            +
                          </span>
                        </summary>
                        <div className="px-6 pb-4 text-gray-300 text-sm leading-relaxed">{answer}</div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* --- PURCHASE FORM VIEW --- */
              <div className="relative animate-in slide-in-from-right duration-500">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-indigo-400 mb-8 flex items-center gap-2 hover:text-indigo-300 transition-colors"
                >
                  ← Back to Book Details
                </button>

                <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl font-black mb-2">
                    {purchaseType === 'hardcopy' ? 'Final Step: Delivery Details' : 'Final Step: Contact Details'}
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {purchaseType === 'hardcopy'
                      ? 'Fill in your details below. Your planner will be shipped to this address.'
                      : 'Fill in your details below. Your PDF download link will be emailed to you instantly.'}
                  </p>

                  <div className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-8">
                    <p className="text-sm text-gray-300">
                      You've selected: <span className="font-bold text-indigo-400">{purchaseType === 'hardcopy' ? '📦 Premium Hardcopy' : '📥 Printable Softcopy (PDF)'}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline shrink-0"
                    >
                      Change
                    </button>
                  </div>

                  <form onSubmit={handlePurchaseSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                        <input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all"
                          placeholder="Enter your name"
                        />
                        {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all"
                          placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all"
                          placeholder="10-digit mobile number"
                        />
                        {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
                      </div>
                    </div>

{purchaseType === 'hardcopy' ? (
                      <>
                        <div className="pt-4 border-t border-white/5">
                          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">📦 Shipping Address</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Flat / House Number</label>
                            <input
                              name="flatNo"
                              value={formData.flatNo}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all"
                              placeholder="House / Flat No."
                            />
                            {errors.flatNo && <p className="text-xs text-red-400">{errors.flatNo}</p>}
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Area</label>
                            <input
                              name="area"
                              value={formData.area}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all"
                              placeholder="Street / Colony / Area"
                            />
                            {errors.area && <p className="text-xs text-red-400">{errors.area}</p>}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Landmark</label>
                            <input
                              name="landmark"
                              value={formData.landmark}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all"
                              placeholder="Nearby landmark (optional)"
                        />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">District</label>
                            <input
                              name="district"
                              value={formData.district}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all"
                              placeholder="Enter district"
                            />
                            {errors.district && <p className="text-xs text-red-400">{errors.district}</p>}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">City</label>
                            <input
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all"
                              placeholder="Enter city"
                            />
                            {errors.city && <p className="text-xs text-red-400">{errors.city}</p>}
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">State</label>
                            <input
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all"
                              placeholder="Enter state"
                            />
                            {errors.state && <p className="text-xs text-red-400">{errors.state}</p>}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">PIN Code</label>
                            <input
                              name="pincode"
                              value={formData.pincode}
                              onChange={handleInputChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-indigo-500 outline-none transition-all"
                              placeholder="6-digit PIN code"
                            />
                            {errors.pincode && <p className="text-xs text-red-400">{errors.pincode}</p>}
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Country</label>
                            <input
                              name="country"
                              value={formData.country}
                              disabled
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none transition-all text-gray-400 cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-5 text-center my-4">
                        <p className="text-sm text-indigo-300 font-semibold">⚡ Digital Product Delivery Mode</p>
                        <p className="text-xs text-gray-400 mt-1">No physical address required. Your high-res setup file links will be instantly delivered to your active Email address above.</p>
                      </div>
                    )}

                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10 flex items-center justify-between">
                      <span className="text-sm text-gray-300">Total Amount</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">₹{getActivePrice().price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{getActivePrice().original}</span>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-xl transition-all active:scale-95 disabled:opacity-50"
                      >
                        {processing ? 'Processing Order...' : `Secure Checkout — Pay ₹${getActivePrice().price}`}
                      </button>
                    </div>

                  </form>

                  <div className="mt-6"></div>

                  {purchaseType === 'hardcopy' ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-4">
                      <p className="text-sm text-emerald-300 mb-2">📧 After Payment</p>
                      <p className="text-xs text-gray-300">
                        A confirmation email will be sent within 5 minutes of payment. Once dispatched, you'll receive another email with your India Post / Courier Tracking ID. Please check your inbox and spam folder — call us at 7696954686 if you don't receive it.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-4">
                      <p className="text-sm text-emerald-300 mb-2">📧 After Payment</p>
                      <p className="text-xs text-gray-300">
                        You'll get the PDF delivered to your email within 5 minutes of payment. Please check your inbox and spam folder — call us at 7696954686 if you don't receive it.
                      </p>
                    </div>
                  )}

                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                    <p className="text-sm text-orange-300 mb-2">🔒 {purchaseType === 'hardcopy' ? 'Shipping & Refund Policy' : 'Delivery & Refund Policy'}</p>
                    <p className="text-xs text-gray-300">
                      {purchaseType === 'hardcopy'
                        ? 'Dispatch within 1–3 working days. All purchases are non-refundable after successful payment.'
                        : 'Instant digital delivery. All purchases are non-refundable after successful payment.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              Need help? Email{' '}
              <a href="mailto:2025eliteacademy@gmail.com" className="text-indigo-400 hover:underline">
                2025eliteacademy@gmail.com
              </a>{' '}
              or WhatsApp{' '}
              <a href="https://wa.me/917696954686" className="text-indigo-400 hover:underline">
                7696954686
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PSSSB90DayPlannerPurchase;