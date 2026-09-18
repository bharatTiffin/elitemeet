import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';
import { getFaqSchema, getOrganizationSchema } from '../../config/structuredData';
import { getCanonicalUrl } from '../../config/publicSeo';

const SLUG = 'sssb-group-c-recruitment-2026';
const NOTICE_IMAGE = '/Subordinate-Services-Selection-Board.jpeg';

const PHONE_PRIMARY = '7696954686';
const PHONE_SECONDARY = '9988414686';

const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.johnnykhore.eliteacademy&hl=en_IN';
const IOS_APP_URL = 'https://apps.apple.com/in/app/elite-academy-mock-tests/id6746954938';

const post = {
  slug: SLUG,
  title:
    'SSSB Group C Recruitment 2026: Advertisement No. 12/2026 for Clerk, Driver, Translator, Stenographer & Field Artist Posts',
  description:
    'SSSB Punjab Advertisement No. 12/2026: CET-based Group C recruitment for Clerk (Legal), Clerk (Accounts), Clerk (Accountancy), Clerk (IT), Driver, Translator, Junior Scale Stenographer and Field Artist posts. Online applications start 25 September 2026 at www.sssb.punjab.gov.in.',
  date: '18 September 2026',
  updatedDate: '18 September 2026',
  readingTime: '9 min read',
  author: 'Elite Academy Editorial Team',
  category: 'SSSB Recruitment',
  heroBadge: 'New Notice Released',
  keywords: [
    'SSSB Recruitment 2026',
    'SSSB Group C Recruitment 2026',
    'Punjab SSSB Recruitment 2026',
    'SSSB CET Recruitment 2026',
    'SSSB Advertisement 12/2026',
    'SSSB Clerk Recruitment 2026',
    'SSSB Clerk Legal Recruitment',
    'SSSB Clerk Accounts Recruitment',
    'SSSB Clerk IT Recruitment 2026',
    'SSSB Driver Recruitment 2026',
    'SSSB Translator Recruitment 2026',
    'SSSB Junior Scale Stenographer Recruitment',
    'SSSB Field Artist Recruitment 2026',
    'Subordinate Services Selection Board Punjab Recruitment',
    'sssb.punjab.gov.in Recruitment 2026',
    'SSSB Online Application 2026',
    'PSSSB Group C Recruitment 2026',
    'Punjab Government Clerk Jobs 2026',
  ],
  tags: [
    'SSSB Group C Recruitment 2026',
    'SSSB Advertisement 12/2026',
    'CET Recruitment Punjab',
    'Punjab Government Jobs',
  ],
};

const quickSummaryItems = [
  { label: 'Recruiting Body', value: 'SSSB, Punjab', highlight: false },
  { label: 'Advertisement No.', value: '12/2026', highlight: true },
  { label: 'Post Categories', value: '8 Group C Posts', highlight: false },
  { label: 'Recruitment Mode', value: 'CET (Common Eligibility Test)', highlight: true },
  { label: 'Apply Online From', value: '25 September 2026', highlight: true },
  { label: 'Official Website', value: 'sssb.punjab.gov.in', highlight: false },
  { label: 'Notice Date', value: '17 September 2026', highlight: false },
  { label: 'Detailed Notification', value: 'To Be Uploaded Soon', highlight: false },
];

const postsIncluded = [
  { icon: '📋', label: 'Clerk (Legal)' },
  { icon: '💰', label: 'Clerk (Accounts)' },
  { icon: '🧮', label: 'Clerk (Accountancy)' },
  { icon: '💻', label: 'Clerk (IT)' },
  { icon: '🚗', label: 'Driver' },
  { icon: '🌐', label: 'Translator' },
  { icon: '⌨️', label: 'Junior Scale Stenographer' },
  { icon: '🎨', label: 'Field Artist' },
];

