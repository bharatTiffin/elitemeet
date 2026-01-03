import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { Link } from "react-router-dom";
import image from '../assets/happy-pic.jpg';
import { mentorshipAPI, pdfAPI } from '../services/api';
import MentorshipEnrollmentModal from '../components/MentorshipEnrollmentModal';
import punjabiTypingImage from '../assets/punjabi-typing.jpg';
import { Helmet } from '@dr.pogodin/react-helmet';
function HomePage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [signingIn, setSigningIn] = useState(false);
  const [program, setProgram] = useState(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfInfo, setPdfInfo] = useState(null);


  const handlePolityBookClick = async () => {
  // Check if user is logged in
  if (!auth.currentUser) {
    // User not logged in - save intended destination and sign in
    setSigningIn(true);
    try {
      localStorage.setItem('redirectToPolity', 'true');
      await signInWithPopup(auth, googleProvider);
      // User will be redirected after sign-in by App.jsx
    } catch (error) {
      console.error('Error signing in:', error);
      localStorage.removeItem('redirectToPolity');
      if (error.code !== 'auth/popup-closed-by-user') {
        alert('Failed to sign in. Please try again.');
      }
    } finally {
      setSigningIn(false);
    }
  } else {
    // User is logged in - navigate directly
    navigate('/polity-book');
  }
};

const handleBooksClick = async () => {
  // Check if user is logged in
  if (!auth.currentUser) {
    // User not logged in - save intended destination and sign in
    setSigningIn(true);
    try {
      localStorage.setItem('redirectToBooks', 'true');
      await signInWithPopup(auth, googleProvider);
      // User will be redirected after sign-in by App.jsx
    } catch (error) {
      console.error('Error signing in:', error);
      localStorage.removeItem('redirectToBooks');
      if (error.code !== 'auth/popup-closed-by-user') {
        alert('Failed to sign in. Please try again.');
      }
    } finally {
      setSigningIn(false);
    }
  } else {
    // User is logged in - navigate directly
    navigate('/books');
  }
};


