import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Top Bar / Breadcrumb */}
      <div className="border-b border-slate-800/60 bg-slate-950/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
          >
            <span className="text-lg">←</span>
            <span>Back to Home</span>
          </Link>
          <span className="text-xs md:text-sm text-slate-400">
            Your privacy matters to us.
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1 text-xs font-medium text-indigo-300">
            Privacy & Data Protection
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Elite Meet – Privacy Policy
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-300/90">
            At Elite Meet, we are committed to protecting your privacy. This policy explains how we collect,
            use, store, and protect your personal information when you use our platform for 1-on-1 consultation
            sessions.
          </p>
          <p className="mt-2 text-xs md:text-sm text-slate-400">
            Last updated: December 7, 2025
          </p>
        </div>

        {/* Policy Content */}
        <section className="space-y-6">
          {/* Card: Information We Collect */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-xl shadow-indigo-900/25 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">
              Information we collect
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              We collect the following types of information when you use Elite Meet:
            </p>
            <ul className="mt-3 space-y-2 text-xs md:text-sm text-slate-200">
              <li>
                <span className="font-semibold text-indigo-200">Personal information:</span> Name, email
                address, phone number, profile picture (from Google Sign-In).
              </li>
              <li>
                <span className="font-semibold text-indigo-200">Booking details:</span> Exam type, selected
                time slots, payment information, and session history.
              </li>
              <li>
                <span className="font-semibold text-indigo-200">Technical data:</span> IP address, browser
                type, device information, cookies, and usage analytics.
              </li>
              <li>
                <span className="font-semibold text-indigo-200">Communication data:</span> Messages sent
                through support channels or email correspondence.
              </li>
            </ul>
          </div>

          {/* Card: How We Use Your Information */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-sky-900/25">
            <h2 className="text-xl font-semibold text-white">
              How we use your information
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              Elite Meet uses your personal data to:
            </p>
            <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-slate-200">
              <li>Process bookings and facilitate consultation sessions.</li>
              <li>Send booking confirmations, reminders, and updates via email.</li>
              <li>Process payments securely through our payment gateway partners.</li>
              <li>Provide customer support and respond to inquiries.</li>
              <li>Improve platform features, user experience, and service quality.</li>
              <li>Comply with legal obligations and enforce our Terms and Conditions.</li>
            </ul>
          </div>

          {/* Card: Data Sharing */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-slate-900 to-orange-500/10 p-6 md:p-7 shadow-lg shadow-amber-900/30">
            <h2 className="text-xl font-semibold text-amber-100">
              How we share your information
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-100">
              We do not sell, rent, or trade your personal information. However, we may share your data with:
            </p>
            <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-slate-100">
              <li>
                <span className="font-semibold text-amber-200">Service providers:</span> Payment gateways,
                email services, and hosting providers who help operate our platform.
              </li>
              <li>
                <span className="font-semibold text-amber-200">Experts/mentors:</span> Only the necessary
                information (name, email, exam type, session details) to facilitate your booking.
              </li>
              <li>
                <span className="font-semibold text-amber-200">Legal authorities:</span> When required by law
                or to protect our legal rights.
              </li>
            </ul>
          </div>

          {/* Card: Cookies */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-purple-900/25">
            <h2 className="text-xl font-semibold text-white">
              Cookies and tracking technologies
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              Elite Meet uses cookies and similar technologies to maintain login sessions, remember user
              preferences, and analyze platform performance. You can control cookie settings in your browser,
              but disabling cookies may affect your ability to use certain features.
            </p>
          </div>

          {/* Card: Data Security */}
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-slate-900 to-cyan-500/10 p-6 md:p-7 shadow-lg shadow-emerald-900/30">
            <h2 className="text-xl font-semibold text-emerald-100">
              Data security measures
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-100">
              We implement reasonable technical and organizational security measures to protect your personal
              information, including:
            </p>
            <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-slate-100">
              <li>Encrypted data transmission (HTTPS/SSL).</li>
              <li>Secure authentication via Google Sign-In.</li>
              <li>Regular security audits and monitoring.</li>
              <li>Access controls to limit who can view your data.</li>
            </ul>
            <p className="mt-3 text-xs md:text-sm text-slate-100">
              However, no system is completely secure. While we strive to protect your data, we cannot
              guarantee absolute security against unauthorized access, hacking, or data breaches.
            </p>
          </div>

          {/* Card: Data Retention */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-sky-900/25">
            <h2 className="text-xl font-semibold text-white">
              Data retention
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              We retain your personal information for as long as your account is active or as needed to provide
              services, comply with legal obligations, resolve disputes, and enforce our Terms and Conditions.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-300">
              If you wish to delete your account, please contact us at{' '}
              <a
                href="mailto:johnny90566@gmail.com"
                className="text-sky-300 hover:text-sky-200 transition"
              >
                johnny90566@gmail.com
              </a>
              .
            </p>
          </div>

          {/* Card: Your Rights */}
          <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/15 via-slate-900 to-indigo-500/10 p-6 md:p-7 shadow-lg shadow-sky-900/35">
            <h2 className="text-xl font-semibold text-sky-100">
              Your privacy rights
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-100">
              You have the right to:
            </p>
            <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-slate-100">
              <li>Access, update, or correct your personal information.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Withdraw consent for data processing (where applicable).</li>
              <li>Opt out of promotional emails (you will still receive transactional emails).</li>
              <li>Lodge a complaint with relevant data protection authorities if you believe your rights have been violated.</li>
            </ul>
            <p className="mt-3 text-xs md:text-sm text-slate-100">
              To exercise these rights, please contact us at{' '}
              <a
                href="mailto:johnny90566@gmail.com"
                className="text-sky-300 hover:text-sky-200 transition"
              >
                johnny90566@gmail.com
              </a>{' '}
              or call{' '}
              <a
                href="tel:+919056653906"
                className="text-sky-300 hover:text-sky-200 transition"
              >
                +91 90566 53906
              </a>
              .
            </p>
          </div>

          {/* Card: Third-Party Links */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-slate-900/30">
            <h2 className="text-xl font-semibold text-white">
              Third-party links
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              Our platform may contain links to third-party websites or services (e.g., video conferencing
              platforms). We are not responsible for the privacy practices or content of these external sites.
              Please review their privacy policies before providing any personal information.
            </p>
          </div>

          {/* Card: Children's Privacy */}
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/15 via-slate-900 to-pink-500/10 p-6 md:p-7 shadow-lg shadow-purple-900/30">
            <h2 className="text-xl font-semibold text-purple-100">
              Children's privacy
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-100">
              Our services are intended for users aged 13 and above. If you are under 13, you must have
              parental consent to use our platform. We do not knowingly collect personal information from
              children under 13 without parental consent. If we become aware of such data, we will delete it
              promptly.
            </p>
          </div>

          {/* Card: Policy Updates */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-indigo-900/25">
            <h2 className="text-xl font-semibold text-white">
              Changes to this policy
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal
              requirements. The "Last Updated" date at the top indicates when the policy was last revised.
              Continued use of our platform after changes are posted constitutes acceptance of the updated
              policy.
            </p>
          </div>

          {/* Card: Contact Information */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-sky-900/25">
            <h2 className="text-xl font-semibold text-white">
              Contact us
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal
              data, please reach out to us:
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-100">
              <p>
                <span className="text-slate-400">Email: </span>
                <a
                  href="mailto:johnny90566@gmail.com"
                  className="text-sky-300 hover:text-sky-200 transition break-all"
                >
                  johnny90566@gmail.com
                </a>
              </p>
              <p>
                <span className="text-slate-400">Phone: </span>
                <a
                  href="tel:+919056653906"
                  className="text-sky-300 hover:text-sky-200 transition"
                >
                  +91 90566 53906
                </a>
              </p>
              <p className="text-slate-400">
                Support Hours: Monday to Saturday, 10:00 AM – 7:00 PM IST
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PrivacyPolicy;
