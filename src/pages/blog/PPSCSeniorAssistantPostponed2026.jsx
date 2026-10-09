import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';
import { getFaqSchema, getOrganizationSchema } from '../../config/structuredData';
import { getCanonicalUrl } from '../../config/publicSeo';

const SLUG = 'ppsc-senior-assistant-exam-postponed-2026';
const NOTICE_IMAGE = '/ppsc-senior-assistant-postponed.jpeg';

const PHONE_PRIMARY = '7696954686';
const PHONE_SECONDARY = '9988414686';

const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.johnnykhore.eliteacademy&hl=en_IN';
const IOS_APP_URL = 'https://apps.apple.com/in/app/elite-academy-mock-tests/id6746954938';

const TITLE =
  'PPSC Senior Assistant Exam Postponed: New Exam Date 17 January 2027 (Advt. 202229 to 202236) | Revised Schedule & Latest Update';

const post = {
  slug: SLUG,
  title: TITLE,
  description:
    'PPSC has postponed the Senior Assistant exam (Advt. No. 202229 to 202236) from 15 November 2026 due to administrative reasons. The new PPSC Senior Assistant exam date is 17 January 2027 (Sunday), 12:00 Noon to 2:00 PM. Read the official notice dated 9 October 2026, what changes for candidates, admit card update and how to use the extra time.',
  date: '9 October 2026',
  updatedDate: '9 October 2026',
  readingTime: '7 min read',
  author: 'Elite Academy Editorial Team',
  category: 'PPSC Exam Update',
  heroBadge: 'Exam Postponed: New Date 17 Jan 2027',
  keywords: [
    'PPSC Senior Assistant Exam Postponed',
    'PPSC Senior Assistant Exam New Date 2026',
    'PPSC Senior Assistant Exam 17 January 2027',
    'PPSC Senior Assistant Exam Rescheduled',
    'PPSC Senior Assistant Postponed Notice',
    'PPSC Senior Assistant Advt No 202229 to 202236',
    'PPSC Senior Assistant Exam Date Change',
    'PPSC Senior Assistant Admit Card 2026',
    'PPSC Senior Assistant Exam Time 12 Noon to 2 PM',
    'PPSC Senior Assistant Recruitment 2026',
    'Punjab Public Service Commission Senior Assistant Exam',
    'PPSC Exam Postponed 15 November 2026',
    'ppsc.gov.in notice',
  ],
  tags: [
    'PPSC Senior Assistant Exam Postponed',
    'PPSC Senior Assistant New Exam Date',
    'PPSC Exam January 2027',
    'Punjab Public Service Commission 2026',
  ],
};

const quickSummaryItems = [
  { label: 'Issuing Body', value: 'Punjab Public Service Commission (PPSC), Patiala', highlight: false },
  { label: 'Exam', value: 'Senior Assistant Joint Competitive Exam', highlight: false },
  { label: 'Advt. Nos.', value: '202229 to 202236', highlight: false },
  { label: 'Old Date (cancelled)', value: '15 November 2026 (Sunday)', highlight: false },
  { label: 'New Exam Date', value: '17 January 2027 (Sunday)', highlight: true },
  { label: 'New Exam Time', value: '12:00 Noon to 2:00 PM', highlight: true },
  { label: 'Reason', value: 'Administrative reasons', highlight: false },
  { label: 'Notice Date', value: '9 October 2026', highlight: false },
];

const comparisonRows = [
  ['Exam date', '15 November 2026 (Sunday)', '17 January 2027 (Sunday)'],
  ['Exam time', '11:00 AM to 1:00 PM', '12:00 Noon to 2:00 PM'],
  ['Advertisement Nos.', '202229 to 202236', '202229 to 202236 (unchanged)'],
  ['Public notice', 'Dated 14 August 2026', 'Dated 9 October 2026'],
  ['Extra preparation time', 'About 5 weeks left from 9 October', 'About 14 weeks left from 9 October'],
];

const prepSubjects = [
  { icon: '📖', label: 'General Knowledge' },
  { icon: '📰', label: 'Current Affairs' },
  { icon: '🗺️', label: 'Punjab GK & History' },
  { icon: '🧠', label: 'Reasoning' },
  { icon: '➗', label: 'Arithmetic & Maths' },
  { icon: '🇬🇧', label: 'English' },
  { icon: '📘', label: 'Punjabi' },
  { icon: '💻', label: 'Computer Awareness' },
];

