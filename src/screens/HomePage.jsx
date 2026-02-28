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

  // Handle job apply navigation for Join Our Team section
  const handleJobApply = (role) => {
    navigate(`/join-team?role=${role.toLowerCase().replace(' ', '-')}`);
  };


  

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
      // {
      //   id: 100,
      //   title: 'Daily Test Series',
      //   description: 'Test your knowledge every day with real exam-level mocks for Punjab Govt Exams. Includes daily subject-wise and full-length tests and solutions.',
      //   icon: '📝',
      //   color: 'from-emerald-500 to-cyan-500',
      //   path: '/test-series',
      //   highlights: [
      //     'Daily subject-wise mocks',
      //     'Full-length Punjab Govt Exam tests',
      //     'Solutions & analytics'
      //   ]
      // },
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

        {/* Join Our Team Section */}
        <section className="relative px-4 sm:px-6 py-20 bg-black/95 border-y border-white/10 mt-0">
          <div className="max-w-6xl mx-auto relative">
            {/* Pulsing We are Hiring badge */}
            <div className="absolute right-2 top-2 sm:right-8 sm:top-4 z-20 flex items-center gap-2">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600"></span>
              </span>
              <span className="text-xs font-bold text-red-400 bg-white/10 px-2 py-0.5 rounded-full border border-red-500 shadow">We are Hiring</span>
            </div>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">We’re Hiring: Join the Elite Revolution</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">Help us shape the future of Punjab's competitive exam preparation.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Data Entry Card */}
              <div className="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-emerald-400/30 hover:border-emerald-400/60">
                {/* Glassy icon background */}
                <div className="absolute -top-8 -right-8 text-[7rem] opacity-10 pointer-events-none select-none">⌨️</div>
                {/* Badge */}
                <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">Flexible Hours</span>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Data Entry</h3>
                <p className="text-gray-200 mb-4">Focus on <span className="font-semibold text-emerald-300">Precision</span>, <span className="font-semibold text-cyan-300">Speed</span>, and <span className="font-semibold text-emerald-200">Remote Work</span>.</p>
                <ul className="mb-6 space-y-1 text-sm text-gray-400">
                  <li>• Accurate data handling</li>
                  <li>• Flexible remote schedule</li>
                  <li>• Fast typing skills</li>
                </ul>
                <button
                  onClick={() => handleJobApply('Data Entry')}
                  className="w-full py-2 rounded-lg border border-emerald-400 text-emerald-300 font-bold bg-transparent hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-500 hover:text-black transition-all duration-300"
                >Apply Now</button>
              </div>
              {/* Teacher Card */}
              <div className="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-amber-400/30 hover:border-amber-400/60">
                <div className="absolute -top-8 -right-8 text-[7rem] opacity-10 pointer-events-none select-none">👨‍🏫</div>
                <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">Impactful</span>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Teacher</h3>
                <p className="text-gray-200 mb-4">Focus on <span className="font-semibold text-amber-300">Expertise</span>, <span className="font-semibold text-orange-300">Subject Mastery</span>, and <span className="font-semibold text-orange-200">Student Success</span>.</p>
                <ul className="mb-6 space-y-1 text-sm text-gray-400">
                  <li>• Subject matter expert</li>
                  <li>• Mentor & guide students</li>
                  <li>• Drive results</li>
                </ul>
                <button
                  onClick={() => handleJobApply('Teacher')}
                  className="w-full py-2 rounded-lg font-bold text-white bg-gradient-to-r from-amber-400 to-orange-600 shadow hover:from-orange-500 hover:to-orange-700 transition-all duration-300"
                >Apply Now</button>
              </div>
              {/* Content Creator Card */}
              <div className="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-fuchsia-500/30 hover:border-fuchsia-500/60">
                <div className="absolute -top-8 -right-8 text-[7rem] opacity-10 pointer-events-none select-none">📸</div>
                <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40">Creative Freedom</span>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent">Content Creator</h3>
                <p className="text-gray-200 mb-4">Focus on <span className="font-semibold text-fuchsia-300">Video Editing</span>, <span className="font-semibold text-purple-300">Social Media Strategy</span>, and <span className="font-semibold text-purple-200">Storytelling</span>.</p>
                <ul className="mb-6 space-y-1 text-sm text-gray-400">
                  <li>• Video & media creation</li>
                  <li>• Social media growth</li>
                  <li>• Creative campaigns</li>
                </ul>
                <button
                  onClick={() => handleJobApply('Content Creator')}
                  className="w-full py-2 rounded-lg font-bold text-white bg-gradient-to-r from-fuchsia-500 to-purple-600 shadow-lg hover:shadow-fuchsia-500/60 hover:from-purple-700 hover:to-fuchsia-600 transition-all duration-300"
                >Apply Now</button>
              </div>
            </div>
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
