# Elite Meet Frontend - New UI Rebuild Context

This document is the handoff context for rebuilding the website UI.

Goal:
- Build a completely new UI/UX.
- Keep existing backend APIs, routes, content, services, and payment logic behavior the same.
- Preserve all current product offerings.

## Non-Negotiable Requirements

1. Authentication must be manual only.
- No Google Sign Up.
- No Google Sign In.
- Keep only manual email/password Login and Signup flows.

2. Before every payment, collect buyer identity details.
- Always ask for email and required user details before initiating Razorpay.
- At minimum collect valid email.
- Prefer full name + email + phone/mobile where relevant.
- Validate input before order creation and payment open.

3. API contracts must remain unchanged.
- Keep request/response shape compatible with current backend.
- Reuse existing endpoints from src/services/api.js.

## Current Frontend Architecture

Main app entry and route wiring:
- src/App.jsx

API integration layer:
- src/services/api.js

Auth helpers:
- src/utils/authHelper.js
- src/utils/checkoutIdentity.js

## Authentication Model (Current + Target for New UI)

Current code supports two paths:
- Manual auth token from localStorage (manualAuthToken).
- Firebase auth fallback.

For the new UI, enforce manual-only auth experience:
- Manual Signup page.
- Manual Login page.
- Store/use manual auth token flow.
- Remove/disable Google auth UI and flows.

## Screen Folder Pages (Priority Context)

These are in src/screens and must be preserved in new UI structure:
- AdminDashboard.jsx
- HomePage.jsx
- LoginPage.jsx
- PDFPurchasePage.jsx
- PyqsBookPurchase.jsx
- SignupPage.jsx
- UserDashboard.jsx

## Additional Pages in src/pages

- AncientHistoryBookPurchase.jsx
- Books.jsx
- CancellationRefund.jsx
- CompletePackPurchase.jsx
- ContactUs.jsx
- CrashCoursePurchase.jsx
- CurrentAffairPurchase.jsx
- DigitalOfflineDemoPurchase.jsx
- EconomicsBookPurchase.jsx
- EnvironmentBookPurchase.jsx
- ExciseInspectorPurchase.jsx
- FrenchCourse.jsx
- GeographyBookPurchase.jsx
- JoinTeam.jsx
- LiveClassPage.jsx
- MedievalHistoryBookPurchase.jsx
- Mentorship.jsx
- ModernHistoryBookPurchase.jsx
- MonthlyCurrentAffairs.jsx
- OnlineCoachingPurchase.jsx
- PolityBookPurchase.jsx
- PrivacyPolicy.jsx
- PstetPurchase.jsx
- PunjabiTypingPurchase.jsx
- RecordedClassPage.jsx
- ScienceBookPurchase.jsx
- SectionalTestSeriesPurchase.jsx
- ShippingPolicy.jsx
- TermsConditions.jsx
- TestSeriesPurchase.jsx
- Tracker.jsx
- WeeklyTestPurchase.jsx
- WithoutPolityPackPurchase.jsx

## Route Map (from App.jsx)

Core:
- / -> HomePage (redirects based on user role)
- /login -> LoginPage
- /dashboard -> UserDashboard (non-admin)
- /admin -> AdminDashboard (admin only)

Purchases/Programs:
- /pdf-purchase
- /polity-book
- /pyqs-book
- /crash-course
- /online-coaching
- /test-series
- /weekly-test
- /sectional-test-series
- /monthly-current-affairs
- /pstet-course
- /excise-inspector
- /mentorship
- /current-affairs-book
- /economics-book
- /geography-book
- /environment-book
- /science-book
- /modern-history-book
- /ancient-history-book
- /medieval-history-book
- /complete-pack
- /without-polity-pack
- /books
- /french-course
- /digital-offline-demo
- /punjabi-typing
- /join-team

Learning Access:
- /tracker (payment protected)
- /LiveClass (payment protected)
- /recordedClass (payment protected)
- /crash-LiveClass (payment protected)
- /crash-recordedClass (payment protected)

Policy:
- /contact-us
- /shipping-delivery-policy
- /terms-and-conditions
- /cancellation-and-refund-policy
- /privacy-policy

## Services Offered (Business Scope)

