import { auth } from '../config/firebase';

/**
 * Get authenticated user from either manual auth (localStorage) or Firebase auth
 * Use in useState(() => getAuthenticatedUser())
 */
export const getAuthenticatedUser = () => {
  // Check manual auth token first
  const manualAuthToken = localStorage.getItem('manualAuthToken');
  if (manualAuthToken) {
    try {
      return JSON.parse(manualAuthToken);
    } catch (error) {
      console.error('Error parsing manual auth token:', error);
      localStorage.removeItem('manualAuthToken');
    }
  }
  // Fallback to Firebase auth
  return auth.currentUser;
};
