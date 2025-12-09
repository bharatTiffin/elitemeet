import { Link } from 'react-router-dom';

function CancellationRefund() {
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
            Policy for bookings & payments.
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1 text-xs font-medium text-rose-300">
            Cancellation & Refund Policy
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Elite Meet – Cancellation & Refunds
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-300/90">
            Please review this policy carefully before booking a session. It explains how cancellations,
            rescheduling, and refunds are handled for all Elite Meet sessions.
          </p>
          <p className="mt-2 text-xs md:text-sm text-slate-400">
            Last updated: December 7, 2025
          </p>
        </div>

        {/* Policy Content */}
        <section className="space-y-6">
          {/* Card: No Refund / No Cancellation */}
          <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/15 via-slate-900 to-amber-500/10 p-6 md:p-7 shadow-xl shadow-rose-900/30 backdrop-blur">
            <h2 className="text-xl font-semibold text-rose-100">
              Strict no‑refund, no‑cancellation
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-100">
              All bookings on Elite Meet are final. Once payment is successfully completed, there is{' '}
              <span className="font-semibold text-rose-200">no refund and no cancellation</span>{' '}
              under any circumstances for confirmed sessions.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-200">
              This applies to all 1-on-1 doubt‑solving and consultation sessions booked through our platform,
              regardless of exam type, session duration, or pricing.
            </p>
          </div>

          {/* Card: Why this policy exists */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-sky-900/25 backdrop-blur">
            <h2 className="text-lg md:text-xl font-semibold text-white">
              Why this policy is important
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              Our experts reserve specific time slots exclusively for you. Once a slot is booked and paid for,
              that time is committed to you and cannot be offered to other students.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-300">
              To ensure fairness and respect for mentors’ schedules, Elite Meet follows a strict no‑refund,
              no‑cancellation policy for confirmed bookings.
            </p>
          </div>

          {/* Card: Before you pay */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-indigo-900/30">
            <h2 className="text-lg md:text-xl font-semibold text-white">
              Before completing your payment
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              Please double‑check these details before confirming your booking:
            </p>
            <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-slate-200">
              <li>Selected expert and exam type.</li>
              <li>Selected date and time slot (including time zone).</li>
              <li>Internet connection and device readiness for the session.</li>
            </ul>
          </div>

          {/* Card: Payment debited but no confirmation */}
          <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/15 via-slate-900 to-emerald-500/10 p-6 md:p-7 shadow-lg shadow-sky-900/35">
            <h2 className="text-lg md:text-xl font-semibold text-sky-100">
              Payment debited but booking not confirmed
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-100">
              If your payment is debited but you do not see a confirmed booking or receive a confirmation email
              within 5 minutes, please contact support immediately with your payment details.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-100">
              In such technical cases, Elite Meet will investigate and either confirm your booking or process a
              refund at our discretion. Keep your order ID, payment ID, and a transaction screenshot ready.
            </p>
          </div>

          {/* Card: No‑show and connectivity issues */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-slate-900/40">
            <h2 className="text-lg md:text-xl font-semibold text-white">
              Missed sessions and connectivity issues
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              If you miss your session, join very late, or face issues on your side (internet, device, power, etc.),
              the session will be treated as delivered and no refund or rescheduling will be provided.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-300">
              In rare and exceptional situations, rescheduling may be allowed purely at Elite Meet’s discretion
              if you contact support well in advance of your scheduled slot.
            </p>
          </div>

          {/* Card: Chargebacks & disputes */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-slate-900 to-red-500/10 p-6 md:p-7 shadow-lg shadow-amber-900/35">
            <h2 className="text-lg md:text-xl font-semibold text-amber-100">
              Chargebacks and disputes
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-100">
              Filing unauthorized chargebacks or payment disputes for completed sessions may lead to account
              suspension and further action from Elite Meet.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-100">
              For any genuine concern, please contact the support team first so that the issue can be resolved
              directly and transparently.
            </p>
          </div>

          {/* Card: Contact section */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-sky-900/25">
            <h2 className="text-lg md:text-xl font-semibold text-white">
              Questions about this policy?
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              If anything is unclear or you need help before booking a session, reach out to the Elite Meet team.
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-100">
              <p>
                <span className="text-slate-400">Email: </span>
                <a
                  href="mailto:2025eliteacademy@gmail.com"
                  className="text-sky-300 hover:text-sky-200 transition break-all"
                >
                  2025eliteacademy@gmail.com
                </a>
              </p>
              <p>
                <span className="text-slate-400">Instagram: </span>
                <a
                  href="https://www.instagram.com/happy_khore/"
                  className="text-sky-300 hover:text-sky-200 transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  @happy_khore
                </a>
              </p>
              <p>
                <span className="text-slate-400">YouTube: </span>
                <a
                  href="https://www.youtube.com/@itsmehappysingh/"
                  className="text-sky-300 hover:text-sky-200 transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  @itsmehappysingh
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CancellationRefund;
