// import { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './config/firebase';
// import { authAPI } from './services/api';
// import LoginPage from './screens/LoginPage';  // Changed to ./screens/
// import UserDashboard from './screens/UserDashboard';  // Changed to ./screens/
// import AdminDashboard from './screens/AdminDashboard';  // Changed to ./screens/
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         try {
//           // Get Firebase ID token
//           const idToken = await firebaseUser.getIdToken();
          
//           // Sync user to MongoDB backend
//           const response = await authAPI.sync(idToken);
          
//           console.log('✅ User synced:', response.data.user);
//           setUser(response.data.user);
//         } catch (error) {
//           console.error('❌ Error syncing user:', error);
//           // If sync fails, still allow user to proceed with Firebase data
//           setUser({
//             email: firebaseUser.email,
//             name: firebaseUser.displayName,
//             role: 'user'
//           });
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
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route 
//           path="/" 
//           element={
//             user ? (
//               <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
//             ) : (
//               <LoginPage />
//             )
//           } 
//         />
        
//         <Route
//           path="/dashboard"
//           element={
//             user && user.role !== 'admin' ? (
//               <UserDashboard />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />
        
//         <Route
//           path="/admin"
//           element={
//             user && user.role === 'admin' ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />

//         {/* Catch all - redirect to home */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { authAPI } from './services/api';

// Screens
import LoginPage from './screens/LoginPage';
import UserDashboard from './screens/UserDashboard';
import AdminDashboard from './screens/AdminDashboard';

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            {/* Auth Route */}
            <Route
              path="/"
              element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <LoginPage />}
            />

            {/* User Dashboard */}
            <Route
              path="/dashboard"
              element={user && user.role !== 'admin' ? <UserDashboard /> : <Navigate to="/" replace />}
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
        
        {/* Footer on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
