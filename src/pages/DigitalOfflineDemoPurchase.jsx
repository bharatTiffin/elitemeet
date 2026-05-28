import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { digitalOfflineDemoAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

const DEFAULT_BRANCHES = [
  {
    value: 'fatehgarh-sahib',
    label: 'Fatehgarh Sahib',
    address: 'Ist Floor, Showroom No 18, Above Pb 23 Out Fit, City Center Sirhind, Lincoln Road',
    mapsLink: 'https://maps.app.goo.gl/x21iBBNnNLLeF72z8?g_st=iwb',
  },
  {
    value: 'chandigarh',
    label: 'Chandigarh',
    address: 'SCO 144, Sector 24D, Chandigarh',
    mapsLink: 'https://maps.app.goo.gl/nkiAPjq2FfHmsWcF6',
  },
];

const DEMO_TOTAL_SEATS = 16;
const DEMO_START_MONTH = 4;
const DEMO_START_DAY = 28;
const DEMO_END_MONTH = 5;
const DEMO_END_DAY = 3;
const MAX_AVAILABLE_SEATS = 6;

const getDemoSeatStatus = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startDate = new Date(today.getFullYear(), DEMO_START_MONTH, DEMO_START_DAY);
  const endDate = new Date(today.getFullYear(), DEMO_END_MONTH, DEMO_END_DAY);

  if (today < startDate) {
    return {
      seatsLeft: MAX_AVAILABLE_SEATS,
      isClosed: false,
    };
  }

  if (today >= endDate) {
    return {
      seatsLeft: 0,
      isClosed: true,
    };
  }

  const dayDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  return {
    seatsLeft: Math.max(MAX_AVAILABLE_SEATS - dayDiff, 0),
    isClosed: false,
  };
};