const faqs = [
  {
    question: 'Has the PPSC Senior Assistant exam been postponed?',
    answer:
      'Yes. In a notice dated 9 October 2026, the Punjab Public Service Commission postponed the Senior Assistant Joint Competitive Examination (Advt. No. 202229 to 202236), which was scheduled for 15 November 2026, due to administrative reasons.',
  },
  {
    question: 'What is the new PPSC Senior Assistant exam date?',
    answer:
      'The exam has been re-scheduled to 17 January 2027 (Sunday), from 12:00 Noon to 2:00 PM.',
  },
  {
    question: 'Why was the PPSC Senior Assistant exam postponed?',
    answer:
      'The official notice states only that the exam is postponed "due to administrative reasons". No further explanation has been given by PPSC.',
  },
  {
    question: 'Is the exam time the same as before?',
    answer:
      'No. The earlier schedule was 11:00 AM to 1:00 PM on 15 November 2026. The re-scheduled exam on 17 January 2027 is from 12:00 Noon to 2:00 PM.',
  },
  {
    question: 'Which advertisements are covered by the postponement?',
    answer:
      'The notice refers to the Senior Assistant Joint Competitive Examination under Advt. No. 202229 to 202236, the same eight advertisements announced in PPSC\'s public notice dated 14 August 2026.',
  },
  {
    question: 'Do I need to apply again for the PPSC Senior Assistant exam?',
    answer:
      'The notice does not ask candidates to re-apply or make any changes. It only revises the exam date and time. Candidates should keep checking ppsc.gov.in for any further instructions.',
  },
  {
    question: 'When will the PPSC Senior Assistant admit card be released?',
    answer:
      'The new notice does not give an admit card date. In its earlier schedule PPSC said admit cards would be uploaded about 7 days before the exam. If the same practice follows, the admit card would be expected in the second week of January 2027, but this is only an estimate. Confirm on ppsc.gov.in.',
  },
  {
    question: 'Will the exam centre or syllabus change?',
    answer:
      'The notice mentions no change in the syllabus or exam pattern. Exam centre and reporting details are normally given on the admit card, so check it once released.',
  },
  {
    question: 'What about the PPSC Peon exam on 20 December 2026?',
    answer:
      'The 9 October 2026 notice is only about the Senior Assistant examination and does not mention the Peon exam. Candidates for that post should check ppsc.gov.in for the latest status.',
  },
  {
    question: 'Is 17 January 2027 final?',
    answer:
      'It is the date given in the official notice. PPSC has earlier stated that dates and details can change if circumstances warrant, so keep visiting ppsc.gov.in for the latest updates.',
  },
  {
    question: 'How should I use the extra time before the PPSC Senior Assistant exam?',
    answer:
      'Finish the syllabus first, then move to previous year papers, sectional tests and full-length mocks. With roughly 14 weeks from the notice date, a structured plan with weekly tests and a proper revision phase works far better than reading randomly. Elite Academy online coaching and test series are designed for this.',
  },
  {
    question: 'Where can I read the official PPSC notice?',
    answer:
      'The notice is published on the official website of the Commission, https://ppsc.gov.in. The notice image is also shown on this page.',
  },
];

const tocItems = [
  { id: 'what-happened', title: 'What the PPSC Notice Says' },
  { id: 'new-date', title: 'New PPSC Senior Assistant Exam Date' },
  { id: 'comparison', title: 'Old Schedule vs New Schedule' },
  { id: 'what-changes', title: 'What Candidates Should Do Now' },
  { id: 'admit-card', title: 'Admit Card & Exam Centre' },
  { id: 'preparation', title: 'Using the Extra 14 Weeks Wisely' },
  { id: 'batch', title: 'Prepare With Elite Academy' },
  { id: 'faq', title: 'Frequently Asked Questions' },
];

