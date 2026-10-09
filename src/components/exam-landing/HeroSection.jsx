import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection({ hero, ctaPath = '/online-coaching' }) {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        {hero.badge && (
          <span className="inline-flex items-center gap-2 mb-6 glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-accent" />
            {hero.badge}
          </span>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
          {hero.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          {hero.subtitle}
        </p>
        <Link
          to={ctaPath}
          className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-md text-sm font-medium bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90 transition-opacity"
        >
          {hero.ctaLabel || 'Start Preparation'} <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
