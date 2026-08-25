import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';
import { getFaqSchema, getOrganizationSchema } from '../../config/structuredData';
import { getCanonicalUrl } from '../../config/publicSeo';

const SLUG = 'punjab-government-group-d-recruitment-2026';
const NOTICE_IMAGE = '/PunjabGovernmentGroupDRecruitment.png';

const PHONE_PRIMARY = '7696954686';
const PHONE_SECONDARY = '9988414686';

const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.johnnykhore.eliteacademy&hl=en_IN';
const IOS_APP_URL = 'https://apps.apple.com/in/app/elite-academy-mock-tests/id6746954938';

const post = {
  slug: SLUG,
  title: 'Punjab Government Group D Recruitment 2026: PSSSB 1,401 Vacancies, Eligibility, Salary & Last Date',
  description:
    'PSSSB Group D Recruitment 2026: 1,401 vacancies for Peon, Sevadar, Beldar, Chowkidar and more across Punjab Government departments. 10th pass eligibility, salary, application fee and last date to apply — 4 September 2026.',
  date: '25 August 2026',
  updatedDate: '25 August 2026',
  readingTime: '9 min read',
  author: 'Elite Academy Editorial Team',
  category: 'PSSSB Recruitment',
  heroBadge: 'Recruitment Notice',
  keywords: [
    'Punjab Government Group D Recruitment 2026',
    'Punjab Group D Recruitment 2026',
    'PSSSB Group D Recruitment 2026',
    'PSSSB Group D Vacancy 2026',
    'Punjab Group D Vacancy 2026',
    'PSSSB Group D 1401 Vacancies',
    'Punjab Government Group D Jobs 2026',
    'PSSSB Peon Recruitment 2026',
    'Punjab Peon Recruitment 2026',
    'PSSSB Group D Eligibility',
    'PSSSB Group D Qualification',
    'PSSSB Group D Age Limit',
    'PSSSB Group D Salary',
    'PSSSB Group D Application Fee',
    'PSSSB Group D Last Date',
    'PSSSB Group D Selection Process',
  ],
  tags: [
    'Punjab Government Group D Recruitment 2026',
    'PSSSB Group D',
    '1401 Vacancies',
    'Punjab Government Jobs',
  ],
};

const TOTAL_VACANCIES = '1,401';

const quickSummaryItems = [
  { label: 'Recruiting Body', value: 'PSSSB (Punjab SSS Board)', highlight: false },
  { label: 'Total Vacancies', value: `${TOTAL_VACANCIES} Posts`, highlight: true },
  { label: 'Posts', value: 'Sevadar, Peon, Beldar & more', highlight: false },
  { label: 'Qualification', value: '10th Pass / Matriculation', highlight: false },
  { label: 'Salary', value: '₹18,000 – ₹56,900 / month', highlight: false },
  { label: 'Selection', value: 'Written Exam Only', highlight: true },
  { label: 'Interview', value: 'Not Required', highlight: false },
  { label: 'Last Date to Apply', value: '4 September 2026', highlight: true },
];

const postsIncluded = [
  { icon: '🧹', label: 'Sevadar' },
  { icon: '🚪', label: 'Peon' },
  { icon: '🧱', label: 'Beldar' },
  { icon: '🙋', label: 'Attendant' },
  { icon: '🛡️', label: 'Chowkidar / Watchman' },
  { icon: '💧', label: 'Water Carrier' },
  { icon: '🌱', label: 'Mali / Gardener' },
  { icon: '🧼', label: 'Safai Sewak / Sanitation Worker' },
];

const ageLimitRows = [
  ['General Category', '18 – 37 years'],
  ['SC / BC Category', '18 – 42 years'],
];

const feeRows = [
  ['General', '₹1,000'],
  ['SC / BC', '₹250'],
  ['Persons with Disability (PH)', '₹500'],
  ['Ex-Servicemen', '₹200'],
];

