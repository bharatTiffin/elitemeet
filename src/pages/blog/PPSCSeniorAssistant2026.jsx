import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';
import { getBreadcrumbSchema, getFaqSchema, getOrganizationSchema } from '../../config/structuredData';
import { getCanonicalUrl } from '../../config/publicSeo';

const SLUG = 'ppsc-senior-assistant-exam-date-2026';
const HERO_IMAGE = '/ppsc-senior-assistant-exam-date-2026.jpeg';

const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.johnnykhore.eliteacademy&hl=en_IN';
const IOS_APP_URL = 'https://apps.apple.com/in/app/elite-academy-mock-tests/id6746954938';

const post = {
  slug: SLUG,
  title:
    'PPSC Senior Assistant Exam Date 2026 Out | 15 November Schedule, Admit Card & Latest Update',
  description:
    'PPSC has officially announced the Senior Assistant Exam Date 2026 as 15 November 2026 (Sunday), 11:00 AM to 1:00 PM — covering Advt. No. 202229 to 202236 across 8 Punjab Government departments. PPSC Peon exam scheduled for 20 December 2026. Admit card, exam centre details and complete schedule.',
  date: '14 August 2026',
  updatedDate: '14 August 2026',
  readingTime: '8 min read',
  author: 'Elite Academy Editorial Team',
  category: 'PPSC Exam Update',
  heroBadge: 'Exam Date Announced',
  heroImageAlt:
    'Punjab Public Service Commission PPSC Senior Assistant Exam Date 2026 official public notice dated 14 August 2026',
  heroImageTitle:
    'PPSC Senior Assistant Exam Date 2026 — Official Public Notice, Punjab Public Service Commission Patiala',
  heroImageCaption:
    'Official public notice issued by the Punjab Public Service Commission, Baradari Gardens, Patiala, dated 14 August 2026.',
  keywords: [
    'PPSC Senior Assistant Exam Date 2026',
    'PPSC Senior Assistant Exam Schedule 2026',
    'PPSC Senior Assistant Exam 15 November 2026',
    'PPSC Senior Assistant Exam Time 2026',
    'PPSC Senior Assistant Admit Card 2026',
    'PPSC Peon Exam Date 2026',
    'PPSC Peon Exam 20 December 2026',
    'Punjab PSC Senior Assistant Exam Date 2026',
    'PPSC Exam Date November 2026',
    'PPSC Senior Assistant Recruitment 2026',
    'Punjab Public Service Commission Senior Assistant',
  ],
  tags: [
    'PPSC Senior Assistant Exam Date 2026',
    'PPSC Exam Schedule November 2026',
    'PPSC Peon Exam December 2026',
    'Punjab Public Service Commission 2026',
  ],
};

const quickSummaryItems = [
  { label: 'Exam', value: 'PPSC Senior Assistant', highlight: false },
  { label: 'Exam Date', value: '15 November 2026', highlight: true },
  { label: 'Day', value: 'Sunday', highlight: false },
  { label: 'Exam Time', value: '11:00 AM – 1:00 PM', highlight: false },
  { label: 'Advt. Nos.', value: '202229 – 202236', highlight: false },
  { label: 'Departments', value: '8 Punjab Govt. Depts.', highlight: false },
  { label: 'PPSC Peon Exam', value: '20 December 2026', highlight: false },
  { label: 'Notice Date', value: '14 August 2026', highlight: false },
];

