import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';
import { getFaqSchema, getOrganizationSchema } from '../../config/structuredData';
import { getCanonicalUrl } from '../../config/publicSeo';

const SLUG = 'punjab-clerk-recruitment-2026';
const NOTICE_IMAGE = '/reopen-clerk-exam.png';
const CATEGORY_IMAGE = '/reopen-clerk-exam-categorywise-cutoff.png';
const PDF_URL = '/reopen-clerk-exam.pdf';

const PHONE_PRIMARY = '7696954686';
const PHONE_SECONDARY = '9988414686';
const CHANDIGARH_MAPS = 'https://maps.app.goo.gl/zGfDqwjeah3XWk4k9';
const FATEHGARH_MAPS = 'https://maps.app.goo.gl/7D4C7EXmKxRRosPWA';

const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.johnnykhore.eliteacademy&hl=en_IN';
const IOS_APP_URL = 'https://apps.apple.com/in/app/elite-academy-mock-tests/id6746954938';

const post = {
  slug: SLUG,
  title: 'Punjab Clerk Recruitment 2026: SSS Board Advertisement 02/2026, 531 Vacancies, Application Dates & Official PDF',
  description:
    'Punjab Clerk Recruitment 2026: SSS Board corrigendum for Advertisement No. 02/2026, 531 Clerk (Common Cadre) vacancies, online application dates 25 August to 7 September 2026, department-wise vacancy list and the official notification PDF.',
  date: '21 August 2026',
  updatedDate: '21 August 2026',
  readingTime: '11 min read',
  author: 'Elite Academy Editorial Team',
  category: 'SSS Board Recruitment',
  heroBadge: 'Corrigendum Released',
  keywords: [
    'Punjab Clerk Recruitment 2026',
    'Punjab Clerk Vacancy 2026',
    'Punjab Clerk Recruitment 2026 531 Posts',
    'SSS Board Clerk Recruitment 2026',
    'SSS Board Punjab Clerk 2026',
    'Punjab Clerk Advertisement 02/2026',
    'Punjab Clerk 02/2026',
    'Punjab Government Clerk Jobs 2026',
    'Punjab Clerk Notification 2026',
    'Punjab Clerk Official Notification',
    'Punjab Clerk Recruitment Notification PDF',
    'Punjab Clerk 531 vacancies',
    'Punjab Clerk Common Cadre',
    'Punjab Clerk application date 2026',
    'Punjab Clerk last date 2026',
    'Punjab Clerk department wise vacancies',
    'Punjab Clerk coaching Chandigarh',
    'Punjab Clerk coaching Fatehgarh Sahib',
  ],
  tags: [
    'Punjab Clerk Recruitment 2026',
    'SSS Board Punjab',
    'Advertisement 02/2026',
    'Clerk Common Cadre',
  ],
};

const quickSummaryItems = [
  { label: 'Post', value: 'Clerk (Common Cadre)', highlight: false },
  { label: 'Total Vacancies', value: '531 Posts', highlight: true },
  { label: 'Advertisement No.', value: '02/2026', highlight: false },
  { label: 'Recruiting Body', value: 'S.S.S. Board, Punjab', highlight: false },
  { label: 'Notice Date', value: '21 August 2026', highlight: false },
  { label: 'Apply Online', value: '25 Aug – 7 Sep 2026', highlight: true },
  { label: 'Fee Payment Last Date', value: '7 September 2026', highlight: false },
  { label: 'Already Applied?', value: 'No Reapplication Needed', highlight: false },
];

const importantDates = [
  { event: 'Advertisement Number', date: '02/2026' },
  { event: 'Corrigendum Notice Date', date: '21 August 2026' },
  { event: 'Online Application Starts', date: '25 August 2026' },
  { event: 'Online Application Last Date', date: '7 September 2026' },
  { event: 'Fee Payment Last Date', date: '7 September 2026' },
];

