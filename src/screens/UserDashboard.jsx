import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getAuthenticatedUser } from '../utils/authHelper';
import { slotsAPI, bookingsAPI, mentorshipAPI, pdfAPI,polityAPI } from '../services/api';
import MentorshipEnrollmentModal from '../components/MentorshipEnrollmentModal';
import punjabiTypingImage from '../assets/punjabi-typing.jpg';
import { Helmet } from '@dr.pogodin/react-helmet';
import { coachingAPI } from '../services/api';

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getAuthenticatedUser);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [purpose, setPurpose] = useState('');
  const [groupedSlots, setGroupedSlots] = useState({});
  const [step, setStep] = useState(1); // 1: Date, 2: Time, 3: Details
  const [program, setProgram] = useState(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [pdfInfo, setPdfInfo] = useState(null);
  const [pdfProcessing, setPdfProcessing] = useState(false);

  const [polityInfo, setPolityInfo] = useState(null);
  const [polityProcessing, setPolityProcessing] = useState(false);
  const fetchPolityInfo = async () => {
  try {
    const response = await polityAPI.getInfo();
    setPolityInfo(response.data.polity);
  } catch (error) {
    console.error('Error fetching Polity info:', error);
  }
};

const [hasPaid, setHasPaid] = useState(false);
const [hasCrashPaid, setHasCrashPaid] = useState(false); 

useEffect(() => {
  const checkAccess = async () => {
    if (user?.email) {
      try {
        // Check Complete Access
        const resComplete = await coachingAPI.checkAccess(user.email);
        setHasPaid(resComplete.data.hasAccess);
        
        // Check Crash Access
        const resCrash = await coachingAPI.checkCrashCourseAccess(user.email);
        setHasCrashPaid(resCrash.data.hasAccess);
      } catch (error) {
        console.error("Error checking access:", error);
      }
    }
  };
  checkAccess();
}, [user]);

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
        name: 'Elite Academy',
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
                "If you don't receive an email, please contact us at 2025eliteacademy@gmail.com."
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
        "please email us at 2025eliteacademy@gmail.com with your payment details."
      );
      setProcessing(false);
      fetchSlots();
    }
  };

  const handleSignOut = async () => {
    try {
      console.log('🚪 Sign out initiated...');
      
      // Clear all localStorage tokens
      localStorage.removeItem('manualAuthToken');
      localStorage.removeItem('manualAuthEmail');
      localStorage.removeItem('enrollMentorship');
      
      // Clear Firebase auth
      await signOut(auth);
      
      console.log('✅ Sign out successful');
      
      // Force page refresh to clear all state
      window.location.href = '/';
    } catch (error) {
      console.error('❌ Error signing out:', error);
      alert('Error signing out. Please try again.');
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
    fetchMentorshipProgram();
    fetchPDFInfo();
    fetchPolityInfo();
  }, []);

  useEffect(() => {
    // Show modal when program loads and enrollment intent exists
    const enrollIntent = localStorage.getItem('enrollMentorship');
    if (enrollIntent === 'true' && program) {
      localStorage.removeItem('enrollMentorship');
      setShowEnrollmentModal(true);
    }
  }, [program]);

  const fetchMentorshipProgram = async () => {
    try {
      const response = await mentorshipAPI.getProgram();
      setProgram(response.data.program);
    } catch (error) {
      console.error('Error fetching mentorship program:', error);
    }
  };

  const fetchPDFInfo = async () => {
    try {
      const response = await pdfAPI.getInfo();
      setPdfInfo(response.data.pdf);
    } catch (error) {
      console.error('Error fetching PDF info:', error);
    }
  };

  const handlePDFPurchase = async () => {
    setPdfProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay. Please check your internet connection.');
        setPdfProcessing(false);
        return;
      }

      const response = await pdfAPI.createPurchase();
      const { order, razorpayKeyId } = response.data;

      const options = {
        key: razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Elite Academy',
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
            setPdfProcessing(false);
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert(
              'Payment successful but verification failed.\n\n' +
              'The PDF should be sent to your email shortly.\n' +
              'If you don\'t receive it, please email us at 2025eliteacademy@gmail.com with your payment details.'
            );
            setPdfProcessing(false);
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
            setPdfProcessing(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert('Payment failed. Please try again.');
        setPdfProcessing(false);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Error creating PDF purchase:', error);
      alert(
        "There was an issue processing your payment.\n\n" +
        "If the amount was debited but you don't receive the PDF, " +
        "please email us at 2025eliteacademy@gmail.com with your payment details."
      );
      setPdfProcessing(false);
    }
  };

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


  // Scroll functions for mobile quick access
