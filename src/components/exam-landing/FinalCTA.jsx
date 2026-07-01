import { Link } from 'react-router-dom';

export default function FinalCTA({ finalCta, ctaPath = '/online-coaching' }) {
  return (
    <section className="relative px-4 sm:px-6 py-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-y border-blue-500/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">{finalCta.title}</h2>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">{finalCta.description}</p>
        <Link
          to={ctaPath}
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
        >
          {finalCta.ctaLabel || 'Join Online Coaching'} →
        </Link>
        {finalCta.secondaryText && (
          <p className="text-gray-400 text-sm mt-6">
            {finalCta.secondaryText}{' '}
            <Link to="/contact-us" className="text-blue-400 hover:underline">
              Contact us
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
