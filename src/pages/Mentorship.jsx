import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mentorshipAPI, slotsAPI, bookingsAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';
import { getAuthenticatedUser } from '../utils/authHelper';

function Mentorship() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getAuthenticatedUser);
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', mobile: '' });
  const [slots, setSlots] = useState([]);
  const [groupedSlots, setGroupedSlots] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // date key (ISO)
  const [selectedSlot, setSelectedSlot] = useState(null); // slot object
  const [purpose, setPurpose] = useState('');
  const [step, setStep] = useState(1); // 1: date, 2: time, 3: confirm
  // Email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pendingBookingData, setPendingBookingData] = useState(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await mentorshipAPI.getProgram();
        setProgram(res.data.program);
      } catch (e) {
        console.error('Failed to fetch mentorship program:', e);
        setProgram({
          title: '1-on-1 Mentorship Sessions',
          description: 'Direct consultation with Happy to clear doubts and plan strategy',
          price: 2499,
          features: ['Personal roadmap', 'Weekly check-ins', 'Doubt clearing']
        });
      } finally {
        setLoading(false);
      }
    };
    const fetchSlots = async () => {
      try {
        const resp = await slotsAPI.getAvailable();
        const data = resp.data && (Array.isArray(resp.data) ? resp.data : resp.data.slots || resp.data.availableSlots || resp.data.availableDates) || [];
        // Normalize slot objects: expect { _id, startTime, duration, price }
        const fetchedSlots = Array.isArray(data) ? data : [];
        setSlots(fetchedSlots);

        // Group by date (YYYY-MM-DD)
        const groups = {};
        fetchedSlots.forEach((s) => {
          let dateKey = '';
          if (s.startTime) {
            dateKey = s.startTime.split('T')[0];
          } else if (s.dateISO) {
            dateKey = s.dateISO;
          } else if (s.dateLabel) {
            dateKey = s.dateLabel;
          }
          if (!dateKey) return;
          if (!groups[dateKey]) groups[dateKey] = [];
          groups[dateKey].push(s);
        });

        // Sort dates ascending
        const dateKeys = Object.keys(groups).sort((a,b) => new Date(a) - new Date(b));
        setGroupedSlots(groups);
        setAvailableDates(dateKeys);
        if (dateKeys.length > 0) setSelectedDate(dateKeys[0]);
      } catch (err) {
        console.error('Failed to fetch slots:', err);
        // fallback sample slots
        const sample = [
          { _id: 's1', startTime: '2026-03-30T21:00:00.000Z', duration: 59, price: 499 },
          { _id: 's2', startTime: '2026-04-12T19:00:00.000Z', duration: 59, price: 499 }
        ];
        setSlots(sample);
        const groups = {};
        sample.forEach((s) => {
          const dateKey = s.startTime.split('T')[0];
          if (!groups[dateKey]) groups[dateKey] = [];
          groups[dateKey].push(s);
        });
        const dateKeys = Object.keys(groups).sort((a,b) => new Date(a) - new Date(b));
        setGroupedSlots(groups);
        setAvailableDates(dateKeys);
        if (dateKeys.length > 0) setSelectedDate(dateKeys[0]);
      }
    };
    fetchProgram();
    fetchSlots();
    window.scrollTo(0,0);
  }, []);

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

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const openEmailModal = (bookingPayload) => {
    setPendingBookingData(bookingPayload);
    setNameInput(bookingPayload?.userName || bookingPayload?.fullName || '');
    setEmailInput(bookingPayload?.email || '');
    setNameError('');
    setEmailError('');
    setShowEmailModal(true);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
    setPendingBookingData(null);
    setNameInput('');
    setEmailInput('');
    setNameError('');
    setEmailError('');
  };

  const handleEmailModalSubmit = async (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setNameError('Please enter your full name');
      return;
    }
    if (!isValidEmail(emailInput)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setNameError('');
    setEmailError('');
    // Proceed with booking using the contact details from modal
    await proceedWithBooking({
      ...pendingBookingData,
      userName: nameInput.trim(),
      fullName: nameInput.trim(),
      email: emailInput.trim(),
    });
    closeEmailModal();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const opts = { weekday: 'short', day: 'numeric', month: 'short' };
    return d.toLocaleDateString('en-US', opts);
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleBookSlot = async () => {
    if (!selectedSlot) {
      alert('Please select a slot first.');
      return;
    }

    const finalName = formData.fullName || user?.name || user?.displayName || '';
    const bookingPayload = {
      slotId: selectedSlot._id,
      date: selectedSlot.startTime ? selectedSlot.startTime.split('T')[0] : selectedDate,
      time: selectedSlot.startTime || selectedSlot.timeLabel,
      purpose,
      userName: finalName,
      fullName: finalName,
      email: formData.email || user?.email || '',
      mobile: formData.mobile || user?.mobile || '',
      amount: selectedSlot.price || 499,
      duration: selectedSlot.duration || 59,
    };

    // If required details are missing, collect them in modal first
    if (!bookingPayload.email || !bookingPayload.userName) {
      openEmailModal(bookingPayload);
      return;
    }

    // Otherwise proceed with booking
    await proceedWithBooking(bookingPayload);
  };

  const proceedWithBooking = async (bookingPayload) => {
    setProcessing(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay.');
        setProcessing(false);
        return;
      }

      const resp = await bookingsAPI.create(bookingPayload);
      const { order, razorpayKeyId } = resp.data;

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'Elite Academy',
        description: `${program?.title || 'Mentorship'} - ${formatDate(selectedSlot.startTime)} ${formatTime(selectedSlot.startTime)}`,
        order_id: order.id,
        handler: function (razorpayResponse) {
          alert('Payment successful! 🎉\nYou will receive booking details via email.');
          navigate('/dashboard');
        },
        prefill: {
          name: bookingPayload.userName || bookingPayload.fullName,
          email: bookingPayload.email,
          contact: bookingPayload.mobile,
        },
        theme: { color: '#4f46e5' },
        modal: { ondismiss: () => setProcessing(false) }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error('Booking error:', err);
      alert(err.response?.data?.message || 'Failed to create booking.');
      setProcessing(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{program?.title || 'Mentorship'} | Elite Academy</title>
      </Helmet>

{loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-gray-400 text-lg">Loading available slots...</p>
          </div>
        ) : availableDates.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center text-4xl mb-6">
              📅
            </div>
            <p className="text-gray-300 text-xl font-semibold mb-2">No slots available</p>
            <p className="text-gray-500">Check back later for new availability</p>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
                {[
                  { num: 1, label: 'Select Date', icon: '📅' },
                  { num: 2, label: 'Choose Time', icon: '🕐' },
                  { num: 3, label: 'Confirm', icon: '✅' }
                ].map((s, i) => (
                  <div key={s.num} className="flex items-center">
                    <div className={`flex flex-col items-center ${step >= s.num ? 'opacity-100' : 'opacity-40'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-300 ${
                        step >= s.num 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent' 
                          : 'bg-white/5 border-white/20'
                      }`}>
                        {s.icon}
                      </div>
                      <span className="text-xs mt-2 text-gray-400">{s.label}</span>
                    </div>
                    {i < 2 && (
                      <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                        step > s.num ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/20'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div id="one-on-one-session"  className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-xl">
                      📅
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Select Date</h2>
                      <p className="text-xs text-gray-400">Choose your preferred day</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {availableDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedSlot(null);
                          setStep(2);
                        }}
                        className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-300 ${
                          selectedDate === date
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50'
                            : 'bg-white/5 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{formatDate(date)}</span>
                          <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                            {groupedSlots[date]?.length} slots
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-xl">
                      🕐
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Choose Time</h2>
                      <p className="text-xs text-gray-400">
                        {selectedDate ? formatDate(selectedDate) : 'Select a date first'}
                      </p>
                    </div>
                  </div>
                  
                  {selectedDate ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                      {groupedSlots[selectedDate]?.map((slot) => (
                        <button
                          key={slot._id}
                          onClick={() => {
                            setSelectedSlot(slot);
                            setStep(3);
                          }}
                          className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-300 ${
                            selectedSlot?._id === slot._id
                              ? 'bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/50'
                              : 'bg-white/5 hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-lg">{formatTime(slot.startTime)}</span>
                            <span className="text-sm bg-white/10 px-3 py-1 rounded-full font-semibold">
                              ₹{slot.price}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>⏱️</span>
                            <span>{slot.duration} minutes session</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-4xl mb-3 opacity-30">📅</div>
                      <p>Please select a date first</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-xl">
                      ✅
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Booking Summary</h2>
                      <p className="text-xs text-gray-400">Review and confirm</p>
                    </div>
                  </div>
                  
                  {selectedSlot ? (
                    <>
                      <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <span className="text-2xl">📅</span>
                          <div>
                            <p className="text-xs text-gray-400">Date</p>
                            <p className="font-semibold">{formatDate(selectedSlot.startTime)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <span className="text-2xl">🕐</span>
                          <div>
                            <p className="text-xs text-gray-400">Time</p>
                            <p className="font-semibold">{formatTime(selectedSlot.startTime)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <span className="text-2xl">💬</span>
                          <div>
                            <p className="text-xs text-gray-400">Duration</p>
                            <p className="font-semibold">{selectedSlot.duration} minutes</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                          <span className="text-3xl">💳</span>
                          <div className="flex-1">
                            <p className="text-xs text-gray-400">Total Amount</p>
                            <p className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                              ₹{selectedSlot.price}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="flex items-center gap-2 text-sm font-medium mb-3">
                          <span>💬</span>
                          Discussion Topic
                          <span className="text-gray-500">(Optional)</span>
                        </label>
                        <textarea
                          value={purpose}
                          onChange={(e) => setPurpose(e.target.value)}
                          placeholder="What would you like to discuss? Share your questions, doubts, or exam preparation goals..."
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                          rows="4"
                          maxLength="500"
                        />
                        <p className="text-xs text-gray-500 mt-2 text-right">
                          {purpose.length}/500 characters
                        </p>
                      </div>

                      <div className="mb-6 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl animate-fade-in">
                        <span className="text-blue-300 text-xl flex-shrink-0">📧</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white mb-1">After Payment</p>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            Please check your email (<span className="text-blue-300 font-medium">{user?.email}</span>) right after payment for session confirmation and next steps. The email will arrive within 5 minutes.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleBookSlot}
                        disabled={processing}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                          processing
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105'
                        }`}
                      >
                        {processing ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <span>💳</span>
                            Proceed to Payment
                          </span>
                        )}
                      </button>

                      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <p className="text-xs text-gray-300 text-center">
                          💡 Need help? Email us at{' '}
                          <a 
                            href="mailto:2025eliteacademy@gmail.com" 
                            className="text-yellow-400 hover:underline font-semibold"
                          >
                            2025eliteacademy@gmail.com
                          </a>
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-4xl mb-3 opacity-30">✅</div>
                      <p>Select date and time to continue</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl">
                📧
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-2">Enter Your Details</h3>
            <p className="text-gray-400 text-center mb-6 text-sm">
              We'll send your booking confirmation and session details to this email
            </p>

            <form onSubmit={handleEmailModalSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    setNameError('');
                  }}
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    nameError ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-blue-500'
                  }`}
                  autoFocus
                />
                {nameError && (
                  <p className="text-red-400 text-sm mt-2">{nameError}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    emailError ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-blue-500'
                  }`}
                />
                {emailError && (
                  <p className="text-red-400 text-sm mt-2">{emailError}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeEmailModal}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 rounded-lg font-semibold transition-all"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Mentorship;
