import { Link } from 'react-router-dom';

function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Service Delivery Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last Updated: December 7, 2025</p>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">No Physical Shipping</h2>
            <p>
              Elite Meet provides online consultation services only. We do not ship any physical products. All sessions are conducted remotely via video conferencing platforms such as Google Meet, Zoom, or similar services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Service Delivery Process</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Sessions are delivered at the date and time you select during the booking process.</li>
              <li>A confirmation email with session details and meeting link will be sent to your registered email address immediately after successful payment.</li>
              <li>You must provide a valid and accurate email address during account creation and booking, as all communication and session details will be sent there.</li>
              <li>It is your responsibility to ensure you have a stable internet connection, functional device, and access to the video conferencing platform at the scheduled time.</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Join the session on time. Late arrivals will not extend the session duration.</li>
              <li>Ensure your device, internet connection, and video conferencing tools are working properly before the session starts.</li>
              <li>If you provide an incorrect email address or are unavailable at the scheduled time, the session is still considered delivered and no refund or rescheduling will be provided.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Session Confirmation</h2>
            <p>
              All session confirmations, reminders, and meeting links are sent via email. Please check your inbox (and spam/junk folder) regularly. If you do not receive a confirmation email within 5 minutes of payment, contact us immediately at:
            </p>
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

export default ShippingPolicy;
