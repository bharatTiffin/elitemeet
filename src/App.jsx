import { useEffect, useState, lazy, Suspense } from 'react';
const MonthlyCurrentAffairs = lazy(() => import('./pages/MonthlyCurrentAffairs'));
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { authAPI } from './services/api';
const PunjabiTypingPurchase = lazy(() => import('./pages/PunjabiTypingPurchase'));
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { EXAM_LANDING_CONFIGS } from './config/examLandingPages';
const TestSeriesPurchase = lazy(() => import('./pages/TestSeriesPurchase'));
const PstetPurchase = lazy(() => import('./pages/PstetPurchase'));
const ExciseInspectorPurchase = lazy(() => import('./pages/ExciseInspectorPurchase'));
const EconomicsBookPurchase = lazy(() => import('./pages/EconomicsBookPurchase'));
const GeographyBookPurchase = lazy(() => import('./pages/GeographyBookPurchase'));
const EnvironmentBookPurchase = lazy(() => import('./pages/EnvironmentBookPurchase'));
const ScienceBookPurchase = lazy(() => import('./pages/ScienceBookPurchase'));
const ModernHistoryBookPurchase = lazy(() => import('./pages/ModernHistoryBookPurchase'));
const AncientHistoryBookPurchase = lazy(() => import('./pages/AncientHistoryBookPurchase'));
const MedievalHistoryBookPurchase = lazy(() => import('./pages/MedievalHistoryBookPurchase'));
const CompletePackPurchase = lazy(() => import('./pages/CompletePackPurchase'));
const WithoutPolityPackPurchase = lazy(() => import('./pages/WithoutPolityPackPurchase'));
const Tracker = lazy(() => import('./pages/Tracker'));
const LiveClassPage = lazy(() => import('./pages/LiveClassPage'));
const RecordedClassPage = lazy(() => import('./pages/RecordedClassPage'));


