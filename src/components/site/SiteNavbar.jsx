import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { Menu, X, MessageCircle, LayoutDashboard } from 'lucide-react';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/online-coaching', label: 'Courses' },
  { to: '/sectional-test-series', label: 'Test Series' },
  { to: '/books', label: 'Books' },
  { to: '/mentorship', label: 'Mentorship' },
  { to: '/blog', label: 'Updates' },
  { to: '/contact-us', label: 'Contact' },
];

const WA = 'https://wa.me/917696954686';

/**
 * Shared marketing navbar. All logic stays with the caller:
 *  - onLogin: opens the existing AuthModal (logged-out visitors)
 *  - dashboardHref: when provided, shows Dashboard instead of Login
 */
export default function SiteNavbar({ onLogin, dashboardHref, sticky = false, ctaTo, ctaLabel = 'Login / Sign Up' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cta = dashboardHref ? (
    <Link
      to={dashboardHref}
      onClick={() => setOpen(false)}
      className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md text-sm font-medium bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90 transition-opacity"
    >
      <LayoutDashboard className="size-4" /> Dashboard
    </Link>
  ) : ctaTo ? (
    <Link
      to={ctaTo}
      onClick={() => setOpen(false)}
      className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90 transition-opacity whitespace-nowrap"
    >
      {ctaLabel}
    </Link>
  ) : (
    <button
      type="button"
      onClick={() => {
        setOpen(false);
        onLogin?.();
      }}
      className="cursor-pointer inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90 transition-opacity"
    >
      Login / Sign Up
    </button>
  );

  return (
    <header
      className={`${sticky ? 'sticky' : 'fixed inset-x-0'} top-0 z-50 transition-all duration-300 ${
        sticky || scrolled || open ? 'glass shadow-elegant' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 md:h-20 items-center justify-between">
        <Link to="/" aria-label="Elite Academy home">
          <BrandLogo />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end
              className={({ isActive }) =>
                `px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'font-semibold text-foreground'
                    : 'font-medium text-muted-foreground hover:text-foreground'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </a>
          {cta}
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-foreground cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md"
              >
                {n.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-3">
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center h-9 rounded-md text-sm font-medium border border-input"
              >
                WhatsApp
              </a>
              {cta}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