const departmentVacancies = [
  ['1', 'Directorate of Sports, Punjab', 14],
  ['2', 'Office of Deputy Commissioner, Gurdaspur', 36],
  ['3', 'Fisheries Department', 2],
  ['4', 'Directorate of Prosecution Department', 3],
  ['5', 'Office of Additional Director General of Police (Nodal) – Head Office', 1],
  ['6', 'Office of Additional Director General of Police (Nodal) – Border', 1],
  ['7', 'Directorate of Land Records, Punjab', 6],
  ['8', 'Finance Department, Treasury & Accounts Branch', 11],
  ['9', 'Office of Deputy Commissioner, Faridkot', 14],
  ['10', 'Cabinet & Administrative Reforms Department, Punjab', 3],
  ['11', 'Office of Deputy Commissioner, Mansa', 9],
  ['12', 'Punjab State Agricultural Marketing Board', 90],
  ['13', 'Office of Principal Secretary/Commissioner, Punjab Bhawan, New Delhi', 5],
  ['14', 'Office of Commissioner, Jalandhar Division, Jalandhar', 7],
  ['15', 'Office of Deputy Commissioner, Batala', 24],
  ['16', 'Office of Deputy Commissioner, Shaheed Bhagat Singh Nagar', 12],
  ['17', 'Forest & Wildlife Protection Department, Punjab', 18],
  ['18', 'Directorate of Social Security Services Department, Punjab', 17],
  ['19', 'Directorate of Prosecution Department, Punjab, Chandigarh', 3],
  ['20', 'Excise & Taxation Department (Field Offices)', 145],
  ['21', 'Excise & Taxation Department (Head Office)', 5],
  ['22', 'Directorate of Rural Development Department, Punjab', 6],
  ['23', 'Information & Public Relations Department, Punjab', 16],
  ['24', 'Revenue, Rehabilitation & Disaster Management Department, Punjab', 25],
  ['25', 'Office of Deputy Commissioner, Moga', 21],
  ['26', 'Office of Deputy Commissioner, Rupnagar', 16],
  ['27', 'Divisional Commissioner, Faridkot', 6],
  ['28', 'Cultural Affairs Department, Punjab', 3],
  ['29', 'Office of Deputy Commissioner, Malerkotla', 12],
];

const TOTAL_VACANCIES = departmentVacancies.reduce((sum, row) => sum + row[2], 0);

const categoryCodes = [
  ['1', 'General', '101'],
  ['2', 'EWS (Gen.)', '102'],
  ['3', 'S.C. (M & B)', '103'],
  ['4', 'S.C. (Ramdasia & others)', '104'],
  ['5', 'B.C.', '105'],
  ['6', 'ESM Gen. (Self)', '106'],
  ['7', 'ESM Gen. (Dependent)', '107'],
  ['8', 'ESM S.C (M & B) (Self)', '108'],
  ['9', 'ESM S.C (M & B) (Dependent)', '109'],
  ['10', 'ESM S.C (R & O) (Self)', '110'],
  ['11', 'ESM S.C (R & O) (Dependent)', '111'],
  ['12', 'ESM B.C (Self)', '112'],
  ['13', 'ESM B.C (Dependent)', '113'],
  ['14', 'Sports General', '114'],
  ['15', 'Sports {SC (M&B)}', '115'],
  ['16', 'Sports {SC (R&O)}', '116'],
  ['17', 'Physical Handicapped (Ortho)', '117'],
  ['18', 'Physical Handicapped (VH)', '118'],
  ['19', 'Physical Handicapped (HH)', '119'],
  ['20', 'Physical Handicapped (I.D./M.D.)', '120'],
  ['21', 'Freedom Fighter', '121'],
];