const relatedLinks = [
  {
    title: 'PPSC Senior Assistant Exam Date 2026 (earlier schedule)',
    path: '/blog/ppsc-senior-assistant-exam-date-2026',
    description:
      'The earlier public notice dated 14 August 2026 with the department-wise list of Advt. 202229 to 202236.',
  },
  {
    title: 'Punjab District Court Clerk Recruitment 2026',
    path: '/blog/punjab-district-court-clerk-recruitment-2026',
    description: 'SSSC notice for 1,270 Clerk posts in Punjab District Courts. Apply 7 October to 4 November 2026.',
  },
  {
    title: 'Test Series',
    path: '/test-series',
    description: 'Daily mock tests for Punjab government exams with subject-wise and full-length tests.',
  },
  {
    title: 'Online Coaching',
    path: '/online-coaching',
    description: 'Live classes, recorded lectures, mock tests and study material for Punjab government exams.',
  },
];

const cardClass = 'rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20';
const ctaCardClass =
  'rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20';
const thClass = 'border border-slate-700 px-4 py-3 font-semibold';
const tdClass = 'border border-slate-800 px-4 py-3 text-slate-300';

function ImageCard({ src, alt, caption, onOpen }) {
  return (
    <figure className="space-y-2">
      <button
        type="button"
        onClick={() => onOpen(src, alt)}
        style={{ cursor: 'zoom-in' }}
        className="mx-auto flex w-full max-w-[600px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/10 bg-white p-3 shadow-lg shadow-black/20 transition hover:shadow-xl hover:shadow-black/30"
        aria-label={`Open ${alt} in full size`}
      >
        <img src={src} alt={alt} title={alt} loading="lazy" className="mx-auto h-auto w-full object-contain" />
      </button>
      <figcaption className="text-center text-sm text-slate-500">{caption} — click to view in full size</figcaption>
    </figure>
  );
}

