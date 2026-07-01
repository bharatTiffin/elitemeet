import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LandingNavbar({ examName }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          Elite Academy
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          {examName && (
            <span className="hidden sm:inline text-sm text-gray-400">{examName}</span>
          )}
          <Link
            to="/online-coaching"
            className="relative px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-sm sm:text-base overflow-hidden group"
          >
            <span className="relative z-10">Start Preparation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
