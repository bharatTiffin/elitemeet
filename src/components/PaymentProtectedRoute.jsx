import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthenticatedUser } from '../utils/authHelper';
import { coachingAPI } from '../services/api';

// Added 'courseType' prop
function PaymentProtectedRoute({ children, courseType = 'complete' }) {
  const [hasAccess, setHasAccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = getAuthenticatedUser();
  const location = useLocation();

  useEffect(() => {
    const checkPaymentAccess = async () => {
      if (!user?.email) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        let res;
        // Logic to switch between API endpoints based on course type
        if (courseType === 'crash') {
          res = await coachingAPI.checkCrashCourseAccess(user.email);
        } else {
          res = await coachingAPI.checkAccess(user.email);
        }
        
        setHasAccess(res.data.hasAccess);
      } catch (error) {
        console.error(`Error checking ${courseType} access:`, error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    checkPaymentAccess();
  }, [user, courseType]); // Re-run if courseType changes

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying {courseType} access...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    // Redirect to a specific page or show a "Buy Now" message
    return <Navigate to="/user" replace state={{ from: location }} />;
  }

  return children;
}

export default PaymentProtectedRoute;