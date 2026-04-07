import { Link } from 'react-router-dom';

function Footer() {

  return (
    <footer className="bg-gray-900 text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-white text-lg mb-3">Elite Academy</h3>
            <p className="mb-2">
              1:1 doubt-solving sessions for competitive exams. Get personalized guidance from expert mentors.
            </p>
            <div className="text-red-300 font-semibold mt-3 space-y-2">
              <p>⚠️ <strong>Terms & Conditions:</strong></p>
              <ul className="text-xs text-red-200 space-y-1 ml-2">
                <li>• All fees are <strong>NON-REFUNDABLE</strong> (Online & Offline)</li>
                <li>• All sessions are <strong>NON-CANCELLABLE</strong> once booked</li>
                <li>• Misbehavior or misconduct may result in <strong>Access Suspension/Termination</strong></li>
                <li>• We have the authority to <strong>Add/Remove Content & Access</strong> at any time</li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white text-lg mb-3">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                📍 Address:{' '}
                <a
                  href="https://maps.app.goo.gl/pTU8k1LX3TdLeVSd6"
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  SCO 144, Sector 24D, Chandigarh
                </a>
              </li>
              <li>
                📞 Phone:{' '}
                <a href="tel:7696954686" className="text-blue-400 hover:underline">
                  7696954686
                </a>
              </li>
              <li>
                📧 Email:{' '}
                <a href="mailto:2025eliteacademy@gmail.com" className="text-blue-400 hover:underline">
                  2025eliteacademy@gmail.com
                </a>
              </li>
              <li>
                📸 Instagram:{' '}
                <a
                  href="https://www.instagram.com/happy_khore/"
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  @happy_khore
                </a>
              </li>
              <li>
                ▶️ YouTube:{' '}
                <a
                  href="https://www.youtube.com/@itsmehappysingh/"
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  @itsmehappysingh
                </a>
              </li>
              <li>⏰ Mon-Sat: 10:00 AM – 7:00 PM IST</li>
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-3">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact-us" className="hover:text-blue-400 hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-blue-400 hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-blue-400 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cancellation-and-refund-policy" className="hover:text-blue-400 hover:underline">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-delivery-policy" className="hover:text-blue-400 hover:underline">
                  Service Delivery Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} Elite Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
