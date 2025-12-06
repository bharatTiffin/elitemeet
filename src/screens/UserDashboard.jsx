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
              // alert('🎉 Booking confirmed! Check your email for details.');
              alert(
                "Payment successful! Your booking will be confirmed shortly.\n\n" +
                "Please check your email in the next 5 minutes for confirmation.\n" +
                "If you don't receive an email, please contact us at johnny90566@gmail.com."
              );
              setSelectedSlot(null);
              setPurpose(''); // Clear purpose after booking
              fetchSlots();
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            // alert('Payment verification failed. Please contact support.');
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
          color: '#2563eb',
        },
        modal: {
          ondismiss: async function() {
            try {
              await bookingsAPI.cancelPayment({
                razorpay_order_id: razorpayOrderId
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
      paymentObject.open();
    } catch (error) {
      console.error('Error booking slot:', error);
      // alert(error.response?.data?.error || 'Failed to book slot');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Book your consultation</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">{user?.displayName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading available slots...</p>
          </div>
        ) : availableDates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No slots available at the moment.</p>
            <p className="text-gray-500 mt-2">Check back later for new availability</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Date Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Select Date</h2>
                <div className="space-y-2">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedSlot(null);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition ${
                        selectedDate === date
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle: Time Slots */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  {selectedDate ? 'Available Times' : 'Select a date to see available times'}
                </h2>
                {selectedDate && (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {groupedSlots[selectedDate]?.map((slot) => (
                      <button
                        key={slot._id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${
                          selectedSlot?._id === slot._id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{formatTime(slot.startTime)}</span>
                          <span className="text-sm">₹{slot.price}</span>
                        </div>
                        <div className="text-sm opacity-80 mt-1">
                          {slot.duration} minutes
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>


            {/* Right: Booking Summary & Purpose */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Booking Summary</h2>
                
                {selectedSlot ? (
                  <>
                    <div className="space-y-3 mb-6 pb-6 border-b">
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium">{formatDate(selectedSlot.startTime)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-medium">{formatTime(selectedSlot.startTime)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-medium">{selectedSlot.duration} minutes</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="font-medium text-lg text-blue-600">₹{selectedSlot.price}</p>
                      </div>
                    </div>

                    {/* Purpose/Topic Input */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purpose / Topic to Discuss <span className="text-gray-400">(Optional)</span>
                      </label>
                      <textarea
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="What would you like to discuss? Share your questions or doubts..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows="4"
                        maxLength="500"
                      />
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        {purpose.length}/500 characters
                      </p>
                    </div>

                    <button
                      onClick={handleBookSlot}
                      disabled={processing}
                      className={`w-full py-3 rounded-lg font-semibold transition ${
                        processing
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {processing ? 'Processing...' : 'Book Now'}
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Select a time slot to continue
                  </p>
                )}


{selectedSlot && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 text-center">
                  💡 Having payment issues? Email us at{' '}
                  <a 
                    href="mailto:johnny90566@gmail.com" 
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    johnny90566@gmail.com
                  </a>
                </p>
              </div>
            )}

              </div>
            </div>


            
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