export default function PPSCSeniorAssistantPostponed2026() {
  const [copied, setCopied] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && lightbox) setLightbox(null);
    };
    if (lightbox) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [lightbox]);

  const canonicalUrl = getCanonicalUrl(`/blog/${SLUG}`);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${getCanonicalUrl('/')}${NOTICE_IMAGE}`,
    author: { '@type': 'Organization', name: 'Elite Academy' },
    publisher: { '@type': 'Organization', name: 'Elite Academy', url: getCanonicalUrl('/') },
    datePublished: '2026-10-09',
    dateModified: '2026-10-09',
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
    datePublished: '2026-10-09',
    dateModified: '2026-10-09',
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

  const openImage = (src, alt) => setLightbox({ src, alt });

  return (
    <>
      <PageSeo
        path={`/blog/${SLUG}`}
        titleOverride="PPSC Senior Assistant Exam Postponed: New Date 17 January 2027 | Revised Schedule"
        descriptionOverride={post.description}
        keywords={post.keywords.join(', ')}
        imageUrl={NOTICE_IMAGE}
        publishedTime="2026-10-09"
        modifiedTime="2026-10-09"
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
              <span className="text-slate-200">PPSC Senior Assistant Exam Postponed</span>
            </div>
          </nav>

          {/* Header */}
          <header className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_0.8fr] lg:items-start">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-200">
                {post.heroBadge}
              </span>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                PPSC Senior Assistant Exam Postponed: New Exam Date 17 January 2027 (Advt. 202229 to 202236)
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">{post.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span>By {post.author}</span>
                <span>•</span>
                <time dateTime="2026-10-09">Published: {post.date}</time>
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
                  href="#new-date"
                  className="rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20"
                >
                  See New Date
                </a>
                <a
                  href="https://ppsc.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
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
                  onClick={() =>
                    openImage(
                      NOTICE_IMAGE,
                      'PPSC Senior Assistant exam postponed official notice dated 9 October 2026 with new exam date 17 January 2027'
                    )
                  }
                  style={{ cursor: 'zoom-in' }}
                  className="mx-auto flex w-full max-w-[460px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/10 bg-white p-3 shadow-lg shadow-black/20 transition hover:shadow-xl hover:shadow-black/30 sm:max-w-[420px] lg:max-w-[460px]"
                  aria-label="Open PPSC Senior Assistant postponement notice in full size"
                >
                  <img
                    src={NOTICE_IMAGE}
                    alt="PPSC Senior Assistant exam postponed notice: exam re-scheduled from 15 November 2026 to 17 January 2027, 12 Noon to 2 PM, Advt. No. 202229 to 202236"
                    title="PPSC Senior Assistant Exam Postponed — Official Notice dated 9 October 2026"
                    loading="eager"
                    width={1238}
                    height={1600}
                    className="mx-auto h-auto w-full object-contain"
                  />
                </button>
                <p className="text-center text-sm text-slate-500">Click to view in full size</p>
                <p className="text-sm leading-6 text-slate-400">
                  Official notice — Punjab Public Service Commission, Baradari Gardens, Patiala, dated 9 October 2026.
                </p>
              </div>
            </div>
          </header>

          {/* Quick Summary */}
          <section className={cardClass} aria-label="Postponement details at a glance" id="overview">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Quick Overview</p>
              <h2 className="text-2xl font-semibold text-white">PPSC Senior Assistant Exam Postponement at a Glance</h2>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {quickSummaryItems.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-2xl border p-4 ${
                    item.highlight ? 'border-blue-400/50 bg-blue-600/10' : 'border-white/10 bg-slate-900/70'
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                  <p className={`mt-2 text-lg font-semibold ${item.highlight ? 'text-blue-300' : 'text-white'}`}>
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
              <section className={cardClass}>
                <h2 className="text-xl font-semibold text-white">Table of Contents</h2>
                <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-slate-400">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="transition hover:text-blue-300">{item.title}</a>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Preparation Subjects + CTA */}
              <section className={ctaCardClass}>
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  PPSC Senior Assistant Exam Preparation Subjects
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  The exam has moved to 17 January 2027. Use the extra time to cover every subject properly.
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
                    Want structured preparation for the PPSC Senior Assistant exam?
                  </p>
                  <Link
                    to="/online-coaching"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 sm:text-base"
                  >
                    View Courses &amp; Enroll Online →
                  </Link>
                </div>
              </section>

              {/* What the notice says */}
              <section id="what-happened" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">PPSC Senior Assistant Exam Postponed: What the Notice Says</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    The <strong className="text-white">Punjab Public Service Commission (PPSC)</strong>, Baradari
                    Gardens, Patiala, has issued a notice dated{' '}
                    <strong className="text-white">9 October 2026</strong> postponing the{' '}
                    <strong className="text-white">Senior Assistant Joint Competitive Examination</strong> (Advt.
                    No. 202229 to 202236). The exam was earlier scheduled for{' '}
                    <strong className="text-white">15 November 2026 (Sunday)</strong> as per the public notice dated
                    14 August 2026.
                  </p>
                  <p>
                    PPSC says the exam is postponed <strong className="text-white">&quot;due to administrative
                    reasons&quot;</strong> and has now been re-scheduled to{' '}
                    <strong className="text-white">17 January 2027 (Sunday), from 12:00 Noon to 2:00 PM</strong>.
                    Candidates are advised to keep visiting the Commission&apos;s website,{' '}
                    <a
                      href="https://ppsc.gov.in"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-300 underline hover:text-blue-200"
                    >
                      ppsc.gov.in
                    </a>
                    , for other latest updates.
                  </p>
                  <p>
                    In simple words: if you applied for any of the eight Senior Assistant advertisements, your exam
                    is no longer on 15 November 2026. Your new exam date is 17 January 2027, and it will start an
                    hour later than before.
                  </p>
                </div>
                <div className="mt-6">
                  <ImageCard
                    src={NOTICE_IMAGE}
                    alt="Official PPSC notice dated 9 October 2026 postponing the Senior Assistant exam to 17 January 2027"
                    caption="Official PPSC notice dated 9 October 2026"
                    onOpen={openImage}
                  />
                </div>
              </section>

              {/* CTA #1 */}
              <section className={ctaCardClass}>
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">More time means a better score, if you use it well.</strong>{' '}
                  Start your PPSC Senior Assistant preparation with expert guidance. Call{' '}
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

              {/* New date */}
              <section id="new-date" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">New PPSC Senior Assistant Exam Date 2027</h2>
                <div className="mt-6 rounded-2xl border border-blue-400/40 bg-blue-600/10 p-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                    Re-scheduled Exam Date — Source: PPSC Notice, 9 October 2026
                  </p>
                  <p className="mt-4 text-4xl font-bold text-white sm:text-5xl">17 January 2027</p>
                  <p className="mt-2 text-xl font-medium text-blue-200">Sunday</p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <span className="rounded-full bg-blue-600/20 px-5 py-2 text-base font-semibold text-blue-100">
                      12:00 Noon
                    </span>
                    <span className="text-slate-400">to</span>
                    <span className="rounded-full bg-blue-600/20 px-5 py-2 text-base font-semibold text-blue-100">
                      2:00 PM
                    </span>
                  </div>
                </div>
                <div className="mt-6 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    The new date applies to the whole Senior Assistant joint exam, that is Advt. No. 202229 to
                    202236, covering the eight Punjab Government departments listed in PPSC&apos;s earlier notice
                    (School Education, Water Supply &amp; Sanitation, Public Works, Prosecution and Litigation,
                    Excise &amp; Taxation, Rural Development &amp; Panchayat, and Revenue, Rehabilitation &amp;
                    Disaster Management). See the{' '}
                    <Link
                      to="/blog/ppsc-senior-assistant-exam-date-2026"
                      className="text-blue-300 underline hover:text-blue-200"
                    >
                      department-wise PPSC Senior Assistant list
                    </Link>{' '}
                    for details.
                  </p>
                </div>
              </section>

              {/* Comparison */}
              <section id="comparison" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">PPSC Senior Assistant Exam: Old Schedule vs New Schedule</h2>
                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className={thClass}>Detail</th>
                        <th className={thClass}>Earlier (cancelled)</th>
                        <th className={thClass}>Now (re-scheduled)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => (
                        <tr key={row[0]} className="odd:bg-slate-900/50">
                          {row.map((cell, i) => (
                            <td key={i} className={`${tdClass} ${i === 0 ? 'font-semibold text-white' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Source: PPSC public notices dated 14 August 2026 and 9 October 2026. Preparation time is counted
                  from the date of the new notice.
                </p>
              </section>

              {/* What to do */}
              <section id="what-changes" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">What Candidates Should Do Now</h2>
                <ol className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  {[
                    'Note the new date and time: 17 January 2027, 12:00 Noon to 2:00 PM. Delete or ignore the 15 November 2026 date.',
                    'You do not need to re-apply. The notice only changes the exam date and time. Do not trust messages that ask you to pay money or share your login to "confirm" the new date.',
                    'Keep your registration number and password safe for admit card download.',
                    'Bookmark ppsc.gov.in and check it regularly for the admit card, exam centre and any further notice.',
                    'Re-plan your preparation for the extra time, with a syllabus-completion phase, a practice phase and a final revision phase.',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-sm font-bold text-blue-300">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Admit card */}
              <section id="admit-card" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">PPSC Senior Assistant Admit Card &amp; Exam Centre</h2>
                <div className="mt-4 space-y-4 leading-8 text-slate-300">
                  <p>
                    The 9 October 2026 notice does not announce an admit card date or exam centres. In the earlier
                    schedule, PPSC said admit cards would be uploaded about 7 days before the exam. If the same
                    practice is followed, the admit card could be expected around the second week of January 2027.
                    This is only an estimate, so confirm on{' '}
                    <a
                      href="https://ppsc.gov.in"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-300 underline hover:text-blue-200"
                    >
                      ppsc.gov.in
                    </a>
                    .
                  </p>
                  <p>
                    Exam centre, reporting time and venue are normally printed on the admit card. Download it using
                    your registration number and password, and check the date, time (12:00 Noon to 2:00 PM) and
                    centre address carefully.
                  </p>
                </div>
              </section>

              {/* Disclaimer */}
              <section className="rounded-3xl border border-amber-400/30 bg-amber-500/5 p-6 shadow-xl shadow-black/20">
                <h2 className="text-xl font-semibold text-amber-300">Important: Always Verify on the Official Website</h2>
                <p className="mt-3 leading-7 text-amber-100/80">
                  PPSC has earlier stated that dates and other details of examinations are liable to alteration if
                  circumstances so warrant. Always cross-check the latest status on the official PPSC website before
                  making travel or leave plans.
                </p>
              </section>

              {/* Preparation */}
              <section id="preparation" className={ctaCardClass}>
                <h2 className="text-2xl font-semibold text-white">How to Use the Extra 14 Weeks for PPSC Senior Assistant Preparation</h2>
                <div className="mt-3 max-w-2xl space-y-4 leading-8 text-slate-300">
                  <p>
                    A postponement is not a break. It is a second chance to fix weak areas. The aspirants who treat
                    the extra months as a structured plan, not a holiday, are the ones who gain the most.
                  </p>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      step: 'Weeks 1 to 6: Complete the syllabus',
                      detail:
                        'Cover General Knowledge, Punjab GK, Reasoning, Arithmetic, English, Punjabi and Computer basics topic by topic. Make short notes as you go.',
                    },
                    {
                      step: 'Weeks 7 to 10: Practice with PYQs and sectional tests',
                      detail:
                        'Solve previous year PPSC and Punjab government papers under time. Use sectional tests to strengthen the subjects where you score lowest.',
                    },
                    {
                      step: 'Weeks 11 to 13: Full-length mock tests',
                      detail:
                        'Take at least two full-length mocks every week, analyse every wrong answer and work on speed and accuracy.',
                    },
                    {
                      step: 'Final week: Revision and exam logistics',
                      detail:
                        'No new topics. Revise notes and current affairs, download your admit card, confirm the centre and travel plan for the 12:00 Noon start.',
                    },
                  ].map(({ step, detail }) => (
                    <div key={step} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                      <h3 className="font-semibold text-white">{step}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA #2 */}
              <section className={ctaCardClass}>
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">Need a ready-made study plan?</strong> Join the Elite Academy{' '}
                  <Link to="/test-series" className="font-semibold text-blue-300 underline hover:text-blue-200">
                    test series
                  </Link>{' '}
                  and{' '}
                  <Link to="/online-coaching" className="font-semibold text-blue-300 underline hover:text-blue-200">
                    online coaching
                  </Link>
                  , or call{' '}
                  <a href={`tel:+91${PHONE_PRIMARY}`} className="font-semibold text-blue-300 underline hover:text-blue-200">
                    {PHONE_PRIMARY}
                  </a>
                  .
                </p>
              </section>

              {/* Batch / Elite Academy CTA */}
              <section id="batch" className={ctaCardClass}>
                <h2 className="text-2xl font-semibold text-white">
                  Prepare for the PPSC Senior Assistant Exam With Elite Academy
                </h2>
                <p className="mt-3 max-w-2xl leading-8 text-slate-300">
                  With the exam now on 17 January 2027, there is enough time to prepare the right way. Elite Academy
                  helps Punjab Government exam aspirants through:
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                    <h3 className="font-semibold text-white">Structured Coaching</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      <li>
                        <Link to="/psssb-coaching" className="text-blue-300 underline hover:text-blue-200">
                          Punjab Govt. exam preparation
                        </Link>{' '}
                        — classroom and online batches
                      </li>
                      <li>
                        <Link to="/online-coaching" className="text-blue-300 underline hover:text-blue-200">
                          Online coaching
                        </Link>{' '}
                        with live and recorded classes
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
                      <li>
                        <Link to="/weekly-test" className="text-blue-300 underline hover:text-blue-200">
                          Weekly tests
                        </Link>{' '}
                        and{' '}
                        <Link to="/sectional-test-series" className="text-blue-300 underline hover:text-blue-200">
                          sectional test series
                        </Link>
                      </li>
                      <li>
                        <Link to="/monthly-current-affairs" className="text-blue-300 underline hover:text-blue-200">
                          Monthly current affairs
                        </Link>{' '}
                        and{' '}
                        <Link to="/books" className="text-blue-300 underline hover:text-blue-200">
                          study books
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-base leading-7 text-slate-200">
                    Preparing for PPSC Senior Assistant? Don&apos;t let the extra time go to waste. Call{' '}
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
                    to="/test-series"
                    className="rounded-full border border-white/10 px-5 py-2.5 font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Explore Test Series
                  </Link>
                </div>
              </section>

              {/* App Download CTA */}
              <section className={cardClass}>
                <h2 className="text-xl font-semibold text-white">Practice for PPSC on the Elite Academy App</h2>
                <p className="mt-3 leading-8 text-slate-300">
                  The Elite Academy app gives you Punjab government exam mock tests and practice resources on your
                  phone, so you can build speed and track your progress every week until 17 January 2027.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={ANDROID_APP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Download on Android
                  </a>
                  <a
                    href={IOS_APP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Download on iPhone
                  </a>
                </div>
              </section>

              {/* Helpline */}
              <section className={cardClass}>
                <h2 className="text-xl font-semibold text-white">PPSC Contact Details</h2>
                <ul className="mt-3 ml-5 list-disc space-y-2 leading-8 text-slate-300">
                  <li>Address: Punjab Public Service Commission, Baradari Gardens, Patiala-147001</li>
                  <li>Office telephone: 0175-5014832-33</li>
                  <li>Website: ppsc.gov.in</li>
                </ul>
              </section>

              {/* FAQ */}
              <section id="faq" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Frequently Asked Questions</h2>
                <div className="mt-6 space-y-3">
                  {faqs.map((faq) => (
                    <details key={faq.question} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                      <summary className="cursor-pointer text-base font-medium text-white">{faq.question}</summary>
                      <p className="mt-3 text-sm leading-7 text-slate-400">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* Related Resources */}
              <section className={cardClass}>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Continue preparing</p>
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
                  PPSC Senior Assistant exam is now on 17 January 2027. Start preparing the right way today.
                </h2>
                <p className="mx-auto mt-3 max-w-2xl leading-8 text-slate-200">
                  Classroom coaching, online batches, mock tests and the Elite Academy app, everything you need to
                  turn extra time into a better rank.
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
                  <span className="font-semibold text-slate-400">Last updated:</span> 9 October 2026, based on the
                  PPSC notice dated 9 October 2026. Elite Academy is not affiliated with the Punjab Public Service
                  Commission; candidates should verify all details on the official website, ppsc.gov.in. This page will
                  be updated when PPSC releases the admit card or any further notice.
                </p>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
              <section className={cardClass}>
                <h2 className="text-lg font-semibold text-white">On this page</h2>
                <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-slate-400">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="transition hover:text-blue-300">{item.title}</a>
                    </li>
                  ))}
                </ol>
              </section>

              <section className={cardClass}>
                <h2 className="text-lg font-semibold text-white">Quick links</h2>
                <div className="mt-4 space-y-2 text-sm text-slate-400">
                  <a href="https://ppsc.gov.in" target="_blank" rel="noreferrer" className="block hover:text-blue-300">
                    Official PPSC Website →
                  </a>
                  <Link to="/psssb-coaching" className="block hover:text-blue-300">Punjab Govt. Exam Coaching →</Link>
                  <Link to="/online-coaching" className="block hover:text-blue-300">Online Coaching →</Link>
                  <Link to="/test-series" className="block hover:text-blue-300">Test Series →</Link>
                  <Link to="/weekly-test" className="block hover:text-blue-300">Weekly Tests →</Link>
                  <Link to="/contact-us" className="block hover:text-blue-300">Contact Us →</Link>
                </div>
              </section>

              <section className={ctaCardClass}>
                <h2 className="text-lg font-semibold text-white">New Exam Date: 17 January 2027</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  PPSC Senior Assistant exam, 12:00 Noon to 2:00 PM. Start preparing with Elite Academy.
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

              <section className={cardClass}>
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
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close image viewer"
            className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              src={lightbox.src}
              alt={lightbox.alt}
              className="h-auto w-auto object-contain"
              style={{ maxWidth: '95vw', maxHeight: '90vh' }}
            />
            <div className="mt-6 text-center text-sm text-slate-300 sm:mt-8">
              <p className="font-semibold text-white">PPSC Senior Assistant Exam Postponed — Official Notice</p>
              <p className="mt-1 text-slate-400">Punjab Public Service Commission, Patiala · 9 October 2026</p>
            </div>
          </div>

          <div className="fixed bottom-4 left-1/2 hidden -translate-x-1/2 transform text-xs text-slate-400 sm:block">
            Press <kbd className="rounded bg-white/10 px-2 py-1">ESC</kbd> to close
          </div>
        </div>
      )}
    </>
  );
}
