// src/pages/WithoutPolityPackPurchase.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedUser } from '../utils/authHelper';
import { booksAPI } from '../services/api';
import { Helmet } from '@dr.pogodin/react-helmet';

function WithoutPolityPackPurchase() {
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
      const response = await booksAPI.getPackageInfo('without-polity');
      setPackageInfo(response.data.package);
      console.log('Fetched without polity pack info:', response.data.package);
    } catch (error) {
      console.error('Error fetching without polity pack info:', error);
      // Fallback data
      setPackageInfo({
        name: 'All Books Except Polity',
        description: 'Already have Polity? Get the remaining 7 books at discounted price',
        price: 899,
        originalPrice: 1393,
        features: [
          '7 Subject Books (540+ pages)',
          'Complete PYQs Collection (120+ pages)',
          'Save ₹494 (35% discount)',
          'Perfect for existing Polity buyers',
          'Email delivery within 5 minutes'
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
      alert('Please login first to purchase this package');
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

      const response = await booksAPI.createPackagePurchase('without-polity');
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: 'All Books Except Polity - PSSSB & Punjab Exams',
        order_id: order.id,
        handler: async function (razorpayResponse) {
          try {
            alert(
              "Payment successful! 🎉\n\n" +
              "All 7 Books PDFs (except Polity) will be sent to your email (" + user.email + ") within 5 minutes.\n\n" +
              "✅ 540+ Pages Complete Study Material\n" +
              "✅ 120+ Pages PYQs (2012–2025)\n" +
              "✅ 7 Subjects Covered\n\n" +
              "Please check your inbox and spam folder.\n\n" +
              "If you don't receive the email, please contact us at 2025eliteacademy@gmail.com."
            );
            setProcessing(false);
            navigate('/dashboard');
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert(
              'Payment successful but verification failed.\n\n' +
              'The package PDFs should be sent to your email shortly.\n' +
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
          color: '#f97316', // Orange color
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
      console.error('Error creating package purchase:', error);
      
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
        <title>All Books Except Polity - Elite Academy</title>
        <meta name="description" content="Get 7 books (except Polity) at discounted price for PSSSB & Punjab Exams" />
      </Helmet>

      <div className="min-h-screen bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">📦</div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              {packageInfo?.name}
            </h1>
            <p className="text-gray-400 text-lg">For PSSSB & Punjab Exams</p>
            <div className="mt-4 inline-block bg-orange-500/20 border border-orange-500/30 px-4 py-2 rounded-full">
              <span className="text-orange-400 font-bold">🔥 POPULAR - Save ₹494</span>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {packageInfo?.features?.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6 text-center"
              >
                <div className="text-3xl mb-3">
                  {index === 0 ? '📚' : index === 1 ? '📝' : index === 2 ? '💰' : index === 3 ? '✅' : '📧'}
                </div>
                <p className="text-sm text-gray-300">{feature}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-orange-500/20 rounded-3xl p-8 mb-12">
            <p className="text-gray-300 text-lg leading-relaxed">
              {packageInfo?.description}
            </p>
          </div>

          {/* All Books Included */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-3xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-orange-400">📚 7 Books Included</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {['Economics', 'Geography', 'Environment', 'Science', 'Modern History', 'Ancient History', 'Medieval History'].map((book, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-orange-400">✓</span>
                  <span className="text-gray-300">{book}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">* Polity book not included in this package</p>
          </div>

          {/* Price & Purchase */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500 rounded-3xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Special Bundle Price</h3>
            <div className="flex items-baseline justify-center gap-4 mb-6">
              <span className="text-5xl font-black text-white">₹{packageInfo?.price}</span>
              <span className="text-2xl text-gray-500 line-through">₹{packageInfo?.originalPrice}</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">One-time payment • Instant delivery • Lifetime access</p>

            <button
              onClick={handlePurchase}
              disabled={processing}
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {processing ? '🔄 Processing...' : '📦 Buy This Package Now'}
            </button>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <p className="text-sm text-orange-300 mb-2">📧 After Payment</p>
              <p className="text-xs text-gray-300">
                All 7 Books PDFs will be sent to your email ({user?.email || 'your email'}) within 5 minutes after successful payment. Please check your inbox and spam folder.
              </p>
            </div>

            <div className='mb-2'/>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <p className="text-sm text-orange-300 mb-2">🥀 Payment Issue</p>
              <p className="text-xs text-gray-300">
                If your payment is not processing correctly or you experience any problems, please email us at{' '}
                <a href="mailto:2025eliteacademy@gmail.com" className="text-orange-400 hover:underline">
                  2025eliteacademy@gmail.com
                </a>
                 for manual confirmation and assistance.
              </p>
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

export default WithoutPolityPackPurchase;