const tableData = [
  [
    '202229',
    'Senior Assistant',
    'School Education (Head Office), Govt. of Punjab',
    '15 Nov 2026',
    '11:00 AM – 1:00 PM',
  ],
  [
    '202230',
    'Senior Assistant',
    'School Education (Subordinate Offices), Govt. of Punjab',
    '15 Nov 2026',
    '11:00 AM – 1:00 PM',
  ],
  [
    '202231',
    'Senior Assistant',
    'Water Supply & Sanitation, Govt. of Punjab',
    '15 Nov 2026',
    '11:00 AM – 1:00 PM',
  ],
  [
    '202232',
    'Senior Assistant',
    'Public Works, Govt. of Punjab',
    '15 Nov 2026',
    '11:00 AM – 1:00 PM',
  ],
  [
    '202233',
    'Senior Assistant',
    'Prosecution and Litigation, Govt. of Punjab',
    '15 Nov 2026',
    '11:00 AM – 1:00 PM',
  ],
  [
    '202234',
    'Senior Assistant',
    'Excise & Taxation, Govt. of Punjab',
    '15 Nov 2026',
    '11:00 AM – 1:00 PM',
  ],
  [
    '202235',
    'Senior Assistant',
    'Rural Development & Panchayat, Govt. of Punjab',
    '15 Nov 2026',
    '11:00 AM – 1:00 PM',
  ],
  [
    '202236',
    'Senior Assistant',
    'Revenue, Rehabilitation & Disaster Management (FC Secretariat), Govt. of Punjab',
    '15 Nov 2026',
    '11:00 AM – 1:00 PM',
  ],
];

const faqs = [
  {
    question: 'What is the PPSC Senior Assistant Exam Date 2026?',
    answer:
      'The PPSC Senior Assistant Exam Date 2026 is 15 November 2026, a Sunday. The exam is scheduled from 11:00 AM to 1:00 PM. This applies to all eight Senior Assistant advertisements from Advt. No. 202229 to 202236.',
  },
  {
    question: 'Which departments are covered in the PPSC Senior Assistant exam on 15 November 2026?',
    answer:
      'The 15 November 2026 exam covers Senior Assistant posts in: School Education (Head Office), School Education (Subordinate Offices), Water Supply & Sanitation, Public Works, Prosecution and Litigation, Excise & Taxation, Rural Development & Panchayat, and Revenue, Rehabilitation & Disaster Management (Financial Commissioner Secretariat) — all under the Government of Punjab.',
  },
  {
    question: 'What is the PPSC Senior Assistant exam time?',
    answer:
      'The PPSC Senior Assistant exam time is 11:00 AM to 1:00 PM on 15 November 2026. The exam duration is 2 hours.',
  },
  {
    question: 'What is the PPSC Peon Exam Date 2026?',
    answer:
      'The PPSC Peon (Group-D) exam date is 20 December 2026, a Sunday. The exam is scheduled from 11:00 AM to 1:00 PM under Advt. No. 20242, for vacancies in the Punjab Public Service Commission, Government of Punjab.',
  },
  {
    question: 'When will the PPSC Senior Assistant Admit Card 2026 be released?',
    answer:
      'The official PPSC public notice states that admit cards will be uploaded approximately 7 days before the exam. For the Senior Assistant exam on 15 November 2026, admit cards are expected around 8 November 2026. For the Peon exam on 20 December 2026, around 13 December 2026. These are approximate timelines — actual dates may vary. Keep checking ppsc.gov.in for confirmation.',
  },
  {
    question: 'How can I download the PPSC Senior Assistant Admit Card 2026?',
    answer:
      'Candidates can download their admit card from the official PPSC website at ppsc.gov.in using their Registration Number and Password. The admit card link will be available in the relevant recruitment section once uploaded.',
  },
  {
    question: 'Where will PPSC Senior Assistant exam centre details be available?',
    answer:
      'The exam centre name, address, reporting time and venue will all be mentioned in the admit card. PPSC has not released separate exam centre information — all such details will be communicated through the admit card only.',
  },
  {
    question: 'Is the PPSC Senior Assistant Exam Date 2026 confirmed or tentative?',
    answer:
      "The official PPSC public notice dated 14 August 2026 describes the schedule as tentative. The notice clearly states that dates, times and other details are liable to alteration if circumstances so warrant. Candidates should keep checking ppsc.gov.in for any revisions.",
  },
  {
    question: 'What is the difference between PPSC and PSSSB?',
    answer:
      'PPSC (Punjab Public Service Commission) and PSSSB (Punjab Subordinate Services Selection Board) are two separate recruitment bodies. PPSC, headquartered at Baradari Gardens, Patiala, conducts recruitment for various Punjab Government posts. PSSSB handles subordinate services recruitment. The Senior Assistant and Peon posts mentioned in this article are under PPSC.',
  },
  {
    question: 'What should candidates do now that the PPSC Senior Assistant Exam Date 2026 is announced?',
    answer:
      'Candidates should: (1) note the exam date — 15 November 2026; (2) begin or intensify preparation immediately; (3) keep their Registration Number and Password ready for admit card download; (4) regularly visit ppsc.gov.in for updates; and (5) check the admit card once released for exam centre, reporting time and instructions.',
  },
];