function DigitalOfflineDemoPurchase() {
  const navigate = useNavigate();
  const topSectionRef = useRef(null);
  const [user, setUser] = useState(() => {
    const manualAuthToken = localStorage.getItem('manualAuthToken');
    if (manualAuthToken) {
      try {
        return JSON.parse(manualAuthToken);
      } catch (error) {
        console.error('Error parsing manual auth token:', error);
      }
    }
    return auth.currentUser;
  });

  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const { seatsLeft, isClosed } = getDemoSeatStatus();

  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    mobile: '',
    address: '',
    branch: 'fatehgarh-sahib',
  });

  useEffect(() => {
    fetchInfo();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (showForm) {
      requestAnimationFrame(() => {
        topSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    }
  }, [showForm]);

  const fetchInfo = async () => {
    try {
      const response = await digitalOfflineDemoAPI.getInfo();
      setInfo(response.data.package || response.data);
    } catch (error) {
      setInfo({
        name: 'Digital Offline Demo Classes - Fatehgarh Sahib & Chandigarh',
        price: 500,
        originalPrice: 1000,
        description: 'Registration open for 1, 2  June demo classes with refund terms applied on the same day only.',
        highlights: [
          'Registration open for 1, 2 June',
          '100% refundable on same-day request if you attend',
          'Fee adjusted in final course fee if you join',
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isClosed) {
      alert('Registration is closed for this demo.');
      return;
    }

    setSubmitting(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        setSubmitting(false);
        return;
      }

      const { data } = await digitalOfflineDemoAPI.createOrder(formData);
      const { order, razorpayKeyId } = data;

      const selectedBranch = DEFAULT_BRANCHES.find((branch) => branch.value === formData.branch) || DEFAULT_BRANCHES[0];

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'Elite Academy',
        description: `Digital Offline Demo - ${selectedBranch.label}`,
        order_id: order.id,
        handler: function () {
          setSuccess(true);
          setSubmitting(false);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: { color: '#0891b2' },
        modal: { ondismiss: () => setSubmitting(false) },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function () {
        alert('Payment failed. Please try again.');
        setSubmitting(false);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Digital offline demo enrollment error:', error);
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-400"></div>
      </div>
    );
  }

  const price = info?.price || 500;

  return (
    <>
      <Helmet>
        <title>Digital Offline Demo Registration - Elite Academy</title>
        <meta name="description" content="Register for Digital Offline Demo Classes in Fatehgarh Sahib or Chandigarh. Fee ₹500 and refundable on same-day request if you attend." />
      </Helmet>

      <div ref={topSectionRef} className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>←</span> Back
          </button>

          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/90 to-gray-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl -z-10"></div>

            {!showForm ? (
              <div className="p-6 sm:p-10 animate-fade-in">
                <div className="text-center mb-10">
                  <span className="inline-block text-xs sm:text-sm text-cyan-300 border border-cyan-500/30 px-4 py-1.5 rounded-full bg-cyan-500/10 font-bold mb-4">
                    Registration Open • 1, 2 June
                  </span>
                  <div className="mx-auto mb-5 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-200">
                    <span>Only {seatsLeft} seat{seatsLeft === 1 ? '' : 's'} left out of {DEMO_TOTAL_SEATS}</span>
                    <span className="h-1 w-1 rounded-full bg-amber-300/80" />
                    <span>{isClosed ? 'Registration closed on 3 June' : 'Reserve now before the seats run out'}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black mb-5 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    {info?.name || 'Digital Offline Demo Classes'}
                  </h1>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                    {info?.description || 'Digital offline classes with mic system, live support, and branch-wise demo registration.'}
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-10">
                  <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold mb-4 text-cyan-300">What this demo includes</h3>
                    <ul className="space-y-3 text-gray-200">
                      {[
                        '3-4 month coaching roadmap for Punjab government exam preparation',
                        'Every Sunday guidance session',
                        'Digital offline setup with mic system at the branch',
                        'Fee is ₹500 and can be adjusted in the final course fee',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="text-cyan-300 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold mb-4 text-blue-300">Branches</h3>
                    <div className="space-y-4">
                      {DEFAULT_BRANCHES.map((branch) => (
                        <div key={branch.value} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                          <p className="font-bold text-white mb-1">{branch.label}</p>
                          <p className="text-sm text-gray-300">{branch.address}</p>
                          <a href={branch.mapsLink} target="_blank" rel="noreferrer" className="inline-block mt-2 text-sm text-cyan-300 hover:underline">
                            Open Google Maps
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
                  <div>
                    {/* <div className="text-lg font-black text-white">Fee ₹{price} • 100% refundable on same-day request</div> */}
                    <p className="text-sm text-gray-400">Attend the demo at your selected branch and receive email confirmation after payment.</p>
                  </div>
                  <button
                    onClick={() => {
                      if (isClosed) return;
                      setShowForm(true);
                    }}
                    disabled={isClosed}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all duration-300 hover:-translate-y-1 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {isClosed ? 'Registration Closed' : 'Register Now →'}
                  </button>
                </div>
              </div>
            ) : success ? (
              <div className="p-6 sm:p-10 text-center animate-fade-in">
                <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-3xl">✓</div>
                <h2 className="text-3xl font-black mb-3">Payment Successful</h2>
                <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                  Your digital offline demo registration is confirmed. Please check your email for the branch address, Google Maps link, and demo instructions.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => navigate('/dashboard')} className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600">
                    Go to Dashboard
                  </button>
                  <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-xl font-bold border border-white/20 text-white/90">
                    Register Another Student
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-10 animate-fade-in">
                <button
                  onClick={() => setShowForm(false)}
                  className="mb-8 text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-2"
                >
                  ← Back to Demo Details
                </button>

                <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl font-black mb-2">Complete Registration</h2>
                  <p className="text-gray-400 mb-8">Fill in your details and pay ₹{price} to reserve your demo slot.</p>

                  {isClosed && (
                    <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                      Registration is closed because all demo seats have been assigned.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                        <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-cyan-500 outline-none transition-all" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-cyan-500 outline-none transition-all" placeholder="Enter your email" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mobile Number</label>
                        <input required name="mobile" value={formData.mobile} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-cyan-500 outline-none transition-all" placeholder="10-digit number" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Branch</label>
                        <select required name="branch" value={formData.branch} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-cyan-500 outline-none transition-all">
                          {DEFAULT_BRANCHES.map((branch) => (
                            <option key={branch.value} value={branch.value} className="bg-black">
                              {branch.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Simple Address / Area</label>
                      <textarea required name="address" value={formData.address} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:border-cyan-500 outline-none transition-all resize-none" placeholder="Your area, village, city, or locality" rows="3" />
                    </div>

                    {/* <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Terms: attendance is required on 1, 2 June, refund request must be made on the same day, and no refund will be accepted after 3 June. If you join the full course later, this fee is adjusted in the final fee.
                      </p>
                    </div> */}

                    <div className="pt-4 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={submitting || isClosed}
                        className="w-full py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl transition-all active:scale-95 disabled:opacity-50"
                      >
                        {isClosed ? 'Registration Closed' : submitting ? 'Processing Payment...' : `Pay ₹${price} Now`}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

                <div className="grid lg:grid-cols-2 gap-6 mb-10 mt-20">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <h4 className="text-xl font-bold mb-4">Need help?</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      If you do not receive the email within 5 minutes after payment, please call or WhatsApp us immediately.
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm font-semibold text-cyan-300">
                      <span>7696954686</span>
                      <span>9056653906</span>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <h4 className="text-xl font-bold mb-4">Demo Date Rules</h4>
                    <div className="space-y-3 text-sm text-gray-300">
                      <p>1. You must be present on 1, 2 June for the demo.</p>
                      <p>2. Refund request must be made on the same day of attendance.</p>
                      <p>3. No refund will be given after 3 June.</p>
                      <p>4. If you continue with the course, the demo fee will be deducted from the final fees.</p>
                    </div>
                  </div>
                </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out;
          }
        `}</style>
      </div>
    </>
  );
}

export default DigitalOfflineDemoPurchase;