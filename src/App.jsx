// import { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './config/firebase';
// import { authAPI } from './services/api';
// import PunjabiTypingPurchase from './pages/PunjabiTypingPurchase';

// // Screens
// import HomePage from './screens/HomePage';  // ✅ Added HomePage
// import LoginPage from './screens/LoginPage';
// import UserDashboard from './screens/UserDashboard';
// import AdminDashboard from './screens/AdminDashboard';
// import PDFPurchasePage from './screens/PDFPurchasePage';

// // Policy Pages
// import ContactUs from './pages/ContactUs';
// import ShippingPolicy from './pages/ShippingPolicy';
// import TermsConditions from './pages/TermsConditions';
// import CancellationRefund from './pages/CancellationRefund';
// import PrivacyPolicy from './pages/PrivacyPolicy';

// // Components
// import ProtectedRoute from './components/ProtectedRoute';
// import Footer from './components/Footer';

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         try {
//           const idToken = await firebaseUser.getIdToken();
//           const response = await authAPI.sync(idToken);
//           console.log('✅ User synced:', response.data.user);
//           setUser(response.data.user);
          
//           // Check if user should be redirected to PDF purchase page
//           const redirectToPDF = localStorage.getItem('redirectToPDF');
//           if (redirectToPDF === 'true') {
//             localStorage.removeItem('redirectToPDF');
//             window.location.href = '/pdf-purchase';
//           }
//         } catch (error) {
//           console.error('❌ Error syncing user:', error);
//           setUser({
//             email: firebaseUser.email,
//             name: firebaseUser.displayName,
//             role: 'user'
//           });
          
//           // Check redirect even on error
//           const redirectToPDF = localStorage.getItem('redirectToPDF');
//           if (redirectToPDF === 'true') {
//             localStorage.removeItem('redirectToPDF');
//             window.location.href = '/pdf-purchase';
//           }
//         }
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-black">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
//           <p className="text-white text-lg">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <main className="flex-grow">
//           <Routes>
//             {/* ✅ HomePage Route - Show HomePage when not logged in */}
//             <Route
//               path="/"
//               element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <HomePage />}
//             />

//             {/* Optional: Keep LoginPage as separate route if needed */}
//             <Route
//               path="/login"
//               element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <LoginPage />}
//             />

//             {/* User Dashboard */}
//             <Route
//               path="/dashboard"
//               element={user && user.role !== 'admin' ? <UserDashboard /> : <Navigate to="/" replace />}
//             />

//             {/* PDF Purchase Page */}
//             <Route
//               path="/pdf-purchase"
//               element={user ? <PDFPurchasePage /> : <Navigate to="/" replace />}
//             />

//             {/* Admin Dashboard */}
//             <Route
//               path="/admin"
//               element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />}
//             />

//             {/* Policy Pages - Public Access */}
//             <Route path="/contact-us" element={<ContactUs />} />
//             <Route path="/shipping-delivery-policy" element={<ShippingPolicy />} />
//             <Route path="/terms-and-conditions" element={<TermsConditions />} />
//             <Route path="/cancellation-and-refund-policy" element={<CancellationRefund />} />
//             <Route path="/privacy-policy" element={<PrivacyPolicy />} />

//             {/* Catch all - redirect to home */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </main>
        
//         {/* Footer - Hide on HomePage since it has its own footer */}
//         {user && <Footer />}
//       </div>
//     </Router>
//   );
// }

// export default App;



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

// Policy Pages
import ContactUs from './pages/ContactUs';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsConditions from './pages/TermsConditions';
import CancellationRefund from './pages/CancellationRefund';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          const response = await authAPI.sync(idToken);
          console.log('✅ User synced:', response.data.user);
          setUser(response.data.user);
          
          // Check if user should be redirected to PDF purchase page
          const redirectToPDF = localStorage.getItem('redirectToPDF');
          if (redirectToPDF === 'true') {
            localStorage.removeItem('redirectToPDF');
            window.location.href = '/pdf-purchase';
          }
        } catch (error) {
          console.error('❌ Error syncing user:', error);
          setUser({
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            role: 'user'
          });
          
          // Check redirect even on error
          const redirectToPDF = localStorage.getItem('redirectToPDF');
          if (redirectToPDF === 'true') {
            localStorage.removeItem('redirectToPDF');
            window.location.href = '/pdf-purchase';
          }
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
