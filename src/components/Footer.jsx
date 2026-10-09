import { Link } from 'react-router-dom';
import BrandLogo from './site/BrandLogo';
import { Mail, MapPin, Phone, Instagram, Youtube, Clock, MessageCircle } from 'lucide-react';

const COLS = [
  {
    title: 'Courses',
    links: [
      ['Online Coaching', '/online-coaching'],
      ['Sectional Test Series', '/sectional-test-series'],
      ['Weekly Test', '/weekly-test'],
      ['French Course', '/french-course'],
      ['Mentorship', '/mentorship'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Books', '/books'],
      ['Current Affairs', '/monthly-current-affairs'],
      ['Punjab Recruitment Updates', '/blog'],
      ['Contact', '/contact-us'],
    ],
  },
  {
    title: 'Policies',
    links: [
      ['Terms & Conditions', '/terms-and-conditions'],
      ['Privacy Policy', '/privacy-policy'],
      ['Cancellation & Refund Policy', '/cancellation-and-refund-policy'],
      ['Service Delivery Policy', '/shipping-delivery-policy'],
    ],
  },
];

const linkCls = 'text-sm text-muted-foreground hover:text-foreground transition-colors';

function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card/40 backdrop-blur-xl text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <BrandLogo size="size-12" />
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Punjab&rsquo;s trusted government exam coaching institute. Online, offline, and everywhere in between —
              for PSSSB, Punjab Police, SSC and Banking exams.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://maps.app.goo.gl/pTU8k1LX3TdLeVSd6"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <MapPin className="size-4 shrink-0" /> SCO 144, Sector 24D, Chandigarh
                </a>
              </li>
              <li>
                <a href="tel:7696954686" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Phone className="size-4 shrink-0" /> 7696954686
                </a>
              </li>
              <li>
                <a
                  href="mailto:2025eliteacademy@gmail.com"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="size-4 shrink-0" /> 2025eliteacademy@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/happy_khore/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Instagram className="size-4 shrink-0" /> @happy_khore
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@itsmehappysingh/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Youtube className="size-4 shrink-0" /> @itsmehappysingh
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 shrink-0" /> Mon-Sat: 10:00 AM – 7:00 PM IST
              </li>
            </ul>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-sm mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map(([label, to]) => (
                  <li key={to}>
                    <Link to={to} className={linkCls}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground mb-2">Terms &amp; Conditions</p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 list-disc pl-4">
            <li>All fees are <strong>NON-REFUNDABLE</strong> (Online &amp; Offline)</li>
            <li>All sessions are <strong>NON-CANCELLABLE</strong> once booked</li>
            <li>Misbehavior or misconduct may result in <strong>Access Suspension/Termination</strong></li>
            <li>We have the authority to <strong>Add/Remove Content &amp; Access</strong> at any time</li>
          </ul>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Elite Academy. All rights reserved.</p>
        </div>
      </div>

      <a
        href="https://wa.me/917696954686"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 size-14 rounded-full bg-gradient-primary shadow-glow grid place-items-center hover:scale-110 transition-transform"
      >
        <MessageCircle className="size-6 text-primary-foreground" />
      </a>
    </footer>
  );
}

export default Footer;