1. 1-on-1 Mentorship and slot booking
2. Online Coaching enrollment + paid access
3. Crash Course enrollment + paid access
4. Test Series offerings (standard, weekly, sectional)
5. PDF product purchase
6. PYQS book purchase/access
7. Punjabi typing course purchase/access
8. Current Affairs book purchase
9. Individual subject books purchase
10. Book packages (complete pack / without polity)
11. Monthly Current Affairs magazines + complete pack
12. PSTET paid program
13. Excise Inspector paid program
14. French course purchase
15. Digital offline demo paid registration
16. Job application paid form flow
17. Paid tracker access
18. Live classes and recorded classes (complete + crash)

## API Base URLs and Instances

Defined in src/services/api.js:
- RAW_API_URL = VITE_API_URL or https://elite-academy-proxy.vercel.app
- API_URL = sanitized RAW_API_URL
- Main axios instance baseURL: ${API_URL}/api
- Tracker backend baseURL: https://elite-academy-backend-proxy.vercel.app/api
- Coaching dev backend baseURL: https://elitemeet-backend-dev.vercel.app/api

Interceptors:
- Adds Authorization header using manual JWT from localStorage.manualAuthToken.token if present.
- Else falls back to Firebase ID token.

For new UI:
- Keep same API host behavior and interceptor contract.
- Manual auth should be primary and visible auth path.

## API Inventory (from src/services/api.js)

Auth:
- authAPI.sync(token) -> POST /auth/sync

Slots:
- slotsAPI.getAvailable() -> GET /slots/available
- slotsAPI.getAll() -> GET /slots/all
- slotsAPI.create(slotData) -> POST /slots
- slotsAPI.delete(id) -> DELETE /slots/{id}

Bookings:
- bookingsAPI.create(data) -> POST /bookings
- bookingsAPI.verifyPayment(data) -> POST /bookings/verify-payment
- bookingsAPI.getAll() -> GET /bookings
- bookingsAPI.cancelPayment(data) -> POST /bookings/cancel-payment

Payments:
- paymentAPI.capturePayment(data) -> POST /payments/capture

Mentorship:
- mentorshipAPI.getProgram() -> GET /mentorship/program
- mentorshipAPI.createEnrollment(data) -> POST /mentorship/create-enrollment
- mentorshipAPI.getMyEnrollment() -> GET /mentorship/my-enrollment
- mentorshipAPI.getAllEnrollments() -> GET /mentorship/enrollments
- mentorshipAPI.updateProgram(data) -> PUT /mentorship/program

PDF:
- pdfAPI.getInfo() -> GET /pdf/info
- pdfAPI.createPurchase() -> POST /pdf/create-purchase
- pdfAPI.getMyPurchases() -> GET /pdf/my-purchases

PYQS:
- pyqsAPI.getInfo() -> GET /pyqs/info
- pyqsAPI.createOrder(buyerData) -> POST /pyqs/create-order
- pyqsAPI.checkAccess(email) -> GET /pyqs/check-access?email=

Job:
- jobAPI.getInfo() -> GET /job/info
- jobAPI.createOrder(userData) -> POST /job/create-order

French course:
- frenchCourseAPI.getInfo() -> GET /french-course/info
- frenchCourseAPI.createOrder(userData) -> POST /french-course/create-order

Digital offline demo:
- digitalOfflineDemoAPI.getInfo() -> GET /digital-offline-demo/info
- digitalOfflineDemoAPI.createOrder(userData) -> POST /digital-offline-demo/create-order

Typing:
- typingAPI.getInfo() -> GET /typing/info
- typingAPI.createPurchase(buyerData) -> POST /typing/create-purchase
- typingAPI.getMyPurchases() -> GET /typing/my-purchases
- typingAPI.checkAccess() -> GET /typing/check-access

Polity:
- polityAPI.getInfo() -> GET /polity/info
- polityAPI.createPurchase(buyerData) -> POST /polity/create-purchase
- polityAPI.getMyPurchases() -> GET /polity/my-purchases

Current Affair Book:
- currentAffairAPI.getInfo() -> GET /currentaffair/info
- currentAffairAPI.createPurchase(buyerData) -> POST /currentaffair/create-purchase
- currentAffairAPI.getMyPurchases() -> GET /currentaffair/my-purchases

