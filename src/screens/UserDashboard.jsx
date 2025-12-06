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
  const [groupedSlots, setGroupedSlots] = useState({});


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
      userEmail: user.email
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
            alert('🎉 Booking confirmed! Check your email for details.');
            setSelectedSlot(null);
            fetchSlots();
          }
        } catch (error) {
          console.error('Payment verification failed:', error);
          alert('Payment verification failed. Please contact support.');
        } finally {
          setProcessing(false);
        }
      },
      prefill: {
        name: user.displayName,
        email: user.email,
      },
      theme: {
        color: '#2563eb',
      },
      modal: {
        ondismiss: async function() {
          // User closed payment modal - release the slot
          try {
            await bookingsAPI.cancelPayment({ razorpay_order_id: razorpayOrderId });
            alert('Payment cancelled. The slot has been released.');
            fetchSlots(); // Refresh slots
          } catch (error) {
            console.error('Error cancelling payment:', error);
          }
          setProcessing(false);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  } catch (error) {
    console.error('Error booking slot:', error);
    alert(error.response?.data?.error || 'Failed to book slot');
    setProcessing(false);
    fetchSlots(); // Refresh to show updated availability
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
      
      // Group slots by date
      const grouped = response.data.reduce((acc, slot) => {
        const date = new Date(slot.startTime).toDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(slot);
        return acc;
      }, {});
      
      setGroupedSlots(grouped);
      
      // Auto-select first available date
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
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const availableDates = Object.keys(groupedSlots);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">EM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Elite Meet</h1>
                <p className="text-xs text-gray-500">Book your consultation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.displayName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading available slots...</p>
          </div>
        ) : slots.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Available Slots</h3>
            <p className="text-gray-600">Check back later for new availability</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Date Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Select a Date</h2>
                <div className="space-y-2">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedSlot(null);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition ${
                        selectedDate === date
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{formatDate(date)}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          selectedDate === date 
                            ? 'bg-white/20 text-white' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {groupedSlots[date].length} slots
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Time Slots & Booking */}
            <div className="lg:col-span-2 space-y-6">
              {/* Time Slots */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedDate && `Available Times for ${formatDate(selectedDate)}`}
                </h2>
                
                {selectedDate && groupedSlots[selectedDate] ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {groupedSlots[selectedDate].map((slot) => (
                      <button
                        key={slot._id}
                        onClick={() => setSelectedSlot(slot)}
                        disabled={processing}
                        className={`p-4 rounded-xl border-2 transition ${
                          selectedSlot?._id === slot._id
                            ? 'border-blue-600 bg-blue-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="text-center">
                          <p className={`font-semibold ${
                            selectedSlot?._id === slot._id ? 'text-blue-600' : 'text-gray-900'
                          }`}>
                            {formatTime(slot.startTime)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{slot.duration} min</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Select a date to see available times</p>
                )}
              </div>

              {/* Booking Summary */}
              {selectedSlot && (
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white animate-slideIn">
                  <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center pb-3 border-b border-white/20">
                      <span className="text-blue-100">Date</span>
                      <span className="font-medium">{formatDate(new Date(selectedSlot.startTime).toDateString())}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/20">
                      <span className="text-blue-100">Time</span>
                      <span className="font-medium">{formatTime(selectedSlot.startTime)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/20">
                      <span className="text-blue-100">Duration</span>
                      <span className="font-medium">{selectedSlot.duration} minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Price</span>
                      <span className="font-bold text-2xl">₹{selectedSlot.price}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBookSlot}
                    disabled={processing}
                    className={`w-full bg-white text-blue-600 font-semibold py-3 rounded-xl transition shadow-lg ${
                      processing 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-blue-50'
                    }`}
                  >
                    {processing ? 'Processing...' : 'Proceed to Payment'}
                  </button>

                  {!processing && (
                    <button
                      onClick={() => setSelectedSlot(null)}
                      className="w-full mt-3 bg-white/10 text-white font-medium py-2 rounded-xl hover:bg-white/20 transition"
                    >
                      Change Selection
                    </button>
                  )}
                </div>
              )}

              {/* Info Box */}
              {!selectedSlot && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">How it works</h4>
                      <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                        <li>Select a date from the calendar</li>
                        <li>Choose your preferred time slot</li>
                        <li>Review and confirm your booking</li>
                        <li>Complete payment via Razorpay</li>
                        <li>Receive confirmation email</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default UserDashboard;