// Add scroll function
const scrollToPolitySection = () => {
  const politySection = document.getElementById('books');
  if (politySection) {
    politySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await mentorshipAPI.getProgram();
        setProgram(response.data.program);
      } catch (error) {
        console.error('Error fetching mentorship program:', error);
      }
    };
    fetchProgram();

    const fetchPDFInfo = async () => {
      try {
        const response = await pdfAPI.getInfo();
        setPdfInfo(response.data.pdf);
      } catch (error) {
        console.error('Error fetching PDF info:', error);
      }
    };
    fetchPDFInfo();
  }, []);

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

  const scrollToTypingSection = () => {
    const typingSection = document.getElementById('punjabi-typing');
    if (typingSection) {
      typingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };



    const handleBookNow = async () => {
        setSigningIn(true);
        try {
          const result = await signInWithPopup(auth, googleProvider);
          console.log('User signed in:', result.user);
          // User will be automatically redirected to dashboard by App.jsx auth listener
        } catch (error) {
          console.error('Error signing in with Google:', error);
          if (error.code !== 'auth/popup-closed-by-user') {
            alert('Failed to sign in with Google. Please try again.');
          }
        } finally {
          setSigningIn(false);
        }
    };

    const handleTypingCourseClick = async () => {
  // Check if user is logged in
  if (!auth.currentUser) {
    // User not logged in - save intended destination and sign in
    setSigningIn(true);
    try {
      localStorage.setItem('redirectToTyping', 'true');
      await signInWithPopup(auth, googleProvider);
      // User will be redirected after sign-in by App.jsx
    } catch (error) {
      console.error('Error signing in:', error);
      localStorage.removeItem('redirectToTyping');
      if (error.code !== 'auth/popup-closed-by-user') {
        alert('Failed to sign in. Please try again.');
      }
    } finally {
      setSigningIn(false);
    }
  } else {
    // User is logged in - navigate directly
    navigate('punjabi-typing');
  }
};


  const achievements = [
    { exam: 'NDA & CDS', detail: 'Cleared defence exams with disciplined prep', icon: '🛡️' },
    { exam: 'Punjab Police (Constable & SI)', detail: 'Cleared multiple state police roles', icon: '🚔' },
    { exam: 'SSC CGL & SSC CPO SI', detail: 'Cracked top-tier SSC posts', icon: '⭐' },
    { exam: 'PSSSB Executive Assistant (Topper)', detail: 'Led the merit list with a focused plan', icon: '🏆' },
    { exam: 'PSSSB Clerk & Senior Assistant', detail: 'Cleared with optimized study plan', icon: '🗂️' },
    { exam: 'PSSSB Lab Attendant & Jail Warder', detail: 'Success across allied state exams', icon: '🔬' },
    { exam: 'Navy', detail: 'Cleared competitive intake', icon: '⚓' },
    { exam: 'CDS', detail: 'Repeated defence success', icon: '🎯' }
  ];

  const testimonials = [
    {
      quote: "Happy's guidance was instrumental in my UPSC preparation. His strategic approach and personalized mentorship made all the difference.",
      name: "Rajesh Kumar",
      role: "UPSC CSE 2023 Qualifier",
      rating: 5
    },
    {
      quote: "The one-on-one sessions helped me identify my weak areas and work on them effectively. Highly recommended for serious aspirants.",
      name: "Priya Sharma",
      role: "SSC CGL 2022 Qualified",
      rating: 5
    },
    {
      quote: "Best investment I made for my exam preparation. Happy's insights and study techniques are unmatched.",
      name: "Amit Verma",
      role: "Banking Aspirant",
      rating: 5
    }
  ];

  const features = [
    {
      icon: '🧭',
      title: 'Find your weak spots',
      description: 'Pinpoint exactly where you are losing marks and why the cut-off keeps slipping away.',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: '📝',
      title: 'Fix your study plan',
      description: 'Decide what to study, what to skip, and which single course is actually worth your time.',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: '📅',
      title: 'Get a custom timetable',
      description: 'Walk away with a day-by-day schedule, doubt support, and a clear score-boosting roadmap.',
      gradient: 'from-orange-500/20 to-red-500/20'
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
        content="Elite Academy, Elite Academy Pro, PSSSB coaching, government exam preparation, SSC coaching, NDA preparation, Punjab Police coaching, exam mentorship" 
      />
      <link rel="canonical" href="https://eliteacademy.pro" />
      
      {/* Open Graph tags */}
      <meta property="og:title" content="Elite Academy - Government Exam Preparation" />
      <meta property="og:description" content="Expert mentorship for PSSSB, SSC, NDA, CDS, and Punjab Police exams" />
      <meta property="og:url" content="https://eliteacademy.pro" />
      <meta property="og:type" content="website" />
      
      {/* Schema markup */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Elite Academy",
            "alternateName": "Elite Academy Pro",
            "url": "https://eliteacademy.pro",
            "description": "Expert mentorship for government exam preparation including PSSSB, SSC, NDA, CDS, and Punjab Police exams",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Amritsar",
              "addressRegion": "Punjab",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "2025eliteacademy@gmail.com",
              "contactType": "Customer Service"
            }
          }
        `}
      </script>
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

      {/* <div className="fixed top-[73px] sm:top-[81px] w-full z-50 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 border-b border-red-400 shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
      <span className="text-base sm:text-lg text-white font-bold animate-pulse">
        ⚠️ Website Under Development
      </span>
      <span className="text-sm sm:text-base text-white">
        • Fixing Bugs • Please Wait
      </span>
    </div>
  </div>
</div> */}

      {/* Mentorship Program Banner - Subtle Notice */}
      {program && program.isActive && program.availableSeats > 0 && (
        <div className="fixed top-[73px] sm:top-[81px] w-full z-40 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-pink-500/10 border-b border-yellow-500/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm text-yellow-300 font-semibold">⭐ Premium Program Available</span>
              <button
                onClick={handleEnrollClick}
                className="text-xs sm:text-sm text-white bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border border-yellow-500/30 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-semibold transition-all"
              >
                Learn More →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className={`relative pt-30 pb-20 px-4 sm:px-6 min-h-screen flex items-center ${program && program.isActive ? 'pt-[140px] sm:pt-[150px]' : 'pt-[100px] sm:pt-[120px]'}`}>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-block animate-fade-in">
                <span className="text-sm text-gray-400 border border-gray-700 px-5 py-2 rounded-full backdrop-blur-sm bg-white/5">
                  ✨ Expert Government Exam Mentor
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight animate-slide-up">
                🔥 Your Success Starts Today — One-to-One Session
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl animate-fade-in-delay">
                After clearing NDA, Navy, Punjab Police (Constable & SI), SSC CGL, CDS, SSC CPO SI, PSSSB Lab Attendant,
                Clerk, Senior Assistant, Jail Warder, and topping PSSSB Executive Assistant — I know exactly where
                students struggle and how to get you over the cut-off.
              </p>
              
              <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
                <button 
                  onClick={handleBookNow}
                  className="cursor-pointer group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold text-base sm:text-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book Consultation
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button 
                  onClick={scrollToPolitySection}
                  className="cursor-pointer group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold text-base sm:text-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Complete Study Material
                  </span>
                </button>
              
                <button 
                  onClick={scrollToTypingSection}
                  className="px-6 py-3 sm:px-8 sm:py-4 border border-white/20 rounded-full font-semibold text-base sm:text-lg hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
                >
                  Learn Typing
                </button>
              </div>


              <div className="flex items-start gap-3 text-sm sm:text-base text-gray-200 bg-white/5 border border-white/10 rounded-2xl p-4 max-w-xl animate-fade-in-delay-2">
                <span className="text-blue-300 text-lg sm:text-xl">ℹ️</span>
                <div>
                  <p className="font-semibold text-white">Before you pay</p>
                  <p>Please check your email right after payment for session confirmation and next steps.</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 animate-fade-in-delay-3">
                {[
                  { value: '1:1 Mentorship', label: 'Direct clarity, no generic coaching' },
                  { value: 'Cut-off Focused', label: 'Strategies for students stuck 1–3 marks short' },
                  { value: 'Actionable Plan', label: 'Timetable + what to study, what to skip' }
                ].map((stat, i) => (
                  <div key={i} className="text-left md:text-center">
                    <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/5 animate-fade-in-delay-3">
                <h3 className="text-lg font-semibold text-white mb-3">Why many miss the cut-off</h3>
                <ul className="space-y-2 text-gray-300 text-sm leading-relaxed">
                  <li>❌ Syllabus not completed systematically</li>
                  <li>❌ Unsure what to study and what to skip</li>
                  <li>❌ Following 10 sources but mastering none</li>
                  <li>❌ Buying multiple courses without a clear need</li>
                </ul>
                <p className="mt-4 text-sm text-gray-200">
                  This session fixes that with clarity, direction, and a cut-off-beating roadmap.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-3xl blur-3xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-2 border border-white/10">
                <img
                  src={image}
                  alt="Happy - Expert Mentor"
                  className="relative rounded-2xl w-full shadow-2xl"
                />
              </div>
              
            </div>
          </div>
        </div>
      </section>




        
  <section id="books" className="relative py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-y border-indigo-500/20">

    <div className="max-w-7xl mx-auto">
      <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-blue-500/20">
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
            PSSSB & Punjab Exams preparation — <span className="text-white font-semibold">8 complete subjects</span> in one place. Exam-oriented content for maximum marks.
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
                'Digital & physical copies available',
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
              onClick={handleBooksClick}
              disabled={signingIn}
              className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-103 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signingIn ? 'Signing in...' : 'Browse All Books →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>


{/* Polity Book Section */}
<section id="polity-book" className="relative py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-y border-indigo-500/20">
  <div className="max-w-7xl mx-auto">
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-indigo-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
     
        <div>
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm text-indigo-400 border border-indigo-500/30 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full backdrop-blur-sm bg-indigo-500/10">
              📘 Complete Polity Package
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Score Full Marks in Polity
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-4">
            Complete PSSSB & Punjab Exams Polity preparation - No extra books needed!
          </p>
          
          <div className="grid grid-cols-1 gap-3 mb-6">
            <div className="flex items-start gap-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-3 rounded-lg border border-indigo-500/20">
              <span className="text-2xl flex-shrink-0">🔥</span>
              <div>
                <p className="text-white font-semibold text-sm sm:text-base">90 Pages Full Polity Notes</p>
                <p className="text-gray-400 text-xs sm:text-sm">Complete coverage of all topics</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-lg border border-purple-500/20">
              <span className="text-2xl flex-shrink-0">🔥</span>
              <div>
                <p className="text-white font-semibold text-sm sm:text-base">20 Pages PYQs (2012–2025)</p>
                <p className="text-gray-400 text-xs sm:text-sm">December Updated - Latest questions</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-gradient-to-r from-pink-500/10 to-indigo-500/10 p-3 rounded-lg border border-pink-500/20">
              <span className="text-2xl flex-shrink-0">🔥</span>
              <div>
                <p className="text-white font-semibold text-sm sm:text-base">100% Exam Oriented</p>
                <p className="text-gray-400 text-xs sm:text-sm">PSSSB + Punjab specific preparation</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-4">
            <span className="text-green-400">✓</span>
            <span>Instant PDF delivery to your email</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
            <span className="text-green-400">✓</span>
            <span>One-time payment • Lifetime access</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-2xl"></div>
          <div className="relative">
            {auth.currentUser ? (
              <>
                <div className="text-center mb-4">
                  <div className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                    <span className="text-xs sm:text-sm text-yellow-400 font-semibold">🎯 LIMITED TIME OFFER</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    ₹199
                  </div>
                  <div className="text-sm text-gray-300">One-time payment</div>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <p className="text-xs text-gray-400 mb-2 text-center">What you'll get:</p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-indigo-400">📄</span>
                      <span>110 Pages Complete Package</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-400">📧</span>
                      <span>Instant email delivery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-400">🎓</span>
                      <span>Exam-ready content</span>
                    </li>
                  </ul>
                </div>

                <p className="text-center text-xs text-gray-400 mb-4">
                  PDF will be sent to your email after payment
                </p>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    Complete Polity Package
                  </div>
                  <p className="text-sm text-gray-300">Sign in to view price & purchase</p>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-indigo-400">✓</span>
                      <span>110 Pages Complete Package</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-400">✓</span>
                      <span>Updated till December 2025</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-400">✓</span>
                      <span>100% Exam Oriented Content</span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            <button
              onClick={handlePolityBookClick}
              disabled={signingIn}
              className="w-full group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-full font-bold text-base sm:text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {signingIn ? '🔄 Signing in...' : (auth.currentUser ? '📘 Get Polity Book Now' : '📘 Explore Polity Book')}
                {!signingIn && (
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




        {/* Punjabi Typing Training Section */}
<section id="punjabi-typing" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
  {/* Background decorative elements */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
        Learn Punjabi & English Typing
      </h2>
      <p className="text-xl text-gray-400">
        Master typing for Clerk & Senior Assistant exams
      </p>
    </div>

    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-64 md:h-auto">
          <img
            src={punjabiTypingImage}
            alt="Punjabi Typing Training"
            className="w-full h-full object-scale-down"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg">
              ⌨️ Typing Training
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
            PUNJABI & ENGLISH TYPING TRAINING
          </h3>
          <p className="text-lg text-gray-400 mb-6 font-semibold">
            CLERK / SENIOR ASSISTANT LEVEL
          </p>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Learn Punjabi and English typing exactly as required for Clerk & Senior Assistant exams.
            <br />
            <span className="font-semibold text-white">Same exam pattern • Same difficulty level • Real test practice</span>
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            <li className="flex items-start space-x-3 group">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-300 group-hover:text-gray-200 transition-colors">Suitable for beginners & experienced students</span>
            </li>
            <li className="flex items-start space-x-3 group">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-300 group-hover:text-gray-200 transition-colors">Step-by-step Punjabi typing learning (from zero)</span>
            </li>
            <li className="flex items-start space-x-3 group">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-300 group-hover:text-gray-200 transition-colors">Speed + accuracy focused training</span>
            </li>
            <li className="flex items-start space-x-3 group">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-300 group-hover:text-gray-200 transition-colors">Exam-oriented practice & mock tests</span>
            </li>
          </ul>

          <p className="text-gray-300 italic mb-6">
            Clear your typing exam, secure your dream government job.
            <br />
            <strong className="text-white">Enroll now. Your success starts here.</strong>
          </p>

          {/* CTA Button */}
          {/* <button
            onClick={() => navigate('/punjabi-typing')}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-900/50 hover:shadow-xl hover:shadow-purple-900/70 transition-all duration-300 transform hover:scale-[1.02]"
          >
            ⌨️ Explore Typing Course →
          </button> */}
          <button 
            onClick={handleTypingCourseClick}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-900/50 hover:shadow-xl hover:shadow-purple-900/70 transition-all duration-300 transform hover:scale-[1.02]"
          >
            {signingIn ? '🔄 Signing in...' : '⌨️ Explore Typing Course'}
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* PDF Purchase Section - Prominent Display */}
      {pdfInfo && (
        <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border-y border-green-500/20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-green-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                {/* Left: PDF Info */}
                <div>
                  <div className="inline-block mb-4">
                    <span className="text-xs sm:text-sm text-green-400 border border-green-500/30 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full backdrop-blur-sm bg-green-500/10">
                      📚 Study Material
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Elite Academy Magazine
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300 mb-4">
                    PSSSB Exam Preparation Guide - Only crisp, exam-oriented facts. Questions expected in upcoming PSSSB exams.
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {pdfInfo.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                        <span className="text-green-400">✓</span>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-1 text-xs sm:text-sm text-gray-400 mb-6">
                    {pdfInfo.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Price & CTA */}
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur-2xl"></div>
                  <div className="relative">
                    <div className="text-center mb-6">
                      <div className="text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                        ₹{pdfInfo.price}
                      </div>
                      <div className="text-sm text-gray-300">One-time payment</div>
                    </div>

                    <button
                      onClick={() => {
                        if (auth.currentUser) {
                          navigate('/pdf-purchase');
                        } else {
                          setSigningIn(true);
                          localStorage.setItem('redirectToPDF', 'true');
                          signInWithPopup(auth, googleProvider).catch((error) => {
                            console.error('Error signing in:', error);
                            localStorage.removeItem('redirectToPDF');
                            if (error.code !== 'auth/popup-closed-by-user') {
                              alert('Failed to sign in. Please try again.');
                            }
                            setSigningIn(false);
                          });
                        }
                      }}
                      className="w-full group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-bold text-base sm:text-lg overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {signingIn ? 'Signing in...' : 'Buy Now'}
                        {!signingIn && (
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                      PDF will be sent to your email after payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mentorship Program Section - Moved Higher */}
      {program && program.isActive && (
        <section className="relative py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm text-blue-400 border border-blue-500/30 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full backdrop-blur-sm bg-blue-500/10">
                  ⭐ Premium Program
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent px-4">
                Full Mentor Guidance Program
              </h2>
              <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto px-4">
                Transform your preparation with comprehensive mentorship, regular feedback, and personalized guidance
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {/* Left: Features */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">What's Included:</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-green-400 text-lg sm:text-xl mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                      <span className="text-gray-300 text-sm sm:text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Pricing & CTA */}
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl sm:rounded-3xl blur-2xl"></div>
                <div className="relative">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      ₹{program.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm sm:text-base text-gray-300">One-time payment</div>
                  </div>

                  <div className="bg-black/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-white/10">
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <span className="text-sm sm:text-base text-gray-300">Available Seats:</span>
                      <span className="text-xl sm:text-2xl font-bold text-green-400">
                        {program.availableSeats} / {program.totalSeats}
                      </span>
                    </div>
                    {program.availableSeats <= 2 && program.availableSeats > 0 && (
                      <div className="text-yellow-400 text-xs sm:text-sm font-semibold">
                        ⚠️ Only {program.availableSeats} seat{program.availableSeats > 1 ? 's' : ''} left!
                      </div>
                    )}
                    {program.availableSeats === 0 && (
                      <div className="text-red-400 text-xs sm:text-sm font-semibold">
                        ❌ All seats are booked
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleEnrollClick}
                    disabled={program.availableSeats === 0 || signingIn}
                    className="w-full group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold text-base sm:text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {signingIn ? 'Signing in...' : program.availableSeats === 0 ? 'Sold Out' : 'Enroll Now'}
                      {!signingIn && program.availableSeats > 0 && (
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <p className="text-center text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4">
                    Secure payment via Razorpay
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info - Mobile Optimized */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Why Choose This Program?</h4>
                  <ul className="space-y-1.5 sm:space-y-2 text-gray-300 text-xs sm:text-sm">
                    <li>• Long-term commitment for sustained growth</li>
                    <li>• Regular check-ins and progress tracking</li>
                    <li>• Personalized attention from Happy</li>
                    <li>• Comprehensive support throughout your journey</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Perfect For:</h4>
                  <ul className="space-y-1.5 sm:space-y-2 text-gray-300 text-xs sm:text-sm">
                    <li>• Students serious about long-term success</li>
                    <li>• Those who need consistent guidance</li>
                    <li>• Aspirants preparing for multiple exams</li>
                    <li>• Anyone committed to 6 months of focused preparation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Exams cracked. Strategies that work.
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Tested across defence, SSC, and PSSSB exams — so you get exam-specific clarity, not generic tips.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-white/30 transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-3xl transition-all duration-500"></div>
                
                <div className="relative">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{achievement.exam}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 max-w-[70%]">{achievement.detail}</span>
                    <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full font-semibold text-xs border border-blue-500/30">
                      Proven
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              What you get in the 1:1 session
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              No confusion. No overthinking. A clear, exam-ready plan tailored to you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:border-white/30 transition-all duration-500 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative text-center">
                  <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 grid lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Who should join?</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Students stuck 1–3 marks below cut-off</li>
                <li>• Students who don’t know where to start</li>
                <li>• Confused about which course to buy</li>
                <li>• Preparing for Punjab Exams / SSC / Defence / Police</li>
                <li>• Anyone who wants focused guidance and real strategy</li>
              </ul>
            </div>
            <div className="rounded-xl sm:rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 sm:p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Session deliverables</h3>
              <ul className="space-y-2 text-gray-100 text-sm">
                <li>✔ Identify weak areas holding you back</li>
                <li>✔ Fix your study plan and priorities</li>
                <li>✔ Decide exactly what to study and what to skip</li>
                <li>✔ Choose the right single course (if needed)</li>
                <li>✔ Build a personalized timetable</li>
                <li>✔ Clear doubts directly with me</li>
                <li>✔ Score-boosting strategy to beat the cut-off</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              What Students Say
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              Trusted by hundreds of successful government exam aspirants
            </p>
          </div>

          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === activeTestimonial
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 absolute inset-0'
                }`}
              >
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-2xl">★</span>
                    ))}
                  </div>
                  
                  <p className="text-2xl text-gray-300 mb-8 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-white/10 pt-6">
                    <div>
                      <div className="font-bold text-xl">{testimonial.name}</div>
                      <div className="text-gray-400">{testimonial.role}</div>
                    </div>
                    <div className="text-6xl opacity-20">"</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'w-12 bg-gradient-to-r from-blue-500 to-purple-500'
                      : 'w-3 bg-gray-600 hover:bg-gray-500'
                  } h-3 rounded-full`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
            
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">
                🚀 Your journey to selection begins with one step
              </h2>
              <p className="text-base sm:text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
                Book your One-to-One Session now. Walk away with clarity, a custom timetable, and a score-boosting roadmap.
              </p>
              <p className="text-sm sm:text-base text-gray-300 mb-10 max-w-2xl mx-auto">
                Because your success is not a matter of chance — it is a matter of strategy.
              </p>
              <button
                onClick={handleBookNow}
                className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-white text-black rounded-full font-bold text-base sm:text-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Today
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Elite Academy
            </div>
            <p className="text-gray-400">© 2025 Elite Academy. All rights reserved.</p>
            <div className="flex gap-6">
  <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
    Privacy
  </Link>
  <Link to="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">
    Terms
  </Link>
  <Link to="/contact-us" className="text-gray-400 hover:text-white transition-colors">
    Contact
  </Link>

  <Link to="/shipping-delivery-policy" className="text-gray-400 hover:text-white transition-colors">
  Shipping delivery policy
  </Link>

  <Link to="/cancellation-and-refund-policy" className="text-gray-400 hover:text-white transition-colors">
  Cancellation and refund policy
  </Link>

</div>
          </div>
        </div>
      </footer>

      {/* Mentorship Enrollment Modal */}
      {showEnrollmentModal && program && (
        <MentorshipEnrollmentModal
          program={program}
          onClose={() => setShowEnrollmentModal(false)}
          onEnrollmentSuccess={() => {
            setShowEnrollmentModal(false);
            // Refresh program data
            mentorshipAPI.getProgram().then(response => setProgram(response.data.program));
          }}
        />
      )}

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 6s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-delay-2 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fadeIn 0.8s ease-out 0.2s backwards;
        }
        
        .animate-fade-in-delay-2 {
          animation: fadeIn 0.8s ease-out 0.4s backwards;
        }
        
        .animate-fade-in-delay-3 {
          animation: fadeIn 0.8s ease-out 0.6s backwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>

    </>
  );
}

export default HomePage;