const importantDates = [
  { event: 'Advertisement Number', date: '12/2026' },
  { event: 'Public Notice Date', date: '17 September 2026' },
  { event: 'Online Application Start Date', date: '25 September 2026' },
  { event: 'Detailed Notification Upload', date: 'To be announced on sssb.punjab.gov.in' },
  { event: 'Last Date to Apply', date: 'To be announced' },
  { event: 'CET / Written Exam Date', date: 'To be announced' },
];

const documentsChecklist = [
  'Educational qualification certificates relevant to the post applied for',
  'Valid photo ID proof (Aadhaar card, voter ID, etc.)',
  'Recent passport-size photograph and signature scan (as per portal specifications)',
  'Category certificate (SC/BC/EWS), if applicable',
  'Domicile / residence proof of Punjab, if required by the application portal',
  'CET registration details / scorecard, once the CET process is confirmed in the detailed notification',
  'Active mobile number and email ID for OTP verification and communication',
];

const prepSubjects = [
  { icon: '🧠', label: 'Reasoning' },
  { icon: '📘', label: 'Punjabi Grammar' },
  { icon: '🇬🇧', label: 'English Language' },
  { icon: '💻', label: 'Computer Knowledge' },
  { icon: '📰', label: 'Current Affairs' },
  { icon: '📖', label: 'General Knowledge' },
  { icon: '🔢', label: 'Numerical Ability' },
  { icon: '🗺️', label: 'Punjab GK' },
];

const faqs = [
  {
    question: 'What is SSSB Group C Recruitment 2026?',
    answer:
      'SSSB Group C Recruitment 2026 is a public notice issued by the Subordinate Services Selection Board (SSSB), Punjab under Advertisement No. 12/2026, announcing that applications will be invited through the CET (Common Eligibility Test) recruitment process for various Group C posts across different departments of the Punjab Government.',
  },
  {
    question: 'What is Advertisement No. 12/2026?',
    answer:
      'Advertisement No. 12/2026 is the official recruitment notice number issued by SSSB, Punjab (dated 17 September 2026) for this Group C recruitment covering Clerk, Driver, Translator, Junior Scale Stenographer and Field Artist posts.',
  },
  {
    question: 'Which posts are included in SSSB Advertisement No. 12/2026?',
    answer:
      'The notice covers Clerk (Legal), Clerk (Accounts), Clerk (Accountancy), Clerk (IT), Driver, Translator, Junior Scale Stenographer and Field Artist posts across various departments of the Punjab Government.',
  },
  {
    question: 'What is CET recruitment in this context?',
    answer:
      'CET stands for Common Eligibility Test. Instead of holding a separate written exam for each post, SSSB uses candidates\' CET performance as part of the recruitment process, which is intended to reduce the need for candidates to appear in multiple separate exams for different Group C posts.',
  },
  {
    question: 'When will online applications start for SSSB Group C Recruitment 2026?',
    answer:
      'As per the public notice, online applications will be invited starting from 25 September 2026 through the official SSSB website, www.sssb.punjab.gov.in.',
  },
  {
    question: 'Where can I apply for SSSB Group C Recruitment 2026?',
    answer:
      'Applications must be submitted online through the official SSSB Punjab website: www.sssb.punjab.gov.in. Candidates should avoid unofficial links or third-party portals.',
  },
  {
    question: 'Has the detailed notification been released yet?',
    answer:
      'Not yet. As per the public notice dated 17 September 2026, the detailed notification for this recruitment — including vacancy numbers, eligibility criteria, age limit, salary and application fee — will be uploaded on the SSSB Punjab website soon. This page will be updated as soon as official details are released.',
  },
  {
    question: 'How many vacancies are there for each post?',
    answer:
      'The number of vacancies for each post (Clerk Legal, Clerk Accounts, Clerk Accountancy, Clerk IT, Driver, Translator, Junior Scale Stenographer and Field Artist) has not been released yet. This information is expected in the detailed notification, which candidates should check on the official SSSB website.',
  },
  {
    question: 'What is the eligibility criteria for these posts?',
    answer:
      'Detailed eligibility criteria — educational qualification, age limit and experience requirements for each post — have not been released yet. These will differ by post (for example, Clerk-category posts, Driver and Translator typically carry different qualification requirements) and will be specified in the detailed notification.',
  },
  {
    question: 'What is the last date to apply for SSSB Group C Recruitment 2026?',
    answer:
      'The last date to apply has not been announced yet. Only the application start date, 25 September 2026, has been confirmed so far. Candidates should regularly check the official SSSB website for the closing date once released.',
  },
  {
    question: 'Where can I get updates on this recruitment?',
    answer:
      'Candidates should regularly check the official SSSB Punjab website, www.sssb.punjab.gov.in, for the detailed notification and further updates. This Elite Academy page will also be updated as soon as new official information is released.',
  },
  {
    question: 'How can I prepare for the SSSB Clerk / CET exam?',
    answer:
      'Candidates should focus on reasoning, Punjabi grammar, English language, computer knowledge, current affairs, general knowledge and numerical ability — subjects commonly tested in SSSB Clerk and CET-based Group C exams. Structured coaching and regular mock test practice can help build speed and accuracy ahead of the official exam date.',
  },
];

