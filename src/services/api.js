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
  getAll: () => api.get('/slots/all'),  // ✅ Change from '/slots' to '/slots/all'
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

export default api;
