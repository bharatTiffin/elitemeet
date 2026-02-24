import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { Link } from "react-router-dom";
import image from '../assets/happy-pic.jpg';
import { mentorshipAPI, pdfAPI } from '../services/api';
import MentorshipEnrollmentModal from '../components/MentorshipEnrollmentModal';
import AuthModal from '../components/AuthModal';
import Footer from '../components/Footer';
import punjabiTypingImage from '../assets/punjabi-typing.jpg';
import { Helmet } from '@dr.pogodin/react-helmet';

function HomePage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [redirectDestination, setRedirectDestination] = useState(null);


  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [signingIn, setSigningIn] = useState(false);
  const [program, setProgram] = useState(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfInfo, setPdfInfo] = useState(null);


  

    // Redirect after Google sign-in if redirectDestination is set
  useEffect(() => {
    if (redirectDestination && (auth.currentUser || localStorage.getItem('manualAuthToken'))) {
      navigate(redirectDestination);
      setRedirectDestination(null);
    }
  }, [redirectDestination, navigate]);
  const handlePolityBookClick = () => {
    if (!auth.currentUser && !localStorage.getItem('manualAuthToken')) {
      setRedirectDestination('/polity-book');
      setShowAuthModal(true);
    } else {
      navigate('/polity-book');
    }
  };

  const handleOnlineCoachingClick = () => {
    if (!auth.currentUser && !localStorage.getItem('manualAuthToken')) {
      setRedirectDestination('/online-coaching');
      setShowAuthModal(true);
    } else {
      navigate('/online-coaching');
    }
  };


  const handlecrashCourseClick = () => {
    if (!auth.currentUser && !localStorage.getItem('manualAuthToken')) {
      setRedirectDestination('/crash-course');
      setShowAuthModal(true);
    } else {
      navigate('/crash-course');
    }
  };


  const handleExciseInspectorClick = () => {
    if (!auth.currentUser && !localStorage.getItem('manualAuthToken')) {
      setRedirectDestination('/excise-inspector');
      setShowAuthModal(true);
    } else {
      navigate('/excise-inspector');
    }
  };

  const handleCurrentAffairClick = () => {
    if (!auth.currentUser && !localStorage.getItem('manualAuthToken')) {
      setRedirectDestination('/current-affairs-book');
      setShowAuthModal(true);
    } else {
      navigate('/current-affairs-book');
    }
  };

  const handleMonthlyCurrentAffairsClick = () => {
    if (!auth.currentUser && !localStorage.getItem('manualAuthToken')) {
      setRedirectDestination('/monthly-current-affairs');
      setShowAuthModal(true);
    } else {
      navigate('/monthly-current-affairs');
    }
  };

  const handleBooksClick = () => {
    if (!auth.currentUser && !localStorage.getItem('manualAuthToken')) {
      setRedirectDestination('/books');
      setShowAuthModal(true);
    } else {
      navigate('/books');
    }
  };

    const handleEnrollClick = async () => {
    // Check if user is logged in
    if (!auth.currentUser) {
      // If not logged in, sign in first and preserve enrollment intent
      setSigningIn(true);
      try {
        // Store enrollment intent in localStorage
        localStorage.setItem('enrollMentorship', 'true');
        await signInWithPopup(auth, googleProvider);
        // User will be redirected to dashboard, enrollment will be handled there
      } catch (error) {
        console.error('Error signing in:', error);
        localStorage.removeItem('enrollMentorship');
        if (error.code !== 'auth/popup-closed-by-user') {
          alert('Failed to sign in. Please try again.');
        }
      } finally {
        setSigningIn(false);
      }
    } else {
      // User is logged in, show enrollment modal
      setShowEnrollmentModal(true);
    }
  };

      const handleBookNow = () => {
        setShowAuthModal(true);
    };

    const handleGoogleSignIn = async (user) => {
      try {
        console.log('User signed in with Google:', user);
        // User will be automatically redirected to dashboard by App.jsx auth listener
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
    };

    const handleTypingCourseClick = () => {
      if (!auth.currentUser && !localStorage.getItem('manualAuthToken')) {
        setRedirectDestination('/punjabi-typing');
        setShowAuthModal(true);
      } else {
        navigate('/punjabi-typing');
      }
    };



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle card click with auth check
  const handleCardClick = (destination) => {
    if (!auth.currentUser && !localStorage.getItem('manualAuthToken')) {
      setRedirectDestination(destination);
      localStorage.setItem('redirectDestination', destination); // Persist for after login
      // Special handling for crash course card
      if (destination === '/crash-course') {
        localStorage.setItem('redirectToCrashCourse', 'true');
      }
      // Special handling for weekly test card
      if (destination === '/weekly-test') {
        localStorage.setItem('redirectToWeeklyTest', 'true');
      }
      // Special handling for PSTET card
      if (destination === '/pstet-course') {
        localStorage.setItem('redirectToPstet', 'true');
      }
      setShowAuthModal(true);
    } else {
      navigate(destination);
    }
  };


  // Courses/Cards Data
  const courses = [
    {
      id: 1,
      title: '5 Month Complete Coaching',
      description: 'Full syllabus coverage with personalized guidance for Punjab exams',
      icon: '📚',
      color: 'from-indigo-500 to-purple-500',
      path: '/online-coaching',
      highlights: ['Complete syllabus', 'Personalized guidance', 'Weekly sessions']
    },
    {
      id: 2,
      title: 'Excise Inspector Strategy Session',
      description: 'Live strategy session on 1st March with complete roadmap to crack the exam',
      icon: '🎯',
      color: 'from-orange-500 to-red-500',
      path: '/excise-inspector',
      highlights: ['Live session', 'Expert guidance', 'Complete strategy']
    },
    {
      id: 3,
      title: 'Monthly Current Affairs Magazine',
      description: 'Stay updated with monthly current affairs compilation for competitive exams',
      icon: '📰',
      color: 'from-red-500 to-pink-500',
      path: '/monthly-current-affairs',
      highlights: ['Monthly updates', 'Exam relevant', 'Instant download']
    },
    {
      id: 4,
      title: 'Weekly Test Series',
      description: 'Practice tests every week to track progress and identify weak areas',
      icon: '📝',
      color: 'from-pink-500 to-rose-500',
      path: '/weekly-test',
      highlights: ['Weekly tests', 'Solutions included', 'Performance analytics']
    },
    {
      id: 5,
      title: 'PSTET & CTET 1 Month',
      description: 'Complete PSTET & CTET preparation with live classes till exam',
      icon: '🎯',
      color: 'from-pink-500 to-purple-500',
      path: '/pstet-course',
      highlights: ['1 Month duration', 'Live Zoom classes', 'Complete syllabus']
    },
    {
      id: 6,
      title: 'Punjabi Typing Course',
      description: 'Master fast typing skills for competitive exams requiring typing tests',
      icon: '⌨️',
      color: 'from-green-500 to-emerald-500',
      path: '/punjabi-typing',
      highlights: ['Speed building', 'Accuracy training', 'Exam patterns']
    },
    {
      id: 7,
      title: 'Polity Books & Notes',
      description: 'Comprehensive polity study material with detailed explanations',
      icon: '📖',
      color: 'from-orange-500 to-amber-500',
      path: '/polity-book',
      highlights: ['Detailed notes', 'Case studies', 'PSSSB focused']
    },
    {
      id: 8,
      title: 'Current Affairs eBook',
      description: 'Monthly current affairs compilation for PSSSB and other exams',
      icon: '📰',
      color: 'from-red-500 to-pink-500',
      path: '/current-affairs-book',
      highlights: ['Monthly updates', 'Relevant topics', 'Quick revision']
    },
    {
      id: 9,
      title: '1-on-1 Mentorship Sessions',
      description: 'Direct consultation with Happy to clear doubts and plan strategy',
      icon: '💬',
      color: 'from-violet-500 to-indigo-500',
      path: '/mentorship',
      highlights: ['One-to-one', 'Flexible timing', 'Custom guidance']
    },
    {
      id: 10,
      title: 'Complete Study Material Bundle',
      description: 'All books, notes, and resources bundled together at special price',
      icon: '🎁',
      color: 'from-yellow-500 to-orange-500',
      path: '/books',
      highlights: ['All resources', 'Special discount', 'Lifetime access']
    },
    {
      id: 11,
      title: '2.5 Month Crash Course',
      description: 'Intensive prep focused on high-yield topics for PSSSB exams',
      icon: '⚡',
      color: 'from-cyan-500 to-blue-500',
      path: '/crash-course',
      highlights: ['Fast-track learning', 'Cut-off focused', '40+ hours content']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Elite Academy - Government Exam Preparation | Expert Mentorship</title>
        <meta 
          name="description" 
          content="Elite Academy offers expert mentorship for PSSSB, SSC, NDA, CDS, Punjab Police exams. Get personalized guidance from Happy, who topped PSSSB Executive Assistant and cleared 11+ government exams." 
        />
        <meta 
          name="keywords" 
          content="Elite Academy, PSSSB coaching, government exam preparation, SSC coaching, NDA preparation, Punjab Police coaching, exam mentorship" 
        />
        <link rel="canonical" href="https://eliteacademy.pro" />
        <meta property="og:title" content="Elite Academy - Government Exam Preparation" />
        <meta property="og:description" content="Expert mentorship for PSSSB, SSC, NDA, CDS, and Punjab Police exams" />
        <meta property="og:url" content="https://eliteacademy.pro" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="bg-black text-white min-h-screen overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Navbar */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Elite Academy
            </div>
            <button
              onClick={handleBookNow}
              className="cursor-pointer relative px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-sm sm:text-base overflow-hidden group"
            >
              <span className="relative z-10">Login/Signup</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </nav>

        {/* Announcement Banner */}
        <div className="fixed top-[73px] sm:top-[81px] w-full z-40 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 border-b border-red-400 shadow-lg">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 py-1 sm:py-2">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-center">
              <span className="text-xs sm:text-lg text-white font-bold animate-pulse">
                🚀 Offline & Online Coaching Soon
              </span>
              <span className="text-xs sm:text-base text-white">
                • <a href="tel:+917696954686" className="ml-1 font-bold underline hover:text-yellow-300 transition">7696954686</a> • Chandigarh
              </span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-[140px] sm:pt-[150px] pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Your Success Starts Here
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Choose your path to success. Whether it's a quick crash course or complete coaching, we have everything you need to crack government exams.
            </p>
          </div>
        </section>

        {/* Cards Grid */}
        <section className="relative px-4 sm:px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleCardClick(course.path)}
                  className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="text-5xl mb-4">{course.icon}</div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 mb-6">
                      {course.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <button className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${course.color} opacity-90 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105`}>
                      Get Started →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-4 sm:px-6 py-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-y border-blue-500/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Preparation?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join thousands of students who have cleared their exams with Elite Academy. Start your journey today!
            </p>
            <button
              onClick={handleBookNow}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Start Learning Now
            </button>
          </div>
        </section>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => {
            setShowAuthModal(false);
            setRedirectDestination(null);
          }}
          redirectDestination={redirectDestination}
        />
      </div>
      {/* Footer - with policy and contact links */}
      <Footer />
    </>
  );
}

export default HomePage;
