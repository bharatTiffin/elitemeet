import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { slotsAPI, bookingsAPI } from '../services/api';

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [purpose, setPurpose] = useState('');
  const [groupedSlots, setGroupedSlots] = useState({});
  const [step, setStep] = useState(1); // 1: Date, 2: Time, 3: Details

  // [Previous functions remain the same - handleBookSlot, handleSignOut, fetchSlots, etc.]
  const handleBookSlot = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    setProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay. Please check your internet connection.');
        setProcessing(false);
        return;
      }

      const response = await bookingsAPI.create({
        slotId: selectedSlot._id,
        userName: user.displayName,
        userEmail: user.email,
        purpose: purpose
      });

      const { razorpayOrderId, razorpayKeyId, amount, currency } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: currency,
        name: 'Elite Meet',
        description: `Consultation - ${selectedSlot.duration} mins`,
        order_id: razorpayOrderId,
        handler: async function (razorpayResponse) {
          try {
            const verifyResponse = await bookingsAPI.verifyPayment({
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              alert(
                "Payment successful! Your booking will be confirmed shortly.\n\n" +
                "Please check your email in the next 5 minutes for confirmation.\n" +
                "If you don't receive an email, please contact us at johnny90566@gmail.com."
              );
              setSelectedSlot(null);
              setPurpose('');
              setStep(1);
              setProcessing(false);
              fetchSlots();
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert(
              'Payment verification failed.\n\n' +
              'If amount was debited, please email us at johnny90566@gmail.com with your payment details.'
            );
          } finally {
            setProcessing(false);
          }
        },
        prefill: {
          name: user.displayName,
          email: user.email,
        },
        theme: {
          color: '#3b82f6',
        },
        modal: {
          ondismiss: async function() {
            try {
              await bookingsAPI.cancelPayment({
                razorpayOrderId: razorpayOrderId
              });
              alert('Payment cancelled. The slot has been released.');
              fetchSlots();
            } catch (error) {
              console.error('Error cancelling payment:', error);
            }
            setProcessing(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', async function (response) {
        console.error('Payment failed:', response.error);
        try {
          await bookingsAPI.cancelPayment({
            razorpayOrderId: razorpayOrderId
          });
          alert('Payment failed. The slot has been released. Please try again.');
          fetchSlots();
        } catch (error) {
          console.error('Error cancelling payment:', error);
        }
        setProcessing(false);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Error booking slot:', error);
      alert(
        "There was an issue processing your payment.\n\n" +
        "If the amount was debited but the booking is not confirmed in some time, " +
        "please email us at johnny90566@gmail.com with your payment details."
      );
      setProcessing(false);
      fetchSlots();
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const response = await slotsAPI.getAvailable();
      setSlots(response.data);

      const grouped = response.data.reduce((acc, slot) => {
        const date = new Date(slot.startTime).toDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(slot);
        return acc;
      }, {});

      setGroupedSlots(grouped);

      if (Object.keys(grouped).length > 0) {
        setSelectedDate(Object.keys(grouped)[0]);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
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

  useEffect(() => {
    fetchSlots();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const availableDates = Object.keys(groupedSlots);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <nav className="relative border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl">
                📅
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Book Consultation
                </h1>
                <p className="text-xs text-gray-400">Expert Government Exam Mentorship</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-sm">
                  👤
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.displayName}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-full transition-all duration-300 text-red-400"
              >
                <span>🚪</span>
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-12">
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
            {/* Progress Steps */}
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Step 1: Date Selection */}
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

              {/* Step 2: Time Slots */}
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

              {/* Step 3: Booking Summary & Details */}
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

                      {/* Purpose Input */}
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

                      {/* Help Section */}
                      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <p className="text-xs text-gray-300 text-center">
                          💡 Need help? Email us at{' '}
                          <a 
                            href="mailto:johnny90566@gmail.com" 
                            className="text-yellow-400 hover:underline font-semibold"
                          >
                            johnny90566@gmail.com
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
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
}

export default UserDashboard;