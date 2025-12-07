import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-white text-lg mb-3">Elite Meet</h3>
            <p className="mb-2">
              1:1 doubt-solving sessions for competitive exams. Get personalized guidance from expert mentors.
            </p>
            <p className="text-red-300 font-semibold mt-3">
              ⚠️ All sessions are non-refundable and non-cancellable once booked.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white text-lg mb-3">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                📞 Phone:{' '}
                <a href="tel:+919056653906" className="text-blue-400 hover:underline">
                  +91 90566 53906
                </a>
              </li>
              <li>
                📧 Email:{' '}
                <a href="mailto:johnny90566@gmail.com" className="text-blue-400 hover:underline">
                  johnny90566@gmail.com
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
          <p>© {new Date().getFullYear()} Elite Meet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
