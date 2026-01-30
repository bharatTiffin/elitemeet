import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { monthlyCurrentAffairAPI } from '../services/api';
import { auth } from '../config/firebase';

function MonthlyCurrentAffairs() {
  const navigate = useNavigate();
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedMagazine, setSelectedMagazine] = useState(null);
  const [userPurchases, setUserPurchases] = useState([]);
  const [completePackInfo, setCompletePackInfo] = useState(null);
  const [user, setUser] = useState(() => {
    // Check manual auth token first
    const manualAuthToken = localStorage.getItem('manualAuthToken');
    if (manualAuthToken) {
      try {
        return JSON.parse(manualAuthToken);
      } catch (error) {
        console.error('Error parsing manual auth token:', error);
      }
    }
    // Fallback to Firebase auth
    return auth.currentUser;
  });

  useEffect(() => {
    fetchMagazines();
    fetchUserPurchases();
    fetchCompletePackInfo();
  }, []);

  useEffect(() => {
    // Refetch complete pack info when user purchases change
    if (magazines.length > 0) {
      fetchCompletePackInfo();
    }
  }, [userPurchases, magazines]);

  const fetchMagazines = async () => {
    try {
      const response = await monthlyCurrentAffairAPI.getAllMagazines();
      setMagazines(response.data.magazines);
    } catch (error) {
      console.error('Error fetching magazines:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPurchases = async () => {
    try {
      const response = await monthlyCurrentAffairAPI.getMyPurchases();
      setUserPurchases(response.data.purchases);
    } catch (error) {
      console.error('Error fetching user purchases:', error);
    }
  };

  const fetchCompletePackInfo = async () => {
    try {
      // Get complete pack pricing info by simulating a purchase request
      // We'll create a temporary order to get pricing info, then cancel it
      const response = await monthlyCurrentAffairAPI.createCompletePackPurchase();
      const { magazinesIncluded, magazinesCount } = response.data;
      
      // Calculate the actual price for remaining magazines
      const remainingMagazines = magazines.filter(mag => magazinesIncluded.includes(mag.month));
      const remainingPrice = remainingMagazines.reduce((sum, mag) => sum + mag.price, 0);
      
      setCompletePackInfo({
        magazinesCount,
        magazinesIncluded,
        remainingPrice,
        totalMagazines: magazines.length,
        totalValue: magazines.reduce((sum, mag) => sum + mag.price, 0)
      });
    } catch (error) {
      console.error('Error fetching complete pack info:', error);
      // If user already has complete pack or all magazines, set info accordingly
      const ownedMonths = userPurchases
        .filter(p => p.purchaseType === 'single' && p.status === 'completed')
        .map(p => p.month);
      
      const availableMonths = magazines
        .map(m => m.month)
        .filter(month => !ownedMonths.includes(month));
      
      setCompletePackInfo({
        magazinesCount: availableMonths.length,
        magazinesIncluded: availableMonths,
        remainingPrice: 0,
        totalMagazines: magazines.length,
        totalValue: magazines.reduce((sum, mag) => sum + mag.price, 0),
        alreadyOwned: availableMonths.length === 0
      });
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

  const handleMagazinePurchase = async (magazine) => {
    setProcessing(true);
    setSelectedMagazine(magazine);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay. Please check your internet connection.');
        setProcessing(false);
        return;
      }

      const response = await monthlyCurrentAffairAPI.createMagazinePurchase(magazine.month);
      const { order, razorpayKeyId, magazineTitle } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: `${magazineTitle} - Monthly Current Affairs Magazine`,
        order_id: order.id,
        handler: async function (razorpayResponse) {
          try {
            alert(
              "Payment successful! 🎉\n\n" +
              "The magazine has been sent to your email (" + (user?.email || 'your registered email') + ").\n" +
              "Please check your inbox and spam folder.\n\n" +
              "If you don't receive the email within 5 minutes, please contact us at 2025eliteacademy@gmail.com."
            );
            setProcessing(false);
            setSelectedMagazine(null);
            fetchUserPurchases(); // Refresh user purchases
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert(
              'Payment successful but verification failed.\n\n' +
              'The magazine should be sent to your email shortly.\n' +
              'If you don\'t receive it, please email us at 2025eliteacademy@gmail.com with your payment details.'
            );
            setProcessing(false);
            setSelectedMagazine(null);
          }
        },
        prefill: {
          name: user?.displayName || user?.name || user?.email || 'User',
          email: user?.email || '',
        },
        theme: {
          color: '#ef4444',
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
            setSelectedMagazine(null);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert('Payment failed. Please try again.');
        setProcessing(false);
        setSelectedMagazine(null);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Error creating magazine purchase:', error);
      if (error.response?.data?.alreadyPurchased) {
        alert('You have already purchased this magazine. Please check your email for the download link.');
      } else {
        alert(
          "There was an issue processing your payment.\n\n" +
          "If the amount was debited but you don't receive the magazine, " +
          "please email us at 2025eliteacademy@gmail.com with your payment details."
        );
      }
      setProcessing(false);
      setSelectedMagazine(null);
    }
  };

  const handleCompletePackPurchase = async () => {
    setProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay. Please check your internet connection.');
        setProcessing(false);
        return;
      }

      const response = await monthlyCurrentAffairAPI.createCompletePackPurchase();
      const { order, razorpayKeyId, magazinesIncluded, magazinesCount } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
        description: `Complete Pack - ${magazinesCount} Monthly Current Affairs Magazines`,
        order_id: order.id,
        handler: async function (razorpayResponse) {
          try {
            alert(
              "Payment successful! 🎉\n\n" +
              `${magazinesCount} magazines have been sent to your email (${user?.email || 'your registered email'}).\n` +
              "Please check your inbox and spam folder.\n\n" +
              "If you don't receive the email within 5 minutes, please contact us at 2025eliteacademy@gmail.com."
            );
            setProcessing(false);
            fetchUserPurchases(); // Refresh user purchases
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert(
              'Payment successful but verification failed.\n\n' +
              'The magazines should be sent to your email shortly.\n' +
              'If you don\'t receive them, please email us at 2025eliteacademy@gmail.com with your payment details.'
            );
            setProcessing(false);
          }
        },
        prefill: {
          name: user?.displayName || user?.name || user?.email || 'User',
          email: user?.email || '',
        },
        theme: {
          color: '#ef4444',
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
      if (error.response?.data?.alreadyPurchased) {
        alert('You have already purchased the complete pack or own all available magazines. Please check your email for the download links.');
      } else {
        alert(
          "There was an issue processing your payment.\n\n" +
          "If the amount was debited but you don't receive the magazines, " +
          "please email us at 2025eliteacademy@gmail.com with your payment details."
        );
      }
      setProcessing(false);
    }
  };

  const checkIfPurchased = (month) => {
    return userPurchases.some(purchase => 
      (purchase.month === month || purchase.monthsIncluded?.includes(month)) && 
      purchase.status === 'completed'
    );
  };

  const getCompletePackStatus = () => {
    const completePackPurchase = userPurchases.find(p => 
      p.purchaseType === 'complete-pack' && p.status === 'completed'
    );
    return completePackPurchase || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading monthly magazines...</div>
      </div>
    );
  }

  const completePackPurchase = getCompletePackStatus();

  return (
    <>
      <Helmet>
        <title>Monthly Current Affairs - Elite Academy | Competitive Exam Preparation</title>
        <meta 
          name="description" 
          content="Stay updated with monthly current affairs magazines for PSSSB, SSC, and other competitive exams. Instant PDF delivery." 
        />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm text-red-400 border border-red-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-red-500/10">
                📰 Monthly Current Affairs Magazine
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Stay Updated
            </h1>
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
              Monthly Current Affairs Compilation
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Exam-focused current affairs • Previous year questions • Latest updates • 
              <span className="text-white font-semibold"> Perfect for competitive exams</span>
            </p>
          </div>

          {/* Complete Pack Section */}
          {!completePackPurchase && (
            <div className="mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-2 border-red-500/30 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="absolute -top-3 right-6">
                    <span className="bg-green-500 text-white text-xs px-4 py-1.5 rounded-full font-bold shadow-lg">
                      BEST VALUE
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 blur-3xl rounded-3xl opacity-30"></div>

                  <div className="relative">
                    <div className="text-5xl mb-4">🎁</div>
                    <h3 className="text-2xl font-bold mb-2">Complete Pack - All Magazines</h3>
                    <p className="text-gray-400 text-sm mb-6">
                      {completePackInfo && completePackInfo.magazinesCount < magazines.length
                        ? `Get the remaining ${completePackInfo.magazinesCount} magazines you don't own yet at special discount`
                        : 'Get all available monthly magazines at special discount and stay updated throughout the year'
                      }
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">
                          {completePackInfo ? completePackInfo.magazinesCount : magazines.length}
                        </div>
                        <div className="text-xs text-gray-300">
                          {completePackInfo && completePackInfo.magazinesCount < magazines.length 
                            ? 'New Magazines' 
                            : 'Magazines Included'
                          }
                        </div>
                      </div>
                      <div className="bg-pink-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">
                          ₹{completePackInfo ? completePackInfo.remainingPrice : magazines.reduce((sum, mag) => sum + mag.price, 0)}
                        </div>
                        <div className="text-xs text-gray-300">
                          {completePackInfo && completePackInfo.remainingPrice < completePackInfo.totalValue 
                            ? `You save ₹${completePackInfo.totalValue - completePackInfo.remainingPrice}` 
                            : 'Total Value'
                          }
                        </div>
                      </div>
                      <div className="bg-green-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">Instant</div>
                        <div className="text-xs text-gray-300">Email Delivery</div>
                      </div>
                    </div>

                    <button
                      onClick={handleCompletePackPurchase}
                      disabled={processing || (completePackInfo && completePackInfo.alreadyOwned)}
                      className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {processing 
                        ? 'Processing...' 
                        : completePackInfo && completePackInfo.alreadyOwned 
                          ? 'You Own All Magazines ✓' 
                          : completePackInfo && completePackInfo.magazinesCount < magazines.length
                            ? `Buy Remaining ${completePackInfo.magazinesCount} Magazines →`
                            : 'Buy Complete Pack →'
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {completePackPurchase && (
            <div className="mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="relative bg-gradient-to-br from-green-900/90 to-emerald-900/90 backdrop-blur-xl border-2 border-green-500/30 rounded-3xl p-8">
                  <div className="text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold mb-2 text-green-400">Complete Pack Purchased!</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      You have access to all monthly magazines. Check your email for download links.
                    </p>
                    <div className="text-xs text-gray-400">
                      Purchased on: {new Date(completePackPurchase.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gray-800"></div>
            <span className="text-gray-600 font-semibold">OR BUY INDIVIDUAL MAGAZINES</span>
            <div className="flex-1 h-px bg-gray-800"></div>
          </div>

          {/* Individual Magazines Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {magazines.map((magazine) => {
              const isPurchased = checkIfPurchased(magazine.month);
              return (
                <div
                  key={magazine.month}
                  className={`relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border ${isPurchased ? 'border-green-500/30' : 'border-white/10'} rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:scale-105 group`}
                >
                  {/* Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${isPurchased ? 'from-green-500/20 to-emerald-500/20' : 'from-red-500/20 to-pink-500/20'} blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                  <div className="relative">
                    {/* Badge */}
                    <div className="inline-block mb-4">
                      <span className={`text-sm border ${isPurchased ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-red-500/30 bg-red-500/10 text-red-400'} px-3 py-1 rounded-full backdrop-blur-sm`}>
                        {isPurchased ? '✅ PURCHASED' : '📰 Magazine'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-2xl font-black mb-3 bg-gradient-to-r ${isPurchased ? 'from-green-400 to-emerald-400' : 'from-red-400 to-pink-400'} bg-clip-text text-transparent`}>
                      {magazine.title}
                    </h3>

                    {/* Month */}
                    <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider">
                      {magazine.month}
                    </p>

                    {/* Features */}
                    <div className={`rounded-xl p-4 mb-4 border ${isPurchased ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                      <h4 className="text-xs font-bold text-white mb-2">What's Inside:</h4>
                      <ul className="space-y-1">
                        {magazine.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-gray-300">
                            <span className="text-green-400 mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                        {magazine.features.length > 3 && (
                          <li className="text-xs text-blue-400 font-semibold">+ {magazine.features.length - 3} more topics...</li>
                        )}
                      </ul>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-3xl font-black text-white">₹{magazine.price}</span>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => !isPurchased && handleMagazinePurchase(magazine)}
                      disabled={isPurchased || (processing && selectedMagazine?.month === magazine.month)}
                      className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                        isPurchased 
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      {isPurchased 
                        ? 'Already Purchased ✓' 
                        : processing && selectedMagazine?.month === magazine.month 
                          ? 'Processing...' 
                          : 'Buy Magazine →'
                      }
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {magazines.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Magazines Available</h3>
              <p className="text-gray-400">
                Monthly magazines will be available soon. Please check back later.
              </p>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 max-w-2xl">
              <p className="text-gray-300 text-sm mb-2">
                📦 <span className="font-semibold text-white">Instant Delivery:</span> All magazines sent to your email within 5 minutes
              </p>
              <p className="text-gray-400 text-xs">
                💡 Need help? Email us at <span className="text-blue-400">2025eliteacademy@gmail.com</span>
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-sm text-amber-300 mb-2">🥀 Payment Issue</p>
              <p className="text-xs text-gray-300">
                If your payment is not processing correctly or you experience any problems, please email us at{' '}
                <a href="mailto:2025eliteacademy@gmail.com" className="text-amber-400 hover:underline">
                  2025eliteacademy@gmail.com
                </a>
                 for manual confirmation and assistance.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default MonthlyCurrentAffairs;
