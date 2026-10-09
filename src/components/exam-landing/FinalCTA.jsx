import { Link } from 'react-router-dom';

export default function FinalCTA({ finalCta, ctaPath = '/online-coaching' }) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto text-center relative overflow-hidden rounded-3xl bg-gradient-primary p-10 md:p-16 shadow-elegant">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%),radial-gradient(circle_at_80%_70%,white,transparent_40%)]" />
        <div className="relative">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">{finalCta.title}</h2>
        <p className="text-primary-foreground/85 text-lg mb-6 leading-relaxed">{finalCta.description}</p>
        {finalCta.highlights && finalCta.highlights.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-3 mb-8" aria-label="Program highlights">
            {finalCta.highlights.map((item) => (
              <li
                key={item}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/15 border border-white/25 text-primary-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        <Link
          to={ctaPath}
          className="inline-flex items-center justify-center h-12 px-7 rounded-md text-sm font-medium bg-background text-foreground hover:bg-background/90 transition-colors"
        >
          {finalCta.ctaLabel || 'Join Online Coaching'} →
        </Link>
        {finalCta.secondaryText && (
          <p className="text-primary-foreground/80 text-sm mt-6">
            {finalCta.secondaryText}{' '}
            <Link to="/contact-us" className="underline">
              Contact us
            </Link>
          </p>
        )}
        </div>
      </div>
    </section>
  );
}
