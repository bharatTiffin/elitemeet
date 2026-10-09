import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { Link } from "react-router-dom";
import { mentorshipAPI, pdfAPI, frenchCourseAPI } from '../services/api';
import MentorshipEnrollmentModal from '../components/MentorshipEnrollmentModal';
import AuthModal from '../components/AuthModal';
import Footer from '../components/Footer';
import SiteNavbar from '../components/site/SiteNavbar';
import Hero from '../components/site/Hero';
import Section from '../components/site/Section';
import {
  CoursesGrid, OnlineVsOffline, AboutElite, LearnAtElite, StudentSuccess, Testimonials,
  TrustBadges, FeatureGrid, BuiltForPrep, BranchesPreview, FAQ, FinalCTA,
} from '../components/site/HomeSections';
import { JoinTeamSection, FrenchCourseSection } from '../components/site/HomeExtras';
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
      id: 0.2,
      title: 'Prep Mode — Mock Test & Weak Topic Tracker',
      description: "For students who've finished the syllabus and want to know exactly where they stand.",
      icon: '🎯',
      color: 'from-amber-500 to-orange-500',
      path: '/mock-test-prep',
      highlights: ['Full-length mocks', 'Weak topic analysis', 'Performance tracking']
    },
    
    {
      id: 0.5,
      title: 'Complete Coaching with Tracker App',
      description: 'Full syllabus coverage with personalized guidance for Punjab exams',
      icon: '📚',
      color: 'from-indigo-500 to-purple-500',
      path: '/online-coaching',
      highlights: ['Complete syllabus', 'Personalized guidance', 'Weekly sessions']
    },
    {
      id: 0.55,
      title: 'French Language Course — Get Your PR',
      description: 'Now offering French! Learn with expert teachers and boost your path to PR in Canada/France.',
      icon: '🇫🇷',
      color: 'from-blue-500 to-indigo-600',
      path: '/french-course',
      highlights: ['3 Month Program', 'Live + Recorded Classes', 'Canada PR +30 points']
    },
    {
      id: 0.6,
      title: 'Punjabi Typing Course',
      description: 'Master fast typing skills for competitive exams requiring typing tests',
      icon: '⌨️',
      color: 'from-green-500 to-emerald-500',
      path: '/punjabi-typing',
      highlights: ['Speed building', 'Accuracy training', 'Exam patterns']
    },

    {
      id: 0.7,
      title: 'PSSSB 90-Day Master Planner',
      description: 'A premium 90-day study planner with daily targets, revision schedules, habit tracking, and topic-wise checklists to keep your PSSSB preparation on track.',
      icon: '🗓️',
      color: 'from-blue-600 to-indigo-700',
      path: '/psssb-90-day-master-planner',
      highlights: [
        '90-Day Study Plan',
        'Daily Targets & Revision',
        'Habit & Progress Tracker'
      ]
    },

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

      <div className="text-foreground min-h-screen overflow-x-hidden">
        <SiteNavbar onLogin={handleBookNow} />

        <Hero />

        <Section
          id="courses"
          eyebrow="Courses & Preparation Programs"
          title={<>Every program an aspirant needs, <span className="text-gradient">in one place.</span></>}
          description="Elite Academy prepares students for a wide range of Punjab and central government competitive examinations. Explore online coaching, test series, books, and current affairs programs — each built to support PSSSB, Punjab Police, Patwari, SSC, Banking, and other government exams."
        >
          <CoursesGrid courses={courses} onSelect={handleCardClick} />
        </Section>

        <Section
          eyebrow="Online or Offline"
          title="Choose how you learn."
          description="The same structured curriculum and faculty support — available the way that fits your life."
        >
          <OnlineVsOffline />
        </Section>

        <Section
          eyebrow="About Elite Academy"
          title="Punjab's trusted government exam coaching institute."
        >
          <AboutElite />
        </Section>

        <Section
          eyebrow="Learn at Elite Academy"
          title="Offline and online coaching for Punjab & Central Government exams."
        >
          <LearnAtElite classroomImage={STUDENT_SUCCESS_DATA.classroomImage} />
        </Section>

        <Section
          eyebrow="Student Success"
          title="Real students. Real selections."
          description="Recent selections from Elite Academy students in Punjab government examinations."
        >
          <StudentSuccess stories={STUDENT_SUCCESS_DATA.successStories} />
        </Section>

        <Section
          eyebrow="Google Reviews"
          title="Verified feedback from real students."
          description="Verified feedback from students at our Chandigarh and Fatehgarh Sahib branches."
        >
          <Testimonials reviews={STUDENT_SUCCESS_DATA.reviews} />
        </Section>

        <Section eyebrow="Why Students Trust Us" title="Why Students Trust Elite Academy.">
          <TrustBadges />
        </Section>

        <Section
          eyebrow="Why Elite"
          title="Why Choose Elite Academy."
          description="Practical benefits that support your government exam preparation from day one."
        >
          <FeatureGrid />
        </Section>

        <Section eyebrow="Our Commitment" title="Built for serious exam preparation.">
          <BuiltForPrep />
        </Section>

        <Section eyebrow="Our Branches" title="Our Branches in Punjab.">
          <BranchesPreview />
        </Section>

        <JoinTeamSection onApply={handleJobApply} />

        <FrenchCourseSection info={frenchCourseInfo} onOpen={handleFrenchCourse} />

        <Section eyebrow="FAQ" title="Questions, answered.">
          <FAQ items={HOME_FAQ_ITEMS} />
        </Section>

        <FinalCTA />

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
