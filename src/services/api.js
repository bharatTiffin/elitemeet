import axios from 'axios';
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Methods
export const authAPI = {
  syncUser: () => api.post('/auth/sync'),
};

export const slotsAPI = {
  getAvailable: () => api.get('/slots'),
  getAll: () => api.get('/slots/all'),
  create: (data) => api.post('/slots', data),
  update: (slotId, data) => api.put(`/slots/${slotId}`, data),
  delete: (slotId) => api.delete(`/slots/${slotId}`),
};

export const bookingsAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  verifyPayment: (paymentData) => api.post('/bookings/verify-payment', paymentData),
  cancelPayment: (data) => api.post('/bookings/cancel-payment', data),
  getMyBookings: () => api.get('/bookings/my-bookings'),
};

export default api;
