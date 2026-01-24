// import axios from 'axios';
// import { auth } from '../config/firebase';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// const api = axios.create({
//   baseURL: `${API_URL}/api`,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add Firebase token to all requests
// api.interceptors.request.use(async (config) => {
//   const user = auth.currentUser;
//   if (user) {
//     const token = await user.getIdToken();
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 🔥 AUTH API
// export const authAPI = {
//   sync: async (token) => {
//     return api.post('/auth/sync', {}, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//   },
// };

// // SLOTS API
// export const slotsAPI = {
//   getAvailable: () => api.get('/slots/available'),
//   getAll: () => api.get('/slots/all'),
//   create: (slotData) => api.post('/slots', slotData),
//   delete: (id) => api.delete(`/slots/${id}`),
// };

// // BOOKINGS API
// export const bookingsAPI = {
//   create: (bookingData) => api.post('/bookings', bookingData),
//   verifyPayment: (paymentData) => api.post('/bookings/verify-payment', paymentData),
//   getAll: () => api.get('/bookings'),
//   cancelPayment: (data) => api.post('/bookings/cancel-payment', data),
// };

// // PAYMENT API
// export const paymentAPI = {
//   capturePayment: (paymentData) => api.post('/payments/capture', paymentData),
// };

// // MENTORSHIP API
// export const mentorshipAPI = {
//   getProgram: () => api.get('/mentorship/program'),
//   createEnrollment: (data) => api.post('/mentorship/create-enrollment', data),
//   getMyEnrollment: () => api.get('/mentorship/my-enrollment'),
//   getAllEnrollments: () => api.get('/mentorship/enrollments'),
//   updateProgram: (data) => api.put('/mentorship/program', data),
// };

// // PDF API
// export const pdfAPI = {
//   getInfo: () => api.get('/pdf/info'),
//   createPurchase: () => api.post('/pdf/create-purchase'),
//   getMyPurchases: () => api.get('/pdf/my-purchases'),
// };

// // ✅ TYPING API
// export const typingAPI = {
//   getInfo: () => api.get('/typing/info'),
//   createPurchase: () => api.post('/typing/create-purchase'),
//   getMyPurchases: () => api.get('/typing/my-purchases'),
//   checkAccess: () => api.get('/typing/check-access'),
// };

// // ✅ POLITY API (Keep this separate - it's still working)
// export const polityAPI = {
//   getInfo: () => api.get('/polity/info'),
//   createPurchase: () => api.post('/polity/create-purchase'),
//   getMyPurchases: () => api.get('/polity/my-purchases'),
// };

// export const currentAffairAPI = {
//   getInfo: () => api.get('/currentaffair/info'),
//   createPurchase: () => api.post('/currentaffair/create-purchase'),
//   getMyPurchases: () => api.get('/currentaffair/my-purchases'),
// };

// // ✅✅✅ NEW UNIFIED BOOKS API - REPLACE ALL INDIVIDUAL BOOK APIs
// export const booksAPI = {
//   // Get book info
//   getBookInfo: (bookType) => api.get(`/books/book/${bookType}/info`),

//   // Get ALL books (for listing page)
//   getAllBooks: () => api.get('/books/books/all'),
  
//   // Get package info
//   getPackageInfo: (packageType) => api.get(`/books/package/${packageType}/info`),
  
//   // Create book purchase
//   createBookPurchase: (bookType) => api.post(`/books/book/${bookType}/purchase`),
  
//   // Create package purchase
//   createPackagePurchase: (packageType) => api.post(`/books/package/${packageType}/purchase`),
  
//   // Get user's purchases
//   getMyPurchases: () => api.get('/books/my-purchases'),
  
//   // Check access to specific book
//   checkBookAccess: (bookType) => api.get(`/books/book/${bookType}/check-access`),
// };

// export const coachingAPI = {
//   // Get coaching package info
//   getInfo: () => api.get('/coaching/info'),
  
//   // NEW: Create enrollment with user details (Name, Father's Name, Mobile, Password etc.)
//   createEnrollmentWithUser: (userData) => api.post('/coaching/enroll', userData),
  
//   // Create coaching purchase/order (called after form submission)
//   createPurchase: () => api.post('/coaching/create-purchase'),
  
//   // Check if user already has access
//   checkAccess: () => api.get('/coaching/check-access'),

//   getAllEnrollments: () => api.get('/admin/all-confirmed'),
// };


// export const trackerAPI = {
//   getExamCategories: () => api.get('/tracker/exam-categories'),
//   getExamTypes: (categoryId) => api.get(`/tracker/exam-types/${categoryId}`),
//   getSubjects: (examTypeId) => api.get(`/tracker/subjects/${examTypeId}`),
//   getTopics: (subjectId) => api.get(`/tracker/topics/${subjectId}`),
//   getUserProgress: (examTypeId) => api.get(`/tracker/progress/${examTypeId}`),
// };

// export default api;


import axios from 'axios';
import { auth } from '../config/firebase';

// 1. Define Base URLs
const API_URL = import.meta.env.VITE_API_URL || 'https://elitemeet-backend-dev.vercel.app';
const TRACKER_BASE_URL = 'https://elite-academy-ebon.vercel.app';

