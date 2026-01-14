import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { authAPI } from './services/api';
import PunjabiTypingPurchase from './pages/PunjabiTypingPurchase';

// Screens
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import UserDashboard from './screens/UserDashboard';
import AdminDashboard from './screens/AdminDashboard';
import PDFPurchasePage from './screens/PDFPurchasePage';
import PolityBookPurchase from './pages/PolityBookPurchase';
import CurrentAffairPurchase from './pages/CurrentAffairPurchase';
import Books from './pages/Books';
// Policy Pages
import ContactUs from './pages/ContactUs';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsConditions from './pages/TermsConditions';
import CancellationRefund from './pages/CancellationRefund';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

import EconomicsBookPurchase from './pages/EconomicsBookPurchase';
import GeographyBookPurchase from './pages/GeographyBookPurchase';
import EnvironmentBookPurchase from './pages/EnvironmentBookPurchase';
import ScienceBookPurchase from './pages/ScienceBookPurchase';
import ModernHistoryBookPurchase from './pages/ModernHistoryBookPurchase';
import AncientHistoryBookPurchase from './pages/AncientHistoryBookPurchase';
import MedievalHistoryBookPurchase from './pages/MedievalHistoryBookPurchase';
import CompletePackPurchase from './pages/CompletePackPurchase';
import WithoutPolityPackPurchase from './pages/WithoutPolityPackPurchase';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // ⚠️ CHECK REDIRECTS FIRST - Before setting user state
      const redirectToPolity = localStorage.getItem('redirectToPolity');
      const redirectToCurrentAffair = localStorage.getItem('redirectToCurrentAffair');
      const redirectToTyping = localStorage.getItem('redirectToTyping');
      const redirectToPDF = localStorage.getItem('redirectToPDF');
      const redirectToBooks = localStorage.getItem('redirectToBooks');
      
      if (redirectToPolity === 'true') {
        localStorage.removeItem('redirectToPolity');
        // Use navigate instead of window.location
        setTimeout(() => {
          window.location.replace('/polity-book');
        }, 100);
        return; // Don't set user state yet
      }

      if (redirectToCurrentAffair === 'true') {
        localStorage.removeItem('redirectToCurrentAffair');
        // Use navigate instead of window.location
        setTimeout(() => {
          window.location.replace('/current-affairs-book');
        }, 100);
        return; // Don't set user state yet
      }
      
      if (redirectToTyping === 'true') {
        localStorage.removeItem('redirectToTyping');
        setTimeout(() => {
          window.location.replace('/punjabi-typing');
        }, 100);
        return;
      }
      
      if (redirectToPDF === 'true') {
        localStorage.removeItem('redirectToPDF');
        setTimeout(() => {
          window.location.replace('/pdf-purchase');
        }, 100);
        return;
      }

      if (redirectToBooks === 'true') {
        localStorage.removeItem('redirectToBooks');
        setTimeout(() => {
          window.location.replace('/books');
        }, 100);
        return;
      }
      
      try {
        const idToken = await firebaseUser.getIdToken();
        const response = await authAPI.sync(idToken);
        console.log('✅ User synced:', response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error('❌ Error syncing user:', error);
        setUser({
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          role: 'user'
        });
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            {/* HomePage Route */}
            <Route
              path="/"
              element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <HomePage />}
            />

            {/* LoginPage */}
            <Route
              path="/login"
              element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <LoginPage />}
            />

            {/* User Dashboard */}
            <Route
              path="/dashboard"
              element={user && user.role !== 'admin' ? <UserDashboard /> : <Navigate to="/" replace />}
            />

            {/* PDF Purchase Page */}
            <Route
              path="/pdf-purchase"
              element={user ? <PDFPurchasePage /> : <Navigate to="/" replace />}
            />

            <Route path="/polity-book" element={<PolityBookPurchase />} />
            <Route path="/current-affairs-book" element={<CurrentAffairPurchase />} />
            <Route path="/economics-book" element={<EconomicsBookPurchase />} />
            <Route path="/geography-book" element={<GeographyBookPurchase />} />
            <Route path="/environment-book" element={<EnvironmentBookPurchase />} />
            <Route path="/science-book" element={<ScienceBookPurchase />} />
            <Route path="/modern-history-book" element={<ModernHistoryBookPurchase />} />
            <Route path="/ancient-history-book" element={<AncientHistoryBookPurchase />} />
            <Route path="/medieval-history-book" element={<MedievalHistoryBookPurchase />} />
            <Route path="/complete-pack" element={<CompletePackPurchase />} />
            <Route path="/without-polity-pack" element={<WithoutPolityPackPurchase />} />
            <Route path="/books" element={<Books />} />

            {/* ✅ NEW: Punjabi Typing Purchase Page - Public Access (will check login inside) */}
            <Route
              path="/punjabi-typing"
              element={<PunjabiTypingPurchase />}
            />

            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />}
            />

            {/* Policy Pages - Public Access */}
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/shipping-delivery-policy" element={<ShippingPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/cancellation-and-refund-policy" element={<CancellationRefund />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Footer - Hide on HomePage since it has its own footer */}
        {user && <Footer />}
      </div>
    </Router>
  );
}

export default App;
