import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { pdfAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

function PDFPurchasePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [pdfInfo, setPdfInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchPDFInfo();
  }, []);

  const fetchPDFInfo = async () => {
    try {
      setLoading(true);
      const response = await pdfAPI.getInfo();
      setPdfInfo(response.data.pdf);
    } catch (error) {
      console.error('Error fetching PDF info:', error);
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
      alert('Please sign in to purchase the PDF');
      navigate('/');
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

      const response = await pdfAPI.createPurchase();
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Meet',
        description: 'Elite Academy Magazine - PSSSB Exam Preparation Guide',
        order_id: order.id,
        handler: async function (razorpayResponse) {
          try {
            alert(
              "Payment successful! 🎉\n\n" +
              "The PDF has been sent to your email (" + user.email + ").\n" +
              "Please check your inbox and spam folder.\n\n" +
              "If you don't receive the email within 5 minutes, please contact us at 2025eliteacademy@gmail.com."
            );
            setProcessing(false);
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert(
              'Payment successful but verification failed.\n\n' +
              'The PDF should be sent to your email shortly.\n' +
              'If you don\'t receive it, please email us at 2025eliteacademy@gmail.com with your payment details.'
            );
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
      console.error('Error creating purchase:', error);
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-gray-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!pdfInfo) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Failed to load PDF information</p>
      </div>
    );
  }

  return (
    <>
    <Helmet>
      <title>Study Guide - Elite Academy Magazine</title>
      <meta name="description" content="Elite Academy PSSSB exam preparation guide with exam-oriented facts and questions" />
    </Helmet>
    
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <nav className="relative border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
            {user && (
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-sm">
                  👤
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.displayName}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* PDF Info Card */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl mb-8">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <span className="text-6xl">📚</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {pdfInfo.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6">
              {pdfInfo.description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {pdfInfo.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <span className="text-2xl">✓</span>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 mb-8 border border-blue-500/30">
            <h3 className="text-xl font-bold mb-4 text-white">What's Inside:</h3>
            <ul className="space-y-2">
              {pdfInfo.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-200">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price and Purchase */}
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl"></div>
            <div className="relative">
              <div className="text-center mb-6">
                <div className="text-5xl sm:text-6xl font-black mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  ₹{pdfInfo.price}
                </div>
                <div className="text-sm sm:text-base text-gray-300">One-time payment</div>
              </div>

              {/* Email Notice */}
              <div className="mb-6 flex items-start gap-3 p-4 bg-black/30 rounded-xl border border-white/10">
                <span className="text-blue-300 text-xl flex-shrink-0">📧</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white mb-1">After Payment</p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    The PDF will be sent to your email ({user?.email || 'your email'}) within 5 minutes after successful payment. Please check your inbox and spam folder.
                  </p>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={processing || !user}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  processing || !user
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105'
                }`}
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : !user ? (
                  'Please Sign In to Purchase'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>💳</span>
                    Buy Now - ₹{pdfInfo.price}
                  </span>
                )}
              </button>

              <p className="text-center text-xs sm:text-sm text-gray-400 mt-4">
                Secure payment via Razorpay
              </p>
            </div>
          </div>

          {/* Help Section */}
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
        </div>
      </div>
    </div>
    </>
  );
}

export default PDFPurchasePage;