Unified Books:
- booksAPI.getBookInfo(bookType) -> GET /books/book/{bookType}/info
- booksAPI.getAllBooks() -> GET /books/books/all
- booksAPI.getPackageInfo(packageType) -> GET /books/package/{packageType}/info
- booksAPI.createBookPurchase(bookType, buyerData) -> POST /books/book/{bookType}/purchase
- booksAPI.createPackagePurchase(packageType, buyerData) -> POST /books/package/{packageType}/purchase
- booksAPI.getMyPurchases() -> GET /books/my-purchases
- booksAPI.checkBookAccess(bookType) -> GET /books/book/{bookType}/check-access

Weekly test:
- weeklyTestAPI.getInfo_Online() -> GET /weeklytest/info-online
- weeklyTestAPI.getInfo_Offline() -> GET /weeklytest/info-offline
- weeklyTestAPI.createEnrollmentWithUserOnline(userData) -> POST /weeklytest/enroll-online
- weeklyTestAPI.createEnrollmentWithUserOffline(userData) -> POST /weeklytest/enroll-offline

Sectional test:
- sectionalTestAPI.getInfo_Online() -> GET /sectional-test/info/online
- sectionalTestAPI.getInfo_Offline() -> GET /sectional-test/info/offline
- sectionalTestAPI.createEnrollmentWithUserOnline(userData) -> POST /sectional-test/enroll/online
- sectionalTestAPI.createEnrollmentWithUserOffline(userData) -> POST /sectional-test/enroll/offline

Coaching:
- coachingAPI.getInfo() -> GET /coaching/info
- coachingAPI.createEnrollmentWithUser(userData) -> POST /coaching/enroll
- coachingAPI.createPurchase() -> POST /coaching/create-purchase
- coachingAPI.getAllEnrollments() -> GET /admin/all-confirmed
- coachingAPI.getAllEnrollmentsCrashCourse() -> GET /admin/all-confirmed-crash-course
- coachingAPI.getAllEnrollmentsWeeklyTest() -> GET /admin/all-confirmed-weekly-test
- coachingAPI.getAllTeachersAndFriends() -> GET /admin/all-confirmed-teachers-friends
- coachingAPI.getAllOfflineStudents() -> GET /admin/all-confirmed-offline-students
- coachingAPI.adminAddEnrollment(data) -> POST coaching-dev /coaching/admin/add-enrollment
- coachingAPI.admincrashAddEnrollment(data) -> POST /coaching/admin/crash-add-enrollment
- coachingAPI.adminweeklytestAddEnrollment(data) -> POST /coaching/admin/weekly-add-enrollment
- coachingAPI.getAllClasses(subject, subSubject) -> GET /videocoaching
- coachingAPI.getLatestVideo(subject) -> GET /videocoaching/latest
- coachingAPI.getLatestLiveClass() -> GET /videocoaching/latest-live
- coachingAPI.createVideo(videoData) -> POST /videocoaching
- coachingAPI.updateVideo(id, videoData) -> PUT /videocoaching/update/{id}
- coachingAPI.deleteVideo(id) -> DELETE /videocoaching/delete/{id}
- coachingAPI.checkAccess(email) -> GET /coaching/check-access?email=
- coachingAPI.checkCrashCourseAccess(email) -> GET /coaching/check-crash-access?email=
- coachingAPI.getCrashCourseClasses(subject, subSubject) -> GET /videocrashcoaching
- coachingAPI.getCrashCourseLatestLiveClass() -> GET /videocrashcoaching/latest-live
- coachingAPI.createCrashVideo(videoData) -> POST /videocrashcoaching
- coachingAPI.updateCrashVideo(id, videoData) -> PUT /videocrashcoaching/{id}
- coachingAPI.deleteCrashVideo(id) -> DELETE /videocrashcoaching/{id}

Crash course:
- crashCourseAPI.getInfo() -> GET /crashcourse/info
- crashCourseAPI.createPurchase() -> POST /crashcourse/create-purchase
- crashCourseAPI.createEnrollmentWithUser(userData) -> POST /crashcourse/enroll