// 2. Create Axios Instances
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const trackerApiInstance = axios.create({
  baseURL: `${TRACKER_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3. Helper to add Firebase token to any instance
const setupAuthInterceptor = (instance) => {
  instance.interceptors.request.use(async (config) => {
    // First check if there's a manual auth token in localStorage
    const manualAuthToken = localStorage.getItem('manualAuthToken');
    
    if (manualAuthToken) {
      try {
        const tokenData = JSON.parse(manualAuthToken);
        
        // Check if it has a 'token' property (new format)
        if (tokenData && tokenData.token && typeof tokenData.token === 'string') {
          console.log('📤 Using manual JWT token from localStorage');
          config.headers.Authorization = `Bearer ${tokenData.token}`;
          return config;
        }
        // Otherwise it's legacy user data without token
      } catch (e) {
        // If parsing fails, it might be a plain string token (shouldn't happen with new format)
        console.log('⚠️ localStorage parsing failed, trying Firebase');
      }
    }

    // Otherwise try Firebase
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      console.log('📤 Using Firebase token');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

// Apply auth to both backends
setupAuthInterceptor(api);
setupAuthInterceptor(trackerApiInstance);

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

// ✅ POLITY API
export const polityAPI = {
  getInfo: () => api.get('/polity/info'),
  createPurchase: () => api.post('/polity/create-purchase'),
  getMyPurchases: () => api.get('/polity/my-purchases'),
};

export const currentAffairAPI = {
  getInfo: () => api.get('/currentaffair/info'),
  createPurchase: () => api.post('/currentaffair/create-purchase'),
  getMyPurchases: () => api.get('/currentaffair/my-purchases'),
};

// ✅✅✅ NEW UNIFIED BOOKS API
export const booksAPI = {
  getBookInfo: (bookType) => api.get(`/books/book/${bookType}/info`),
  getAllBooks: () => api.get('/books/books/all'),
  getPackageInfo: (packageType) => api.get(`/books/package/${packageType}/info`),
  createBookPurchase: (bookType) => api.post(`/books/book/${bookType}/purchase`),
  createPackagePurchase: (packageType) => api.post(`/books/package/${packageType}/purchase`),
  getMyPurchases: () => api.get('/books/my-purchases'),
  checkBookAccess: (bookType) => api.get(`/books/book/${bookType}/check-access`),
};

export const coachingAPI = {
  getInfo: () => api.get('/coaching/info'),
  createEnrollmentWithUser: (userData) => api.post('/coaching/enroll', userData),
  createPurchase: () => api.post('/coaching/create-purchase'),
  // checkAccess: () => api.get('/coaching/check-access'),
  getAllEnrollments: () => api.get('/admin/all-confirmed'),

  // Fetch the latest coaching video for display
  // getLatestVideo: () => api.get('/videocoaching/latest'),

  // Admin: Upload/Set a new coaching video
  createVideo: (videoData) => api.post('/videocoaching', videoData),
  createcrashVideo: (videoData) => api.post('/videocrashcoaching', videoData),
  
  // Admin: Delete a coaching video
  deleteVideo: (id) => api.delete(`/videocoaching/${id}`),

  // getAllClasses: () => api.get('/videocoaching/all'),

  // checkAccess: async (email) => {
  //   // For now, hardcoding return true.
  //   // Later, this will be: return api.get(`/coaching/check-access?email=${email}`)
  //   return Promise.resolve({ data: { hasAccess: true } });
  // },
  // checkAccess: async (email) => {
  //   return api.get(`/coaching/check-access?email=${email}`);
  // },
  
  adminAddEnrollment: (enrollmentData) => api.post(`/coaching/admin/add-enrollment`, enrollmentData),
  admincrashAddEnrollment: (enrollmentData) => api.post(`/coaching/admin/crash-add-enrollment`, enrollmentData),



  getLatestVideo: () => api.get('/videocoaching/latest'),
  getAllClasses: () => api.get('/videocoaching/all'),

  // For Crash Course (Add these)
  getCrashCourseLatestVideo: () => api.get('/videocrashcoaching/latest'),
  getCrashCourseClasses: () => api.get('/videocrashcoaching/all'),

  checkAccess: (email) => api.get(`/coaching/check-access?email=${email}`),
  // checkCrashCourseAccess: async (email) => { return Promise.resolve({ data: { hasAccess: true } });},
  checkCrashCourseAccess: (email) => api.get(`/coaching/check-crash-access?email=${email}`),
};

export const crashCourseAPI = {
  getInfo: () => api.get('/crashcourse/info'),
  createPurchase: () => api.post('/crashcourse/create-purchase'),
  createEnrollmentWithUser: (userData) => api.post('/crashcourse/enroll', userData),
};

// ✅ TRACKER API (Pointed to Academy Backend)
export const trackerAPI = {
  getExamCategories: () => trackerApiInstance.get('/tracker/exam-categories'),
  getExamTypes: (categoryId) => trackerApiInstance.get(`/tracker/exam-types/${categoryId}`),
  getSubjects: (examTypeId) => trackerApiInstance.get(`/tracker/subjects/${examTypeId}`),
  getTopics: (subjectId) => trackerApiInstance.get(`/tracker/topics/${subjectId}`),
  getUserProgress: (examTypeId) => trackerApiInstance.get(`/tracker/progress/${examTypeId}`),
};

export default api;