const faqs = [
  {
    question: 'What is Punjab Clerk Recruitment 2026?',
    answer:
      'Punjab Clerk Recruitment 2026 refers to the recruitment of Clerk (Common Cadre) posts by the S.S.S. Board, Punjab (Subordinate Services Selection Board) under Advertisement No. 02/2026. A corrigendum notice dated 21 August 2026 reopened and clarified the online application window for these posts.',
  },
  {
    question: 'How many Clerk posts are available under Advertisement No. 02/2026?',
    answer:
      'A total of 531 Clerk (Common Cadre) posts are advertised under Advertisement No. 02/2026, based on demand letters received from various Punjab Government departments, as shown in Annexure A of the official corrigendum.',
  },
  {
    question: 'What is the application date for Punjab Clerk Recruitment 2026?',
    answer:
      'Online applications for posts under Advertisement No. 02/2026 are invited from 25 August 2026 to 7 September 2026 through the official online portal.',
  },
  {
    question: 'What is the last date to apply for Punjab Clerk Recruitment 2026?',
    answer:
      'The last date to submit the online application is 7 September 2026.',
  },
  {
    question: 'What is the last date for fee payment?',
    answer:
      'The last date for fee payment for Advertisement No. 02/2026 is also 7 September 2026, the same as the application closing date.',
  },
  {
    question: 'Do candidates who already applied under Advertisement No. 02/2026 need to apply again?',
    answer:
      'No. The official corrigendum clearly states that candidates who have already applied under Advertisement No. 02/2026 do not need to apply again.',
  },
  {
    question: 'Is 30 September 2026 the last date to apply for Punjab Clerk Recruitment 2026?',
    answer:
      'No, this is a common misunderstanding. The 30.09.2026 reference in the corrigendum relates only to the withdrawal of a condition about demand letters/posts received up to that date under Para 1(ii) and Note Sr. No. 7(xi) of Advertisement No. 02/2026. It is not the candidate application deadline. The actual online application window for candidates is 25 August 2026 to 7 September 2026.',
  },
  {
    question: 'Where can I find the official Punjab Clerk Recruitment 2026 notification PDF?',
    answer:
      'The official corrigendum PDF issued by the S.S.S. Board, Punjab is available for direct download on this page in the "Official Notification PDF" section above.',
  },
  {
    question: 'Which departments have Clerk vacancies under this recruitment?',
    answer:
      'Vacancies are spread across 29 Punjab Government departments and offices, including the Excise & Taxation Department (Field Offices) with 145 posts, Punjab State Agricultural Marketing Board with 90 posts, and the Office of Deputy Commissioner, Gurdaspur with 36 posts, among others. The complete department-wise list is provided in the table above.',
  },
  {
    question: 'What is Clerk Common Cadre in Punjab Government recruitment?',
    answer:
      'Common Cadre means that Clerk posts recruited under this advertisement are drawn from demand letters sent by multiple Punjab Government departments and offices, rather than being specific to a single department. Selected candidates can be posted to any of the departments listed in the vacancy annexure.',
  },
  {
    question: 'Where can I prepare for Punjab Clerk Recruitment 2026 in Chandigarh?',
    answer:
      'Elite Academy offers classroom coaching for Punjab Clerk and other Punjab government exams at its Chandigarh centre (SCO 144, Sector 24-D) and its Fatehgarh Sahib centre. Morning, evening and online batches are available. Call 7696954686 or 9988414686 for details.',
  },
  {
    question: 'Is an online batch available for Punjab Clerk exam preparation?',
    answer:
      'Yes. Elite Academy offers an online batch for Punjab Clerk Recruitment 2026 preparation in addition to classroom batches in Chandigarh and Fatehgarh Sahib, so candidates from anywhere in Punjab can join.',
  },
  {
    question: 'Are morning and evening batches available?',
    answer:
      'Yes, both morning and evening batch timings are available for the new Punjab Clerk preparation batch, so working candidates and students can choose a timing that fits their schedule.',
  },
  {
    question: 'How can I get a demo class for Punjab Clerk preparation?',
    answer:
      'Call 7696954686 or 9988414686 to ask about a demo class and get complete details of the new batch, timings and fee structure.',
  },
];

const tocItems = [
  { id: 'latest-update', title: 'Punjab Clerk Recruitment 2026 – Latest Update' },
  { id: 'vacancies', title: 'SSS Board Punjab Clerk Recruitment 2026 – 531 Vacancies' },
  { id: 'department-wise', title: 'Department-Wise Clerk Vacancies' },
  { id: 'category-wise', title: 'Category-Wise Vacancy Details' },
  { id: 'official-pdf', title: 'Official Notification PDF' },
  { id: 'important-dates', title: 'Important Dates' },
  { id: 'batch', title: 'Prepare With Elite Academy' },
  { id: 'faq', title: 'Frequently Asked Questions' },
];

const prepSubjects = [
  { icon: '🧠', label: 'Reasoning' },
  { icon: '📘', label: 'Punjab Grammar' },
  { icon: '🗺️', label: 'Punjabi GK' },
  { icon: '🇬🇧', label: 'English' },
  { icon: '💻', label: 'Computer' },
  { icon: '📰', label: 'Current Affairs' },
  { icon: '📖', label: 'All General Studies' },
  { icon: '🔢', label: 'Mathematics' },
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
    title: 'Punjabi & English Typing Course',
    path: '/punjabi-typing',
    description: 'Typing speed and accuracy training for Clerk and Senior Assistant posts — a key skill test stage for many Punjab government Clerk exams.',
  },
];

