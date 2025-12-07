import { Link } from 'react-router-dom';

function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
        
        <div className="space-y-6 text-gray-700">
          <p>
            Welcome to <strong>Elite Meet</strong> – your platform for booking 1-on-1 doubt-solving sessions with experts for competitive exams.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
            <div className="space-y-3">
              <p>
                <strong>Phone:</strong>{' '}
                <a href="tel:+919056653906" className="text-blue-600 hover:underline">
                  +91 90566 53906
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:johnny90566@gmail.com" className="text-blue-600 hover:underline">
                  johnny90566@gmail.com
                </a>
              </p>
              <p>
                <strong>Support Hours:</strong> Monday to Saturday, 10:00 AM – 7:00 PM IST
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Important Notice</h2>
            <p>
              Please note that once a slot is successfully booked and payment is completed, the booking is{' '}
              <strong>non-refundable and non-cancellable</strong>. For any technical issues or queries, please contact us at the above details.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Help</h2>
            <p>
              Our platform connects students preparing for competitive exams with experienced experts who can help clarify doubts and provide guidance. Simply create an account with your email, browse available time slots, and book a session that suits your schedule.
            </p>
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

export default ContactUs;
