import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { Link } from "react-router-dom";
import image from '../assets/happy-pic.jpg'
function HomePage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [signingIn, setSigningIn] = useState(false);

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

//   const handleBookNow = () => {
//     navigate('/login');
//   };

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
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ExpertMentor
          </div>
          <button
            onClick={handleBookNow}
            className="cursor-pointer relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold overflow-hidden group"
          >
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-30 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
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
                
                <button className="px-6 py-3 sm:px-8 sm:py-4 border border-white/20 rounded-full font-semibold text-base sm:text-lg hover:bg-white/5 transition-all duration-300 backdrop-blur-sm">
                  Learn More
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

      {/* Achievements Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Exams cracked. Strategies that work.
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Tested across defence, SSC, and PSSSB exams — so you get exam-specific clarity, not generic tips.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 hover:scale-105"
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
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              What you get in the 1:1 session
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              No confusion. No overthinking. A clear, exam-ready plan tailored to you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-white/30 transition-all duration-500 hover:scale-105"
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

          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Who should join?</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Students stuck 1–3 marks below cut-off</li>
                <li>• Students who don’t know where to start</li>
                <li>• Confused about which course to buy</li>
                <li>• Preparing for Punjab Exams / SSC / Defence / Police</li>
                <li>• Anyone who wants focused guidance and real strategy</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">
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
      <section className="relative py-32 px-6">
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
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
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
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 rounded-3xl p-16">
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
              ExpertMentor
            </div>
            <p className="text-gray-400">© 2025 ExpertMentor. All rights reserved.</p>
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
  );
}

export default HomePage;