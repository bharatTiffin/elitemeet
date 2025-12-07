import { Link } from 'react-router-dom';

function CancellationRefund() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cancellation and Refund Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last Updated: December 7, 2025</p>

          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-900 mb-3">NO REFUND | NO CANCELLATION</h2>
            <p className="font-semibold text-lg">
              All bookings on Elite Meet are final. Once payment is successfully completed, there is NO REFUND and NO CANCELLATION under any circumstances.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Policy Scope</h2>
            <p>This policy applies to all 1-on-1 doubt-solving and consultation sessions booked through our platform, regardless of:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Change of mind or scheduling conflicts</li>
              <li>Personal emergencies or unforeseen circumstances</li>
              <li>Missing the scheduled session or arriving late</li>
              <li>Dissatisfaction with session content or outcomes</li>
              <li>Technical issues on the user's end (internet, device, etc.)</li>
              <li>Exam results or performance after the session</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Why This Policy?</h2>
            <p>
              Our experts reserve specific time slots exclusively for you. Once a slot is booked and paid for, that time is committed to you and cannot be offered to other students. To ensure fairness and respect for everyone's time, we enforce a strict no-refund, no-cancellation policy.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Before You Book – Important Checklist</h2>
            <p className="mb-3">Please carefully verify the following before completing your payment:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Date and Time:</strong> Double-check that the selected slot matches your availability.</li>
              <li><strong>Email Address:</strong> Ensure your registered email is correct, as all confirmations and session links will be sent there.</li>
              <li><strong>Price and Duration:</strong> Review the session cost and duration before paying.</li>
              <li><strong>Internet and Device:</strong> Confirm you have a stable connection and working device for the session.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Payment Issues or Technical Errors</h2>
            <p>
              If your payment is debited from your account but the booking is not confirmed or you do not receive a confirmation email within 5 minutes, please contact us immediately:
            </p>
            <ul className="list-none space-y-2 ml-4 mt-3">
              <li>
                📞 Phone:{' '}
                <a href="tel:+919056653906" className="text-blue-600 hover:underline font-semibold">
                  +91 90566 53906
                </a>
              </li>
              <li>
                📧 Email:{' '}
                <a href="mailto:johnny90566@gmail.com" className="text-blue-600 hover:underline font-semibold">
                  johnny90566@gmail.com
                </a>
              </li>
            </ul>
            <p className="mt-3">
              In such technical cases, we will investigate the issue and either confirm your booking or process a refund at our discretion. Please provide your payment transaction details (order ID, payment ID, transaction screenshot) when contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">No Automatic Rescheduling</h2>
            <p>
              If you miss your session, arrive very late, or experience issues on your end (internet, device, etc.), the session is considered delivered and no refund or rescheduling will be provided. In exceptional circumstances, we may allow rescheduling at our sole discretion if you contact us in advance.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Disputes and Chargebacks</h2>
            <p>
              Filing unauthorized chargebacks or disputes for completed services may result in account suspension and legal action. If you have a genuine concern, please contact us first so we can resolve it directly.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💡 Need Help?</h2>
            <p>
              If you have questions about this policy or need assistance before booking, please reach out to us. We're here to help ensure you have a smooth experience.
            </p>
            <p className="mt-2">
              <strong>Contact Us:</strong>
            </p>
            <ul className="list-none space-y-1 ml-4 mt-2">
              <li>📞 +91 90566 53906</li>
              <li>📧 johnny90566@gmail.com</li>
              <li>⏰ Mon-Sat, 10:00 AM – 7:00 PM IST</li>
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

export default CancellationRefund;
