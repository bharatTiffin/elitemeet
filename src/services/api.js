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

// export const polityAPI = {
//   getInfo: () => api.get('/api/polity/info'),
//   createPurchase: () => api.post('/api/polity/purchase'),
// };
export const polityAPI = {
  getInfo: () => api.get('/polity/info'),
  createPurchase: () => api.post('/polity/create-purchase'),
  getMyPurchases: () => api.get('/polity/my-purchases'),
};

// export const booksAPI = {
//   createPurchase: (purchaseData) => api.post('/books/create-purchase', purchaseData),
//   getMyPurchases: () => api.get('/books/my-purchases'),
// };


// Economics API
export const economicsAPI = {
  getInfo: () => api.get('/economics/info'),
  createPurchase: () => api.post('/economics/create-purchase'),
  getMyPurchases: () => api.get('/economics/my-purchases'),
};

// Geography API
export const geographyAPI = {
  getInfo: () => api.get('/geography/info'),
  createPurchase: () => api.post('/geography/create-purchase'),
  getMyPurchases: () => api.get('/geography/my-purchases'),
};

export const environmentAPI = {
  getInfo: () => api.get('/environment/info'),
  createPurchase: () => api.post('/environment/create-purchase'),
  getMyPurchases: () => api.get('/environment/my-purchases'),
};

export const scienceAPI = {
  getInfo: () => api.get('/science/info'),
  createPurchase: () => api.post('/science/create-purchase'),
  getMyPurchases: () => api.get('/science/my-purchases'),
};

export const modernHistoryAPI = {
  getInfo: () => api.get('/modern-history/info'),
  createPurchase: () => api.post('/modern-history/create-purchase'),
  getMyPurchases: () => api.get('/modern-history/my-purchases'),
};

export const ancientHistoryAPI = {
  getInfo: () => api.get('/ancient-history/info'),
  createPurchase: () => api.post('/ancient-history/create-purchase'),
  getMyPurchases: () => api.get('/ancient-history/my-purchases'),
};

export const medievalHistoryAPI = {
  getInfo: () => api.get('/medieval-history/info'),
  createPurchase: () => api.post('/medieval-history/create-purchase'),
  getMyPurchases: () => api.get('/medieval-history/my-purchases'),
};

export default api;
