import { Link } from 'react-router-dom';

function TermsConditions() {
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
            Please read these terms carefully.
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1 text-xs font-medium text-rose-300">
            Terms & Conditions
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Elite Meet – Terms and Conditions
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-300/90">
            By accessing or using Elite Meet, you agree to these Terms and Conditions. Please review them
            to understand your rights, responsibilities, and the limitations of our services.
          </p>
          <p className="mt-2 text-xs md:text-sm text-slate-400">
            Last updated: December 7, 2025
          </p>
        </div>

        {/* Policy Content */}
        <section className="space-y-6">
          {/* Card: Service Description */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-indigo-900/25 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">
              About Elite Meet
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              Elite Meet offers 1-on-1 online doubt‑solving and consultation sessions for students preparing
              for competitive exams. The platform connects users with expert mentors who provide guidance and
              clarify subject-related doubts.
            </p>
          </div>

          {/* Card: Acceptance of Terms */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-slate-900/30">
            <h2 className="text-xl font-semibold text-white">
              Acceptance of terms
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              By creating an account, booking a session, or using any part of the Elite Meet platform, you
              agree to be bound by these Terms and Conditions, our Privacy Policy, and other applicable
              policies displayed on the site.
            </p>
          </div>

          {/* Card: Bookings & Payments */}
          <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/15 via-slate-900 to-amber-500/10 p-6 md:p-7 shadow-xl shadow-rose-900/30">
            <h2 className="text-xl font-semibold text-rose-100">
              Bookings, payments, and refunds
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-100">
              All bookings are final. Once payment is successfully completed, there is{' '}
              <span className="font-semibold text-rose-200">
                no refund and no cancellation
              </span>{' '}
              under any circumstances for confirmed sessions.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-100">
              By proceeding with payment, you confirm that you have reviewed our Cancellation & Refund Policy
              and agree to these terms.
            </p>
          </div>

          {/* Card: No Guaranteed Results */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-sky-900/25">
            <h2 className="text-xl font-semibold text-white">
              No guarantee of results
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              Our experts provide guidance, mentorship, and clarification of doubts to the best of their
              ability. However, Elite Meet does not guarantee any specific exam results, scores, ranks, or
              outcomes.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-300">
              Your success depends on your individual effort, preparation, consistency, and external factors
              beyond our control.
            </p>
          </div>

          {/* Card: Use of Content */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-slate-900 to-orange-500/10 p-6 md:p-7 shadow-lg shadow-amber-900/30">
            <h2 className="text-xl font-semibold text-amber-100">
              Session content and intellectual property
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-100">
              All content, materials, and resources provided during sessions or on the Elite Meet platform
              are for your personal educational use only.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-100">
              Recording, reproducing, sharing, or distributing session content without prior written
              permission from Elite Meet or the respective mentor is strictly prohibited.
            </p>
          </div>

          {/* Card: User Responsibilities */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-slate-900/35">
            <h2 className="text-xl font-semibold text-white">
              User responsibilities
            </h2>
            <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-slate-200">
              <li>Provide accurate registration details and keep your account secure.</li>
              <li>Use the platform only for lawful purposes and exam preparation.</li>
              <li>Behave respectfully with mentors and support staff during all interactions.</li>
              <li>Not share your account credentials with others or impersonate another person.</li>
            </ul>
          </div>

          {/* Card: Account Suspension */}
          <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/15 via-slate-900 to-red-500/10 p-6 md:p-7 shadow-lg shadow-rose-900/35">
            <h2 className="text-xl font-semibold text-rose-100">
              Account suspension and termination
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-100">
              Elite Meet reserves the right to suspend or terminate your account at any time if you violate
              these Terms and Conditions, engage in fraudulent activities, misuse the platform, or behave
              inappropriately towards mentors or staff.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-100">
              No refunds will be provided in cases of account suspension or termination due to policy
              violations.
            </p>
          </div>

          {/* Card: Limitation of Liability */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-slate-900/35">
            <h2 className="text-xl font-semibold text-white">
              Limitation of liability
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              Elite Meet and its team shall not be liable for any indirect, incidental, or consequential
              damages arising from the use or inability to use our services, including technical issues,
              internet connectivity problems, platform downtime, or dissatisfaction with session outcomes.
            </p>
          </div>

          {/* Card: Changes to Terms */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-indigo-900/25">
            <h2 className="text-xl font-semibold text-white">
              Changes to these terms
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              We may update these Terms and Conditions from time to time to reflect changes in our services,
              policies, or legal requirements. The "Last Updated" date at the top indicates when the terms
              were last revised.
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-300">
              Continued use of the platform after changes are posted constitutes your acceptance of the
              updated terms.
            </p>
          </div>

          {/* Card: Contact Info */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 md:p-7 shadow-lg shadow-sky-900/25">
            <h2 className="text-xl font-semibold text-white">
              Contact for terms-related queries
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              For any questions or concerns regarding these Terms and Conditions, you can contact the
              Elite Meet team:
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TermsConditions;
