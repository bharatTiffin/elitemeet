// src/pages/CompletePackPurchase.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedUser } from '../utils/authHelper';
import { booksAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

function CompletePackPurchase() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getAuthenticatedUser);
  const [packageInfo, setPackageInfo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackageInfo();
  }, []);

  const fetchPackageInfo = async () => {
    try {
      console.log('Fetching complete pack info from API...');
      const response = await booksAPI.getPackageInfo('complete-pack');
      console.log('API response for complete pack info:', response.data);
      setPackageInfo(response.data.package);
      console.log('Fetched complete pack info:', response.data.package);
    } catch (error) {
      console.error('Error fetching complete pack info:', error);
      // Fallback data
    //   setPackageInfo({
    //     name: 'Complete Pack (All 8 Books)',
    //     description: 'Get all 8 subjects at massive discount — Complete exam preparation',
    //     price: 999,
    //     originalPrice: 1592,
    //     features: [
    //       'All 8 Subject Books (630+ pages)',
    //       'Complete PYQs Collection (140+ pages)',
    //       'Save ₹593 (37% discount)',
    //       'Lifetime access to all PDFs',
    //       'Email delivery within 5 minutes'
    //     ]
    //   });
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
      alert('Please login first to purchase the Complete Pack');
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

      const response = await booksAPI.createPackagePurchase('complete-pack');
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: 'Complete Pack - All 8 Books for PSSSB & Punjab Exams',
        order_id: order.id,
        handler: async function (razorpayResponse) {
          try {
            alert(
              "Payment successful! 🎉\n\n" +
              "All 8 Books PDFs will be sent to your email (" + user.email + ") within 5 minutes.\n\n" +
              "✅ 630+ Pages Complete Study Material\n" +
              "✅ 140+ Pages PYQs (2012–2025)\n" +
              "✅ All 8 Subjects Covered\n\n" +
              "Please check your inbox and spam folder.\n\n" +
              "If you don't receive the email, please contact us at 2025eliteacademy@gmail.com."
            );
            setProcessing(false);
            navigate('/dashboard');
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert(
              'Payment successful but verification failed.\n\n' +
              'The Complete Pack PDFs should be sent to your email shortly.\n' +
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
          color: '#10b981', // Green color for Complete Pack
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
      console.error('Error creating complete pack purchase:', error);
      
      if (error.response?.data?.error) {
        alert(error.response.data.error + '\n\n' + (error.response.data.suggestion || ''));
      } else {
        alert(
          "There was an issue processing your payment.\n\n" +
          "If the amount was debited but you don't receive the PDFs, " +
          "please email us at 2025eliteacademy@gmail.com with your payment details."
        );
      }
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
        <title>Complete Pack (All 8 Books) - Elite Academy</title>
        <meta name="description" content="Get all 8 books at massive discount - Complete PSSSB & Punjab Exam preparation" />
      </Helmet>

      <div className="min-h-screen bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🎁</div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {packageInfo?.name}
            </h1>
            <p className="text-gray-400 text-lg">For PSSSB & Punjab Exams</p>
            <div className="mt-4 inline-block bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-full">
              <span className="text-green-400 font-bold">🎉 BEST VALUE - Save ₹593</span>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {packageInfo?.features?.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6 text-center"
              >
                <div className="text-3xl mb-3">
                  {index === 0 ? '📚' : index === 1 ? '📝' : index === 2 ? '💰' : index === 3 ? '🔓' : '📧'}
                </div>
                <p className="text-sm text-gray-300">{feature}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-green-500/20 rounded-3xl p-8 mb-12">
            <p className="text-gray-300 text-lg leading-relaxed">
              {packageInfo?.description}
            </p>
          </div>

          {/* All Books Included */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-3xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-green-400">📚 All 8 Books Included</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {['Polity', 'Economics', 'Geography', 'Environment', 'Science', 'Modern History', 'Ancient History', 'Medieval History'].map((book, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">{book}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price & Purchase */}
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-3xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Special Bundle Price</h3>
            <div className="flex items-baseline justify-center gap-4 mb-6">
              <span className="text-5xl font-black text-white">₹{packageInfo?.price}</span>
              <span className="text-2xl text-gray-500 line-through">₹{packageInfo?.originalPrice}</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">One-time payment • Instant delivery • Lifetime access</p>

            <button
              onClick={handlePurchase}
              disabled={processing}
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {processing ? '🔄 Processing...' : '🎁 Buy Complete Pack Now'}
            </button>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-sm text-green-300 mb-2">📧 After Payment</p>
              <p className="text-xs text-gray-300">
                All 8 Books PDFs will be sent to your email ({user?.email || 'your email'}) within 5 minutes after successful payment. Please check your inbox and spam folder.
              </p>
            </div>


                        <div className='mb-2'/>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-sm text-green-300 mb-2">🥀 Payment Issue</p>
              <p className="text-xs text-gray-300">
                If your payment is not processing correctly or you experience any problems, please email us at{' '}
                <a href="mailto:2025eliteacademy@gmail.com" className="text-green-400 hover:underline">
                  2025eliteacademy@gmail.com
                </a>
                 for manual confirmation and assistance.
              </p>
            </div>
          </div>

          {/* Help */}
          <p className="text-center text-gray-500 text-sm mt-12">
            💡 Need help? Email us at{' '}
            <a href="mailto:2025eliteacademy@gmail.com" className="text-green-400 hover:underline">
              2025eliteacademy@gmail.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default CompletePackPurchase;
