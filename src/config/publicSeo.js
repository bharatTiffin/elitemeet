import { getExamLandingPublicPages } from './examLandingPages';

export const SITE_URL = 'https://eliteacademy.pro';

/** Routes that must not appear in the sitemap or be indexed */
export const PRIVATE_ROUTES = [
  '/login',
  '/dashboard',
  '/admin',
  '/pdf-purchase',
  '/tracker',
  '/LiveClass',
  '/recordedClass',
  '/crash-LiveClass',
  '/crash-recordedClass',
];

/**
 * Single source of truth for public page SEO and sitemap entries.
 * Homepage (/) is discovered from index.html during build — do not duplicate in dynamicRoutes.
 */
export const PUBLIC_PAGES = [
  {
    path: '/',
    title: 'Punjab Government Exam Coaching | Elite Academy Chandigarh',
    description:
      'Elite Academy offers Punjab Government Exam coaching for PSSSB, Punjab Police, SSC, Banking & more. Join online or offline classes in Chandigarh & Fatehgarh Sahib.',
    changefreq: 'weekly',
    priority: 1.0,
    breadcrumb: 'Home',
  },
  {
    path: '/online-coaching',
    title: 'Online Government Exam Coaching | Elite Academy Punjab',
    description:
      'Join Elite Academy online coaching for PSSSB, Punjab Police, Patwari, Clerk and central government exams. Live classes, recorded lectures, mock tests and study material.',
    changefreq: 'weekly',
    priority: 0.9,
    breadcrumb: 'Online Coaching',
    schemaType: 'course',
  },
  {
    path: '/crash-course',
    title: 'Crash Course for Punjab Government Exams | Elite Academy',
    description:
      'Fast-track crash course for PSSSB and Punjab government exams with focused syllabus coverage, live classes, and exam-oriented preparation from Elite Academy.',
    changefreq: 'weekly',
    priority: 0.85,
    breadcrumb: 'Crash Course',
    schemaType: 'course',
  },
  {
    path: '/books',
    title: 'PSSSB & Punjab Exam Study Books | Elite Academy E-Books',
    description:
      'Browse subject-wise e-books for PSSSB and Punjab government exams — Polity, History, Geography, Science, Economics, Environment and complete book packs with PYQs.',
    changefreq: 'weekly',
    priority: 0.9,
    breadcrumb: 'Books',
  },
  {
    path: '/polity-book',
    title: 'Polity Book for PSSSB & Punjab Exams | Elite Academy',
    description:
      'Complete Polity package for PSSSB and Punjab exams — 90 pages of polity notes plus 20 pages of PYQs (2012–2025) with exam-focused coverage.',
    changefreq: 'monthly',
    priority: 0.8,
    breadcrumb: 'Polity Book',
    schemaType: 'product',
  },
  {
    path: '/pyqs-book',
    title: 'PYQs E-Book for Punjab Government Exams | Elite Academy',
    description:
      'Subject-wise and topic-wise previous year questions (PYQs) e-book for PSSSB and Punjab exams, including Excise Inspector mock test access on the Elite Academy app.',
    changefreq: 'monthly',
    priority: 0.8,
    breadcrumb: 'PYQs Book',
    schemaType: 'product',
  },
  {
    path: '/current-affairs-book',
    title: 'Current Affairs E-Book for PSSSB Exams | Elite Academy',
    description:
      'Download current affairs notes and magazines for PSSSB, Punjab Police and competitive exam preparation with instant PDF delivery from Elite Academy.',
    changefreq: 'weekly',
    priority: 0.85,
    breadcrumb: 'Current Affairs Book',
    schemaType: 'product',
  },
  {
    path: '/monthly-current-affairs',
    title: 'Monthly Current Affairs Magazine | Elite Academy',
    description:
      'Stay updated with monthly current affairs magazines for PSSSB, SSC and competitive exams. Exam-relevant news, instant PDF download and revision-friendly format.',
    changefreq: 'weekly',
    priority: 0.85,
    breadcrumb: 'Monthly Current Affairs',
  },
  {
    path: '/economics-book',
    title: 'Economics Book for PSSSB & Punjab Exams | Elite Academy',
    description:
      'Complete Economics preparation for PSSSB and Punjab exams — 85 pages of notes plus 18 pages of PYQs with budget and macro/micro concepts.',
    changefreq: 'monthly',
    priority: 0.75,
    breadcrumb: 'Economics Book',
    schemaType: 'product',
  },
  {
    path: '/geography-book',
    title: 'Geography Book for PSSSB & Punjab Exams | Elite Academy',
    description:
      'Complete Geography preparation for PSSSB and Punjab exams — 80 pages of notes plus 16 pages of PYQs covering physical and Indian geography.',
    changefreq: 'monthly',
    priority: 0.75,
    breadcrumb: 'Geography Book',
    schemaType: 'product',
  },
  {
    path: '/environment-book',
    title: 'Environment & Ecology Book for PSSSB Exams | Elite Academy',
    description:
      'Complete Environment and Ecology preparation for PSSSB and Punjab exams — 75 pages of notes plus 15 pages of PYQs for quick revision.',
    changefreq: 'monthly',
    priority: 0.75,
    breadcrumb: 'Environment Book',
    schemaType: 'product',
  },
  {
    path: '/science-book',
    title: 'General Science Book for PSSSB Exams | Elite Academy',
    description:
      'Complete General Science preparation for PSSSB and Punjab exams — Physics, Chemistry and Biology in 95 pages of notes plus 22 pages of PYQs.',
    changefreq: 'monthly',
    priority: 0.75,
    breadcrumb: 'Science Book',
    schemaType: 'product',
  },
  {
    path: '/modern-history-book',
    title: 'Modern History Book for PSSSB Exams | Elite Academy',
    description:
      'Modern History (1757–1947) preparation for PSSSB and Punjab exams — 88 pages of notes plus 19 pages of PYQs with freedom struggle coverage.',
    changefreq: 'monthly',
    priority: 0.75,
    breadcrumb: 'Modern History Book',
    schemaType: 'product',
  },
  {
    path: '/ancient-history-book',
    title: 'Ancient History Book for PSSSB Exams | Elite Academy',
    description:
      'Ancient History (prehistoric to 8th century CE) preparation for PSSSB and Punjab exams — 82 pages of notes plus 17 pages of PYQs.',
    changefreq: 'monthly',
    priority: 0.75,
    breadcrumb: 'Ancient History Book',
    schemaType: 'product',
  },
  {
    path: '/medieval-history-book',
    title: 'Medieval History Book for PSSSB Exams | Elite Academy',
    description:
      'Medieval History (8th century to 1757 CE) preparation for PSSSB and Punjab exams — 78 pages of notes plus 16 pages of PYQs.',
    changefreq: 'monthly',
    priority: 0.75,
    breadcrumb: 'Medieval History Book',
    schemaType: 'product',
  },
  {
    path: '/complete-pack',
    title: 'Complete Book Pack (All 8 Books) | Elite Academy',
    description:
      'Get all 8 Elite Academy subject books at a discounted price for complete PSSSB and Punjab government exam preparation in one bundle.',
    changefreq: 'monthly',
    priority: 0.8,
    breadcrumb: 'Complete Book Pack',
    schemaType: 'product',
  },
  {
    path: '/without-polity-pack',
    title: 'All Books Except Polity Pack | Elite Academy',
    description:
      'Get 7 Elite Academy subject books (excluding Polity) at a discounted bundle price for PSSSB and Punjab government exam preparation.',
    changefreq: 'monthly',
    priority: 0.75,
    breadcrumb: 'Books Without Polity Pack',
    schemaType: 'product',
  },
  {
    path: '/test-series',
    title: 'Punjab Government Exam Test Series | Elite Academy',
    description:
      'Daily test series for PSSSB, Punjab Police, Patwari and Punjab government exams with subject-wise mocks, full-length tests and performance analysis.',
    changefreq: 'weekly',
    priority: 0.85,
    breadcrumb: 'Test Series',
  },
  {
    path: '/weekly-test',
    title: 'Weekly Test Series for Punjab Exams | Elite Academy',
    description:
      'Join Elite Academy weekly test series for Punjab government exams — weekly mock tests, detailed solutions, analytics and performance tracking.',
    changefreq: 'weekly',
    priority: 0.85,
    breadcrumb: 'Weekly Test Series',
  },
  {
    path: '/sectional-test-series',
    title: 'Sectional Test Series for Punjab Exams | Elite Academy',
    description:
      'Sectional test series for PSSSB and Punjab exams — Monday to Thursday sectional tests and Friday full mock tests in online and offline modes.',
    changefreq: 'weekly',
    priority: 0.85,
    breadcrumb: 'Sectional Test Series',
  },
  {
    path: '/punjabi-typing',
    title: 'Punjabi & English Typing Course for PSSSB | Elite Academy',
    description:
      'Punjabi and English typing training for PSSSB Clerk and Senior Assistant exams — speed building, accuracy practice and exam-pattern drills.',
    changefreq: 'monthly',
    priority: 0.8,
    breadcrumb: 'Punjabi Typing Course',
    schemaType: 'course',
  },
  {
    path: '/french-course',
    title: 'French Language Course for Canada PR | Elite Academy',
    description:
      'Learn French online with Elite Academy — structured 1-month and 3-month courses from basic to advanced level for Canada PR and immigration goals.',
    changefreq: 'monthly',
    priority: 0.75,
    breadcrumb: 'French Course',
    schemaType: 'course',
  },
  {
    path: '/excise-inspector',
    title: 'Excise Inspector Exam Strategy Session | Elite Academy',
    description:
      'Register for the Excise Inspector exam strategy session every Sunday — complete roadmap, expert guidance and focused preparation tips from Elite Academy.',
    changefreq: 'weekly',
    priority: 0.8,
    breadcrumb: 'Excise Inspector Strategy',
  },
  {
    path: '/pstet-course',
    title: 'PSTET & CTET 1 Month Crash Course | Elite Academy',
    description:
      'PSTET and CTET 1-month crash course with complete syllabus coverage, live Zoom classes and exam-focused preparation till the exam date.',
    changefreq: 'weekly',
    priority: 0.8,
    breadcrumb: 'PSTET & CTET Course',
    schemaType: 'course',
  },
  {
    path: '/mentorship',
    title: '1-on-1 Exam Mentorship Sessions | Elite Academy',
    description:
      'Book personalized 1-on-1 mentorship sessions with Elite Academy experts for competitive exam doubt solving, strategy and guided preparation.',
    changefreq: 'weekly',
    priority: 0.8,
    breadcrumb: 'Mentorship',
  },
  {
    path: '/digital-offline-demo',
    title: 'Digital Offline Demo Class Registration | Elite Academy',
    description:
      'Register for a digital offline demo class at Elite Academy Chandigarh or Fatehgarh Sahib. ₹500 demo fee refundable on same-day request after attendance.',
    changefreq: 'monthly',
    priority: 0.7,
    breadcrumb: 'Demo Class Registration',
  },
  {
    path: '/join-team',
    title: 'Careers at Elite Academy | Join Our Team',
    description:
      'Apply for Data Entry, Teacher and Content Creator roles at Elite Academy. Submit your resume and schedule an interview for Punjab exam coaching careers.',
    changefreq: 'monthly',
    priority: 0.6,
    breadcrumb: 'Join Our Team',
  },
  {
    path: '/contact-us',
    title: 'Contact Elite Academy | Punjab Exam Coaching Support',
    description:
      'Contact Elite Academy for questions about online coaching, books, test series and demo classes. Email, phone and branch details for Chandigarh and Fatehgarh Sahib.',
    changefreq: 'monthly',
    priority: 0.7,
    breadcrumb: 'Contact Us',
    schemaType: 'contact',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Elite Academy',
    description:
      'Read the Elite Academy privacy policy covering data collection, usage, cookies and user information for our government exam coaching platform.',
    changefreq: 'yearly',
    priority: 0.3,
    breadcrumb: 'Privacy Policy',
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | Elite Academy',
    description:
      'Review Elite Academy terms and conditions for online coaching, books, test series, payments, sessions and platform usage policies.',
    changefreq: 'yearly',
    priority: 0.3,
    breadcrumb: 'Terms and Conditions',
  },
  {
    path: '/shipping-delivery-policy',
    title: 'Shipping & Delivery Policy | Elite Academy',
    description:
      'Elite Academy shipping and delivery policy for digital study material, e-books, test series access and online coaching service delivery.',
    changefreq: 'yearly',
    priority: 0.3,
    breadcrumb: 'Shipping & Delivery Policy',
  },
  {
    path: '/cancellation-and-refund-policy',
    title: 'Cancellation & Refund Policy | Elite Academy',
    description:
      'Elite Academy cancellation and refund policy for coaching programs, books, test series and other paid services on eliteacademy.pro.',
    changefreq: 'yearly',
    priority: 0.3,
    breadcrumb: 'Cancellation & Refund Policy',
  },
  ...getExamLandingPublicPages(),
];