const tocItems = [
  { id: 'exam-date', title: 'PPSC Senior Assistant Exam Date 2026' },
  { id: 'exam-schedule', title: 'Department-Wise Exam Schedule' },
  { id: 'peon-exam', title: 'PPSC Peon Exam Date 2026' },
  { id: 'admit-card', title: 'PPSC Admit Card 2026' },
  { id: 'exam-centre', title: 'Exam Centre and Reporting' },
  { id: 'disclaimer', title: 'Important Notice: Schedule May Change' },
  { id: 'preparation', title: 'How to Prepare for PPSC Senior Assistant' },
  { id: 'elite-academy', title: 'Prepare With Elite Academy' },
  { id: 'faq', title: 'Frequently Asked Questions' },
];

const relatedLinks = [
  {
    title: 'PSSSB Coaching',
    path: '/psssb-coaching',
    description:
      'Structured preparation for PSSSB aspirants — live classes, PYQs and mock tests for Punjab subordinate services.',
  },
  {
    title: 'Test Series',
    path: '/test-series',
    description:
      'Daily mock tests for Punjab government exams with subject-wise and full-length tests, plus performance analysis.',
  },
  {
    title: 'Weekly Tests',
    path: '/weekly-test',
    description:
      'Weekly mock tests for Punjab exams with detailed solutions, analytics and performance tracking.',
  },
  {
    title: 'Online Coaching',
    path: '/online-coaching',
    description:
      'Online Punjab government exam coaching — live classes, recorded lectures, mock tests and study material.',
  },
];

