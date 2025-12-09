import { Link } from 'react-router-dom';

function ContactUs() {
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
            Need help? Reach out anytime.
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1 text-xs font-medium text-sky-300">
            Support & Assistance
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Contact Elite Meet Support
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-300/90">
            Elite Meet helps you book 1-on-1 doubt‑solving sessions with experts for competitive exams.
            If you have any questions about bookings, payments, or sessions, use the details below to reach us.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.3fr,1fr]">
          {/* Left: Contact Details Card */}
          <section className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-8 shadow-xl shadow-sky-900/20 backdrop-blur">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
              Get in touch
            </h2>
            <p className="text-sm md:text-base text-slate-300 mb-6">
              Reach out for any technical issues, payment queries, or questions before booking a session.
            </p>

            <div className="space-y-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Email
                </div>
                <a
                  href="mailto:2025eliteacademy@gmail.com"
                  className="mt-1 inline-flex items-center text-base text-sky-300 hover:text-sky-200 transition break-all"
                >
                  2025eliteacademy@gmail.com
                </a>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Social
                </div>
                <div className="mt-1 space-y-1">
                  <a
                    href="https://www.instagram.com/happy_khore/"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-base text-sky-300 hover:text-sky-200 transition"
                  >
                    Instagram: @happy_khore
                  </a>
                  <a
                    href="https://www.youtube.com/@itsmehappysingh/"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-base text-sky-300 hover:text-sky-200 transition"
                  >
                    YouTube: @itsmehappysingh
                  </a>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Support hours
                </div>
                <p className="mt-1 text-sm md:text-base text-slate-300">
                  Monday to Saturday, 10:00 AM – 7:00 PM IST
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 via-slate-900 to-indigo-500/10 p-4">
                <h3 className="text-sm font-semibold text-sky-200">
                  Important booking note
                </h3>
                <p className="mt-2 text-xs md:text-sm text-slate-100">
                  Once a slot is successfully booked and payment is completed, the booking is{' '}
                  <span className="font-semibold text-rose-300">
                    non‑refundable and non‑cancellable
                  </span>
                  . For technical issues or failed confirmations, contact support with your payment details.
                </p>
              </div>
            </div>
          </section>

          {/* Right: Quick Info / How it works */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-lg shadow-indigo-900/30 backdrop-blur">
              <h2 className="text-sm font-semibold text-slate-100 mb-2">
                About Elite Meet
              </h2>
              <p className="text-xs md:text-sm text-slate-300">
                Elite Meet connects students preparing for competitive exams with experienced experts for
                personalized 1-on-1 doubt‑solving sessions. Create an account using your email, explore
                available time slots, and book a session that fits your schedule.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-sky-500/10 p-5 shadow-lg shadow-emerald-900/30">
              <h3 className="text-sm font-semibold text-emerald-200 mb-2">
                For faster resolution
              </h3>
              <ul className="space-y-1.5 text-xs md:text-sm text-slate-100">
                <li>Include your registered email ID.</li>
                <li>Share your booking date, time slot, and exam type.</li>
                <li>Mention any payment reference or transaction ID, if applicable.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default ContactUs;
