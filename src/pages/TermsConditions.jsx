import { Link } from 'react-router-dom';

function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last Updated: December 7, 2025</p>

          <p>
            Welcome to <strong>Elite Meet</strong>. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Services Provided</h2>
            <p>
              Elite Meet offers 1-on-1 online doubt-solving and consultation sessions for students preparing for competitive exams. Our platform connects users with expert mentors who provide guidance and clarify subject-related doubts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Account Creation and Email Requirement</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To use our services, you must create an account using a valid email address.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>All booking confirmations, session details, and communications will be sent to your registered email address.</li>
              <li>Providing incorrect or invalid email information may result in loss of service access without any refund.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Booking and Payment</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All sessions must be pre-booked and paid for in advance.</li>
              <li>Payments are processed securely through Razorpay, our payment gateway partner.</li>
              <li>You must carefully review the date, time, duration, and price before confirming your booking.</li>
              <li>Once payment is successfully completed, the booking is confirmed.</li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. No Refund / No Cancellation Policy</h2>
            <p className="font-semibold mb-2">
              All bookings are final. Once payment is successfully completed, there is NO REFUND and NO CANCELLATION under any circumstances.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>This policy applies even if you change your mind, have a scheduling conflict, miss the session, or are dissatisfied with the session outcome.</li>
              <li>Exceptions may be made only at our sole discretion and must be requested via email or phone with valid justification.</li>
              <li>If you experience a technical issue during payment (e.g., amount debited but booking not confirmed), contact us immediately at <strong>johnny90566@gmail.com</strong> or <strong>+91 90566 53906</strong>.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Ensure you have a stable internet connection, functional device, and access to the required video conferencing platform.</li>
              <li>Join the session on time. Late arrivals will not extend the session duration.</li>
              <li>Be respectful and courteous during sessions. Abusive, inappropriate, or disruptive behavior will result in immediate termination of the session without refund and may lead to account suspension.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. No Guarantee of Results</h2>
            <p>
              Our experts provide guidance, mentorship, and clarification of doubts to the best of their ability. However, we do not guarantee any specific exam results, scores, or outcomes. Success depends on individual effort, preparation, and circumstances beyond our control.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Intellectual Property</h2>
            <p>
              All content, materials, and resources provided during sessions or on our platform are for personal educational use only. Recording, reproducing, or distributing session content without permission is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time if you violate these Terms and Conditions, engage in fraudulent activity, or misuse our platform. No refunds will be provided in such cases.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
            <p>
              Elite Meet and its team shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services, including but not limited to technical issues, internet connectivity problems, or dissatisfaction with session outcomes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to Terms</h2>
            <p>
              We may update these Terms and Conditions from time to time. Continued use of the platform after changes are posted constitutes acceptance of the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Information</h2>
            <p>For any questions or concerns regarding these Terms and Conditions, please contact us:</p>
            <ul className="list-none space-y-1 ml-4 mt-2">
              <li>
                Phone:{' '}
                <a href="tel:+919056653906" className="text-blue-600 hover:underline">
                  +91 90566 53906
                </a>
              </li>
              <li>
                Email:{' '}
                <a href="mailto:johnny90566@gmail.com" className="text-blue-600 hover:underline">
                  johnny90566@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <Link
              to="/dashboard"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;
