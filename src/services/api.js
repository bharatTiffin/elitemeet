import axios from 'axios';
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Firebase token to all requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔥 AUTH API
export const authAPI = {
  sync: async (token) => {
    return api.post('/auth/sync', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};

// SLOTS API
export const slotsAPI = {
  getAvailable: () => api.get('/slots/available'),
  getAll: () => api.get('/slots/all'),
  create: (slotData) => api.post('/slots', slotData),
  delete: (id) => api.delete(`/slots/${id}`),
};

// BOOKINGS API
export const bookingsAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  verifyPayment: (paymentData) => api.post('/bookings/verify-payment', paymentData),
  getAll: () => api.get('/bookings'),
  cancelPayment: (data) => api.post('/bookings/cancel-payment', data),
};

// PAYMENT API
export const paymentAPI = {
  capturePayment: (paymentData) => api.post('/payments/capture', paymentData),
};

// MENTORSHIP API
export const mentorshipAPI = {
  getProgram: () => api.get('/mentorship/program'),
  createEnrollment: (data) => api.post('/mentorship/create-enrollment', data),
  getMyEnrollment: () => api.get('/mentorship/my-enrollment'),
  getAllEnrollments: () => api.get('/mentorship/enrollments'),
  updateProgram: (data) => api.put('/mentorship/program', data),
};

// PDF API
export const pdfAPI = {
  getInfo: () => api.get('/pdf/info'),
  createPurchase: () => api.post('/pdf/create-purchase'),
  getMyPurchases: () => api.get('/pdf/my-purchases'),
};

// ✅ TYPING API
export const typingAPI = {
  getInfo: () => api.get('/typing/info'),
  createPurchase: () => api.post('/typing/create-purchase'),
  getMyPurchases: () => api.get('/typing/my-purchases'),
  checkAccess: () => api.get('/typing/check-access'),
};

// ✅ POLITY API (Keep this separate - it's still working)
export const polityAPI = {
  getInfo: () => api.get('/polity/info'),
  createPurchase: () => api.post('/polity/create-purchase'),
  getMyPurchases: () => api.get('/polity/my-purchases'),
};

// ✅✅✅ NEW UNIFIED BOOKS API - REPLACE ALL INDIVIDUAL BOOK APIs
export const booksAPI = {
  // Get book info
  getBookInfo: (bookType) => api.get(`/books/book/${bookType}/info`),

  // Get ALL books (for listing page)
  getAllBooks: () => api.get('/books/books/all'),
  
  // Get package info
  getPackageInfo: (packageType) => api.get(`/books/package/${packageType}/info`),
  
  // Create book purchase
  createBookPurchase: (bookType) => api.post(`/books/book/${bookType}/purchase`),
  
  // Create package purchase
  createPackagePurchase: (packageType) => api.post(`/books/package/${packageType}/purchase`),
  
  // Get user's purchases
  getMyPurchases: () => api.get('/books/my-purchases'),
  
  // Check access to specific book
  checkBookAccess: (bookType) => api.get(`/books/book/${bookType}/check-access`),
};

export default api;