const scrollToOneOnOneSession = () => {
  const sessionSection = document.getElementById('one-on-one-session');
  if (sessionSection) {
    sessionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// const scrollToWeeklyMentorship = () => {
//   const mentorshipSection = document.getElementById('weekly-mentorship');
//   if (mentorshipSection) {
//     mentorshipSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   }
// };

const scrollToCrashCourse = () => {
  const crashSection = document.getElementById('crash-course');
  if (crashSection) {
    crashSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollToCompleteCoaching = () => {
  const coachingSection = document.getElementById('complete-coaching');
  if (coachingSection) {
    coachingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollToWeeklyTests = () => {
  const testsSection = document.getElementById('weekly-tests');
  if (testsSection) {
    testsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollToPolityBook = () => {
  const politySection = document.getElementById('polity-book');
  if (politySection) {
    politySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollToTypingCourse = () => {
  const typingSection = document.getElementById('typing-course');
  if (typingSection) {
    typingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollToCurrentAffairs = () => {
  const affairsSection = document.getElementById('current-affairs');
  if (affairsSection) {
    affairsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollToPunjabiBook = () => {
  const punjabiSection = document.getElementById('e-book');
  if (punjabiSection) {
    punjabiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};


  return (

    <>
          <Helmet>
  <title>Dashboard - Elite Academy</title>
  <meta name="description" content="Your Elite Academy dashboard for exam preparation and mentorship sessions" />
</Helmet>

    <div className="min-h-screen bg-black text-white">

      {/* Mobile Quick Access Navigation */}
<div className="md:hidden fixed bottom-2 left-0 right-0 z-50 px-1">
  <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-1 border border-gray-200">
    <div className="flex gap-1 overflow-x-auto hide-scrollbar pb-0.5">
      <button
        onClick={scrollToOneOnOneSession}
        className="flex-shrink-0 px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md text-[10px] font-semibold whitespace-nowrap shadow hover:shadow transition-all active:scale-95 min-w-[70px]"
      >
        💬 1-on-1
      </button>
      
      {/* <button
        onClick={scrollToWeeklyMentorship}
        className="flex-shrink-0 px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-xs font-semibold whitespace-nowrap shadow-md hover:shadow-lg transition-all active:scale-95"
      >
        🎯 Weekly Mentorship
      </button> */}
      
      <button
        onClick={scrollToCrashCourse}
        className="flex-shrink-0 px-2 py-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-md text-[10px] font-semibold whitespace-nowrap shadow hover:shadow transition-all active:scale-95 min-w-[70px]"
      >
        ⚡ Crash
      </button>
      
      <button
        onClick={scrollToCompleteCoaching}
        className="flex-shrink-0 px-2 py-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-md text-[10px] font-semibold whitespace-nowrap shadow hover:shadow transition-all active:scale-95 min-w-[70px]"
      >
        📚 Coaching
      </button>
      
      <button
        onClick={scrollToWeeklyTests}
        className="flex-shrink-0 px-2 py-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-md text-[10px] font-semibold whitespace-nowrap shadow hover:shadow transition-all active:scale-95 min-w-[70px]"
      >
        📝 Tests
      </button>
      
      <button
        onClick={scrollToPolityBook}
        className="flex-shrink-0 px-2 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md text-[10px] font-semibold whitespace-nowrap shadow hover:shadow transition-all active:scale-95 min-w-[70px]"
      >
        📖 Polity
      </button>
      
      <button
        onClick={scrollToTypingCourse}
        className="flex-shrink-0 px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md text-[10px] font-semibold whitespace-nowrap shadow hover:shadow transition-all active:scale-95 min-w-[70px]"
      >
        ⌨️ Typing
      </button>
      
      <button
        onClick={scrollToCurrentAffairs}
        className="flex-shrink-0 px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md text-[10px] font-semibold whitespace-nowrap shadow hover:shadow transition-all active:scale-95 min-w-[70px]"
      >
        📰 Affairs
      </button>
      
      <button
        onClick={scrollToPunjabiBook}
        className="flex-shrink-0 px-2 py-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-md text-[10px] font-semibold whitespace-nowrap shadow hover:shadow transition-all active:scale-95 min-w-[70px]"
      >
        📕 e-Book
      </button>
    </div>
  </div>
</div>

<style jsx>{`
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>


      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      
<header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Elite Academy
      </h1>
      <div className="flex items-center space-x-4">
        {/* ✅ NEW: Punjabi Typing Button */}
        {/* <button
          onClick={() => navigate('/punjabi-typing')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
        >
          <span>Typing Course</span>
        </button> */}
        <span className="text-gray-300">{user?.displayName}</span>
        <button
          onClick={handleSignOut}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
</header>

<div className='mt-14'>

</div>




<div className="fixed top-[73px] sm:top-[81px] w-full z-50 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 border-b border-red-400 shadow-lg">
  <div className="max-w-7xl mx-auto px-2 sm:px-6 py-1 sm:py-2">
    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-center">
      <span className="text-xs sm:text-lg text-white font-bold animate-pulse">
        🚀Offline & Online Coaching Soon
      </span>
      <span className="text-xs sm:text-base text-white">
        • <a href="tel:+917696954686" className="ml-1 font-bold underline hover:text-yellow-300 transition">7696954686</a> • Chandigarh
      </span>
    </div>
  </div>
</div>


 {hasPaid && (
<section id="paid" className="lg:w-[80%] rounded-md m-auto relative py-12 sm:py-16 px-0 sm:px-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border-y border-blue-500/20">
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-6">
      <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
      <h2 className="text-2xl font-black text-white tracking-tight">Complete Online Coaching for Punjab Government Exams</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8">
      {[
        // {
        //   title: 'Open Courses',
        //   desc: 'Access your subjects & tracker',
        //   path: '/tracker',
        //   icon: '🚀',
        //   color: 'from-blue-600/20 to-indigo-600/20',
        //   borderColor: 'border-blue-500/30',
        //   iconBg: 'bg-blue-500/20'
        // },
        {
          title: 'Live Classes',
          desc: 'Join ongoing interactive sessions',
          path: '/LiveClass',
          icon: '🎥',
          color: 'from-purple-600/20 to-pink-600/20',
          borderColor: 'border-purple-500/30',
          iconBg: 'bg-purple-500/20'
        },
        {
          title: 'Recorded Classes',
          desc: 'Watch previous lessons anytime',
          path: '/recordedClass',
          icon: '📼',
          color: 'from-emerald-600/20 to-teal-600/20',
          borderColor: 'border-emerald-500/30',
          iconBg: 'bg-emerald-500/20'
        }
      ].map((item) => (
        <div
          key={item.title}
          onClick={() => navigate(item.path)}
          className={`group relative overflow-hidden cursor-pointer rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.color} p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]`}
        >
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-all group-hover:bg-white/10"></div>
          
          <div className="relative flex flex-col h-full">
            <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-inner`}>
              {item.icon}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
              {item.title}
            </h3>
            
            <p className="text-sm text-gray-400 leading-relaxed">
              {item.desc}
            </p>

            <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-indigo-400 group-hover:text-white transition-colors">
              Enter Dashboard <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
)}

{
  hasCrashPaid && (
<section id="paid" className="lg:w-[80%] rounded-md m-auto relative py-12 sm:py-16 px-0 sm:px-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border-y border-blue-500/20">
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-6">
      <div className="h-8 w-1.5 bg-indigo-500 rounded-full"></div>
      <h2 className="text-2xl font-black text-white tracking-tight">Crash Course Coaching For Punjab Government Exams</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8">
      {[
        {
          title: 'Live Classes',
          desc: 'Join ongoing interactive sessions',
          path: '/crash-LiveClass',
          icon: '🎥',
          color: 'from-purple-600/20 to-pink-600/20',
          borderColor: 'border-purple-500/30',
          iconBg: 'bg-purple-500/20'
        },
        {
          title: 'Recorded Classes',
          desc: 'Watch previous lessons anytime',
          path: '/crash-recordedClass',
          icon: '📼',
          color: 'from-emerald-600/20 to-teal-600/20',
          borderColor: 'border-emerald-500/30',
          iconBg: 'bg-emerald-500/20'
        }
      ].map((item) => (
        <div
          key={item.title}
          onClick={() => navigate(item.path)}
          className={`group relative overflow-hidden cursor-pointer rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.color} p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]`}
        >
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-all group-hover:bg-white/10"></div>
          
          <div className="relative flex flex-col h-full">
            <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-inner`}>
              {item.icon}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
              {item.title}
            </h3>
            
            <p className="text-sm text-gray-400 leading-relaxed">
              {item.desc}
            </p>

            <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-indigo-400 group-hover:text-white transition-colors">
              Enter Dashboard <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  )
}  





      <div className="relative max-w-7xl mx-auto px-6 py-12">

<section id="crash-course" className="relative py-12 sm:py-16 px-0 sm:px-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border-y border-blue-500/20">
  <div className="max-w-7xl mx-auto">
    <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-indigo-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 to-blue-500/15 blur-3xl rounded-3xl"></div>

      <div className="relative">
        <div className="inline-block mb-4">
          <span className="text-sm text-indigo-400 border border-indigo-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-indigo-500/10 font-medium">
            🎓 Online Coaching Program
          </span>
        </div>

        <div className="mb-6">
          <h3 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            ⏰ 2.5 Months Crash Course Coaching
          </h3>
          <p className="text-lg text-indigo-300 font-semibold">For Punjab Government Exams</p>
        </div>

        <p className="text-base text-gray-300 mb-8 max-w-4xl leading-relaxed">
          Prepare smart with live + recorded classes, a powerful progress tracker app, and <span className="text-white font-bold">23,000+ topic-wise PYQs</span> — everything you need in one ecosystem. Punjab Government Exams.
        </p>

        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">📚 All Subjects Covered • Topic-Wise & Exam-Oriented</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Reasoning', icon: '🧠', color: 'from-purple-500/20 to-indigo-500/20' },
              { name: 'Punjab Grammar', icon: '📘', color: 'from-blue-500/20 to-cyan-500/20' },
              { name: 'Punjabi GK', icon: '🗺️', color: 'from-orange-500/20 to-yellow-500/20' },
              { name: 'English', icon: '🇬🇧', color: 'from-red-500/20 to-pink-500/20' },
              { name: 'Computer', icon: '💻', color: 'from-blue-500/20 to-indigo-500/20' },
              { name: 'Current Affairs', icon: '📰', color: 'from-green-500/20 to-emerald-500/20' },
              { name: 'All General Studies', icon: '📖', color: 'from-indigo-500/20 to-purple-500/20' },
              { name: 'Maths', icon: '🔢', color: 'from-teal-500/20 to-emerald-500/20' },
            ].map((subject) => (
              <div key={subject.name} className={`bg-gradient-to-br ${subject.color} border border-white/5 rounded-xl p-3 flex items-center gap-3 transition-transform hover:scale-102`}>
                <span className="text-xl">{subject.icon}</span>
                <span className="text-xs font-semibold text-white">{subject.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">🎥</span> Classes & Learning Mode
            </h4>
            <ul className="space-y-3">
              {[
                'Live Online Classes (interactive & doubt-friendly)',
                'Recorded Lectures for revision',
                '1 Year Validity on all content',
                'E-Books & Digital Notes provided',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-blue-400">⚡</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl p-6 border border-indigo-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-tighter">
              Free Bonus
            </div>
            <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              📊 Elite Academy Tracker App
            </h4>
            <p className="text-indigo-300 text-xs font-bold mb-4">Worth ₹5,000 — Included Free</p>
            <ul className="grid grid-cols-1 gap-2">
              {[
                'Subject & topic-wise progress tracking',
                '23,000+ Previous Year Questions',
                'PYQs mapped topic-wise',
                'Track daily study & consistency',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="text-green-400 text-xs">●</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
          <div>
            <div className="text-lg font-bold text-white">Maximum syllabus • Smart tracking • Real results</div>
            <p className="text-sm text-gray-400">One app. Complete control over your preparation.</p>
          </div>
          <button
            onClick={() => navigate('/crash-course')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            Enroll Now — Start Your Preparation Now →
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
        
{/* 2) Will uncomment after testing */}
<section id="complete-coaching" className="relative py-12 sm:py-16 px-0 sm:px-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border-y border-blue-500/20">
  <div className="max-w-7xl mx-auto">
    <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-indigo-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 to-blue-500/15 blur-3xl rounded-3xl"></div>

      <div className="relative">
        <div className="inline-block mb-4">
          <span className="text-sm text-indigo-400 border border-indigo-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-indigo-500/10 font-medium">
            🎓 Online Coaching Program
          </span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          ⏰ 5 Months Complete Online Coaching for Punjab Government Exams
        </h3>

        <p className="text-base text-gray-300 mb-8 max-w-4xl leading-relaxed">
          Prepare smart with live + recorded classes, a powerful progress tracker app, and <span className="text-white font-bold">23,000+ topic-wise PYQs</span> — everything you need in one ecosystem.Punjab Government Exams.
        </p>

        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">📚 All Subjects Covered • Topic-Wise & Exam-Oriented</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Reasoning', icon: '🧠', color: 'from-purple-500/20 to-indigo-500/20' },
              { name: 'Punjab Grammar', icon: '📘', color: 'from-blue-500/20 to-cyan-500/20' },
              { name: 'Punjabi GK', icon: '🗺️', color: 'from-orange-500/20 to-yellow-500/20' },
              { name: 'English', icon: '🇬🇧', color: 'from-red-500/20 to-pink-500/20' },
              { name: 'Computer', icon: '💻', color: 'from-blue-500/20 to-indigo-500/20' },
              { name: 'Current Affairs', icon: '📰', color: 'from-green-500/20 to-emerald-500/20' },
              { name: 'All General Studies', icon: '📖', color: 'from-indigo-500/20 to-purple-500/20' },
              { name: 'Maths', icon: '🔢', color: 'from-teal-500/20 to-emerald-500/20' },
            ].map((subject) => (
              <div key={subject.name} className={`bg-gradient-to-br ${subject.color} border border-white/5 rounded-xl p-3 flex items-center gap-3 transition-transform hover:scale-102`}>
                <span className="text-xl">{subject.icon}</span>
                <span className="text-xs font-semibold text-white">{subject.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">🎥</span> Classes & Learning Mode
            </h4>
            <ul className="space-y-3">
              {[
                'Live Online Classes (interactive & doubt-friendly)',
                'Recorded Lectures for revision',
                '1 Year Validity on all content',
                'E-Books & Digital Notes provided',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-blue-400">⚡</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl p-6 border border-indigo-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-tighter">
              Free Bonus
            </div>
            <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              📊 Elite Academy Tracker App
            </h4>
            <p className="text-indigo-300 text-xs font-bold mb-4">Worth ₹5,000 — Included Free</p>
            <ul className="grid grid-cols-1 gap-2">
              {[
                'Subject & topic-wise progress tracking',
                '23,000+ Previous Year Questions',
                'PYQs mapped topic-wise',
                'Track daily study & consistency',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="text-green-400 text-xs">●</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
          <div>
            <div className="text-lg font-bold text-white">Maximum syllabus • Smart tracking • Real results</div>
            <p className="text-sm text-gray-400">One app. Complete control over your preparation.</p>
          </div>
          <button
            onClick={() => navigate('/online-coaching')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            Enroll Now — Start Your Preparation Now →
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="weekly-tests" className="relative py-12 sm:py-16 px-0 sm:px-2 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-y border-emerald-500/20">
  <div className="max-w-7xl mx-auto">
    <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-emerald-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 to-teal-500/15 blur-3xl rounded-3xl"></div>

      <div className="relative">
        <div className="inline-block mb-4">
          <span className="text-sm text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-emerald-500/10 font-medium">
            📝 Weekly Test Series
          </span>
        </div>

        <div className="mb-6">
          <h3 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            📅 Weekly Mock Tests & Analysis 
          </h3>
          <p className="text-lg text-emerald-300 font-semibold">For Punjab Government Exams</p>
        </div>

        <p className="text-base text-gray-300 mb-8 max-w-4xl leading-relaxed">
          Stay exam-ready with <span className="text-white font-bold">weekly full-length mock tests</span>, detailed performance analytics, track your progress and identify weak areas to ace Punjab Government Exams.
        </p>

        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">📊 Complete Test Coverage • All Subjects Included</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Reasoning', icon: '🧠', color: 'from-purple-500/20 to-indigo-500/20' },
              { name: 'Punjab Grammar', icon: '📘', color: 'from-blue-500/20 to-cyan-500/20' },
              { name: 'Punjabi GK', icon: '🗺️', color: 'from-orange-500/20 to-yellow-500/20' },
              { name: 'English', icon: '🇬🇧', color: 'from-red-500/20 to-pink-500/20' },
              { name: 'Computer', icon: '💻', color: 'from-blue-500/20 to-indigo-500/20' },
              { name: 'Current Affairs', icon: '📰', color: 'from-green-500/20 to-emerald-500/20' },
              { name: 'All General Studies', icon: '📖', color: 'from-indigo-500/20 to-purple-500/20' },
              { name: 'Maths', icon: '🔢', color: 'from-teal-500/20 to-emerald-500/20' },
            ].map((subject) => (
              <div key={subject.name} className={`bg-gradient-to-br ${subject.color} border border-white/5 rounded-xl p-3 flex items-center gap-3 transition-transform hover:scale-102`}>
                <span className="text-xl">{subject.icon}</span>
                <span className="text-xs font-semibold text-white">{subject.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400">⚡</span> Test Features & Benefits
            </h4>
            <ul className="space-y-3">
              {[
                'New test every week (exam pattern based)',
                'Instant results & detailed solutions',
                'All India rank & percentile tracking',
                'Performance comparison with toppers',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-emerald-400">⚡</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-2xl p-6 border border-emerald-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-tighter">
              Premium Features
            </div>
            <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              📈 Advanced Analytics Dashboard
            </h4>
            <p className="text-emerald-300 text-xs font-bold mb-4">Detailed Insights Included</p>
            <ul className="grid grid-cols-1 gap-2">
              {[
                'Topic-wise accuracy & speed analysis',
                'Weak area identification & suggestions',
                'Time management insights per section',
                'Attempt vs accuracy optimization tips',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="text-green-400 text-xs">●</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
          <div>
            <div className="text-lg font-bold text-white">Weekly tests • Real-time analysis • Guaranteed improvement</div>
            <p className="text-sm text-gray-400">Practice like pros. Compete with thousands. Score higher.</p>
          </div>
          <button
            onClick={() => navigate('/weekly-test')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            Join Weekly Test Series →
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<div className='mb-8'/>
<div id="e-book" className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-blue-500/20">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-purple-500/15 blur-3xl rounded-3xl"></div>
  
  <div className="relative">
    <div className="inline-block mb-4">
      <span className="text-sm text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-blue-500/10">
        📚 Book Collection
      </span>
    </div>

    <h3 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
      Complete Study Material
    </h3>

    <p className="text-base text-gray-300 mb-6 max-w-3xl">
      Punjab Exams preparation — <span className="text-white font-semibold">8 complete subjects</span> in one place. Exam-oriented content for maximum marks.
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {[
        { name: 'Polity', icon: '⚖️', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
        { name: 'Economics', icon: '💰', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30' },
        { name: 'Geography', icon: '🌍', color: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30' },
        { name: 'Environment', icon: '🌱', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30' },
        { name: 'Science', icon: '🔬', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30' },
        { name: 'Modern History', icon: '📜', color: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30' },
        { name: 'Ancient History', icon: '🏛️', color: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30' },
        { name: 'Medieval History', icon: '🏰', color: 'from-red-500/20 to-pink-500/20', border: 'border-red-500/30' },
      ].map((subject) => (
        <div
          key={subject.name}
          className={`bg-gradient-to-br ${subject.color} backdrop-blur-sm border ${subject.border} rounded-xl p-3 text-center transition-all duration-200 hover:scale-105`}
        >
          <div className="text-2xl mb-1">{subject.icon}</div>
          <div className="text-xs font-semibold text-white">{subject.name}</div>
        </div>
      ))}
    </div>

    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-5 border border-blue-500/20 mb-6">
      <h4 className="text-sm font-semibold text-white mb-3">📦 What You Get</h4>
      <ul className="space-y-2">
        {[
          'Complete coverage of all 8 subjects',
          'Crisp, exam-oriented content only',
          'Previous year questions included',
          'Digital copies available',
        ].map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
            <span className="text-green-400 mt-1">✓</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="text-sm text-blue-300 font-semibold">
        8 subjects • Maximum marks • Minimum time
      </div>
      <button
        onClick={() => navigate('/books')}
        className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-103 transition-all duration-300"
      >
        Browse All E-Books →
      </button>
    </div>
  </div>
</div>

<div className='mb-8'/>

{/* <div className='pb-10 pt-10 cursor-pointer bg-white-50' onClick={() => navigate('/tracker')}>
  Open Courses
</div>

<div className='pb-10 pt-10 cursor-pointer bg-white-50' onClick={() => navigate('/LiveClass')}>
  Live Classes
</div>

<div className='pb-10 pt-10 cursor-pointer bg-white-50' onClick={() => navigate('/recordedClass')}>
  Recorded Classes
</div> */}

{/* Polity Book Card */}
<div  id="polity-book" className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90
  backdrop-blur-xl border border-white/10 rounded-3xl
  p-8 shadow-2xl transition-all duration-300">

  {/* Soft green glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 to-emerald-500/15 blur-3xl rounded-3xl"></div>

  <div className="relative">

    {/* Badge */}
    <div className="inline-block mb-4">
      <span className="text-sm text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-green-500/10">
        📘 Study Material
      </span>
    </div>

    {/* Title */}
    <h3 className="text-3xl sm:text-4xl font-black mb-3
      bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400
      bg-clip-text text-transparent">
      Complete Polity Package
    </h3>

    {/* Description */}
    <p className="text-base text-gray-300 mb-6 max-w-3xl">
      Punjab Exams Polity preparation — only crisp, exam-oriented content.
      Designed for <span className="text-white font-semibold">maximum marks in minimum time</span>.
    </p>

    {/* Pages / Sections Grid */}
    <div className="grid sm:grid-cols-2 gap-3 mb-6">
      {[
        'Indian Constitution – Core Topics',
        'Union & State Government',
        'Panchayati Raj & Local Bodies',
        'Judiciary & Constitutional Bodies',
        'Important Articles & Amendments',
        'Previous Year Polity Questions'
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
          <span className="text-green-400">✓</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    {/* What’s Inside Box */}
    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10
      rounded-2xl p-5 border border-green-500/20 mb-6">
      <h4 className="text-sm font-semibold text-white mb-3">
        What’s Inside:
      </h4>
      <ul className="space-y-2">
        {[
          'Only crisp, exam-oriented facts',
          'Questions expected in upcoming exams',
          'No theory, no fillers',
          'High-yield Polity concepts only'
        ].map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
            <span className="text-green-400 mt-1">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Price + CTA */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="text-sm text-green-300 font-semibold">
         • One-time payment • Instant PDF delivery
      </div>

      <button
        onClick={() => navigate('/polity-book')}
        className="px-6 py-3 rounded-xl font-bold
          bg-gradient-to-r from-green-500 to-emerald-600
          hover:shadow-lg hover:shadow-green-500/40
          hover:scale-[1.03] transition-all duration-300"
      >
        View Details & Purchase →
      </button>
    </div>

  </div>
</div>


<div className='mb-8'/>






        {/* Typing Training Section - Flex Layout (Image Left, Content Right) */}
<div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
  <div className="flex flex-col lg:flex-row">
    {/* Left Side - Image */}
    <div className="lg:w-1/2 relative h-96 lg:h-auto overflow-hidden">
      <img 
        src={punjabiTypingImage} 
        alt="Punjabi Typing Training" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-800/50"></div>
      
      {/* Bottom Badge on Image */}
      <div className="absolute bottom-6 left-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg">
          <span className="text-xl">⌨️</span>
          <span className="text-white font-bold text-sm">Typing Training</span>
        </div>
      </div>
    </div>

    {/* Right Side - Content */}
    <div  id="typing-course" className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-between">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl lg:text-4xl font-bold text-blue-400 mb-3 leading-tight">
          PUNJABI & ENGLISH TYPING TRAINING
        </h2>
        
        <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-full border border-green-500/30 mb-4">
          <span className="text-green-400 font-semibold text-sm">
            CLERK / SENIOR ASSISTANT LEVEL
          </span>
        </div>

        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          Learn Punjabi and English typing exactly as required for Clerk & Senior Assistant exams.
        </p>

        <p className="text-white font-semibold mb-6">
          Same exam pattern • Same difficulty level • Real test practice
        </p>

        {/* Features List */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-400 text-sm">✓</span>
            </div>
            <p className="text-gray-300">Suitable for beginners & experienced students</p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-400 text-sm">✓</span>
            </div>
            <p className="text-gray-300">Step-by-step Punjabi typing learning (from zero)</p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-400 text-sm">✓</span>
            </div>
            <p className="text-gray-300">Speed + accuracy focused training</p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-400 text-sm">✓</span>
            </div>
            <p className="text-gray-300">Exam-oriented practice & mock tests</p>
          </div>
        </div>

        {/* Call to Action Text */}
        <div className="bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-lg p-4 mb-6 border border-green-500/20">
          <p className="text-gray-200 font-medium text-center italic">
            Clear your typing exam, secure your dream government job.
          </p>
          <p className="text-white font-bold text-center mt-2">
            Enroll now. Your success starts here.
          </p>
        </div>
      </div>

      {/* Button Section */}
      <div>
        <button
          onClick={() => navigate('/punjabi-typing')}
          className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 mb-4"
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-xl">💻</span>
            Explore Typing Course
          </span>
        </button>

        {/* Info Box */}
        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-start gap-2">
            <span className="text-blue-400 text-lg">💡</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Click to view course details, pricing, and enroll in the typing training program.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



<div className='mb-8'/>



<div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90
  backdrop-blur-xl border border-white/10 rounded-3xl
  p-8 shadow-2xl transition-all duration-300">

  {/* Soft green glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 to-emerald-500/15 blur-3xl rounded-3xl"></div>

  <div className="relative">

    {/* Badge */}
    <div className="inline-block mb-4">
      <span className="text-sm text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-green-500/10">
        📘 Study Material
      </span>
    </div>

    {/* Title */}
    <h3 className="text-3xl sm:text-4xl font-black mb-3
      bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400
      bg-clip-text text-transparent">
      Elite Academy Magazine 2024
    </h3>

    {/* Description */}
    <p className="text-base text-gray-300 mb-6 max-w-3xl">
      Made by <span className="text-white font-semibold">Elite Academy</span> — comprehensive current affairs coverage.
      Price: <span className="text-green-400 font-bold text-xl">Just ₹13/-</span>
    </p>

    {/* Pages / Sections Grid */}
    <div className="grid sm:grid-cols-2 gap-3 mb-6">
      {[
        'Important Days & Themes – 16 Pages',
        'Index – 31 Pages',
        'Military & Defence – 16 Pages',
        'Appointments – 30 Pages',
        'Sports – 35 Pages',
        'Awards & Honours – 60 Pages'
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
          <span className="text-green-400">✓</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    {/* What's Inside Box */}
    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10
      rounded-2xl p-5 border border-green-500/20 mb-6">
      <h4 className="text-sm font-semibold text-white mb-3">
        ❤️ A Noble Cause:
      </h4>
      <ul className="space-y-2">
        {[
          '100% of the money collected will be donated to Bhai Kanhaiya Ji Foundation',
          'Help your exam preparation while supporting a humanitarian cause',
          'Nuclear Power Plants – 27 Pages included',
          'Total Pages: 215'
        ].map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
            <span className="text-green-400 mt-1">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Price + CTA */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="text-sm text-green-300 font-semibold">
        🤝 Learn • Prepare • Help Others
      </div>

      <button
        onClick={() => navigate('/current-affairs-book')}
        className="px-6 py-3 rounded-xl font-bold
          bg-gradient-to-r from-green-500 to-emerald-600
          hover:shadow-lg hover:shadow-green-500/40
          hover:scale-[1.03] transition-all duration-300"
      >
        View Details & Purchase →
      </button>
    </div>

  </div>
</div>

<div className='mb-8'/>




        {/* PDF Purchase Section */}
        {pdfInfo && (
          <div id="current-affairs" className="mb-12 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: PDF Info */}
              <div>
                <div className="inline-block mb-4">
                  <span className="text-sm text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-green-500/10">
                    📚 Study Material
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Elite Academy Magazine 2025
                </h2>
                <p className="text-base text-gray-300 mb-4">
                  Punjab Exam Preparation Guide - Only crisp, exam-oriented facts. Questions expected in upcoming exams.
                </p>
                
                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {pdfInfo.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-green-400">✓</span>
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                  <h3 className="text-sm font-semibold text-white mb-2">What's Inside:</h3>
                  <ul className="space-y-1">
                    {pdfInfo.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Price & Purchase */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur-2xl"></div>
                <div className="relative">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-black mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      ₹{pdfInfo.price}
                    </div>
                    <div className="text-sm text-gray-300">One-time payment</div>
                  </div>

                  {/* Email Notice */}
                  <div className="mb-6 flex items-start gap-3 p-4 bg-black/30 rounded-xl border border-white/10">
                    <span className="text-green-300 text-xl flex-shrink-0">📧</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white mb-1">After Payment</p>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        The PDF will be sent to your email ({user?.email}) within 5 minutes after successful payment. Please check your inbox and spam folder.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handlePDFPurchase}
                    disabled={pdfProcessing}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      pdfProcessing
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:shadow-green-500/50 hover:scale-105'
                    }`}
                  >
                    {pdfProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>💳</span>
                        Buy Now - ₹{pdfInfo.price}
                      </span>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400 mt-4">
                    Secure payment via Razorpay
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mentorship Enrollment Modal */}
      {showEnrollmentModal && program && (
        <MentorshipEnrollmentModal
          program={program}
          onClose={() => setShowEnrollmentModal(false)}
          onEnrollmentSuccess={() => {
            setShowEnrollmentModal(false);
            // Refresh program data
            fetchMentorshipProgram();
          }}
        />
      )}



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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
    </>
  );
}

export default UserDashboard;