export default function PunjabClerkRecruitment2026() {
  const [copied, setCopied] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && lightboxImage) setLightboxImage(null);
    };
    if (lightboxImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [lightboxImage]);

  const canonicalUrl = getCanonicalUrl(`/blog/${SLUG}`);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${getCanonicalUrl('/')}${NOTICE_IMAGE}`,
    author: { '@type': 'Organization', name: 'Elite Academy' },
    publisher: { '@type': 'Organization', name: 'Elite Academy', url: getCanonicalUrl('/') },
    datePublished: '2026-08-21',
    dateModified: '2026-08-21',
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
    datePublished: '2026-08-21',
    dateModified: '2026-08-21',
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
        titleOverride="Punjab Clerk Recruitment 2026: 531 Vacancies, Dates & Notification PDF"
        descriptionOverride="Punjab Clerk Recruitment 2026: Check SSS Board Advertisement 02/2026, 531 Clerk vacancies, application dates, department-wise vacancies and official notification PDF."
        keywords={post.keywords.join(', ')}
        imageUrl={NOTICE_IMAGE}
        publishedTime="2026-08-21"
        modifiedTime="2026-08-21"
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
              <span className="text-slate-200">Punjab Clerk Recruitment 2026</span>
            </div>
          </nav>

          {/* Header */}
          <header className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_0.8fr] lg:items-start">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200">
                {post.heroBadge}
              </span>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Punjab Clerk Recruitment 2026: SSS Board Advertisement 02/2026, 531 Vacancies, Application Dates &amp; Official PDF
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span>By {post.author}</span>
                <span>•</span>
                <time dateTime="2026-08-21">Published: {post.date}</time>
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
                  href={PDF_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20"
                >
                  View Official Notification PDF
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20">
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setLightboxImage(NOTICE_IMAGE)}
                  style={{ cursor: 'zoom-in' }}
                  className="mx-auto flex w-full max-w-[460px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/10 bg-white p-3 shadow-lg shadow-black/20 transition hover:shadow-xl hover:shadow-black/30 sm:max-w-[420px] lg:max-w-[460px]"
                  aria-label="Open SSS Board Punjab Clerk notice image in full size"
                >
                  <img
                    src={NOTICE_IMAGE}
                    alt="SSS Board Punjab Clerk Recruitment 2026 Advertisement 02/2026 official corrigendum notice"
                    title="Punjab Clerk Recruitment 2026 — Official Corrigendum, S.S.S. Board Punjab"
                    loading="eager"
                    className="mx-auto h-auto w-full object-contain"
                  />
                </button>
                <p className="text-center text-sm text-slate-500">Click to view in full size</p>
                <p className="text-sm leading-6 text-slate-400">
                  Official corrigendum issued by S.S.S. Board, Punjab, Van Bhawan, Sector-68, Mohali, dated 21 August 2026.
                </p>
              </div>
            </div>
          </header>

          {/* Quick Summary */}
          <section
            className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
            aria-label="Recruitment details at a glance"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                Quick Summary
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Punjab Clerk Recruitment 2026 at a Glance
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

              {/* Punjab Clerk Preparation Subjects */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  Punjab Clerk Preparation Subjects
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  Prepare for the major subjects covered in Punjab Clerk exam preparation.
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
                    Want the complete syllabus and structured preparation?
                  </p>
                  <Link
                    to="/online-coaching"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 sm:text-base"
                  >
                    View Complete Syllabus &amp; Enroll Online →
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
                    The Subordinate Services Selection Board, Punjab (S.S.S. Board, Punjab), headquartered at Van
                    Bhawan, Sector-68, Mohali, issued a corrigendum on 21 August 2026 for the recruitment of Clerk
                    (Common Cadre) posts under Advertisement No. 02/2026. This is Punjab Clerk Recruitment 2026 —
                    a total of 531 Clerk vacancies drawn from demand letters received from various Punjab Government
                    departments.
                  </p>
                  <p>
                    The corrigendum reopens and clarifies the online application window: candidates can apply from
                    25 August 2026 to 7 September 2026, with fee payment also closing on 7 September 2026.
                    Candidates who already applied under Advertisement No. 02/2026 do not need to apply again.
                  </p>
                  <p>
                    This page explains the official notice in plain language, lists the complete department-wise
                    vacancy breakup from Annexure A, gives you direct access to the official PDF, and covers the
                    important dates you need to track. If you are preparing — or planning to prepare — for this
                    exam, this page also tells you where structured Clerk exam coaching is available in Chandigarh,
                    Fatehgarh Sahib and online.
                  </p>
                </div>
              </section>

              {/* Latest Update */}
              <section
                id="latest-update"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  Punjab Clerk Recruitment 2026 – Latest Update
                </h2>

                <div className="mt-6 rounded-2xl border border-blue-400/40 bg-blue-600/10 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                    Corrigendum — S.S.S. Board, Punjab, dated 21 August 2026
                  </p>
                  <p className="mt-3 leading-7 text-blue-50">
                    For the recruitment of Clerk (Common Cadre) posts, Advertisement No. 02/2026 was issued by
                    the Board. Para No. 1(ii) and the Note at Sr. No. 7(xi) — relating to demand letters/posts
                    received up to 30.09.2026 — has been withdrawn. Online applications for the posts advertised
                    under Advertisement No. 02/2026 will be invited from eligible candidates from 25/08/2026 to
                    07/09/2026, with the fee payment last date also 07/09/2026. Candidates who have already
                    applied under Advertisement No. 02/2026 do not need to apply again.
                  </p>
                </div>

                <div className="mt-6 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    In simple terms, this corrigendum does three things: it removes an earlier condition tied to
                    departments' demand letters, it opens a fresh online application window for new applicants
                    from 25 August to 7 September 2026, and it confirms that anyone who already submitted an
                    application under Advertisement No. 02/2026 is already in the process and does not need to
                    reapply.
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
                        Important Clarification: 30 September 2026 Is NOT the Application Deadline
                      </h3>
                      <div className="mt-3 space-y-3 leading-7 text-amber-100/80">
                        <p>
                          Many candidates are confusing the 30.09.2026 date mentioned in the corrigendum with the
                          application closing date. It is not. The 30.09.2026 reference relates only to the
                          withdrawal of a condition under Para 1(ii) and Note Sr. No. 7(xi) of Advertisement No.
                          02/2026 — a condition about demand letters/posts received by departments up to that
                          date. It has nothing to do with when candidates must submit their online application.
                        </p>
                        <p>
                          The actual candidate application window is <strong className="text-amber-200">25 August
                          2026 to 7 September 2026</strong>, with fee payment also due by 7 September 2026. Do not
                          wait until September end — the portal is expected to close on 7 September 2026.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA #1 */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">Preparing for Punjab Clerk Recruitment 2026?</strong> Our new
                  preparation batch starts Monday, with morning, evening and online options available. Call{' '}
                  <a href={`tel:+91${PHONE_PRIMARY}`} className="font-semibold text-blue-300 underline hover:text-blue-200">
                    {PHONE_PRIMARY}
                  </a>{' '}
                  or{' '}
                  <a href={`tel:+91${PHONE_SECONDARY}`} className="font-semibold text-blue-300 underline hover:text-blue-200">
                    {PHONE_SECONDARY}
                  </a>{' '}
                  for a demo.
                </p>
              </section>

              {/* Vacancies */}
              <section
                id="vacancies"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  SSS Board Punjab Clerk Recruitment 2026 – 531 Vacancies
                </h2>
                <div className="mt-6 rounded-2xl border border-blue-400/40 bg-blue-600/10 p-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                    Total Clerk (Common Cadre) Vacancies — Advertisement No. 02/2026
                  </p>
                  <p className="mt-4 text-5xl font-bold text-white">{TOTAL_VACANCIES}</p>
                  <p className="mt-2 text-lg font-medium text-blue-200">Posts</p>
                </div>
                <div className="mt-6 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    As per Annexure A of the official corrigendum, the S.S.S. Board, Punjab has consolidated
                    demand letters from 29 different Punjab Government departments and offices to advertise a
                    total of 531 Clerk (Common Cadre) posts. These vacancies are not concentrated in one
                    department — they are spread across field offices, head offices, Deputy Commissioner offices
                    and directorates across Punjab, which is why this is described as a "Common Cadre"
                    recruitment.
                  </p>
                  <p>
                    The largest single share comes from the Excise &amp; Taxation Department (Field Offices) with
                    145 posts, followed by the Punjab State Agricultural Marketing Board with 90 posts and the
                    Office of Deputy Commissioner, Gurdaspur with 36 posts. The complete department-wise list is
                    given below.
                  </p>
                </div>
              </section>

              {/* Department-wise table */}
              <section
                id="department-wise"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Department-Wise Clerk Vacancies</h2>
                <p className="mt-3 leading-7 text-slate-400">
                  The table below reproduces Annexure A of the official S.S.S. Board, Punjab corrigendum dated
                  21 August 2026, listing Clerk vacancies by department. Scroll horizontally on smaller screens
                  to view all columns.
                </p>

                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">
                          Sr. No.
                        </th>
                        <th className="border border-slate-700 px-4 py-3 font-semibold">
                          Department Name
                        </th>
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">
                          Total Posts
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentVacancies.map((row) => (
                        <tr key={row[0]} className="odd:bg-slate-900/50">
                          <td className="border border-slate-800 px-4 py-3 text-slate-300">{row[0]}</td>
                          <td className="border border-slate-800 px-4 py-3 text-slate-300">{row[1]}</td>
                          <td className="border border-slate-800 px-4 py-3 text-center font-semibold text-slate-200">
                            {row[2]}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-blue-600/10">
                        <td className="border border-slate-800 px-4 py-3" colSpan={2}>
                          <span className="font-semibold text-blue-200">Grand Total</span>
                        </td>
                        <td className="border border-slate-800 px-4 py-3 text-center text-lg font-bold text-blue-200">
                          {TOTAL_VACANCIES}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  Source: Annexure A, official S.S.S. Board, Punjab corrigendum dated 21 August 2026, Advertisement
                  No. 02/2026 (Clerk – Common Cadre).
                </p>
              </section>

              {/* CTA #2 */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">531 vacancies make this an important opportunity</strong> for
                  Punjab government job aspirants. Start structured preparation with our new Clerk preparation
                  batch — Chandigarh, Fatehgarh Sahib and online options available. Call{' '}
                  <a href={`tel:+91${PHONE_PRIMARY}`} className="font-semibold text-blue-300 underline hover:text-blue-200">
                    {PHONE_PRIMARY}
                  </a>.
                </p>
              </section>

              {/* Category-wise */}
              <section
                id="category-wise"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Category-Wise Vacancy Details</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    The official documents released alongside the corrigendum include a reservation category code
                    list used for this recruitment — covering General, EWS, S.C. (Mazhabi &amp; Balmiki and
                    Ramdasia &amp; others), B.C., Ex-Servicemen (ESM), Sports, Physically Handicapped and Freedom
                    Fighter categories. The table below reproduces this category code list exactly as published.
                  </p>
                  <p className="text-sm text-slate-400">
                    Note: the officially released documents give the 531-post total broken down department-wise
                    (Annexure A, shown above) and this list of applicable reservation category codes. A
                    department-wise x category-wise numeric cross-tabulation was not part of the released
                    document — candidates should verify the exact category-wise breakup for each department from
                    the official online application portal or the full PDF at the time of applying.
                  </p>
                </div>

                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">
                          Sr. No.
                        </th>
                        <th className="border border-slate-700 px-4 py-3 font-semibold">Category</th>
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">
                          Code
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryCodes.map((row) => (
                        <tr key={row[0]} className="odd:bg-slate-900/50">
                          <td className="border border-slate-800 px-4 py-3 text-slate-300">{row[0]}</td>
                          <td className="border border-slate-800 px-4 py-3 text-slate-300">{row[1]}</td>
                          <td className="border border-slate-800 px-4 py-3 text-center font-semibold text-slate-200">
                            {row[2]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setLightboxImage(CATEGORY_IMAGE)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    View Category Code Table Image
                  </button>
                </div>
              </section>

              {/* Official PDF */}
              <section
                id="official-pdf"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  Official Punjab Clerk Recruitment 2026 Notification PDF
                </h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    For the complete and authoritative details of Advertisement No. 02/2026 and this corrigendum
                    — including full eligibility conditions, the complete Annexure A vacancy table and all
                    official instructions — always refer to the official S.S.S. Board, Punjab notification PDF.
                    This page summarizes the official notice, but the PDF remains the source of truth.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                  >
                    View Official Notification PDF
                  </a>
                </div>
              </section>

              {/* Important Dates */}
              <section
                id="important-dates"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Punjab Clerk Recruitment 2026 Important Dates</h2>
                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className="border border-slate-700 px-4 py-3 font-semibold">Event</th>
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">
                          Date
                        </th>
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
                  The 30.09.2026 date mentioned in the corrigendum relates to withdrawal of a condition on
                  departments' demand letters, not the candidate application deadline. See the "Latest Update"
                  section above for the full clarification.
                </p>
              </section>

              {/* CTA #3 */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">Know the notification. Now prepare for the exam.</strong> Our
                  new batch starts Monday with morning, evening and online options. Call{' '}
                  <a href={`tel:+91${PHONE_PRIMARY}`} className="font-semibold text-blue-300 underline hover:text-blue-200">
                    {PHONE_PRIMARY}
                  </a>{' '}
                  for a demo.
                </p>
              </section>

              {/* Batch / Elite Academy CTA */}
              <section
                id="batch"
                className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  Prepare for Punjab Clerk Recruitment 2026 With Elite Academy
                </h2>
                <p className="mt-3 max-w-2xl leading-8 text-slate-300">
                  With 531 Clerk vacancies now open across 29 departments, competition will be high. A new Punjab
                  Clerk preparation batch is starting Monday at Elite Academy — designed around the subjects and
                  paper pattern typically followed in Punjab government Clerk exams, with structured, exam-focused
                  preparation rather than last-minute cramming.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                    <h3 className="font-semibold text-white">Classroom Batches</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      <li>
                        <a href={CHANDIGARH_MAPS} target="_blank" rel="noreferrer" className="text-blue-300 underline hover:text-blue-200">
                          Chandigarh Centre — SCO 144, Sector 24-D
                        </a>
                      </li>
                      <li>
                        <a href={FATEHGARH_MAPS} target="_blank" rel="noreferrer" className="text-blue-300 underline hover:text-blue-200">
                          Fatehgarh Sahib Centre
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                    <h3 className="font-semibold text-white">Batch Timings</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      <li>Morning batch</li>
                      <li>Evening batch</li>
                      <li>Online batch (available across Punjab)</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-base leading-7 text-slate-200">
                    <strong className="text-white">New batch starts Monday.</strong> Structured preparation,
                    practice sets, mock tests and revision guidance for Punjab Clerk Recruitment 2026. Call{' '}
                    <a href={`tel:+91${PHONE_PRIMARY}`} className="font-semibold text-blue-300 underline hover:text-blue-200">
                      {PHONE_PRIMARY}
                    </a>{' '}
                    or{' '}
                    <a href={`tel:+91${PHONE_SECONDARY}`} className="font-semibold text-blue-300 underline hover:text-blue-200">
                      {PHONE_SECONDARY}
                    </a>{' '}
                    for a demo and complete batch details.
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
                  Practice for Punjab Clerk Recruitment on the Elite Academy App
                </h2>
                <p className="mt-3 leading-8 text-slate-300">
                  Alongside the classroom and online batch, the Elite Academy app gives you Punjab government exam
                  mock tests and practice resources on your phone — useful for revising general knowledge,
                  reasoning, arithmetic and Punjabi language topics commonly tested in Clerk-level exams.
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
                  Preparing for Punjab Clerk Recruitment 2026? Start your preparation now.
                </h2>
                <p className="mx-auto mt-3 max-w-2xl leading-8 text-slate-200">
                  New batch starting Monday. Morning batch, evening batch, Chandigarh classroom, Fatehgarh Sahib
                  classroom and online batch — all available.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`tel:+91${PHONE_PRIMARY}`}
                    className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                  >
                    Call {PHONE_PRIMARY} for a Demo
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
                  <span className="font-semibold text-slate-400">Last updated:</span> 21 August 2026, based on
                  the official S.S.S. Board, Punjab corrigendum. This page will be updated as further official
                  information is released.
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
                  <a href={PDF_URL} target="_blank" rel="noreferrer" className="block hover:text-blue-300">
                    Official Notification PDF →
                  </a>
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
                <h2 className="text-lg font-semibold text-white">New Batch Starts Monday</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Chandigarh · Fatehgarh Sahib · Online. Morning &amp; evening timings.
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
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
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
              src={lightboxImage}
              alt="Punjab Clerk Recruitment 2026 official document"
              className="h-auto w-auto object-contain"
              style={{ maxWidth: '95vw', maxHeight: '90vh' }}
            />
            <div className="mt-6 text-center text-sm text-slate-300 sm:mt-8">
              <p className="font-semibold text-white">Official Document — S.S.S. Board, Punjab</p>
              <p className="mt-1 text-slate-400">Van Bhawan, Sector-68, Mohali</p>
              <p className="mt-1 text-slate-500">Released on 21 August 2026</p>
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
