import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last Updated: December 7, 2025</p>

          <p>
            At <strong>Elite Meet</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our platform to book 1-on-1 consultation sessions for competitive exam preparation.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="mb-2">We collect the following types of information:</p>
            
            <h3 className="font-semibold mt-4 mb-2">Personal Information:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Name:</strong> To identify you during sessions and communications.</li>
              <li><strong>Email Address:</strong> Mandatory for account creation, booking confirmations, session details, and all service-related communications.</li>
              <li><strong>Phone Number:</strong> Optional, for support and emergency contact purposes.</li>
              <li><strong>Session Preferences:</strong> Topics, exam type, and purpose of booking to match you with the right expert.</li>
            </ul>

            <h3 className="font-semibold mt-4 mb-2">Payment Information:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Payment details (card, UPI, net banking) are processed securely by our payment gateway partner, <strong>Razorpay</strong>.</li>
              <li>We do not store complete card details or sensitive payment information on our servers.</li>
              <li>We only receive and store transaction IDs, order IDs, and payment status from Razorpay for record-keeping and dispute resolution.</li>
            </ul>

            <h3 className="font-semibold mt-4 mb-2">Technical Information:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>IP address, browser type, device information, and operating system for security and analytics.</li>
              <li>Cookies and session data to maintain login state and improve user experience.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Account Management:</strong> To create and manage your account, verify your identity, and provide access to our platform.</li>
              <li><strong>Booking and Delivery:</strong> To process bookings, send confirmation emails, session links, and reminders.</li>
              <li><strong>Payment Processing:</strong> To securely process payments through Razorpay and handle refunds (if applicable in exceptional cases).</li>
              <li><strong>Customer Support:</strong> To respond to your inquiries, resolve technical issues, and provide assistance.</li>
              <li><strong>Service Improvement:</strong> To analyze usage patterns, improve our platform, and enhance user experience.</li>
              <li><strong>Security and Fraud Prevention:</strong> To detect and prevent fraudulent activity, unauthorized access, and abuse of our services.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Sharing Your Information</h2>
            <p className="mb-2">We do not sell, rent, or trade your personal information. We may share your data with:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Payment Gateway (Razorpay):</strong> To securely process payments and verify transactions.</li>
              <li><strong>Communication Providers:</strong> Email and notification services (e.g., SendGrid, Gmail SMTP) to send booking confirmations and updates.</li>
              <li><strong>Video Conferencing Platforms:</strong> Session links may be generated through platforms like Google Meet or Zoom.</li>
              <li><strong>Legal Authorities:</strong> If required by law, court order, or government regulation, we may disclose your information to law enforcement or regulatory bodies.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to maintain login sessions, remember user preferences, and analyze platform performance. You can control cookie settings in your browser, but disabling cookies may affect your ability to use certain features of our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Security</h2>
            <p>
              We implement reasonable technical and organizational security measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>HTTPS encryption for secure data transmission</li>
              <li>Password hashing and secure authentication</li>
              <li>Restricted access to personal data on a need-to-know basis</li>
              <li>Regular security audits and monitoring</li>
            </ul>
            <p className="mt-3">
              However, no system is completely secure. While we strive to protect your data, we cannot guarantee absolute security against unauthorized access, hacking, or data breaches.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our Terms and Conditions. If you wish to delete your account, please contact us at <a href="mailto:johnny90566@gmail.com" className="text-blue-600 hover:underline">johnny90566@gmail.com</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> Request deletion of your account and personal data (subject to legal and operational requirements).</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from promotional emails (service-related emails such as booking confirmations cannot be opted out of).</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, please contact us at <a href="mailto:johnny90566@gmail.com" className="text-blue-600 hover:underline">johnny90566@gmail.com</a> or call <a href="tel:+919056653906" className="text-blue-600 hover:underline">+91 90566 53906</a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites or services (e.g., video conferencing platforms). We are not responsible for the privacy practices or content of these external sites. Please review their privacy policies before providing any personal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Children's Privacy</h2>
            <p>
              Our services are intended for users aged 13 and above. If you are under 13, you must have parental consent to use our platform. We do not knowingly collect personal information from children under 13 without parental consent. If we become aware of such data, we will delete it promptly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The "Last Updated" date at the top will indicate when the policy was last revised. Continued use of our platform after changes are posted constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
            <ul className="list-none space-y-2 ml-4 mt-3">
              <li>
                📧 Email:{' '}
                <a href="mailto:johnny90566@gmail.com" className="text-blue-600 hover:underline font-semibold">
                  johnny90566@gmail.com
                </a>
              </li>
              <li>
                📞 Phone:{' '}
                <a href="tel:+919056653906" className="text-blue-600 hover:underline font-semibold">
                  +91 90566 53906
                </a>
              </li>
              <li>⏰ Support Hours: Monday to Saturday, 10:00 AM – 7:00 PM IST</li>
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

export default PrivacyPolicy;
