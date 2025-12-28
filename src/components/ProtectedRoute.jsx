// import { useState, useEffect } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../config/firebase';
// import { authAPI } from '../services/api';

// function ProtectedRoute({ children, requiredRole }) {
//   const [user, setUser] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         try {
//           const response = await authAPI.sync();
//           setUserRole(response.data.user.role);
          
//           // Redirect based on role
//           if (requiredRole && response.data.user.role !== requiredRole) {
//             if (response.data.user.role === 'admin') {
//               navigate('/admin');
//             } else {
//               navigate('/user');
//             }
//           }
//         } catch (error) {
//           console.error('Error syncing user:', error);
//           navigate('/');
//         }
//       } else {
//         navigate('/');
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [navigate, requiredRole]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return user && userRole === requiredRole ? children : null;
// }

// export default ProtectedRoute;


import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { authAPI } from '../services/api';

function ProtectedRoute({ children, requiredRole }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // ⚠️ CHECK FOR REDIRECTS FIRST - Before role-based navigation
        const redirectToPolity = localStorage.getItem('redirectToPolity');
        const redirectToTyping = localStorage.getItem('redirectToTyping');
        const redirectToPDF = localStorage.getItem('redirectToPDF');
        
        if (redirectToPolity === 'true' || redirectToTyping === 'true' || redirectToPDF === 'true') {
          // Don't do anything - let App.jsx handle the redirect
          setLoading(false);
          return;
        }
        
        try {
          const response = await authAPI.sync();
          setUserRole(response.data.user.role);
          
          // Redirect based on role ONLY if no redirect intent exists
          if (requiredRole && response.data.user.role !== requiredRole) {
            if (response.data.user.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/user');
            }
          }
        } catch (error) {
          console.error('Error syncing user:', error);
          navigate('/');
        }
      } else {
        navigate('/');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
