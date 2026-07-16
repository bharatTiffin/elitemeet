import { Link } from 'react-router-dom';
import SectionWrapper from './SectionWrapper';

function LocalAreaCard({ area }) {
  return (
    <article className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{area.heading}</h3>
      <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
        {area.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {area.bullets && area.bullets.length > 0 && (
          <ul className="list-disc list-outside ml-5 space-y-2">
            {area.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {area.link && (
          <p>
            <Link to={area.link.path} className="text-blue-400 hover:underline font-semibold">
              {area.link.label} →
            </Link>
          </p>
        )}
        {area.relatedLinks && area.relatedLinks.length > 0 && (
          <nav aria-label={`Related coaching for ${area.heading}`} className="flex flex-wrap gap-3 pt-2">
            {area.relatedLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-blue-400 hover:underline text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </article>
  );
}

export function LocalSeoSection({ localSeo }) {
  if (!localSeo?.areas?.length) {
    return null;
  }

  return (
    <SectionWrapper id="local-coaching" alt>
      <header className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{localSeo.title}</h2>
        {localSeo.subtitle && (
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">{localSeo.subtitle}</p>
        )}
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {localSeo.areas.map((area) => (
          <LocalAreaCard key={area.heading} area={area} />
        ))}
      </div>
    </SectionWrapper>
  );
}

export function ComparisonSection({ comparison }) {
  if (!comparison?.rows?.length) {
    return null;
  }

  const headers = comparison.headers || ['Feature', 'Elite Academy', 'Typical Coaching Institute'];

  return (
    <SectionWrapper id="comparison" narrow>
      <header className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{comparison.title}</h2>
        {comparison.subtitle && (
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">{comparison.subtitle}</p>
        )}
      </header>
      <figure className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm sm:text-base">
          <caption className="sr-only">{comparison.title}</caption>
          <thead>
            <tr className="border-b border-white/20">
              {headers.map((header, index) => (
                <th
                  key={header}
                  scope="col"
                  className={`px-4 py-4 font-semibold ${
                    index === 1
                      ? 'text-blue-300 bg-blue-500/10'
                      : index === 2
                        ? 'text-gray-400 bg-white/5'
                        : 'text-white bg-white/5'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.feature} className="border-b border-white/10 hover:bg-white/5">
                <th scope="row" className="px-4 py-4 text-white font-medium">
                  {row.feature}
                </th>
                <td className="px-4 py-4 text-gray-200 leading-relaxed bg-blue-500/5">
                  {row.elite}
                </td>
                <td className="px-4 py-4 text-gray-400 leading-relaxed">{row.typical}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <figcaption className="text-gray-500 text-sm mt-4 text-center">
          Feature comparison based on our coaching program versus commonly available alternatives
        </figcaption>
      </figure>
    </SectionWrapper>
  );
}

export default function BranchSection({ branches }) {
  return (
    <SectionWrapper id="online-vs-offline" alt>
      <header className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{branches.title}</h2>
        {branches.subtitle && (
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">{branches.subtitle}</p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {branches.modes.map((mode) => (
          <article
            key={mode.title}
            className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8"
          >
            <span className="text-3xl mb-4 block" aria-hidden="true">
              {mode.icon}
            </span>
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
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {branches.locations.map((location) => (
          <article
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
                className="inline-block mt-4 ml-0 sm:ml-4 text-blue-400 hover:underline font-semibold"
              >
                {location.linkLabel || 'Contact us →'}
              </Link>
            )}
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
