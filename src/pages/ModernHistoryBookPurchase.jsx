// src/pages/ModernHistoryBookPurchase.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { modernHistoryAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

function ModernHistoryBookPurchase() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [modernHistoryInfo, setModernHistoryInfo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModernHistoryInfo();
  }, []);

  const fetchModernHistoryInfo = async () => {
    try {
      const response = await modernHistoryAPI.getInfo();
      setModernHistoryInfo({
        ...response.data.modernHistory,
        originalPrice: response.data.modernHistory.price + 100
      });
    } catch (error) {
      console.error('Error fetching modern history info:', error);
      // Set default info if API fails
      setModernHistoryInfo({
        name: 'Complete Modern History Package',
        description: 'Complete PSSSB & Punjab Exams Modern History Package covering 1757-1947 period for scoring full marks',
        price: 199,
        originalPrice: 299,
        features: [
          '88 Pages Full Modern History Notes',
          '19 Pages PYQs (2012–2025)',
          'December 2025 Updated',
          '1757-1947 complete coverage'
        ],
        highlights: [
          'British East India Company & territorial expansion',
          'Indian Freedom Struggle movements in detail',
          'Important freedom fighters & their contributions',
          'Revolt of 1857 - causes, events & consequences',
          'Indian National Congress formation & sessions',
          'Gandhi Era & Non-cooperation movements',
          'Partition of India & Independence 1947',
          'Punjab\'s role in freedom struggle'
        ]
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
      alert('Please login first to purchase the Modern History Book');
      navigate('/dashboard');
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

      const response = await modernHistoryAPI.createPurchase();
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: 'Complete Modern History Package for PSSSB & Punjab Exams',
        order_id: order.id,
        handler: async function (razorpayResponse) {
          try {
            alert(
              "Payment successful! 🎉\n\n" +
              "The Modern History Book PDF will be sent to your email (" + user.email + ") within 5 minutes.\n\n" +
              "✅ 88 Pages Full Modern History Notes\n" +
              "✅ 19 Pages PYQs (2012–2025)\n" +
              "✅ Complete 1757-1947 coverage\n\n" +
              "Please check your inbox and spam folder.\n\n" +
              "If you don't receive the email, please contact us at 2025eliteacademy@gmail.com."
            );
            setProcessing(false);
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert(
              'Payment successful but verification failed.\n\n' +
              'The Modern History Book PDF should be sent to your email shortly.\n' +
              'If you don\'t receive it, please email us at 2025eliteacademy@gmail.com with your payment details.'
            );
            setProcessing(false);
          }
        },
        prefill: {
          name: user.displayName || user.email?.split('@')[0] || 'Student',
          email: user.email,
        },
        theme: {
          color: '#f97316', // Orange color for Modern History
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
      console.error('Error creating modern history purchase:', error);
      alert(
        "There was an issue processing your payment.\n\n" +
        "If the amount was debited but you don't receive the PDF, " +
        "please email us at 2025eliteacademy@gmail.com with your payment details."
      );
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Complete Modern History Package - Elite Academy</title>
        <meta name="description" content="Complete Modern History (1757-1947) preparation for PSSSB & Punjab Exams. 88 pages notes + 19 pages PYQs." />
      </Helmet>

      <div className="min-h-screen bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">📜</div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Complete Modern History Package
            </h1>
            <p className="text-gray-400 text-lg">For PSSSB & Punjab Exams</p>
            <p className="text-gray-500 text-sm mt-2">1757 - 1947 Complete Coverage</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {modernHistoryInfo.features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">
                  {index === 0 && '📖'}
                  {index === 1 && '📝'}
                  {index === 2 && '🔥'}
                  {index === 3 && '🇮🇳'}
                </div>
                <p className="text-sm text-gray-300">{feature}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-orange-500/20 rounded-3xl p-8 mb-12">
            <p className="text-gray-300 text-lg leading-relaxed">
              {modernHistoryInfo.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-3xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-orange-400">🌟 Key Highlights</h2>
            <ul className="space-y-3">
              {modernHistoryInfo.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">✓</span>
                  <span className="text-gray-300">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price & Purchase */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500 rounded-3xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Special Price</h3>
            <div className="flex items-baseline justify-center gap-4 mb-6">
              <span className="text-5xl font-black text-white">₹{modernHistoryInfo.price}</span>
              <span className="text-2xl text-gray-500 line-through">₹{modernHistoryInfo.originalPrice}</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">One-time payment • Instant delivery</p>
            
            <button
              onClick={handlePurchase}
              disabled={processing}
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {processing ? 'Processing...' : '🎯 Buy Now - Get Instant Access'}
            </button>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <p className="text-sm text-orange-300 mb-2">📧 After Payment</p>
              <p className="text-xs text-gray-300">
                The Modern History Book PDF will be sent to your email ({user?.email || 'your email'}) within 5 minutes after successful payment.
                Please check your inbox and spam folder.
              </p>
            </div>
          </div>

          {/* Why Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold mb-2">Exam Focused</h4>
              <p className="text-sm text-gray-400">100% aligned with PSSSB & Punjab exam patterns</p>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <div className="text-3xl mb-3">🇮🇳</div>
              <h4 className="font-bold mb-2">Complete Coverage</h4>
              <p className="text-sm text-gray-400">British rule to Independence - all major events</p>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <div className="text-3xl mb-3">🔥</div>
              <h4 className="font-bold mb-2">Latest Updates</h4>
              <p className="text-sm text-gray-400">December 2025 updated with latest PYQs</p>
            </div>
          </div>

          {/* Help */}
          <p className="text-center text-gray-500 text-sm mt-12">
            💡 Need help? Email us at{' '}
            <a href="mailto:2025eliteacademy@gmail.com" className="text-orange-400 hover:underline">
              2025eliteacademy@gmail.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default ModernHistoryBookPurchase;