export function getPageSeo(path) {
  return PUBLIC_PAGES.find((page) => page.path === path);
}

export function getCanonicalUrl(path) {
  if (!path || path === '/') {
    return SITE_URL;
  }
  return `${SITE_URL}${path}`;
}

/** Routes for vite-plugin-sitemap dynamicRoutes (excludes / to prevent duplicate homepage entry) */
export function getSitemapDynamicRoutes() {
  return PUBLIC_PAGES.filter((page) => page.path !== '/').map((page) => page.path);
}

export function getSitemapChangefreqMap() {
  return Object.fromEntries(PUBLIC_PAGES.map((page) => [page.path, page.changefreq]));
}

export function getSitemapPriorityMap() {
  return Object.fromEntries(PUBLIC_PAGES.map((page) => [page.path, page.priority]));
}

export function getSitemapPluginOptions() {
  const lastmod = new Date();

  return {
    hostname: SITE_URL,
    dynamicRoutes: getSitemapDynamicRoutes(),
    exclude: PRIVATE_ROUTES,
    changefreq: getSitemapChangefreqMap(),
    priority: getSitemapPriorityMap(),
    lastmod,
    generateRobotsTxt: true,
    robots: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_ROUTES,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: PRIVATE_ROUTES,
      },
    ],
  };
}