export default function PPSCSeniorAssistant2026() {
  const [copied, setCopied] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isLightboxOpen) setIsLightboxOpen(false);
    };
    if (isLightboxOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isLightboxOpen]);

  const canonicalUrl = getCanonicalUrl(`/blog/${SLUG}`);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${getCanonicalUrl('/')}${HERO_IMAGE}`,
    author: { '@type': 'Organization', name: 'Elite Academy' },
    publisher: { '@type': 'Organization', name: 'Elite Academy', url: getCanonicalUrl('/') },
    datePublished: '2026-08-14',
    dateModified: '2026-08-14',
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
    datePublished: '2026-08-14',
    dateModified: '2026-08-14',
    breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
  };

  const faqSchema = getFaqSchema(faqs);
  const breadcrumbSchema = getBreadcrumbSchema(`/blog/${SLUG}`, post.title);
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
        titleOverride={post.title}
        descriptionOverride={post.description}
        keywords={post.keywords.join(', ')}
        imageUrl={HERO_IMAGE}
        publishedTime="2026-08-14"
        modifiedTime="2026-08-14"
        author={post.author}
        publisher="Elite Academy"
        article
        section={post.category}
        tags={post.tags}
        extraSchema={[articleSchema, breadcrumbSchema, faqSchema, webPageSchema, organizationSchema].filter(
          Boolean
        )}
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
              <span className="text-slate-200">PPSC Senior Assistant Exam Date 2026</span>
            </div>
          </nav>

          {/* Header */}
          <header className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr] lg:items-start">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200">
                {post.heroBadge}
              </span>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span>By {post.author}</span>
                <span>•</span>
                <time dateTime="2026-08-14">Published: {post.date}</time>
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
                  href="https://ppsc.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20"
                >
                  Official PPSC Website
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20">
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  style={{ cursor: 'zoom-in' }}
                  className="mx-auto flex w-full max-w-[460px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/10 bg-white p-3 shadow-lg shadow-black/20 transition hover:shadow-xl hover:shadow-black/30 sm:max-w-[420px] lg:max-w-[460px]"
                  aria-label="Open PPSC notice image in full size"
                >
                  <img
                    src={HERO_IMAGE}
                    alt={post.heroImageAlt}
                    title={post.heroImageTitle}
                    loading="eager"
                    className="mx-auto h-auto w-full object-contain"
                  />
                </button>
                <p className="text-center text-sm text-slate-500">Click to view in full size</p>
                <p className="text-sm leading-6 text-slate-400">{post.heroImageCaption}</p>
              </div>
            </div>
          </header>

          {/* Quick Summary */}
          <section
            className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
            aria-label="Exam details at a glance"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                Quick Summary
              </p>
              <h2 className="text-2xl font-semibold text-white">
                PPSC Senior Assistant Exam Date 2026 at a Glance
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
          <div className="grid gap-10 lg:grid-cols-[1.8fr_0.8fr]">

            {/* Article */}
            <article className="space-y-8">

              {/* Table of Contents (shown above content on all screen sizes) */}
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

              {/* Introduction */}
              <section
                id="introduction"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Introduction</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    The Punjab Public Service Commission (PPSC) issued a public notice on 14 August 2026
                    announcing the tentative examination schedule for November and December 2026. The notice
                    covers Senior Assistant vacancies across eight Punjab Government departments and the
                    Peon (Group-D) post within PPSC itself.
                  </p>
                  <p>
                    If you applied for any Senior Assistant advertisement from Advt. No. 202229 to 202236,
                    the exam date is 15 November 2026, Sunday, from 11:00 AM to 1:00 PM. Candidates who
                    applied for the Peon (Group-D) post under Advt. No. 20242 have their exam on
                    20 December 2026 at the same time.
                  </p>
                  <p>
                    This page covers everything officially announced in the PPSC notice — exam date, time,
                    department-wise schedule, admit card release timeline, exam centre policy, and the
                    important disclaimer from PPSC about possible schedule changes.
                  </p>
                </div>
              </section>

              {/* Exam Date — Main Announcement */}
              <section
                id="exam-date"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  PPSC Senior Assistant Exam Date 2026
                </h2>

                {/* Big date callout */}
                <div className="mt-6 rounded-2xl border border-blue-400/40 bg-blue-600/10 p-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                    Official Exam Date — Source: PPSC Public Notice, 14 August 2026
                  </p>
                  <p className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                    15 November 2026
                  </p>
                  <p className="mt-2 text-xl font-medium text-blue-200">Sunday</p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <span className="rounded-full bg-blue-600/20 px-5 py-2 text-base font-semibold text-blue-100">
                      11:00 AM
                    </span>
                    <span className="text-slate-400">to</span>
                    <span className="rounded-full bg-blue-600/20 px-5 py-2 text-base font-semibold text-blue-100">
                      1:00 PM
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    All eight Senior Assistant recruitment advertisements — Advt. No. 202229 to 202236
                    — fall under this single exam date. Regardless of which department you applied for,
                    your exam is on 15 November 2026, and the timing is the same across all eight
                    advertisements.
                  </p>
                  <p>
                    The exam window is 2 hours. Candidates should plan their exam-day travel with the
                    11:00 AM start time in mind. Reporting time will be mentioned in the admit card — it
                    is typically 30 minutes before the exam starts.
                  </p>
                </div>
              </section>

              {/* Department-wise table */}
              <section
                id="exam-schedule"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  PPSC Senior Assistant Exam Schedule — Department-Wise Details
                </h2>
                <p className="mt-3 leading-7 text-slate-400">
                  The table below lists all eight Senior Assistant advertisements included in the
                  15 November 2026 examination, as published in the official PPSC public notice dated
                  14 August 2026.
                </p>

                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">
                          Advt. No.
                        </th>
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">
                          Post
                        </th>
                        <th className="border border-slate-700 px-4 py-3 font-semibold">
                          Department
                        </th>
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">
                          Exam Date
                        </th>
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">
                          Exam Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={row[0]} className="odd:bg-slate-900/50">
                          {row.map((cell, cellIndex) => (
                            <td
                              key={`${index}-${cellIndex}`}
                              className="border border-slate-800 px-4 py-3 text-slate-300"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  Source: Punjab Public Service Commission, official public notice dated 14 August 2026.
                  Schedule is tentative and may be revised.
                </p>
              </section>

              {/* Peon Exam Section */}
              <section
                id="peon-exam"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">PPSC Peon Exam Date 2026</h2>
                <p className="mt-3 leading-8 text-slate-300">
                  The same PPSC public notice dated 14 August 2026 also announces the exam date for the
                  Peon (Group-D) post under Advt. No. 20242.
                </p>

                <div className="mt-6 rounded-2xl border border-indigo-400/30 bg-indigo-600/10 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                    PPSC Peon (Group-D) Exam — Official Schedule
                  </p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Advertisement No.
                      </p>
                      <p className="mt-1 text-xl font-bold text-white">20242</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Post
                      </p>
                      <p className="mt-1 text-xl font-bold text-white">Peon (Group-D)</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Exam Date
                      </p>
                      <p className="mt-1 text-2xl font-bold text-indigo-300">20 December 2026</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Day &amp; Time
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        Sunday, 11:00 AM – 1:00 PM
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Department
                      </p>
                      <p className="mt-1 text-base font-medium text-slate-200">
                        Punjab Public Service Commission, Government of Punjab
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-4 leading-8 text-slate-300">
                  <p>
                    Candidates who applied for the Peon (Group-D) post should note 20 December 2026 as
                    their exam date. The post is within PPSC itself — selected candidates would be
                    posted in the Punjab Public Service Commission office.
                  </p>
                  <p>
                    The admit card for the Peon exam is expected approximately 7 days before the exam
                    date, meaning around 13 December 2026. Candidates should keep checking ppsc.gov.in
                    for updates.
                  </p>
                </div>
              </section>

              {/* Admit Card */}
              <section
                id="admit-card"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">PPSC Admit Card 2026</h2>

                <h3 className="mt-6 text-lg font-semibold text-white">
                  When Will PPSC Admit Cards Be Released?
                </h3>
                <p className="mt-3 leading-8 text-slate-300">
                  According to the official PPSC public notice, admit cards will be uploaded
                  approximately 7 days before the examination date. Based on this:
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Senior Assistant Exam
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">Exam: 15 November 2026</p>
                    <p className="mt-1 text-sm font-medium text-blue-300">
                      Admit Card Expected: ~8 November 2026
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Peon (Group-D) Exam
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">Exam: 20 December 2026</p>
                    <p className="mt-1 text-sm font-medium text-indigo-300">
                      Admit Card Expected: ~13 December 2026
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  These are approximate timelines based on the 7-day window mentioned in the notice.
                  Actual release dates may vary. Always confirm from ppsc.gov.in.
                </p>

                <h3 className="mt-8 text-lg font-semibold text-white">
                  How to Download PPSC Admit Card
                </h3>
                <ol className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  {[
                    <>
                      Visit the official PPSC website at{' '}
                      <a
                        href="https://ppsc.gov.in"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-300 underline hover:text-blue-200"
                      >
                        ppsc.gov.in
                      </a>
                    </>,
                    'Navigate to the Admit Card or Examination section for your recruitment (Senior Assistant or Peon)',
                    'Enter your Registration Number and Password',
                    'Download and print your admit card',
                    'Check all details carefully before the exam day',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-sm font-bold text-blue-300">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <h3 className="mt-8 text-lg font-semibold text-white">
                  What to Check on Your Admit Card
                </h3>
                <ul className="mt-4 list-inside list-disc space-y-2 text-slate-300">
                  <li>Candidate name and photograph</li>
                  <li>Registration number and application details</li>
                  <li>Exam date, time, and session</li>
                  <li>Exam centre name and complete address</li>
                  <li>Reporting time (may be earlier than exam start time)</li>
                  <li>Items permitted and prohibited in the examination hall</li>
                  <li>Any special instructions from PPSC</li>
                </ul>
              </section>

              {/* Exam Centre */}
              <section
                id="exam-centre"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  Exam Centre and Reporting Details
                </h2>
                <div className="mt-4 space-y-4 leading-8 text-slate-300">
                  <p>
                    PPSC has not published exam centre information separately. The official notice
                    clearly states that information regarding examination centres, reporting time, and
                    venue will be mentioned in the admit card.
                  </p>
                  <p>
                    Do not rely on any unofficial or third-party source for exam centre details. The
                    admit card is the only authoritative document for this information. Once you download
                    your admit card, verify the exam centre address immediately.
                  </p>
                  <p>
                    If the exam centre is in a different city, plan your travel early. For an 11:00 AM
                    exam, most centres require candidates to report by 10:00–10:30 AM. Last-minute
                    travel is always risky.
                  </p>
                </div>
              </section>

              {/* Disclaimer */}
              <section
                id="disclaimer"
                className="rounded-3xl border border-amber-400/30 bg-amber-500/5 p-6 shadow-xl shadow-black/20"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10">
                    <svg
                      className="h-5 w-5 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-amber-300">
                      Important Notice: Schedule May Change
                    </h2>
                    <div className="mt-3 space-y-3 leading-7 text-amber-100/80">
                      <p>The official PPSC public notice explicitly states:</p>
                      <blockquote className="border-l-2 border-amber-400/50 pl-4 italic text-amber-200">
                        "The date, time and other details of examinations are liable to alteration if
                        circumstances so warrant."
                      </blockquote>
                      <p>
                        The schedule announced on 14 August 2026 is tentative. While the dates come from
                        an official PPSC source, they may be revised. Candidates should regularly check
                        the official PPSC website at{' '}
                        <a
                          href="https://ppsc.gov.in"
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-amber-300 underline hover:text-amber-200"
                        >
                          ppsc.gov.in
                        </a>{' '}
                        for any updates before the examination.
                      </p>
                      <p>
                        This page will be updated whenever PPSC releases further information —
                        including revised schedule, admit card notice, exam centre details or any
                        official communication.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Preparation */}
              <section
                id="preparation"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  How to Prepare for PPSC Senior Assistant Exam 2026
                </h2>
                <div className="mt-4 space-y-4 leading-8 text-slate-300">
                  <p>
                    The exam is on 15 November 2026. From the notice date — 14 August 2026 — that is
                    roughly three months. Three months is enough time if preparation starts now, not
                    next week.
                  </p>
                  <p>
                    Here is a practical, step-by-step approach:
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      step: 'Get the official syllabus',
                      detail:
                        'Visit ppsc.gov.in and check the syllabus and exam pattern for the relevant Senior Assistant advertisement. Prepare only what is officially prescribed — do not waste time on topics outside the syllabus.',
                    },
                    {
                      step: 'Cover each subject systematically',
                      detail:
                        'Punjab government exam papers typically cover General Knowledge and Current Affairs, Reasoning and Mental Ability, Arithmetic, English, and Punjabi language. Go topic by topic, revise before moving to the next, and do not jump between unrelated areas.',
                    },
                    {
                      step: 'Practise with previous year PPSC papers',
                      detail:
                        'Previous year question papers reveal the actual difficulty level and question style. Solve them under timed conditions — do not just read through the answers. Identify patterns in the questions that appear repeatedly.',
                    },
                    {
                      step: 'Start mock tests from at least 6 weeks before the exam',
                      detail:
                        'Mock tests show you where you stand and build exam-day confidence. Take at least one full-length timed mock per week starting from the first week of October. After each test, review every wrong answer — that review is what improves your score.',
                    },
                    {
                      step: 'Manage the final 2 weeks before the exam',
                      detail:
                        'Once the admit card is released (around 8 November), shift to revision — not new topics. Confirm your exam centre, plan travel, and keep all documents ready at least 2 days before the exam. Reaching the centre with 20 minutes to spare is the correct target.',
                    },
                  ].map(({ step, detail }) => (
                    <div
                      key={step}
                      className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                    >
                      <h3 className="font-semibold text-white">{step}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Elite Academy CTA */}
              <section
                id="elite-academy"
                className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  Prepare for the PPSC Exam With Elite Academy
                </h2>
                <p className="mt-3 max-w-2xl leading-8 text-slate-300">
                  Elite Academy helps Punjab government exam aspirants prepare through online coaching,
                  mock tests, weekly tests, sectional practice, previous year papers, and study material.
                  Our test series are built around the patterns followed in Punjab competitive
                  examinations — designed for candidates who want structured, consistent preparation
                  rather than last-minute cramming.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    'Mock Tests',
                    'Weekly Tests',
                    'Sectional Practice',
                    'PYQs',
                    'Online Classes',
                    'Recorded Lectures',
                    'Study Material',
                    'Mentorship',
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/online-coaching"
                    className="rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-500"
                  >
                    Join Online Coaching
                  </Link>
                  <Link
                    to="/test-series"
                    className="rounded-full border border-white/10 px-5 py-2.5 font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Explore Test Series
                  </Link>
                  <Link
                    to="/books"
                    className="rounded-full border border-white/10 px-5 py-2.5 font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Study Books
                  </Link>
                </div>
              </section>

              {/* App Download CTA */}
              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <h2 className="text-xl font-semibold text-white">
                  Practice for PPSC on the Elite Academy App
                </h2>
                <p className="mt-3 leading-8 text-slate-300">
                  Don't wait until the last few weeks to start practising. The Elite Academy app gives
                  you access to Punjab government exam mock tests and practice resources on your phone
                  — so you can practise anywhere, build speed, and track your performance consistently
                  before the 15 November exam.
                </p>
                <p className="mt-3 leading-8 text-slate-300">
                  Regular mock tests help you understand exactly where you stand, identify weak topics
                  early, and build the time management skills that matter on exam day.
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
                <h2 className="text-2xl font-semibold text-white">
                  Frequently Asked Questions
                </h2>
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

              {/* Last updated */}
              <div className="rounded-2xl border border-white/5 bg-slate-900/30 px-6 py-4 text-sm text-slate-500">
                <p>
                  <span className="font-semibold text-slate-400">Last updated:</span> 14 August 2026.
                  This page will be updated when PPSC releases admit card details, exam centre
                  information, a revised schedule, or any further official notice.
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
                  <a
                    href="https://ppsc.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="block hover:text-blue-300"
                  >
                    Official PPSC Website →
                  </a>
                  <Link to="/online-coaching" className="block hover:text-blue-300">
                    Online Coaching →
                  </Link>
                  <Link to="/test-series" className="block hover:text-blue-300">
                    Test Series →
                  </Link>
                  <Link to="/weekly-test" className="block hover:text-blue-300">
                    Weekly Tests →
                  </Link>
                  <Link to="/sectional-test-series" className="block hover:text-blue-300">
                    Sectional Test Series →
                  </Link>
                  <Link to="/books" className="block hover:text-blue-300">
                    Study Books →
                  </Link>
                  <Link to="/monthly-current-affairs" className="block hover:text-blue-300">
                    Monthly Current Affairs →
                  </Link>
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

              {/* Sidebar App CTA */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <h2 className="text-lg font-semibold text-white">Practice on Your Phone</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Mock tests and practice for Punjab government exams, anytime.
                </p>
                <div className="mt-4 space-y-2">
                  <a
                    href={ANDROID_APP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Android App
                  </a>
                  <a
                    href={IOS_APP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    iPhone App
                  </a>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            className="relative flex flex-col items-center justify-center px-4 py-4 sm:py-6 lg:py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={HERO_IMAGE}
              alt={post.heroImageAlt}
              className="h-auto w-auto object-contain"
              style={{ maxWidth: '95vw', maxHeight: '90vh' }}
            />
            <div className="mt-6 text-center text-sm text-slate-300 sm:mt-8">
              <p className="font-semibold text-white">Official Public Notice — PPSC</p>
              <p className="mt-1 text-slate-400">Punjab Public Service Commission, Patiala</p>
              <p className="mt-1 text-slate-500">Released on 14 August 2026</p>
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
