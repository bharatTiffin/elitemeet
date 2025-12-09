import { Link } from 'react-router-dom';

function ShippingPolicy() {
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
            Shipping & digital delivery info.
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1 text-xs font-medium text-emerald-300">
            Shipping & Delivery
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Elite Meet – Shipping Policy
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-300/90">
            Elite Meet provides online consultation services only. This policy explains how your sessions
            are delivered and how you receive confirmations and meeting links.
          </p>
          <p className="mt-2 text-xs md:text-sm text-slate-400">
            Last updated: December 7, 2025
          </p>
        </div>

        {/* Policy Content */}
        <section className="space-y-6">
          {/* Card: No Physical Shipping */}
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-slate-900 to-cyan-500/10 p-6 md:p-7 shadow-xl shadow-emerald-900/30 backdrop-blur">
            <h2 className="text-xl font-semibold text-emerald-100">
              No physical products
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-100">
              Elite Meet provides online consultation services only. We do not ship any physical products,
              books, or study materials to your address.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-100">
              All sessions are conducted remotely via online meeting platforms such as Google Meet, Zoom,
              or similar services.
            </p>
          </div>

          {/* Card: How You Receive Session Details */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-sky-900/25">
            <h2 className="text-xl font-semibold text-white">
              How your session is delivered
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              After successful payment, your booking details and meeting link are delivered digitally to the
              email address associated with your account.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-slate-200">
              <li>Session confirmation email with date, time, and expert details.</li>
              <li>Meeting link (e.g., Google Meet or Zoom) to join your session.</li>
              <li>Reminder emails or notifications, where applicable.</li>
            </ul>
          </div>

          {/* Card: Email Delivery & Checks */}
          <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/15 via-slate-900 to-indigo-500/10 p-6 md:p-7 shadow-lg shadow-sky-900/35">
            <h2 className="text-xl font-semibold text-sky-100">
              Email delivery and spam folder
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-100">
              All session confirmations, reminders, and meeting links are sent via email. Please check your
              inbox and spam/junk folder regularly to ensure you do not miss important updates.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-100">
              If you do not receive a confirmation email within 5 minutes of payment, contact us immediately
              with your transaction details so we can verify and assist you.
            </p>
          </div>

          {/* Card: What You Should Verify */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-slate-900/35">
            <h2 className="text-xl font-semibold text-white">
              Before your session
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              To ensure a smooth online experience, please make sure that:
            </p>
            <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-slate-200">
              <li>Your email ID is correct and accessible.</li>
              <li>You have received the meeting link and session time in your inbox.</li>
              <li>Your internet connection, device, and audio/video setup are working.</li>
            </ul>
          </div>

          {/* Card: Contact Info */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-sky-900/25">
            <h2 className="text-xl font-semibold text-white">
              Need help with delivery?
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              If you face any issues receiving your confirmation email or meeting link, please reach out:
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

export default ShippingPolicy;
