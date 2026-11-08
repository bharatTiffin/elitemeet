import { initializeApp } from 'firebase/app';
import {
  initializeAuth, GoogleAuthProvider, indexedDBLocalPersistence, browserLocalPersistence,
  browserPopupRedirectResolver,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializeAuth without a popupRedirectResolver avoids loading Firebase's hidden
// auth iframe + Google gapi script on every page load (~130KB of third-party JS that
// blocks slow phones). The resolver is only needed for sign-in, so pass it there.
export const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence],
});
export const popupResolver = browserPopupRedirectResolver;
export const googleProvider = new GoogleAuthProvider();
