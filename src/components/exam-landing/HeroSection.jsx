import { Link } from 'react-router-dom';

export default function HeroSection({ hero, ctaPath = '/online-coaching' }) {
  return (
    <section className="relative pt-28 sm:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        {hero.badge && (
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300">
            {hero.badge}
          </span>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
          {hero.title}
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          {hero.subtitle}
        </p>
        <Link
          to={ctaPath}
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
        >
          {hero.ctaLabel || 'Start Preparation'} →
        </Link>
      </div>
    </section>
  );
}