const importantDates = [
  { event: 'Last Date to Apply Online', date: '4 September 2026' },
  { event: 'Application Start Date', date: 'To be confirmed — check official PSSSB portal' },
  { event: 'Written Examination Date', date: 'To be announced by PSSSB' },
  { event: 'Admit Card Release', date: 'To be announced by PSSSB' },
];

const documentsChecklist = [
  '10th class / Matriculation certificate and marksheet',
  'Valid photo ID proof (Aadhaar card, voter ID, etc.)',
  'Recent passport-size photograph and signature scan (as per portal specifications)',
  'Category certificate (SC/BC/EWS), if applicable',
  'Disability certificate, for candidates applying under the PH category',
  'Ex-servicemen discharge certificate, for candidates applying under the ESM category',
  'Domicile / residence proof, if required by the application portal',
  'Active mobile number and email ID for OTP verification and communication',
];

const prepSubjects = [
  { icon: '📖', label: 'General Knowledge' },
  { icon: '🧠', label: 'Reasoning' },
  { icon: '📘', label: 'Punjabi Language' },
  { icon: '📰', label: 'Current Affairs' },
  { icon: '🗺️', label: 'Punjab History & Geography' },
  { icon: '🔢', label: 'Basic Mathematics' },
];

const faqs = [
  {
    question: 'What is PSSSB Group D Recruitment 2026?',
    answer:
      'PSSSB Group D Recruitment 2026 is a recruitment drive by the Punjab State Subordinate Service Selection Board (PSSSB) to fill 1,401 Group D posts — including Sevadar, Peon, Beldar, Attendant, Chowkidar, Water Carrier, Mali and Safai Sewak — across various Punjab Government departments.',
  },
  {
    question: 'How many Group D vacancies are available?',
    answer:
      'A total of 1,401 vacancies are available across Punjab Government departments, including the offices of Deputy Commissioners (D.C. Office), the Punjab Jail Department, the Animal Husbandry Department and other departments.',
  },
  {
    question: 'What qualification is required for PSSSB Group D posts?',
    answer:
      'Candidates need to have passed 10th class (Matriculation) to be eligible for PSSSB Group D Recruitment 2026.',
  },
  {
    question: 'What is the age limit for PSSSB Group D Recruitment 2026?',
    answer:
      'The age limit is 18 to 37 years for General category candidates and 18 to 42 years for SC/BC category candidates.',
  },
  {
    question: 'What is the salary for PSSSB Group D posts?',
    answer:
      'Selected candidates will be placed on a pay scale of ₹18,000 to ₹56,900 per month.',
  },
  {
    question: 'What is the application fee for PSSSB Group D Recruitment 2026?',
    answer:
      'The application fee is ₹1,000 for General category, ₹250 for SC/BC category, ₹500 for Persons with Disability (PH) and ₹200 for Ex-Servicemen.',
  },
  {
    question: 'Is there an interview for PSSSB Group D recruitment?',
    answer:
      'No. Selection for PSSSB Group D posts will be made purely through a paper-based written examination. There is no interview stage in this recruitment.',
  },
  {
    question: 'What is the last date to apply for PSSSB Group D Recruitment 2026?',
    answer:
      'The last date to apply online for PSSSB Group D Recruitment 2026 is 4 September 2026.',
  },
  {
    question: 'What posts are included in PSSSB Group D Recruitment 2026?',
    answer:
      'The recruitment covers Sevadar, Peon, Beldar, Attendant, Chowkidar (watchman), Water Carrier, Mali (gardener) and Safai Sewak (sanitation worker) posts.',
  },
  {
    question: 'How can candidates prepare for the PSSSB Group D written examination?',
    answer:
      'Candidates should focus on general knowledge, basic reasoning, Punjabi language, current affairs, Punjab-specific history and geography, and basic mathematics. Structured practice with mock tests can help build speed and accuracy for the written exam.',
  },
];

