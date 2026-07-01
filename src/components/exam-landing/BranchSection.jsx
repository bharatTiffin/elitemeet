import { Link } from 'react-router-dom';
import SectionWrapper from './SectionWrapper';

export default function BranchSection({ branches }) {
  return (
    <SectionWrapper id="online-vs-offline" alt>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{branches.title}</h2>
      {branches.subtitle && (
        <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          {branches.subtitle}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {branches.modes.map((mode) => (
          <div
            key={mode.title}
            className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8"
          >
            <span className="text-3xl mb-4 block">{mode.icon}</span>
            <h3 className="text-xl font-bold text-white mb-3">{mode.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{mode.description}</p>
            {mode.idealFor && (
              <p className="text-gray-400 text-sm">
                <span className="text-blue-400 font-semibold">Ideal for: </span>
                {mode.idealFor}
              </p>
            )}
            {mode.ctaPath && (
              <Link
                to={mode.ctaPath}
                className="inline-block mt-4 text-blue-400 hover:underline font-semibold text-sm"
              >
                {mode.ctaLabel || 'Learn more →'}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {branches.locations.map((location) => (
          <div
            key={location.name}
            className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8"
          >
            <h3 className="text-xl font-bold text-white mb-4">{location.name}</h3>
            <address className="text-gray-300 not-italic leading-relaxed mb-4 whitespace-pre-line">
              {location.address}
            </address>
            <p className="text-gray-400 text-sm">{location.description}</p>
            {location.phone && (
              <a
                href={`tel:${location.phone.replace(/\D/g, '')}`}
                className="inline-block mt-4 text-blue-400 hover:underline font-semibold"
              >
                Call: {location.phone}
              </a>
            )}
            {location.linkPath && (
              <Link
                to={location.linkPath}
                className="inline-block mt-4 text-blue-400 hover:underline font-semibold"
              >
                {location.linkLabel || 'Contact us →'}
              </Link>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
