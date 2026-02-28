// TEST SERIES API
export const testSeriesAPI = {
  getInfo: () => api.get('/testseries/info'),
  createOrder: (userData) => api.post('/testseries/create-order', userData),
};
import axios from 'axios';
import { auth } from '../config/firebase';

// 1. Define Base URLs
const API_URL = import.meta.env.VITE_API_URL || 'https://elite-academy-proxy.vercel.app';
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
export const weeklyTestAPI ={
  getInfo_Online: () => api.get('/weeklytest/info-online'),
  getInfo_Offline: () => api.get('/weeklytest/info-offline'),
  createEnrollmentWithUserOnline: (userData) => api.post('/weeklytest/enroll-online', userData),
  createEnrollmentWithUserOffline: (userData) => api.post('/weeklytest/enroll-offline', userData),
}

export const coachingAPI = {

  getInfo: () => api.get('/coaching/info'),
  createEnrollmentWithUser: (userData) => api.post('/coaching/enroll', userData),
  createPurchase: () => api.post('/coaching/create-purchase'),
  getAllEnrollments: () => api.get('/admin/all-confirmed'),
  getAllEnrollmentsCrashCourse: () => api.get('/admin/all-confirmed-crash-course'),
  getAllEnrollmentsWeeklyTest: () => api.get('/admin/all-confirmed-weekly-test'),
  getAllTeachersAndFriends: () => api.get('/admin/all-confirmed-teachers-friends'),
  getAllOfflineStudents: () => api.get('/admin/all-confirmed-offline-students'),
  adminAddEnrollment: (enrollmentData) => api.post(`/coaching/admin/add-enrollment`, enrollmentData),
  admincrashAddEnrollment: (enrollmentData) => api.post(`/coaching/admin/crash-add-enrollment`, enrollmentData),
  adminweeklytestAddEnrollment: (enrollmentData) => api.post(`/coaching/admin/weekly-add-enrollment`, enrollmentData),


  // Update: added subject and subSubject filters
  getAllClasses: (subject = '', subSubject = '') => api.get(`/videocoaching?subject=${encodeURIComponent(subject)}&subSubject=${encodeURIComponent(subSubject)}`),

  // Update: get latest video for a specific subject
  getLatestVideo: (subject = '') => api.get(`/videocoaching/latest?subject=${encodeURIComponent(subject)}`),

  // NEW: Get latest live class with Google Meet link
  getLatestLiveClass: () => api.get('/videocoaching/latest-live'),

  // Admin CRUD
  createVideo: (videoData) => api.post('/videocoaching/', videoData),
  updateVideo: (id, videoData) => api.put(`/videocoaching/update/${id}`, videoData),
  deleteVideo: (id) => api.delete(`/videocoaching/delete/${id}`),

  // Access checks remain the same
  checkAccess: (email) => api.get(`/coaching/check-access?email=${email}`),
  checkCrashCourseAccess: (email) => api.get(`/coaching/check-crash-access?email=${email}`),

  // Add crash course API methods
  getCrashCourseClasses: (subject = '', subSubject = '') => 
    api.get(`/videocrashcoaching?subject=${encodeURIComponent(subject)}&subSubject=${encodeURIComponent(subSubject)}`),

  // NEW: Get latest crash course live class with Google Meet link
  getCrashCourseLatestLiveClass: () => api.get('/videocrashcoaching/latest-live'),

  // Admin CRUD for crash course
  createCrashVideo: (videoData) => api.post('/videocrashcoaching/', videoData),
  updateCrashVideo: (id, videoData) => api.put(`/videocrashcoaching/${id}`, videoData),
  deleteCrashVideo: (id) => api.delete(`/videocrashcoaching/${id}`),

};

export const crashCourseAPI = {
  getInfo: () => api.get('/crashcourse/info'),
  createPurchase: () => api.post('/crashcourse/create-purchase'),
  createEnrollmentWithUser: (userData) => api.post('/crashcourse/enroll', userData),
};

// MONTHLY CURRENT AFFAIRS API
export const monthlyCurrentAffairAPI = {
  // User-facing APIs
  getAllMagazines: () => api.get('/monthly-current-affairs'),
  getMagazineInfo: (month) => api.get(`/monthly-current-affairs/${month}`),
  createMagazinePurchase: (month) => api.post(`/monthly-current-affairs/purchase/${month}`),
  createCompletePackPurchase: () => api.post('/monthly-current-affairs/purchase/complete-pack'),
  getMyPurchases: () => api.get('/monthly-current-affairs/my/purchases'),
  checkMagazineAccess: (month) => api.get(`/monthly-current-affairs/access/${month}`),
  getMagazineDriveLink: (month) => api.get(`/monthly-current-affairs/download/${month}`),

  // Admin APIs
  adminCreateMagazine: (magazineData) => api.post('/admin/monthly-current-affairs/magazines', magazineData),
  adminGetAllMagazines: (params = {}) => api.get('/admin/monthly-current-affairs/magazines', { params }),
  adminGetMagazine: (month) => api.get(`/admin/monthly-current-affairs/magazines/${month}`),
  adminUpdateMagazine: (month, magazineData) => api.put(`/admin/monthly-current-affairs/magazines/${month}`, magazineData),
  adminDeleteMagazine: (month) => api.delete(`/admin/monthly-current-affairs/magazines/${month}`),
  adminGetAllPurchases: (params = {}) => api.get('/admin/monthly-current-affairs/purchases', { params }),
  adminGetDashboardStats: () => api.get('/admin/monthly-current-affairs/dashboard/stats'),
};

// PSTET API
export const pstetAPI = {
  getInfo: () => api.get('/pstet/info'),
  enrollAndCreateOrder: (userData) => api.post('/pstet/enroll', userData),
};

// Excise Inspector API
export const exciseInspectorAPI = {
  getInfo: () => api.get('/excise-inspector/info'),
  enrollAndCreateOrder: (userData) => api.post('/excise-inspector/enroll', userData),
};

// TRACKER API (Pointed to Academy Backend)
export const trackerAPI = {
  getExamCategories: () => trackerApiInstance.get('/tracker/exam-categories'),
  getExamTypes: (categoryId) => trackerApiInstance.get(`/tracker/exam-types/${categoryId}`),
  getSubjects: (examTypeId) => trackerApiInstance.get(`/tracker/subjects/${examTypeId}`),
  getTopics: (subjectId) => trackerApiInstance.get(`/tracker/topics/${subjectId}`),
  getUserProgress: (examTypeId) => trackerApiInstance.get(`/tracker/progress/${examTypeId}`),
};

export default api;