const tocItems = [
  { id: 'overview', title: 'PSSSB Group D Recruitment 2026 – Overview' },
  { id: 'vacancies', title: '1,401 Group D Vacancies' },
  { id: 'departments', title: 'Departments Recruiting for Group D Posts' },
  { id: 'posts', title: 'Group D Posts Included' },
  { id: 'qualification', title: 'Educational Qualification' },
  { id: 'age-limit', title: 'Age Limit' },
  { id: 'salary', title: 'Salary / Pay Scale' },
  { id: 'fee', title: 'Application Fee' },
  { id: 'selection-process', title: 'Selection Process & Written Examination' },
  { id: 'important-dates', title: 'Important Dates' },
  { id: 'how-to-apply', title: 'How to Apply & What to Check' },
  { id: 'documents', title: 'Documents to Keep Ready' },
  { id: 'preparation', title: 'How to Prepare for the Written Exam' },
  { id: 'batch', title: 'Prepare With Elite Academy' },
  { id: 'faq', title: 'Frequently Asked Questions' },
];

const relatedLinks = [
  {
    title: 'PSSSB Coaching',
    path: '/psssb-coaching',
    description: 'Structured preparation for PSSSB and Punjab Subordinate Services aspirants — live classes, PYQs and mock tests.',
  },
  {
    title: 'Online Coaching',
    path: '/online-coaching',
    description: 'Online Punjab government exam coaching — live classes, recorded lectures, mock tests and study material.',
  },
  {
    title: 'Test Series',
    path: '/test-series',
    description: 'Daily mock tests for Punjab government exams with subject-wise and full-length tests, plus performance analysis.',
  },
  {
    title: 'Punjab Clerk Recruitment 2026',
    path: '/blog/punjab-clerk-recruitment-2026',
    description: 'SSS Board Advertisement 02/2026: 531 Clerk (Common Cadre) vacancies, application dates and official notification PDF.',
  },
];

