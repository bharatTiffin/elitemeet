import { useState } from 'react';
import { auth } from '../config/firebase';
import { mentorshipAPI } from '../services/api';

function MentorshipEnrollmentModal({ program, onClose, onEnrollmentSuccess }) {
  const [processing, setProcessing] = useState(false);
  const user = auth.currentUser;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleEnroll = async () => {
    if (!user) {
      alert('Please sign in to enroll');
      return;
    }

    if (program.availableSeats <= 0) {
      alert('Sorry, all seats are booked!');
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

      const response = await mentorshipAPI.createEnrollment({});

      const { order } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Elite Meet',
        description: 'Full Mentor Guidance Program',
        order_id: order.id,
        handler: async function (razorpayResponse) {
          try {
            // Payment successful - webhook will handle confirmation
            alert(
              "Payment successful! Your enrollment will be confirmed shortly.\n\n" +
              "Please check your email (" + user.email + ") in the next 5 minutes for confirmation.\n" +
              "If you don't receive an email, please contact us at 2025eliteacademy@gmail.com."
            );
            onEnrollmentSuccess();
            onClose();
          } catch (error) {
            console.error('Payment processing error:', error);
            alert(
              'Payment completed but there was an issue processing it.\n\n' +
              'If amount was debited, please email us at 2025eliteacademy@gmail.com with your payment details.'
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
          ondismiss: function() {
            setProcessing(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert('Payment failed. Please try again.');
        setProcessing(false);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Error creating enrollment:', error);
      const errorMessage = error.response?.data?.error || 'Failed to create enrollment. Please try again.';
      alert(errorMessage);
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-1 sm:mb-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Full Mentor Guidance Program
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">Transform your preparation journey</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl sm:text-3xl flex-shrink-0"
          >
            ×
          </button>
        </div>

        {/* Program Details */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          {/* Features */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">What's Included:</h3>
            <ul className="space-y-2 sm:space-y-3">
              {program.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <span className="text-green-400 text-lg sm:text-xl mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing & Seats */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-500/30">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black mb-1 sm:mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  ₹{program.price.toLocaleString('en-IN')}
                </div>
                <div className="text-gray-300 text-xs sm:text-sm">One-time payment</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="text-center">
                <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Available Seats</div>
                <div className="text-2xl sm:text-3xl font-bold text-green-400">
                  {program.availableSeats} / {program.totalSeats}
                </div>
                {program.availableSeats <= 2 && program.availableSeats > 0 && (
                  <div className="text-yellow-400 text-xs sm:text-sm font-semibold mt-1 sm:mt-2">
                    ⚠️ Only {program.availableSeats} left!
                  </div>
                )}
                {program.availableSeats === 0 && (
                  <div className="text-red-400 text-xs sm:text-sm font-semibold mt-1 sm:mt-2">
                    ❌ All seats booked
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                👤
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white text-sm sm:text-base truncate">{user?.displayName}</p>
                <p className="text-xs sm:text-sm text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Email Notice */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-blue-300 text-lg sm:text-xl flex-shrink-0">📧</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-white mb-1">After Payment</p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Please check your email ({user?.email}) right after payment for enrollment confirmation and next steps. The email will arrive within 5 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 border border-gray-600/50"
          >
            Cancel
          </button>
          <button
            onClick={handleEnroll}
            disabled={processing || program.availableSeats === 0}
            className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
              processing || program.availableSeats === 0
                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50'
            }`}
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-xs sm:text-sm">Processing...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>💳</span>
                <span className="text-xs sm:text-sm">Enroll Now - ₹{program.price.toLocaleString('en-IN')}</span>
              </span>
            )}
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-xs text-gray-300 text-center">
            💡 Need help? Email us at{' '}
            <a 
              href="mailto:2025eliteacademy@gmail.com" 
              className="text-yellow-400 hover:underline font-semibold break-all"
            >
              2025eliteacademy@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MentorshipEnrollmentModal;

