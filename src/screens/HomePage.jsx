import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { Link } from "react-router-dom";
import image from '../assets/happy-pic.jpg';
import { mentorshipAPI, pdfAPI, frenchCourseAPI } from '../services/api';
import MentorshipEnrollmentModal from '../components/MentorshipEnrollmentModal';
import AuthModal from '../components/AuthModal';
import Footer from '../components/Footer';
import StudentSuccessSection from '../components/exam-landing/StudentSuccessSection';
import punjabiTypingImage from '../assets/punjabi-typing.jpg';
import { Helmet } from '@dr.pogodin/react-helmet';
import { STUDENT_SUCCESS_DATA } from '../config/studentSuccessData';

const HOME_FAQ_ITEMS = [
  {
    question: 'Which government exams does Elite Academy prepare students for?',
    answer:
      'Elite Academy prepares students for Punjab Government exams including PSSSB, Punjab Police, Patwari, Naib Tehsildar, Clerk, Senior Assistant, and Inspector posts. We also coach for SSC (CGL, CHSL, GD, CPO), Banking exams, and other state and central competitive examinations.',
  },
  {
    question: 'Do you offer online coaching?',
    answer:
      'Yes. Our online government exam coaching is available across India. Students get live and recorded classes, mock tests, study material, and personal guidance through our online programs.',
  },
  {
    question: 'Do you provide offline classes?',
    answer:
      'Yes. Offline government exam classes are available at our Chandigarh branch (SCO 144, Sector 24-D) and Fatehgarh Sahib branch (City Center, Sirhind). Students can attend in-person coaching at either location.',
  },
  {
    question: 'Where are your branches located?',
    answer:
      'Elite Academy has two branches in Punjab: Elite Academy Chandigarh at SCO 144, Sector 24-D, Chandigarh, and Elite Academy Fatehgarh Sahib at 1st Floor, Shop No. 18, Above PB 23 Outfit, City Center, Sirhind 140406.',
  },
  {
    question: 'Do you provide mock tests and test series?',
    answer:
      'Yes. We offer regular mock tests and test series including weekly tests and sectional test series. These help students practice exam-level questions and track their preparation progress.',
  },
  {
    question: 'Do you provide study material and books?',
    answer:
      'Yes. Students get updated study material, subject-wise books, previous year questions (PYQs), polity notes, and current affairs resources to support complete government exam preparation.',
  },
  {
    question: 'How can I join Elite Academy?',
    answer:
      'You can browse our courses on this page, enroll in online coaching, purchase books or test series, or visit our Chandigarh or Fatehgarh Sahib branch. For questions, call 7696954686 or visit our contact page.',
  },
  {
    question: 'Do you prepare students for PSSSB exams?',
    answer:
      'Yes. PSSSB coaching is one of our core strengths. We cover the full syllabus with structured classes, mock tests, PYQs, and exam-focused study material for PSSSB and related Punjab recruitment exams.',
  },
  {
    question: 'Do you prepare students for Punjab Police exams?',
    answer:
      'Yes. We provide Punjab Police exam coaching with focused preparation on written tests, general knowledge, reasoning, and other subjects as per the latest exam pattern.',
  },
  {
    question: 'Do you prepare students for SSC and Banking exams?',
    answer:
      'Yes. Elite Academy offers SSC coaching for CGL, CHSL, GD, and CPO, along with Banking exam preparation. Our programs include concept classes, practice tests, and guidance for both Punjab and central government aspirants.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQ_ITEMS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
};

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
  const [frenchCourseInfo, setFrenchCourseInfo] = useState(null);

  // Handle job apply navigation for Join Our Team section
  const handleJobApply = (role) => {
    navigate(`/join-team?role=${role.toLowerCase().replace(' ', '-')}`);
  };

  // Handle French course navigation
  const handleFrenchCourse = () => {
    navigate('/french-course');
  };


  

    // Redirect after Google sign-in if redirectDestination is set
  useEffect(() => {
    if (redirectDestination && (auth.currentUser || localStorage.getItem('manualAuthToken'))) {
      navigate(redirectDestination);
      setRedirectDestination(null);
    }
  }, [redirectDestination, navigate]);
  const handlePolityBookClick = () => {
    navigate('/polity-book');
  };

  const handleOnlineCoachingClick = () => {
    navigate('/online-coaching');
  };


  const handlecrashCourseClick = () => {
    navigate('/crash-course');
  };


  const handleExciseInspectorClick = () => {
    navigate('/excise-inspector');
  };

  const handleCurrentAffairClick = () => {
    navigate('/current-affairs-book');
  };

  const handleMonthlyCurrentAffairsClick = () => {
    navigate('/monthly-current-affairs');
  };

  const handleBooksClick = () => {
    navigate('/books');
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
      navigate('/punjabi-typing');
    };



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch French course pricing on mount
  useEffect(() => {
    const fetchFrenchCourseInfo = async () => {
      try {
        const response = await frenchCourseAPI.getInfo();
        setFrenchCourseInfo(response.data);
      } catch (error) {
        console.error('Error fetching French course info:', error);
      }
    };

    fetchFrenchCourseInfo();
  }, []);

  // Handle card click with auth check
  const handleCardClick = (destination) => {
    navigate(destination);
  };


  // Courses/Cards Data
  const courses = [
    // {
    //   id: -1,
    //   title: 'Digital Offline Demo Classes',
    //   description: 'Registration open for Fatehgarh Sahib digital offline and Chandigarh offline demo classes from 1, 2 June',
    //   icon: '🏫',
    //   color: 'from-cyan-500 to-blue-600',
    //   path: '/digital-offline-demo',
    //   highlights: ['1, 2 June demo', 'Fatehgarh Sahib & Chandigarh', 'Refundable same day']
    // },
    {
      id: 0,
      title: 'Complete Coaching with Tracker App',
      description: 'Full syllabus coverage with personalized guidance for Punjab exams',
      icon: '📚',
      color: 'from-indigo-500 to-purple-500',
      path: '/online-coaching',
      highlights: ['Complete syllabus', 'Personalized guidance', 'Weekly sessions']
    },
    // {
    //   id: 0.5,
    //   title: 'PSSSB 90-Day Master Planner',
    //   description: 'A premium 90-day study planner with daily targets, revision schedules, habit tracking, and topic-wise checklists to keep your PSSSB preparation on track.',
    //   icon: '🗓️',
    //   color: 'from-blue-600 to-indigo-700',
    //   path: '/psssb-90-day-master-planner',
    //   highlights: [
    //     '90-Day Study Plan',
    //     'Daily Targets & Revision',
    //     'Habit & Progress Tracker'
    //   ]
    // },
    {
      id: 1,
      title: 'PYQs Book - Subjectwise & Topicwise + Excise Inspector Mock Test',
      description: 'Previous years question papers, subjectwise & topicwise — 20k+ Qs across all Punjabi exam subjects',
      icon: '📘',
      color: 'from-yellow-400 to-orange-500',
      path: '/pyqs-book',
      highlights: ['20k+ Questions', 'Subjectwise & Topicwise', 'All Punjab exams']
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
      description: 'Live strategy session on Every Sunday with complete roadmap to crack the exam',
      icon: '🎯',
      color: 'from-orange-500 to-red-500',
      path: '/excise-inspector',
      highlights: ['Live session', 'Expert guidance', 'Complete strategy']
    },
    {
      id: 12,
      title: 'Sectional Test Series',
      description: 'Daily sectional tests Monday-Thursday + Full mock tests every Friday for Punjab exams',
      icon: '🎯',
      color: 'from-orange-500 to-amber-500',
      path: '/sectional-test-series',
      highlights: ['3 Months Duration', 'Mon-Thu: Sectional Tests', 'Friday: Full Mocks']
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
    // {
    //   id: 5,
    //   title: 'PSTET & CTET 1 Month',
    //   description: 'Complete PSTET & CTET preparation with live classes till exam',
    //   icon: '🎯',
    //   color: 'from-pink-500 to-purple-500',
    //   path: '/pstet-course',
    //   highlights: ['1 Month duration', 'Live Zoom classes', 'Complete syllabus']
    // },
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
    // {
    //   id: 11,
    //   title: '2.5 Month Crash Course',
    //   description: 'Intensive prep focused on high-yield topics for PSSSB exams',
    //   icon: '⚡',
    //   color: 'from-cyan-500 to-blue-500',
    //   path: '/crash-course',
    //   highlights: ['Fast-track learning', 'Cut-off focused', '40+ hours content']
    // }
  ];

  return (
    <>
      <Helmet>
        <title>Punjab Government Exam Coaching | Elite Academy Chandigarh</title>
        <meta 
          name="description" 
          content="Elite Academy offers Punjab Government Exam coaching for PSSSB, Punjab Police, SSC, Banking & more. Join online or offline classes in Chandigarh & Fatehgarh Sahib." 
        />
        <meta 
          name="keywords" 
          content="Punjab Government Exam Coaching, PSSSB Coaching, Punjab Police Coaching, SSC Coaching, Banking Coaching, Government Exam Preparation, Elite Academy Chandigarh" 
        />
        <link rel="canonical" href="https://eliteacademy.pro" />
        <meta property="og:title" content="Punjab Government Exam Coaching | Elite Academy Chandigarh" />
        <meta property="og:description" content="Punjab Government Exam coaching for PSSSB, Punjab Police, SSC & Banking. Online & offline classes in Chandigarh & Fatehgarh Sahib." />
        <meta property="og:url" content="https://eliteacademy.pro" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Punjab Government Exam Coaching | Elite Academy Chandigarh" />
        <meta name="twitter:description" content="Punjab Government Exam coaching for PSSSB, Punjab Police, SSC & Banking. Online & offline classes in Chandigarh & Fatehgarh Sahib." />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
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
              Punjab Government &amp; Competitive Exam Coaching Institute
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Elite Academy is a trusted government exam coaching institute in Punjab. We prepare students for Punjab Government exams, PSSSB, Punjab Police, Patwari, Naib Tehsildar, SSC, Banking, and other state and central competitive examinations — through structured online and offline coaching.
            </p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="relative px-4 sm:px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
              Courses &amp; Preparation Programs
            </h2>
            <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
              Elite Academy prepares students for a wide range of Punjab and central government competitive examinations. Explore our <Link to="/online-coaching" className="text-blue-400 hover:underline">online coaching</Link>, <Link to="/sectional-test-series" className="text-blue-400 hover:underline">test series</Link>, <Link to="/books" className="text-blue-400 hover:underline">books</Link>, and <Link to="/monthly-current-affairs" className="text-blue-400 hover:underline">current affairs</Link> programs below — each built to support PSSSB, Punjab Police, Patwari, SSC, Banking, and other government exams.
            </p>
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

                {/* About Elite Academy */}
                <section className="relative px-4 sm:px-6 py-16 border-y border-white/10 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
              About Elite Academy
            </h2>
            <div className="space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed">
              <p>
                Elite Academy is one of the leading institutes for government exam preparation in Punjab. Our focus is clear: help serious aspirants prepare for Punjab Government exams, PSSSB, Punjab Police, Patwari, Naib Tehsildar, Clerk, Senior Assistant, Inspector, SSC (CGL, CHSL, GD, CPO), Banking, and other state and central competitive examinations with a plan that actually works.
              </p>
              <p>
                Our mission is to make quality government exam coaching accessible — whether you study from home or attend classes at our institute. We believe every student deserves a structured path, honest guidance, and resources that match the latest exam patterns. Punjab competitive exams move fast; we help you stay ahead with focused preparation instead of scattered self-study.
              </p>
              <p>
                Our teaching approach starts with strong fundamentals. Experienced faculty explain concepts clearly, then move to practice through previous year questions, regular mock tests, and updated study material. Students also get access to <Link to="/books" className="text-blue-400 hover:underline">books</Link>, <Link to="/current-affairs-book" className="text-blue-400 hover:underline">current affairs</Link>, and <Link to="/sectional-test-series" className="text-blue-400 hover:underline">test series</Link> designed for Punjab and central government exams.
              </p>
              <p>
                Preparation is not only about watching lectures. We run weekly mock tests, sectional tests, and full-length practice papers so students understand their strengths and weak areas before exam day. Combined with PYQs and topic-wise revision, this builds the discipline competitive exams demand.
              </p>
              <p>
                What sets us apart is personal attention. Beyond classroom teaching, we offer doubt-solving sessions and one-on-one mentorship so students know what to study, what to skip, and how to improve week by week. Whether you choose <Link to="/online-coaching" className="text-blue-400 hover:underline">online coaching</Link> from anywhere in India or offline classes at our Chandigarh and Fatehgarh Sahib branches, you get the same commitment to structured government exam preparation and steady progress.
              </p>
            </div>
          </div>
        </section>

        <StudentSuccessSection
          classroomImage={STUDENT_SUCCESS_DATA.classroomImage}
          successStories={STUDENT_SUCCESS_DATA.successStories}
          reviews={STUDENT_SUCCESS_DATA.reviews}
          stats={STUDENT_SUCCESS_DATA.stats}
        />

        {/* Why Choose Elite Academy */}
        <section className="relative px-4 sm:px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
              Why Choose Elite Academy
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Practical benefits that support your government exam preparation from day one.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Experienced Faculty',
                  text: 'Learn from teachers who understand Punjab and central government exam patterns and focus on what matters in the actual paper.',
                },
                {
                  title: 'Structured Study Plan',
                  text: 'Follow a clear syllabus roadmap so you cover every subject on time without last-minute panic.',
                },
                {
                  title: 'Regular Mock Tests',
                  text: 'Practice with weekly and sectional mock tests to build speed, accuracy, and exam temperament.',
                },
                {
                  title: 'Doubt Solving',
                  text: 'Get your questions answered quickly so small doubts do not become big gaps before the exam.',
                },
                {
                  title: 'Updated Study Material',
                  text: 'Access books, notes, PYQs, and current affairs aligned with the latest Punjab and SSC exam trends.',
                },
                {
                  title: 'Personal Mentorship',
                  text: 'Receive one-on-one guidance to plan your preparation, fix weak areas, and stay on track.',
                },
                {
                  title: 'Online & Offline Classes',
                  text: 'Choose live online coaching from anywhere or attend offline government exam classes at our Punjab branches.',
                },
                {
                  title: 'Affordable Learning',
                  text: 'Quality coaching, test series, and study resources priced for students who invest their own savings in preparation.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Student Success */}
        <section className="relative px-4 sm:px-6 py-16 border-y border-white/10 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Built for Serious Exam Preparation
            </h2>
            <div className="space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed text-left sm:text-center">
              <p>
                Government exams demand consistency, not shortcuts. At Elite Academy, we focus on disciplined learning — daily study, regular tests, and honest feedback — so students develop the habits that competitive exams actually reward.
              </p>
              <p>
                Our students work through structured programs covering Punjab Government exams, PSSSB, Punjab Police, SSC, and Banking preparation. With mock tests, previous year questions, and personal guidance, they learn to manage time, handle pressure, and improve with every attempt.
              </p>
              <p>
                We stay committed to your preparation journey. Whether you are starting fresh or giving the exam another try, our goal is the same: help you walk into the exam hall prepared, confident, and ready to perform.
              </p>
            </div>
          </div>
        </section>

        {/* Branches */}
        <section className="relative px-4 sm:px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
              Our Branches in Punjab
            </h2>
            <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
              Attend offline government exam coaching at either of our Punjab branches. Online coaching is available for students across India who prefer to prepare from home.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
                <h3 className="text-xl font-bold text-white mb-4">Elite Academy Chandigarh</h3>
                <address className="text-gray-300 not-italic leading-relaxed mb-4">
                  SCO 144<br />
                  Sector 24-D<br />
                  Chandigarh
                </address>
                <p className="text-gray-400 text-sm">
                  Offline government exam classes for Punjab and central competitive exam aspirants in the Chandigarh region.
                </p>
                <a href="tel:+917696954686" className="inline-block mt-4 text-blue-400 hover:underline font-semibold">
                  Call: 7696954686
                </a>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
                <h3 className="text-xl font-bold text-white mb-4">Elite Academy Fatehgarh Sahib</h3>
                <address className="text-gray-300 not-italic leading-relaxed mb-4">
                  1st Floor, Shop No. 18<br />
                  Above PB 23 Outfit<br />
                  City Center<br />
                  Sirhind 140406
                </address>
                <p className="text-gray-400 text-sm">
                  Offline coaching for PSSSB, Punjab Police, Patwari, and other Punjab Government exams in Fatehgarh Sahib district.
                </p>
                <Link to="/contact-us" className="inline-block mt-4 text-blue-400 hover:underline font-semibold">
                  Contact us for directions
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative px-4 sm:px-6 py-16 border-y border-white/10 bg-white/[0.02]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-center mb-10">
              Common questions about government exam coaching at Elite Academy.
            </p>
            <div className="space-y-4">
              {HOME_FAQ_ITEMS.map(({ question, answer }) => (
                <details
                  key={question}
                  className="group rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black overflow-hidden"
                >
                  <summary className="cursor-pointer px-6 py-4 font-semibold text-white list-none flex justify-between items-center gap-4">
                    {question}
                    <span className="text-gray-500 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                  </summary>
                  <div className="px-6 pb-4 text-gray-300 text-sm leading-relaxed">
                    {question === 'How can I join Elite Academy?' ? (
                      <>
                        You can browse our courses on this page, enroll in{' '}
                        <Link to="/online-coaching" className="text-blue-400 hover:underline">online coaching</Link>, purchase{' '}
                        <Link to="/books" className="text-blue-400 hover:underline">books</Link> or{' '}
                        <Link to="/sectional-test-series" className="text-blue-400 hover:underline">test series</Link>, or visit our Chandigarh or Fatehgarh Sahib branch. For questions, call{' '}
                        <a href="tel:+917696954686" className="text-blue-400 hover:underline">7696954686</a> or visit our{' '}
                        <Link to="/contact-us" className="text-blue-400 hover:underline">contact page</Link>.
                      </>
                    ) : (
                      answer
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-4 sm:px-6 py-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-y border-blue-500/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Start Your Government Exam Preparation
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join Elite Academy for structured Punjab Government exam coaching — online from anywhere or offline at our Chandigarh and Fatehgarh Sahib branches.
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

        {/* Learn French Language Section */}
        <section className="relative px-4 sm:px-6 py-20 bg-gradient-to-b from-blue-950/50 to-black border-y border-blue-500/20 mt-0">
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute right-2 top-2 sm:right-8 sm:top-4 z-20 flex items-center gap-2">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold text-blue-400 bg-white/10 px-2 py-0.5 rounded-full border border-blue-400 shadow">New Course</span>
            </div>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">Learn French Language</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">Master French with expert teachers and accelerate your path to PR in Canada/France.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative group rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-950/50 to-indigo-950/30 backdrop-blur-md p-8 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-blue-500/30 hover:border-blue-400/60">
                <div className="absolute -top-8 -right-8 text-[7rem] opacity-10 pointer-events-none select-none">🇫🇷</div>
                <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40">PR Pathway Course</span>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">French Course - Get Your PR</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-200">
                    <span className="text-xl">📅</span>
                    <span className="font-semibold text-blue-300">3 Month Program</span>
                    <span className="text-gray-400 text-sm">(Basic to Advanced)</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-200">
                    <span className="text-xl">🎓</span>
                    <span className="font-semibold text-indigo-300">Expert Teachers</span>
                    <span className="text-gray-400 text-sm">(Native & Indian)</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-200">
                    <span className="text-xl">📺</span>
                    <span className="font-semibold text-purple-300">Live + Recorded Classes</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-200">
                    <span className="text-xl">⏰</span>
                    <span className="font-semibold text-pink-300">Mon-Fri | 7:00 PM IST</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-400/20 mb-6">
                  <p className="text-sm text-gray-300">
                    <span className="text-blue-400 font-bold">Perfect for:</span> Canada PR (Express Entry +30 points), France visa, Career growth
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="relative group rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 to-teal-950/20 backdrop-blur-md p-6 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-emerald-500/20 hover:border-emerald-400/50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">Flexible Plan</span>
                      <h4 className="text-xl font-bold text-white">1 Month Access</h4>
                      <p className="text-gray-400 text-sm">{frenchCourseInfo?.price1Month ? `${frenchCourseInfo.currency === 'USD' ? '$' : '₹'}${Math.round(frenchCourseInfo.price1Month / 4)}/week` : '$50/week'} • Basic to Intermediate</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-emerald-400">{frenchCourseInfo?.price1Month ? `${frenchCourseInfo.currency === 'USD' ? '$' : '₹'}${frenchCourseInfo.price1Month}` : '$200'}</div>
                      <div className="text-gray-400 text-xs">per month</div>
                    </div>
                    <button
                      onClick={handleFrenchCourse}
                      className="px-6 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 whitespace-nowrap"
                    >
                      Pay {frenchCourseInfo?.price1Month ? `${frenchCourseInfo.currency === 'USD' ? '$' : '₹'}${frenchCourseInfo.price1Month}` : '$200'} Now
                    </button>
                  </div>
                </div>
                <div className="relative group rounded-2xl border border-amber-500/50 bg-gradient-to-br from-amber-950/40 to-orange-950/30 backdrop-blur-md p-6 pt-8 shadow-lg transition-all duration-300 hover:shadow-amber-500/30 hover:border-amber-400/60">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="px-4 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg">Best Value</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    <div>
                      <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">Complete Program</span>
                      <h4 className="text-xl font-bold text-white">3 Months Full Access</h4>
                      <p className="text-gray-400 text-sm">Basic to Advanced • Complete PR Ready</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-amber-400">{frenchCourseInfo?.price3Month ? `${frenchCourseInfo.currency === 'USD' ? '$' : '₹'}${frenchCourseInfo.price3Month}` : '$500'}</div>
                      <div className="text-emerald-400 text-xs font-semibold">Save {frenchCourseInfo?.price1Month && frenchCourseInfo?.price3Month ? `${frenchCourseInfo.currency === 'USD' ? '$' : '₹'}${(frenchCourseInfo.price1Month * 3) - frenchCourseInfo.price3Month}` : '$100'}</div>
                    </div>
                    <button
                      onClick={handleFrenchCourse}
                      className="px-6 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300 whitespace-nowrap"
                    >
                      Pay {frenchCourseInfo?.price3Month ? `${frenchCourseInfo.currency === 'USD' ? '$' : '₹'}${frenchCourseInfo.price3Month}` : '$500'} Now
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>Secured by Razorpay</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>Instant Access</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>Certificate Included</span>
                  </div>
                </div>
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