export default function PunjabGovernmentGroupD2026() {
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && lightboxOpen) setLightboxOpen(false);
    };
    if (lightboxOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [lightboxOpen]);

  const canonicalUrl = getCanonicalUrl(`/blog/${SLUG}`);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${getCanonicalUrl('/')}${NOTICE_IMAGE}`,
    author: { '@type': 'Organization', name: 'Elite Academy' },
    publisher: { '@type': 'Organization', name: 'Elite Academy', url: getCanonicalUrl('/') },
    datePublished: '2026-08-25',
    dateModified: '2026-08-25',
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: post.title,
    url: canonicalUrl,
    description: post.description,
    datePublished: '2026-08-25',
    dateModified: '2026-08-25',
    breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
  };

  const faqSchema = getFaqSchema(faqs);
  const organizationSchema = getOrganizationSchema();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: canonicalUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(canonicalUrl).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <PageSeo
        path={`/blog/${SLUG}`}
        titleOverride="Punjab Government Group D Recruitment 2026: PSSSB 1,401 Vacancies, Eligibility & Last Date"
        descriptionOverride={post.description}
        keywords={post.keywords.join(', ')}
        imageUrl={NOTICE_IMAGE}
        publishedTime="2026-08-25"
        modifiedTime="2026-08-25"
        author={post.author}
        publisher="Elite Academy"
        article
        section={post.category}
        tags={post.tags}
        extraSchema={[articleSchema, faqSchema, webPageSchema, organizationSchema].filter(Boolean)}
      />

      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_45%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-slate-400" id="breadcrumb">
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-blue-300">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-blue-300">Blog</Link>
              <span>/</span>
              <span className="text-slate-200">Punjab Government Group D Recruitment 2026</span>
            </div>
          </nav>

          {/* Header */}
          <header className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_0.8fr] lg:items-start">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200">
                {post.heroBadge}
              </span>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Punjab Government Group D Recruitment 2026: 1,401 Vacancies, Eligibility, Salary &amp; Last Date
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span>By {post.author}</span>
                <span>•</span>
                <time dateTime="2026-08-25">Published: {post.date}</time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share this article"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {copied ? 'Link copied' : 'Share this article'}
                </button>
                <a
                  href="#important-dates"
                  className="rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20"
                >
                  View Important Dates
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20">
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  style={{ cursor: 'zoom-in' }}
                  className="mx-auto flex w-full max-w-[460px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/10 bg-white p-3 shadow-lg shadow-black/20 transition hover:shadow-xl hover:shadow-black/30 sm:max-w-[420px] lg:max-w-[460px]"
                  aria-label="Open Punjab Government Group D Recruitment 2026 notice image in full size"
                >
                  <img
                    src={NOTICE_IMAGE}
                    alt="Punjab Government Group D Recruitment 2026 PSSSB notification"
                    title="Punjab Government Group D Recruitment 2026 — PSSSB Notification"
                    loading="eager"
                    width={1536}
                    height={1024}
                    className="mx-auto h-auto w-full object-contain"
                  />
                </button>
                <p className="text-center text-sm text-slate-500">Click to view in full size</p>
                <p className="text-sm leading-6 text-slate-400">
                  PSSSB Group D Recruitment 2026 notice — 1,401 vacancies across Punjab Government departments.
                </p>
              </div>
            </div>
          </header>

          {/* Quick Summary */}
          <section
            className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
            aria-label="Recruitment details at a glance"
            id="overview"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                Quick Overview
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Punjab Government Group D Recruitment 2026 at a Glance
              </h2>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {quickSummaryItems.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-2xl border p-4 ${
                    item.highlight
                      ? 'border-blue-400/50 bg-blue-600/10'
                      : 'border-white/10 bg-slate-900/70'
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    {item.label}
                  </p>
                  <p
                    className={`mt-2 text-lg font-semibold ${
                      item.highlight ? 'text-blue-300' : 'text-white'
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Main 2-column layout */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.8fr_0.8fr]">

            <article className="space-y-8">

              {/* Table of Contents */}
              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <h2 className="text-xl font-semibold text-white">Table of Contents</h2>
                <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-slate-400">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="transition hover:text-blue-300">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>

              {/* PSSSB Group D Preparation Subjects */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  PSSSB Group D Preparation Subjects
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  Prepare for the major subjects covered in PSSSB Group D written exam preparation.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {prepSubjects.map((subject) => (
                    <div
                      key={subject.label}
                      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-3 transition hover:border-blue-400/50 hover:bg-slate-800/70"
                    >
                      <span className="text-xl" aria-hidden="true">{subject.icon}</span>
                      <span className="text-sm font-medium text-slate-200">{subject.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                  <p className="text-sm font-semibold text-slate-200 sm:text-base">
                    Want structured preparation for the PSSSB Group D written exam?
                  </p>
                  <Link
                    to="/online-coaching"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 sm:text-base"
                  >
                    View Courses &amp; Enroll Online →
                  </Link>
                </div>
              </section>

              {/* Introduction */}
              <section
                id="introduction"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Introduction</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    The Punjab State Subordinate Service Selection Board (PSSSB) has announced a major recruitment
                    drive for Group D posts across various Punjab Government departments. This is Punjab Government
                    Group D Recruitment 2026 — a total of 1,401 vacancies covering posts such as Sevadar, Peon,
                    Beldar, Attendant, Chowkidar, Water Carrier, Mali and Safai Sewak.
                  </p>
                  <p>
                    This is a significant employment opportunity for candidates who meet the 10th-pass qualification,
                    particularly for those seeking entry-level government positions with relatively accessible
                    eligibility criteria. Selection will be made purely on the basis of a written examination — there
                    is no interview stage.
                  </p>
                  <p>
                    This page explains the vacancy details, eligibility conditions, salary, application fee and
                    selection process in plain language, based on the information released for this recruitment.
                    Candidates are advised to verify the official notification and application details through the
                    appropriate official Punjab Government recruitment portal before applying.
                  </p>
                </div>
              </section>

              {/* CTA #1 */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">Preparing for the PSSSB Group D written examination?</strong> Now is
                  a good time to start structured preparation rather than waiting until the last date. Call{' '}
                  <a href={`tel:+91${PHONE_PRIMARY}`} className="font-semibold text-blue-300 underline hover:text-blue-200">
                    {PHONE_PRIMARY}
                  </a>{' '}
                  or{' '}
                  <a href={`tel:+91${PHONE_SECONDARY}`} className="font-semibold text-blue-300 underline hover:text-blue-200">
                    {PHONE_SECONDARY}
                  </a>{' '}
                  to know more.
                </p>
              </section>

              {/* Vacancies */}
              <section
                id="vacancies"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  PSSSB Group D Recruitment 2026 – 1,401 Vacancies
                </h2>
                <div className="mt-6 rounded-2xl border border-blue-400/40 bg-blue-600/10 p-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                    Total Group D Vacancies
                  </p>
                  <p className="mt-4 text-5xl font-bold text-white">{TOTAL_VACANCIES}</p>
                  <p className="mt-2 text-lg font-medium text-blue-200">Posts</p>
                </div>
                <div className="mt-6 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    PSSSB has advertised 1,401 Group D vacancies drawn from demand letters received from various
                    Punjab Government departments and offices. These posts are entry-level and require only a 10th
                    class (Matriculation) qualification, making this recruitment accessible to a wide pool of
                    candidates across Punjab.
                  </p>
                </div>
              </section>

              {/* Departments */}
              <section
                id="departments"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Departments Recruiting for Group D Posts</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    Group D vacancies under this recruitment are spread across the following Punjab Government
                    departments and offices:
                  </p>
                  <ul className="ml-5 list-disc space-y-2 text-slate-300">
                    <li>Offices of Deputy Commissioners (D.C. Office) across Punjab districts</li>
                    <li>Punjab Jail Department</li>
                    <li>Animal Husbandry Department</li>
                    <li>Other Punjab Government departments</li>
                  </ul>
                  <p className="text-sm text-slate-400">
                    Note: a department-wise numeric vacancy breakup was not part of the information released for this
                    recruitment. Candidates should verify the exact department-wise distribution from the official
                    PSSSB recruitment portal or notification.
                  </p>
                </div>
              </section>

              {/* Posts Included */}
              <section
                id="posts"
                className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-xl font-semibold text-white sm:text-2xl">Group D Posts Included</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  The recruitment covers the following Group D posts.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {postsIncluded.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-3 transition hover:border-blue-400/50 hover:bg-slate-800/70"
                    >
                      <span className="text-xl" aria-hidden="true">{item.icon}</span>
                      <span className="text-sm font-medium text-slate-200">{item.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Qualification */}
              <section
                id="qualification"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Educational Qualification</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    Candidates applying for PSSSB Group D Recruitment 2026 must have passed 10th class
                    (Matriculation) from a recognised board. No higher qualification is required for these posts.
                  </p>
                </div>
              </section>

              {/* Age Limit */}
              <section
                id="age-limit"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Age Limit</h2>
                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className="border border-slate-700 px-4 py-3 font-semibold">Category</th>
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">
                          Age Limit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ageLimitRows.map((row) => (
                        <tr key={row[0]} className="odd:bg-slate-900/50">
                          <td className="border border-slate-800 px-4 py-3 text-slate-300">{row[0]}</td>
                          <td className="border border-slate-800 px-4 py-3 font-semibold text-slate-200">
                            {row[1]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Salary */}
              <section
                id="salary"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Salary / Pay Scale</h2>
                <div className="mt-6 rounded-2xl border border-blue-400/40 bg-blue-600/10 p-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                    Pay Scale
                  </p>
                  <p className="mt-4 text-4xl font-bold text-white sm:text-5xl">₹18,000 – ₹56,900</p>
                  <p className="mt-2 text-lg font-medium text-blue-200">per month</p>
                </div>
              </section>

              {/* CTA #2 */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">1,401 vacancies make this an important opportunity</strong> for
                  Punjab Government job aspirants with a 10th-pass qualification. Practice with{' '}
                  <Link to="/test-series" className="font-semibold text-blue-300 underline hover:text-blue-200">
                    Elite Academy&apos;s mock tests
                  </Link>{' '}
                  to prepare for the written exam.
                </p>
              </section>

              {/* Application Fee */}
              <section
                id="fee"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Application Fee</h2>
                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className="border border-slate-700 px-4 py-3 font-semibold">Category</th>
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeRows.map((row) => (
                        <tr key={row[0]} className="odd:bg-slate-900/50">
                          <td className="border border-slate-800 px-4 py-3 text-slate-300">{row[0]}</td>
                          <td className="border border-slate-800 px-4 py-3 font-semibold text-slate-200">
                            {row[1]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Selection Process */}
              <section
                id="selection-process"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Selection Process &amp; Written Examination</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    Selection for PSSSB Group D Recruitment 2026 will be made through a written examination. The
                    examination will be paper-based.
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-500/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10">
                      <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-300">No Interview Required</h3>
                      <p className="mt-3 leading-7 text-amber-100/80">
                        Candidates will be selected purely on the basis of their performance in the written
                        examination. There is no interview stage in this recruitment process.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Important Dates */}
              <section
                id="important-dates"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Important Dates</h2>
                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className="border border-slate-700 px-4 py-3 font-semibold">Event</th>
                        <th className="border border-slate-700 px-4 py-3 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importantDates.map((row) => (
                        <tr key={row.event} className="odd:bg-slate-900/50">
                          <td className="border border-slate-800 px-4 py-3 text-slate-300">{row.event}</td>
                          <td className="border border-slate-800 px-4 py-3 font-semibold text-slate-200">
                            {row.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  The last date to apply for PSSSB Group D Recruitment 2026 is 4 September 2026. The exact
                  application start date, examination date, admit card date and result date have not been released
                  yet — candidates should regularly check the official PSSSB recruitment portal for updates.
                </p>
              </section>

              {/* How to Apply */}
              <section
                id="how-to-apply"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">How to Apply &amp; What Candidates Should Check</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    Applications for PSSSB Group D Recruitment 2026 are expected to be submitted online through the
                    official PSSSB recruitment portal. Before applying, candidates should:
                  </p>
                  <ul className="ml-5 list-disc space-y-2 text-slate-300">
                    <li>Read the complete official notification carefully for eligibility and instructions</li>
                    <li>Confirm the post(s) and department(s) they wish to apply for</li>
                    <li>Check the applicable application fee for their category</li>
                    <li>Ensure the online application is submitted before 4 September 2026</li>
                    <li>Keep a copy of the submitted application and fee payment receipt for future reference</li>
                  </ul>
                  <p>
                    Candidates should verify all official notification details and apply only through the
                    appropriate official Punjab Government recruitment portal.
                  </p>
                </div>
              </section>

              {/* Documents */}
              <section
                id="documents"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Documents to Keep Ready</h2>
                <ul className="mt-4 ml-5 list-disc space-y-2 text-[1rem] leading-8 text-slate-300">
                  {documentsChecklist.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
              </section>

              {/* Preparation */}
              <section
                id="preparation"
                className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">How to Prepare for the PSSSB Group D Exam</h2>
                <div className="mt-3 max-w-2xl space-y-4 leading-8 text-slate-300">
                  <p>
                    With no interview stage, the written examination is the only step that decides selection —
                    making focused, exam-oriented preparation important. Candidates should build daily revision
                    habits across general knowledge, reasoning, Punjabi language, current affairs, Punjab-specific
                    history and geography, and basic mathematics — the subjects listed above.
                  </p>
                  <p>
                    Regular practice with timed mock tests helps build speed and accuracy for a paper-based written
                    exam, rather than relying on last-minute revision alone.
                  </p>
                </div>
              </section>

              {/* Batch / Elite Academy CTA */}
              <section
                id="batch"
                className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  Prepare for PSSSB Group D Recruitment 2026 With Elite Academy
                </h2>
                <p className="mt-3 max-w-2xl leading-8 text-slate-300">
                  With 1,401 vacancies open and only a written exam standing between candidates and selection,
                  structured preparation can make a real difference. Elite Academy helps Punjab Government exam
                  aspirants prepare through:
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                    <h3 className="font-semibold text-white">Structured Coaching</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      <li>
                        <Link to="/psssb-coaching" className="text-blue-300 underline hover:text-blue-200">
                          PSSSB exam preparation
                        </Link>{' '}
                        — classroom and online batches
                      </li>
                      <li>
                        <Link to="/online-coaching" className="text-blue-300 underline hover:text-blue-200">
                          Online coaching
                        </Link>{' '}
                        for candidates across Punjab
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                    <h3 className="font-semibold text-white">Practice &amp; Revision</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      <li>
                        <Link to="/test-series" className="text-blue-300 underline hover:text-blue-200">
                          Daily mock tests
                        </Link>{' '}
                        with performance analysis
                      </li>
                      <li>Structured study material for general knowledge, reasoning and Punjabi</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-base leading-7 text-slate-200">
                    If you&apos;re preparing for the PSSSB Group D written examination, now is a good time to start
                    structured preparation rather than waiting until the last date. Call{' '}
                    <a href={`tel:+91${PHONE_PRIMARY}`} className="font-semibold text-blue-300 underline hover:text-blue-200">
                      {PHONE_PRIMARY}
                    </a>{' '}
                    or{' '}
                    <a href={`tel:+91${PHONE_SECONDARY}`} className="font-semibold text-blue-300 underline hover:text-blue-200">
                      {PHONE_SECONDARY}
                    </a>{' '}
                    for details on batches and mock tests.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`tel:+91${PHONE_PRIMARY}`}
                    className="rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-500"
                  >
                    Call {PHONE_PRIMARY}
                  </a>
                  <Link
                    to="/online-coaching"
                    className="rounded-full border border-white/10 px-5 py-2.5 font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Join Online Coaching
                  </Link>
                  <Link
                    to="/psssb-coaching"
                    className="rounded-full border border-white/10 px-5 py-2.5 font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Punjab Govt. Exam Coaching
                  </Link>
                </div>
              </section>

              {/* App Download CTA */}
              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <h2 className="text-xl font-semibold text-white">
                  Practice for PSSSB Group D Recruitment on the Elite Academy App
                </h2>
                <p className="mt-3 leading-8 text-slate-300">
                  Alongside classroom and online batches, the Elite Academy app gives you Punjab government exam
                  mock tests and practice resources on your phone — useful for revising general knowledge,
                  reasoning, current affairs and Punjabi language topics commonly tested in Group D-level exams.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={ANDROID_APP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396" />
                    </svg>
                    Download on Android
                  </a>
                  <a
                    href={IOS_APP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    <svg className="h-5 w-5 text-slate-200" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
                    </svg>
                    Download on iPhone
                  </a>
                </div>
              </section>

              {/* FAQ */}
              <section
                id="faq"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Frequently Asked Questions</h2>
                <div className="mt-6 space-y-3">
                  {faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                    >
                      <summary className="cursor-pointer text-base font-medium text-white">
                        {faq.question}
                      </summary>
                      <p className="mt-3 text-sm leading-7 text-slate-400">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* Related Resources */}
              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                    Continue preparing
                  </p>
                  <h2 className="text-2xl font-semibold text-white">Related Resources</h2>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {relatedLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-blue-400/50 hover:bg-slate-800/70"
                    >
                      <h3 className="text-lg font-semibold text-white">{link.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{link.description}</p>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Final CTA */}
              <section className="rounded-3xl border border-blue-400/40 bg-blue-600/10 p-8 text-center shadow-xl shadow-black/20">
                <h2 className="text-2xl font-semibold text-white">
                  Preparing for PSSSB Group D Recruitment 2026? Start your preparation now.
                </h2>
                <p className="mx-auto mt-3 max-w-2xl leading-8 text-slate-200">
                  Classroom coaching, online batches, mock tests and the Elite Academy app — all available to help
                  you prepare for the written examination before the last date, 4 September 2026.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`tel:+91${PHONE_PRIMARY}`}
                    className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                  >
                    Call {PHONE_PRIMARY}
                  </a>
                  <a
                    href={`tel:+91${PHONE_SECONDARY}`}
                    className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    Call {PHONE_SECONDARY}
                  </a>
                </div>
              </section>

              {/* Last updated */}
              <div className="rounded-2xl border border-white/5 bg-slate-900/30 px-6 py-4 text-sm text-slate-500">
                <p>
                  <span className="font-semibold text-slate-400">Last updated:</span> 25 August 2026, based on the
                  recruitment information released for PSSSB Group D Recruitment 2026. This page will be updated as
                  further official information is released. Candidates should verify all details from the official
                  PSSSB recruitment portal.
                </p>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <h2 className="text-lg font-semibold text-white">On this page</h2>
                <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-slate-400">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="transition hover:text-blue-300">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <h2 className="text-lg font-semibold text-white">Quick links</h2>
                <div className="mt-4 space-y-2 text-sm text-slate-400">
                  <Link to="/psssb-coaching" className="block hover:text-blue-300">
                    PSSSB Coaching →
                  </Link>
                  <Link to="/online-coaching" className="block hover:text-blue-300">
                    Online Coaching →
                  </Link>
                  <Link to="/test-series" className="block hover:text-blue-300">
                    Test Series →
                  </Link>
                  <Link to="/contact-us" className="block hover:text-blue-300">
                    Contact Us →
                  </Link>
                </div>
              </section>

              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <h2 className="text-lg font-semibold text-white">Last Date: 4 September 2026</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  1,401 Group D vacancies. Written exam only, no interview.
                </p>
                <div className="mt-4 space-y-2">
                  <a
                    href={`tel:+91${PHONE_PRIMARY}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    Call {PHONE_PRIMARY}
                  </a>
                  <a
                    href={`tel:+91${PHONE_SECONDARY}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Call {PHONE_SECONDARY}
                  </a>
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <h2 className="text-lg font-semibold text-white">Related guides</h2>
                <div className="mt-4 space-y-3">
                  {relatedLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block rounded-2xl border border-white/10 bg-slate-900/70 p-3 transition hover:border-blue-400/50 hover:bg-slate-800/70"
                    >
                      <h3 className="text-sm font-semibold text-white">{link.title}</h3>
                      <p className="mt-1 text-xs leading-6 text-slate-400">{link.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative flex flex-col items-center justify-center px-4 py-4 sm:py-6 lg:py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={NOTICE_IMAGE}
              alt="Punjab Government Group D Recruitment 2026 PSSSB notification"
              className="h-auto w-auto object-contain"
              style={{ maxWidth: '95vw', maxHeight: '90vh' }}
            />
            <div className="mt-6 text-center text-sm text-slate-300 sm:mt-8">
              <p className="font-semibold text-white">PSSSB Group D Recruitment 2026 Notification</p>
              <p className="mt-1 text-slate-400">Punjab State Subordinate Service Selection Board</p>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 transform text-xs text-slate-400 sm:block">
            Press <kbd className="rounded bg-white/10 px-2 py-1">ESC</kbd> to close
          </div>
        </div>
      )}
    </>
  );
}