const tocItems = [
  { id: 'overview', title: 'SSSB Group C Recruitment 2026 – Overview' },
  { id: 'latest-update', title: 'Latest Update: Public Notice Details' },
  { id: 'posts', title: 'Group C Posts Included' },
  { id: 'what-is-cet', title: 'What Is CET (Common Eligibility Test) Recruitment?' },
  { id: 'how-to-apply', title: 'Application Dates & How to Apply' },
  { id: 'eligibility', title: 'Eligibility & Vacancy Details' },
  { id: 'selection-process', title: 'Expected Selection Process' },
  { id: 'documents', title: 'Documents to Keep Ready' },
  { id: 'preparation', title: 'How to Prepare' },
  { id: 'batch', title: 'Prepare With Elite Academy' },
  { id: 'faq', title: 'Frequently Asked Questions' },
];

const relatedLinks = [
  {
    title: 'Punjab Clerk Recruitment 2026',
    path: '/blog/punjab-clerk-recruitment-2026',
    description: 'SSS Board Advertisement 02/2026: 531 Clerk (Common Cadre) vacancies, application dates and official notification PDF.',
  },
  {
    title: 'Punjab Government Group D Recruitment 2026',
    path: '/blog/punjab-government-group-d-recruitment-2026',
    description: 'PSSSB Group D Recruitment 2026: 1,401 vacancies for Peon, Sevadar, Beldar, Chowkidar and more — eligibility, salary and last date.',
  },
  {
    title: 'Punjabi & English Typing Course',
    path: '/punjabi-typing',
    description: 'Typing speed and accuracy training for Clerk and Junior Scale Stenographer posts — a key skill test stage in many SSSB exams.',
  },
  {
    title: 'Online Coaching',
    path: '/online-coaching',
    description: 'Online Punjab government exam coaching — live classes, recorded lectures, mock tests and study material.',
  },
];