// Screens
import HomePage from './screens/HomePage';
const LoginPage = lazy(() => import('./screens/LoginPage'));
const UserDashboard = lazy(() => import('./screens/UserDashboard'));
const AdminDashboard = lazy(() => import('./screens/AdminDashboard'));
const PDFPurchasePage = lazy(() => import('./screens/PDFPurchasePage'));
const PolityBookPurchase = lazy(() => import('./pages/PolityBookPurchase'));
const PyqsBookPurchase = lazy(() => import('./screens/PyqsBookPurchase'));
const CrashCoursePurchase = lazy(() => import('./pages/CrashCoursePurchase.jsx'));
const CurrentAffairPurchase = lazy(() => import('./pages/CurrentAffairPurchase'));
const Books = lazy(() => import('./pages/Books'));
const OnlineCoachingPurchase = lazy(() => import('./pages/OnlineCoachingPurchase'));
const MockTestPrepPurchase = lazy(() => import('./pages/MockTestPrepPurchase'));
// Policy Pages
const ContactUs = lazy(() => import('./pages/ContactUs'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const CancellationRefund = lazy(() => import('./pages/CancellationRefund'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

import PaymentProtectedRoute from './components/PaymentProtectedRoute';


// Components
import ProtectedRoute from './components/ProtectedRoute';
const Footer = lazy(() => import('./components/Footer'));
import PublicNavbar from './components/site/PublicNavbar';


const WeeklyTestPurchase = lazy(() => import('./pages/WeeklyTestPurchase'));
const SectionalTestSeriesPurchase = lazy(() => import('./pages/SectionalTestSeriesPurchase'));

const JoinTeam = lazy(() => import('./pages/JoinTeam'));
const FrenchCourse = lazy(() => import('./pages/FrenchCourse'));
const DigitalOfflineDemoPurchase = lazy(() => import('./pages/DigitalOfflineDemoPurchase'));
const Mentorship = lazy(() => import('./pages/Mentorship'));

const PSSSB90DayPlannerPurchase = lazy(() => import('./pages/PSSSB90DayPlannerPurchase'));

const ExamLandingPage = lazy(() => import('./components/exam-landing/ExamLandingPage'));
const BlogHome = lazy(() => import('./pages/blog/BlogHome'));
const CraftInstructor2026 = lazy(() => import('./pages/blog/CraftInstructor2026'));
const PPSCSeniorAssistant2026 = lazy(() => import('./pages/blog/PPSCSeniorAssistant2026'));
const PPSCSeniorAssistantPostponed2026 = lazy(() => import('./pages/blog/PPSCSeniorAssistantPostponed2026'));
const PunjabClerkRecruitment2026 = lazy(() => import('./pages/blog/PunjabClerkRecruitment2026'));
const PunjabGovernmentGroupD2026 = lazy(() => import('./pages/blog/PunjabGovernmentGroupD2026'));
const PunjabDistrictCourtClerk2026 = lazy(() => import('./pages/blog/PunjabDistrictCourtClerk2026'));
const SSSBGroupBRecruitment2026 = lazy(() => import('./pages/blog/SSSBGroupBRecruitment2026'));
const SSSBGroupCRecruitment2026 = lazy(() => import('./pages/blog/SSSBGroupCRecruitment2026'));
const SSSBExamDate2026 = lazy(() => import('./pages/blog/SSSBExamDate2026'));

function ExamLandingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4" />
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
}

// Pages that never read the signed-in user can render before Firebase auth resolves.
// Everything else waits, because many pages read auth.currentUser synchronously on mount.
const AUTH_INDEPENDENT_PATHS = [
  '/',
  '/contact-us',
  '/shipping-delivery-policy',
  '/terms-and-conditions',
  '/cancellation-and-refund-policy',
  '/privacy-policy',
  ...EXAM_LANDING_CONFIGS.map((c) => c.slug),
];

function AuthReady({ loading }) {
  const { pathname } = useLocation();
  const independent = AUTH_INDEPENDENT_PATHS.includes(pathname) || pathname.startsWith('/blog');
  return loading && !independent ? <ExamLandingFallback /> : <Outlet />;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    // Check for manual auth token first
    const manualAuthToken = localStorage.getItem('manualAuthToken');
    if (manualAuthToken) {
      try {
        const userData = JSON.parse(manualAuthToken);
        setUser(userData);
        setLoading(false);
        return;
      } catch (error) {
        console.error('Error parsing manual auth token:', error);
        localStorage.removeItem('manualAuthToken');
      }
    }

    // Handle Firebase authentication
    if (firebaseUser) {
      // ⚠️ CHECK REDIRECTS FIRST - Before setting user state
      // 1. Universal redirectDestination (set by HomePage, etc)
      const redirectDestination = localStorage.getItem('redirectDestination');
      if (redirectDestination) {
        localStorage.removeItem('redirectDestination');
        setTimeout(() => {
          window.location.replace(redirectDestination);
        }, 100);
        return;
      }

      // 2. Legacy/specific redirects
      const redirectToPolity = localStorage.getItem('redirectToPolity');
      const redirectToOnlineCoaching = localStorage.getItem('redirectToOnlineCoaching');
      const redirectToCurrentAffair = localStorage.getItem('redirectToCurrentAffair');
      const redirectToTyping = localStorage.getItem('redirectToTyping');
      const redirectToPDF = localStorage.getItem('redirectToPDF');
      const redirectToBooks = localStorage.getItem('redirectToBooks');
      const redirectToCrashCourse = localStorage.getItem('redirectToCrashCourse');
      const redirectToWeeklyTest = localStorage.getItem('redirectToWeeklyTest');
      const redirectToPstet = localStorage.getItem('redirectToPstet');

      if (redirectToPolity === 'true') {
        localStorage.removeItem('redirectToPolity');
        setTimeout(() => {
          window.location.replace('/polity-book');
        }, 100);
        return;
      }

      if (redirectToCrashCourse === 'true') {
        localStorage.removeItem('redirectToCrashCourse');
        setTimeout(() => {
          window.location.replace('/crash-course');
        }, 100);
        return;
      }
      if (redirectToWeeklyTest === 'true') {
        localStorage.removeItem('redirectToWeeklyTest');
        setTimeout(() => {
          window.location.replace('/weekly-test');
        }, 100);
        return;
      }

      if (redirectToPstet === 'true') {
        localStorage.removeItem('redirectToPstet');
        setTimeout(() => {
          window.location.replace('/pstet-course');
        }, 100);
        return;
      }

      if (redirectToOnlineCoaching === 'true') {
        localStorage.removeItem('redirectToOnlineCoaching');
        setTimeout(() => {
          window.location.replace('/online-coaching');
        }, 100);
        return;
      }

      if (redirectToCurrentAffair === 'true') {
        localStorage.removeItem('redirectToCurrentAffair');
        setTimeout(() => {
          window.location.replace('/current-affairs-book');
        }, 100);
        return;
      }

      if (redirectToTyping === 'true') {
        localStorage.removeItem('redirectToTyping');
        setTimeout(() => {
          window.location.replace('/punjabi-typing');
        }, 100);
        return;
      }

      if (redirectToPDF === 'true') {
        localStorage.removeItem('redirectToPDF');
        setTimeout(() => {
          window.location.replace('/pdf-purchase');
        }, 100);
        return;
      }

      if (redirectToBooks === 'true') {
        localStorage.removeItem('redirectToBooks');
        setTimeout(() => {
          window.location.replace('/books');
        }, 100);
        return;
      }

      try {
        const idToken = await firebaseUser.getIdToken();
        const response = await authAPI.sync(idToken);
        setUser(response.data.user);
      } catch (error) {
        console.error('❌ Error syncing user:', error);
        setUser({
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          role: 'user'
        });
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);



  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <PublicNavbar landingPaths={EXAM_LANDING_CONFIGS.map((c) => c.slug)} />
        <main className="flex-grow">
          <Suspense fallback={<ExamLandingFallback />}>
          <Routes>
            <Route element={<AuthReady loading={loading} />}>
            {/* HomePage Route */}
            <Route
              path="/"
              element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <HomePage />}
            />

            {/* LoginPage */}
            <Route
              path="/login"
              element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <LoginPage />}
            />

            {/* User Dashboard */}
            <Route
              path="/dashboard"
              element={user && user.role !== 'admin' ? <UserDashboard /> : <Navigate to="/" replace />}
            />

            {/* PDF Purchase Page */}
            <Route
              path="/pdf-purchase"
              element={user ? <PDFPurchasePage /> : <Navigate to="/" replace />}
            />

            <Route path="/polity-book" element={<PolityBookPurchase />} />
            <Route path="/pyqs-book" element={<PyqsBookPurchase />} />
            <Route path="/crash-course" element={<CrashCoursePurchase />} />
            <Route path="/online-coaching" element={<OnlineCoachingPurchase />} />
            <Route path="/mock-test-prep" element={<MockTestPrepPurchase />} />
            <Route path="/test-series" element={<TestSeriesPurchase />} />
            <Route path="/weekly-test" element={<WeeklyTestPurchase />} />
            <Route path="/sectional-test-series" element={<SectionalTestSeriesPurchase />} />
            <Route path="/monthly-current-affairs" element={<MonthlyCurrentAffairs />} />
            <Route path="/pstet-course" element={<PstetPurchase />} />
            <Route path="/excise-inspector" element={<ExciseInspectorPurchase />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/current-affairs-book" element={<CurrentAffairPurchase />} />
            <Route path="/economics-book" element={<EconomicsBookPurchase />} />
            <Route path="/geography-book" element={<GeographyBookPurchase />} />
            <Route path="/environment-book" element={<EnvironmentBookPurchase />} />
            <Route path="/science-book" element={<ScienceBookPurchase />} />
            <Route path="/modern-history-book" element={<ModernHistoryBookPurchase />} />
            <Route path="/ancient-history-book" element={<AncientHistoryBookPurchase />} />
            <Route path="/medieval-history-book" element={<MedievalHistoryBookPurchase />} />
            <Route path="/complete-pack" element={<CompletePackPurchase />} />
            <Route path="/without-polity-pack" element={<WithoutPolityPackPurchase />} />
            <Route path="/books" element={<Books />} />
            <Route
              path="/blog"
              element={
                <BlogHome />
              }
            />
            <Route
              path="/blog/psssb-craft-instructor-recruitment-2026"
              element={
                <CraftInstructor2026 />
              }
            />
            <Route
              path="/blog/ppsc-senior-assistant-exam-date-2026"
              element={
                <PPSCSeniorAssistant2026 />
              }
            />
            <Route
              path="/blog/punjab-clerk-recruitment-2026"
              element={
                <PunjabClerkRecruitment2026 />
              }
            />
            <Route
              path="/blog/punjab-government-group-d-recruitment-2026"
              element={
                <PunjabGovernmentGroupD2026 />
              }
            />
            <Route
              path="/blog/ppsc-senior-assistant-exam-postponed-2026"
              element={
                <PPSCSeniorAssistantPostponed2026 />
              }
            />
            <Route
              path="/blog/punjab-district-court-clerk-recruitment-2026"
              element={
                <PunjabDistrictCourtClerk2026 />
              }
            />
            <Route
              path="/blog/sssb-group-b-recruitment-2026"
              element={
                <SSSBGroupBRecruitment2026 />
              }
            />
            <Route
              path="/blog/sssb-group-c-recruitment-2026"
              element={
                <SSSBGroupCRecruitment2026 />
              }
            />
            <Route
              path="/blog/sssb-punjab-exam-date-2026"
              element={
                <SSSBExamDate2026 />
              }
            />

            <Route
              path="/psssb-90-day-master-planner"
              element={
                // <Suspense fallback={<ExamLandingFallback />}>
                  <PSSSB90DayPlannerPurchase />
                // </Suspense>
              }
            />
              {/* Join Team Page */}
              <Route path="/join-team" element={<JoinTeam />} />
            {/* French Course Page */}
            <Route path="/french-course" element={<FrenchCourse />} />
            <Route path="/digital-offline-demo" element={<DigitalOfflineDemoPurchase />} />
            <Route 
              path="/tracker" 
              element={
                  <PaymentProtectedRoute>
                    <Tracker />
                  </PaymentProtectedRoute>
              } 
            />


            {/* --- Complete Course Routes --- */}
            <Route 
              path="/LiveClass" 
              element={
                <PaymentProtectedRoute courseType="complete">
                  <LiveClassPage courseType="complete" />
                </PaymentProtectedRoute>
              } 
            />
            <Route 
              path="/recordedClass" 
              element={
                <PaymentProtectedRoute courseType="complete">
                  <RecordedClassPage courseType="complete" />
                </PaymentProtectedRoute>
              } 
            />
            
            {/* --- Crash Course Routes --- */}
            <Route 
              path="/crash-LiveClass" 
              element={
                <PaymentProtectedRoute courseType="crash">
                  <LiveClassPage courseType="crash" />
                </PaymentProtectedRoute>
              } 
            />
            <Route 
              path="/crash-recordedClass" 
              element={
                <PaymentProtectedRoute courseType="crash">
                  <RecordedClassPage courseType="crash" />
                </PaymentProtectedRoute>
              } 
            />
            {/* <Route 
              path="/LiveClass" 
              element={
                  <PaymentProtectedRoute  courseType="complete">
                    <LiveClassPage />
                  </PaymentProtectedRoute>
              } 
            />

            <Route 
              path="/LiveClass" 
              element={
                  <PaymentProtectedRoute courseType="crash">
                    <LiveClassPage />
                  </PaymentProtectedRoute>
              } 
            />

            <Route 
              path="/recordedClass" 
              element={
                <PaymentProtectedRoute courseType="complete">
                  <RecordedClassPage />
                </PaymentProtectedRoute>
              } 
            />

            <Route 
              path="/crash-recordedClass" 
              element={
                <PaymentProtectedRoute courseType="crash">
                  <RecordedClassPage />
                </PaymentProtectedRoute>
              } 
            /> */}
            
            
            {/* <Route 
              path="/LiveClass" 
              element={
                  <PaymentProtectedRoute>
                    <LiveClassPage />
                  </PaymentProtectedRoute>
              } 
            />
            
            <Route 
              path="/recordedClass" 
              element={
                  <PaymentProtectedRoute>
                    <RecordedClassPage />
                  </PaymentProtectedRoute>
              } 
            /> */}


            {/* ✅ NEW: Punjabi Typing Purchase Page - Public Access (will check login inside) */}
            <Route
              path="/punjabi-typing"
              element={<PunjabiTypingPurchase />}
            />

            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />}
            />

            {/* Policy Pages - Public Access */}
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/shipping-delivery-policy" element={<ShippingPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/cancellation-and-refund-policy" element={<CancellationRefund />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* SEO Exam Landing Pages */}
            {EXAM_LANDING_CONFIGS.map((config) => (
              <Route
                key={config.slug}
                path={config.slug}
                element={
                  <ExamLandingPage config={config} />
                }
              />
            ))}

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
          </Suspense>
        </main>
        
        {/* Footer - Hide on HomePage since it has its own footer */}
        {user && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
      </div>
    </Router>
  );
}

export default App;