Monthly current affairs:
- monthlyCurrentAffairAPI.getAllMagazines() -> GET /monthly-current-affairs
- monthlyCurrentAffairAPI.getMagazineInfo(month) -> GET /monthly-current-affairs/{month}
- monthlyCurrentAffairAPI.createMagazinePurchase(month, data) -> POST /monthly-current-affairs/purchase/{month}
- monthlyCurrentAffairAPI.createCompletePackPurchase(data) -> POST /monthly-current-affairs/purchase/complete-pack
- monthlyCurrentAffairAPI.getMyPurchases() -> GET /monthly-current-affairs/my/purchases
- monthlyCurrentAffairAPI.checkMagazineAccess(month) -> GET /monthly-current-affairs/access/{month}
- monthlyCurrentAffairAPI.getMagazineDriveLink(month) -> GET /monthly-current-affairs/download/{month}
- monthlyCurrentAffairAPI.adminCreateMagazine(data) -> POST /admin/monthly-current-affairs/magazines
- monthlyCurrentAffairAPI.adminGetAllMagazines(params) -> GET /admin/monthly-current-affairs/magazines
- monthlyCurrentAffairAPI.adminGetMagazine(month) -> GET /admin/monthly-current-affairs/magazines/{month}
- monthlyCurrentAffairAPI.adminUpdateMagazine(month, data) -> PUT /admin/monthly-current-affairs/magazines/{month}
- monthlyCurrentAffairAPI.adminDeleteMagazine(month) -> DELETE /admin/monthly-current-affairs/magazines/{month}
- monthlyCurrentAffairAPI.adminGetAllPurchases(params) -> GET /admin/monthly-current-affairs/purchases
- monthlyCurrentAffairAPI.adminGetDashboardStats() -> GET /admin/monthly-current-affairs/dashboard/stats

PSTET:
- pstetAPI.getInfo() -> GET /pstet/info
- pstetAPI.enrollAndCreateOrder(userData) -> POST /pstet/enroll

Excise inspector:
- exciseInspectorAPI.getInfo() -> GET /excise-inspector/info
- exciseInspectorAPI.enrollAndCreateOrder(userData) -> POST /excise-inspector/enroll

Test series:
- testSeriesAPI.getInfo() -> GET /testseries/info
- testSeriesAPI.createOrder(userData) -> POST /testseries/create-order

Tracker:
- trackerAPI.getExamCategories() -> GET tracker /tracker/exam-categories
- trackerAPI.getExamTypes(categoryId) -> GET tracker /tracker/exam-types/{categoryId}
- trackerAPI.getSubjects(examTypeId) -> GET tracker /tracker/subjects/{examTypeId}
- trackerAPI.getTopics(subjectId) -> GET tracker /tracker/topics/{subjectId}
- trackerAPI.getUserProgress(examTypeId) -> GET tracker /tracker/progress/{examTypeId}

## Payment Flow Contract for New UI

Use this standard flow on all paid pages:
1. Load product/program info with relevant getInfo endpoint.
2. On CTA click, open buyer details collection step/modal.
3. Validate required fields (email mandatory, plus name/phone when needed).
4. Call backend order/enrollment endpoint.
5. Load Razorpay script if needed.
6. Open Razorpay checkout with returned order data.
7. Handle success callback and post-payment verification endpoint where applicable.
8. Handle cancel/failure and reset processing state.

Important:
- Never start payment before collecting buyer identity.
- Keep endpoint paths exactly as current backend expects.

## Access Rules

- Admin-only: Admin dashboard and admin datasets.
- User-only: User dashboard routes.
- Payment-protected learning routes for live/recorded classes and tracker.
- Policy pages are public.

## Implementation Guidance for the New UI Team / AI Tool

1. Rebuild UI components and styling freely.
2. Do not rename backend endpoints or change payload contracts without backend change.
3. Keep route paths stable unless doing a controlled migration.
4. Keep auth state persistence behavior compatible with manualAuthToken.
5. Remove Google auth UX and code paths from final new UI.
6. Add a reusable pre-payment identity collector and enforce it on every purchase page.
7. Preserve role-based redirects and protected-route behavior.

## Done Criteria for Rebuild

- New modern UI is implemented.
- All current pages/services still work with same backend APIs.
- Manual signup/login only.
- Every payment requires user details collection before checkout.
- Admin/user/payment-protected route behavior remains intact.