export default function SSSBGroupCRecruitment2026() {
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
    datePublished: '2026-09-18',
    dateModified: '2026-09-18',
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
    datePublished: '2026-09-18',
    dateModified: '2026-09-18',
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
        titleOverride="SSSB Group C Recruitment 2026: Advertisement 12/2026 — Clerk, Driver, Translator & Stenographer Posts"
        descriptionOverride={post.description}
        keywords={post.keywords.join(', ')}
        imageUrl={NOTICE_IMAGE}
        publishedTime="2026-09-18"
        modifiedTime="2026-09-18"
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
              <span className="text-slate-200">SSSB Group C Recruitment 2026</span>
            </div>
          </nav>

          {/* Header */}
          <header className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_0.8fr] lg:items-start">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200">
                {post.heroBadge}
              </span>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                SSSB Group C Recruitment 2026: Advertisement No. 12/2026 for Clerk, Driver, Translator, Stenographer &amp; Field Artist Posts
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span>By {post.author}</span>
                <span>•</span>
                <time dateTime="2026-09-18">Published: {post.date}</time>
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
                  href="#how-to-apply"
                  className="rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20"
                >
                  View Application Dates
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
                  aria-label="Open SSSB Group C Recruitment 2026 notice image in full size"
                >
                  <img
                    src={NOTICE_IMAGE}
                    alt="SSSB Punjab Group C Recruitment 2026 Advertisement 12/2026 public notice"
                    title="SSSB Group C Recruitment 2026 — Advertisement No. 12/2026 Public Notice"
                    loading="eager"
                    width={1080}
                    height={690}
                    className="mx-auto h-auto w-full object-contain"
                  />
                </button>
                <p className="text-center text-sm text-slate-500">Click to view in full size</p>
                <p className="text-sm leading-6 text-slate-400">
                  Official public notice — SSSB, Punjab, Advertisement No. 12/2026, dated 17 September 2026.
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
                SSSB Group C Recruitment 2026 at a Glance
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

              {/* Preparation Subjects + CTA */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  SSSB Group C / CET Preparation Subjects
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  Get a head start — begin preparing for the major subjects covered in SSSB Clerk and CET-based Group C exams.
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
                    Want structured preparation before the detailed notification arrives?
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
                    The Subordinate Services Selection Board, Punjab (SSSB), headquartered at Van Bhawan,
                    Sector-68, SAS Nagar, has issued a public notice under Advertisement No. 12/2026 announcing
                    that applications will be invited — through the CET (Common Eligibility Test) recruitment
                    process — for various Group C posts across different departments of the Punjab Government.
                  </p>
                  <p>
                    This is SSSB Group C Recruitment 2026, covering Clerk (Legal), Clerk (Accounts), Clerk
                    (Accountancy), Clerk (IT), Driver, Translator, Junior Scale Stenographer and Field Artist
                    posts. Online applications will open from 25 September 2026 through the official SSSB
                    website, www.sssb.punjab.gov.in.
                  </p>
                  <p>
                    The detailed notice for this recruitment — with vacancy numbers, eligibility criteria, age
                    limit, salary and application fee — has not been uploaded yet and is expected on the SSSB
                    website soon. This page explains everything confirmed so far in plain language and will be
                    updated as further official details are released. Candidates are advised to verify all
                    information from the official SSSB Punjab portal before applying.
                  </p>
                </div>
              </section>

              {/* CTA #1 */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">Don&apos;t wait for the detailed notification to start preparing.</strong>{' '}
                  Begin your SSSB Clerk / CET preparation today. Call{' '}
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

              {/* Latest Update */}
              <section
                id="latest-update"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Latest Update: Public Notice Details</h2>

                <div className="mt-6 rounded-2xl border border-blue-400/40 bg-blue-600/10 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                    Public Notice — SSSB, Punjab, dated 17 September 2026
                  </p>
                  <p className="mt-3 leading-7 text-blue-50">
                    Applications are invited (through CET — Common Eligibility Test recruitment) for various
                    Group C posts in different departments of the Punjab Government, including Clerk (Legal),
                    Clerk (Accounts), Clerk (Accountancy), Clerk (IT), Driver, Translator, Junior Scale
                    Stenographer and Field Artist. Online applications will be invited starting from 25 September
                    2026 through the official website, www.sssb.punjab.gov.in. The detailed notice for this
                    recruitment will be uploaded on the Board&apos;s website soon.
                  </p>
                  <p className="mt-3 text-sm text-blue-200/80">
                    Reference No.: DPR/Pb/1084/12/2026-27/15314 — Signed: Secretary, Subordinate Services
                    Selection Board, Punjab.
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
                      <h3 className="text-lg font-semibold text-amber-300">
                        Detailed Notification Not Yet Released
                      </h3>
                      <p className="mt-3 leading-7 text-amber-100/80">
                        This is a preliminary public notice only. Vacancy numbers, post-wise eligibility,
                        age limit, salary and application fee have not been released yet. SSSB has confirmed
                        these details will be published on www.sssb.punjab.gov.in soon — bookmark this page,
                        as it will be updated the moment official details are out.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Posts Included */}
              <section
                id="posts"
                className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-xl font-semibold text-white sm:text-2xl">Group C Posts Included</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  Advertisement No. 12/2026 covers the following Group C posts across various Punjab Government departments.
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
                <p className="mt-4 text-sm text-slate-500">
                  Note: a numeric vacancy breakup for each post was not part of the public notice released so
                  far. Candidates should verify the exact post-wise vacancy count from the detailed notification
                  once it is uploaded.
                </p>
              </section>

              {/* What is CET */}
              <section
                id="what-is-cet"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">What Is CET (Common Eligibility Test) Recruitment?</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    CET stands for Common Eligibility Test. Under a CET-based recruitment process, a candidate&apos;s
                    performance in a common qualifying test is used as part of the eligibility for multiple
                    Group C / Group D posts, instead of requiring a fresh, separate written exam for every
                    individual post. This is intended to reduce the number of times candidates need to appear
                    for exams when applying to multiple government posts.
                  </p>
                  <p>
                    For SSSB Group C Recruitment 2026 (Advertisement No. 12/2026), candidates should watch for
                    official clarification in the detailed notification on exactly how CET will be applied to
                    each post — Clerk (Legal), Clerk (Accounts), Clerk (Accountancy), Clerk (IT), Driver,
                    Translator, Junior Scale Stenographer and Field Artist.
                  </p>
                </div>
              </section>

              {/* CTA #2 */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">8 Group C posts advertised together</strong> — a wide opportunity
                  for Punjab Government job aspirants. Practice with{' '}
                  <Link to="/test-series" className="font-semibold text-blue-300 underline hover:text-blue-200">
                    Elite Academy&apos;s mock tests
                  </Link>{' '}
                  to get exam-ready before the CET date is announced.
                </p>
              </section>

              {/* How to Apply */}
              <section
                id="how-to-apply"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Application Dates &amp; How to Apply</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    Online applications for SSSB Group C Recruitment 2026 will be invited starting from{' '}
                    <strong className="text-white">25 September 2026</strong> through the official website:{' '}
                    <strong className="text-white">www.sssb.punjab.gov.in</strong>. Before applying, candidates should:
                  </p>
                  <ul className="ml-5 list-disc space-y-2 text-slate-300">
                    <li>Wait for and read the complete detailed notification once it is uploaded</li>
                    <li>Confirm the post(s) they wish to apply for and their eligibility for each</li>
                    <li>Check the applicable application fee for their category, once announced</li>
                    <li>Apply only through the official SSSB Punjab website</li>
                    <li>Keep a copy of the submitted application and fee payment receipt for future reference</li>
                  </ul>
                  <p>
                    Candidates should verify all official notification details and apply only through the
                    appropriate official SSSB Punjab recruitment portal.
                  </p>
                </div>

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
              </section>

              {/* Eligibility */}
              <section
                id="eligibility"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Eligibility &amp; Vacancy Details</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    Post-wise eligibility — educational qualification, age limit and any experience requirement
                    — has not been released yet. Different posts in this notice are expected to carry different
                    eligibility conditions; for example, Clerk-category posts, Driver, Translator, Junior Scale
                    Stenographer and Field Artist typically require different qualifications and, in some cases,
                    a skill or trade test.
                  </p>
                  <p className="text-sm text-slate-400">
                    Vacancy numbers for each post have also not been announced. Both eligibility criteria and
                    vacancy details are expected in the detailed notification that SSSB has stated will be
                    uploaded on www.sssb.punjab.gov.in soon. Candidates should rely only on the official
                    notification once it is released.
                  </p>
                </div>
              </section>

              {/* Selection Process */}
              <section
                id="selection-process"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Expected Selection Process</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    While the official selection process for Advertisement No. 12/2026 is yet to be confirmed,
                    SSSB recruitment typically follows a CET-based written examination stage, followed by
                    document verification. Posts such as Junior Scale Stenographer may additionally involve a
                    typing/shorthand skill test, and Driver posts may involve a driving skill test, as is
                    common in similar Group C recruitments — but candidates must verify the exact process from
                    the official detailed notification once released.
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
                <h2 className="text-2xl font-semibold text-white">How to Prepare Before the Detailed Notification Arrives</h2>
                <div className="mt-3 max-w-2xl space-y-4 leading-8 text-slate-300">
                  <p>
                    With 8 Group C posts advertised together under a CET-based process, competition is expected
                    to be high once the detailed notification is released. Rather than waiting, candidates should
                    start building daily revision habits now across reasoning, Punjabi grammar, English, computer
                    knowledge, current affairs, general knowledge and numerical ability — the subjects listed
                    above.
                  </p>
                  <p>
                    Candidates applying for Clerk (IT) or Junior Scale Stenographer posts should also start
                    building typing speed and accuracy early, since typing/skill tests are common in these
                    categories of Punjab government recruitment.
                  </p>
                </div>
              </section>

              {/* Batch / Elite Academy CTA */}
              <section
                id="batch"
                className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  Prepare for SSSB Group C Recruitment 2026 With Elite Academy
                </h2>
                <p className="mt-3 max-w-2xl leading-8 text-slate-300">
                  With 8 Group C posts open under Advertisement No. 12/2026 and applications starting soon,
                  structured preparation started early can make a real difference. Elite Academy helps Punjab
                  Government exam aspirants prepare through:
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
                    <h3 className="font-semibold text-white">Practice &amp; Skill Building</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      <li>
                        <Link to="/test-series" className="text-blue-300 underline hover:text-blue-200">
                          Daily mock tests
                        </Link>{' '}
                        with performance analysis
                      </li>
                      <li>
                        <Link to="/punjabi-typing" className="text-blue-300 underline hover:text-blue-200">
                          Punjabi &amp; English typing course
                        </Link>{' '}
                        for Clerk &amp; Stenographer posts
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-base leading-7 text-slate-200">
                    If you&apos;re planning to apply under Advertisement No. 12/2026, now is a good time to start
                    structured preparation rather than waiting for the detailed notification. Call{' '}
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
                  Practice for SSSB Group C Recruitment on the Elite Academy App
                </h2>
                <p className="mt-3 leading-8 text-slate-300">
                  Alongside classroom and online batches, the Elite Academy app gives you Punjab government exam
                  mock tests and practice resources on your phone — useful for revising general knowledge,
                  reasoning, current affairs and Punjabi language topics commonly tested in SSSB Group C exams.
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
                  Preparing for SSSB Group C Recruitment 2026? Start now, before the rush begins.
                </h2>
                <p className="mx-auto mt-3 max-w-2xl leading-8 text-slate-200">
                  Classroom coaching, online batches, mock tests and the Elite Academy app — all available to
                  help you prepare for the CET-based exam before applications open on 25 September 2026.
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
                  <span className="font-semibold text-slate-400">Last updated:</span> 18 September 2026, based on
                  the public notice released for SSSB Group C Recruitment 2026 (Advertisement No. 12/2026). This
                  page will be updated as soon as the detailed notification is released. Candidates should verify
                  all details from the official SSSB Punjab website, www.sssb.punjab.gov.in.
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
                  <Link to="/punjabi-typing" className="block hover:text-blue-300">
                    Typing Course →
                  </Link>
                  <Link to="/contact-us" className="block hover:text-blue-300">
                    Contact Us →
                  </Link>
                </div>
              </section>

              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <h2 className="text-lg font-semibold text-white">Apply From: 25 September 2026</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  8 Group C posts. CET-based recruitment. Detailed notification coming soon.
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
              alt="SSSB Punjab Group C Recruitment 2026 Advertisement 12/2026 public notice"
              className="h-auto w-auto object-contain"
              style={{ maxWidth: '95vw', maxHeight: '90vh' }}
            />
            <div className="mt-6 text-center text-sm text-slate-300 sm:mt-8">
              <p className="font-semibold text-white">SSSB Group C Recruitment 2026 Public Notice</p>
              <p className="mt-1 text-slate-400">Subordinate Services Selection Board, Punjab</p>
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
