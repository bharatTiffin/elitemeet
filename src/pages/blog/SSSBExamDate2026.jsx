import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';
import { getFaqSchema, getOrganizationSchema } from '../../config/structuredData';
import { getCanonicalUrl } from '../../config/publicSeo';

const SLUG = 'sssb-punjab-exam-date-2026';
const NOTICE_IMAGE = '/SSSB_Punjab_Exam_Dates_2026.jpeg';

const PHONE_PRIMARY = '7696954686';
const PHONE_SECONDARY = '9988414686';

const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.johnnykhore.eliteacademy&hl=en_IN';
const IOS_APP_URL = 'https://apps.apple.com/in/app/elite-academy-mock-tests/id6746954938';

const post = {
  slug: SLUG,
  title:
    'SSSB Exam Date 2026: Complete Written Exam Schedule for Clerk, Group D, Junior Engineer & Technical Posts',
  description:
    'SSSB Punjab exam date 2026: Clerk exam on 11 October, Group D exam on 25 October, Junior Engineer (Civil/Mechanical/Electrical) on 18 October, plus Electrician, Fitter, Plumber, Refrigeration and Wood Work Technician exam dates — full schedule for Advertisement No. 02, 03, 04 and 07 of 2026.',
  date: '18 September 2026',
  updatedDate: '18 September 2026',
  readingTime: '8 min read',
  author: 'Elite Academy Editorial Team',
  category: 'SSSB Exam Update',
  heroBadge: 'Exam Schedule Released',
  keywords: [
    'SSSB Exam Date 2026',
    'SSSB Punjab Exam Date 2026',
    'SSSB Written Exam Schedule 2026',
    'SSSB Clerk Exam Date 2026',
    'SSSB Group D Exam Date 2026',
    'SSSB Junior Engineer Exam Date 2026',
    'SSSB Electrician Exam Date 2026',
    'SSSB Fitter Exam Date 2026',
    'SSSB Plumber Exam Date 2026',
    'SSSB Refrigeration Technician Exam Date',
    'SSSB Wood Work Technician Exam Date',
    'SSSB Advertisement 02/2026 Exam Date',
    'SSSB Advertisement 03/2026 Exam Date',
    'SSSB Advertisement 04/2026 Exam Date',
    'SSSB Advertisement 07/2026 Exam Date',
    'Subordinate Services Selection Board Exam Date',
    'Punjab Government Exam Date October 2026',
    'SSSB Admit Card 2026',
  ],
  tags: [
    'SSSB Exam Date 2026',
    'SSSB Written Exam Schedule',
    'Punjab Government Exam October 2026',
    'SSSB Admit Card',
  ],
};

const examSchedule = [
  ['1', '03 of 2026', 'Technical Education', 'Electrician (NTC/NAC)', 'B', '06.10.2026'],
  ['2', '03 of 2026', 'Technical Education', 'Refrigeration and Air Conditioner Technician (Degree/Diploma)/(NTC/NAC)', 'B', '10.10.2026'],
  ['3', '03 of 2026', 'Technical Education', 'Fitter (Degree/Diploma)/(NTC/NAC)', 'B', '10.10.2026'],
  ['4', '02 of 2026', 'Various Departments', 'Clerk', 'C', '11.10.2026'],
  ['5', '03 of 2026', 'Technical Education', 'Plumber (Degree/Diploma)/(NTC/NAC)', 'B', '12.10.2026'],
  ['6', '03 of 2026', 'Technical Education', 'Wood Work Technician (Degree/Diploma)/(NTC/NAC)', 'B', '13.10.2026'],
  ['7', '07 of 2026', 'Various Departments', 'Junior Engineer (Civil)', 'B', '18.10.2026'],
  ['8', '07 of 2026', 'Water Resource', 'Junior Engineer (Mechanical)', 'B', '18.10.2026'],
  ['9', '07 of 2026', 'Various Departments', 'Junior Engineer (Electrical)', 'B', '18.10.2026'],
  ['10', '04 of 2026', 'Various Departments', 'Group D', 'D', '25.10.2026'],
];

const quickSummaryItems = [
  { label: 'Recruiting Body', value: 'SSSB, Punjab', highlight: false },
  { label: 'Total Exams Scheduled', value: '10 Written Exams', highlight: false },
  { label: 'Groups Covered', value: 'Group B, C & D', highlight: false },
  { label: 'Earliest Exam Date', value: '6 October 2026', highlight: true },
  { label: 'Clerk Exam Date', value: '11 October 2026', highlight: true },
  { label: 'Group D Exam Date', value: '25 October 2026', highlight: true },
  { label: 'Advertisements Covered', value: '02, 03, 04 & 07 of 2026', highlight: false },
  { label: 'Admit Card', value: 'Released Before Each Exam', highlight: false },
];

const examHighlights = [
  { icon: '🔌', label: 'Electrician — 6 Oct' },
  { icon: '❄️', label: 'Refrigeration & AC — 10 Oct' },
  { icon: '🔧', label: 'Fitter — 10 Oct' },
  { icon: '📋', label: 'Clerk — 11 Oct' },
  { icon: '🚿', label: 'Plumber — 12 Oct' },
  { icon: '🪵', label: 'Wood Work Tech. — 13 Oct' },
  { icon: '🏗️', label: 'JE Civil — 18 Oct' },
  { icon: '⚙️', label: 'JE Mechanical — 18 Oct' },
  { icon: '⚡', label: 'JE Electrical — 18 Oct' },
  { icon: '🧹', label: 'Group D — 25 Oct' },
];

const prepSubjects = [
  { icon: '🧠', label: 'Reasoning' },
  { icon: '📘', label: 'Punjabi Grammar' },
  { icon: '🇬🇧', label: 'English Language' },
  { icon: '📖', label: 'General Knowledge' },
  { icon: '📰', label: 'Current Affairs' },
  { icon: '🔢', label: 'Numerical Ability' },
  { icon: '🛠️', label: 'Trade / Technical Knowledge' },
  { icon: '💻', label: 'Computer Knowledge' },
];

const groupBadgeClass = {
  B: 'border-blue-400/40 bg-blue-500/10 text-blue-200',
  C: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
  D: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
};

const faqs = [
  {
    question: 'What is the SSSB Exam Date 2026 notice about?',
    answer:
      'SSSB, Punjab has released a combined written examination schedule covering Group B, Group C and Group D posts published through different advertisements (02, 03, 04 and 07 of 2026). The notice lists 10 exam dates between 6 October 2026 and 25 October 2026 for posts such as Electrician, Refrigeration & AC Technician, Fitter, Clerk, Plumber, Wood Work Technician, Junior Engineer (Civil/Mechanical/Electrical) and Group D.',
  },
  {
    question: 'When is the SSSB Clerk exam date 2026?',
    answer:
      'The SSSB Clerk written exam (Group C, Advertisement No. 02/2026, Various Departments) is scheduled for 11 October 2026. This is the same Clerk (Common Cadre) recruitment of 531 vacancies covered in our Punjab Clerk Recruitment 2026 guide.',
  },
  {
    question: 'When is the SSSB Group D exam date 2026?',
    answer:
      'The Group D written exam (Advertisement No. 04/2026, Various Departments) is scheduled for 25 October 2026. This corresponds to the 1,401 Group D vacancies covered in our Punjab Government Group D Recruitment 2026 guide.',
  },
  {
    question: 'When is the SSSB Junior Engineer (JE) exam date 2026?',
    answer:
      'All three Junior Engineer exams — Junior Engineer (Civil), Junior Engineer (Mechanical) and Junior Engineer (Electrical), under Advertisement No. 07/2026 — are scheduled for the same date: 18 October 2026.',
  },
  {
    question: 'What are the exam dates for Electrician, Fitter, Plumber, Refrigeration and Wood Work Technician posts?',
    answer:
      'Under Advertisement No. 03/2026 (Technical Education), the exam dates are: Electrician (NTC/NAC) — 6 October 2026; Refrigeration and Air Conditioner Technician and Fitter — both 10 October 2026; Plumber — 12 October 2026; and Wood Work Technician — 13 October 2026. All are Group B posts.',
  },
  {
    question: 'Is Advertisement No. 03/2026 the same as the PSSSB Craft Instructor recruitment?',
    answer:
      'The trade categories under Advertisement No. 03/2026 — Electrician, Refrigeration & AC, Fitter, Plumber and Wood Work Technician — match the trades covered in our PSSSB Craft Instructor Recruitment 2026 guide (681 posts). Candidates who applied under that recruitment should check their exam date here and verify final confirmation from the official SSSB website.',
  },
  {
    question: 'When will admit cards be released for these SSSB exams?',
    answer:
      'SSSB has not announced a specific admit card release date in this notice. Admit cards are typically released a few days before each scheduled exam date. Candidates should regularly check the official SSSB Punjab website, www.sssb.punjab.gov.in, closer to their exam date.',
  },
  {
    question: 'What is the exam pattern for these SSSB written exams?',
    answer:
      'The detailed exam pattern and syllabus for each post have not been specified in this notice. Candidates should refer to the original recruitment advertisement (02, 03, 04 or 07 of 2026) applicable to their post, or the official SSSB website, for the complete exam pattern.',
  },
  {
    question: 'Where can I check the official SSSB exam date notice?',
    answer:
      'The official exam date schedule is published by the Subordinate Services Selection Board, Punjab, Van Bhawan, Sector-68, SAS Nagar, and is available on the official website: www.sssb.punjab.gov.in.',
  },
  {
    question: 'How can I prepare for these SSSB exams in the remaining time?',
    answer:
      'With exam dates between 6 and 25 October 2026, candidates have a few weeks left. Focus on daily revision of reasoning, Punjabi grammar, English, general knowledge, current affairs and numerical ability for Clerk and Group D posts, and trade-specific technical knowledge for Electrician, Fitter, Plumber, Refrigeration and Wood Work Technician posts. Regular timed mock tests help build speed and accuracy in the limited time available.',
  },
  {
    question: 'Is this the same Clerk recruitment covered in the Punjab Clerk Recruitment 2026 article?',
    answer:
      'Yes. Advertisement No. 02/2026 for Clerk (Common Cadre), with 531 vacancies, is the same recruitment. This exam date notice confirms the written exam for that recruitment is scheduled for 11 October 2026.',
  },
  {
    question: 'Is this the same Group D recruitment covered in the Punjab Government Group D Recruitment 2026 article?',
    answer:
      'Yes. Advertisement No. 04/2026 for Group D posts, with 1,401 vacancies, is the same recruitment. This exam date notice confirms the written exam for that recruitment is scheduled for 25 October 2026.',
  },
];

const tocItems = [
  { id: 'overview', title: 'SSSB Exam Date 2026 – Overview' },
  { id: 'exam-schedule', title: 'Complete SSSB Exam Date 2026 Schedule' },
  { id: 'clerk-exam', title: 'Clerk Exam Date – 11 October 2026' },
  { id: 'technical-exams', title: 'Technical Education Trade Exam Dates' },
  { id: 'je-exam', title: 'Junior Engineer Exam Date – 18 October 2026' },
  { id: 'group-d-exam', title: 'Group D Exam Date – 25 October 2026' },
  { id: 'admit-card', title: 'Admit Card & Exam Pattern' },
  { id: 'preparation', title: 'How to Prepare in the Remaining Time' },
  { id: 'batch', title: 'Prepare With Elite Academy' },
  { id: 'faq', title: 'Frequently Asked Questions' },
];

const relatedLinks = [
  {
    title: 'Punjab Clerk Recruitment 2026',
    path: '/blog/punjab-clerk-recruitment-2026',
    description: 'SSS Board Advertisement 02/2026: 531 Clerk (Common Cadre) vacancies — exam now scheduled for 11 October 2026.',
  },
  {
    title: 'Punjab Government Group D Recruitment 2026',
    path: '/blog/punjab-government-group-d-recruitment-2026',
    description: 'PSSSB Group D Recruitment 2026: 1,401 vacancies — exam now scheduled for 25 October 2026.',
  },
  {
    title: 'PSSSB Craft Instructor Recruitment 2026',
    path: '/blog/psssb-craft-instructor-recruitment-2026',
    description: 'PSSSB Craft Instructor Recruitment 2026 notification for 681 ITI Instructor vacancies — related trade exam dates now out.',
  },
  {
    title: 'SSSB Group C Recruitment 2026',
    path: '/blog/sssb-group-c-recruitment-2026',
    description: 'SSSB Advertisement 12/2026: CET-based recruitment for Clerk, Driver, Translator, Junior Scale Stenographer and Field Artist posts.',
  },
];

export default function SSSBExamDate2026() {
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
        titleOverride="SSSB Exam Date 2026: Complete Written Exam Schedule for Clerk, Group D, JE & Technical Posts"
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
              <span className="text-slate-200">SSSB Exam Date 2026</span>
            </div>
          </nav>

          {/* Header */}
          <header className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_0.8fr] lg:items-start">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200">
                {post.heroBadge}
              </span>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                SSSB Exam Date 2026: Complete Written Exam Schedule for Clerk, Group D, Junior Engineer &amp; Technical Posts
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
                  href="#exam-schedule"
                  className="rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20"
                >
                  View Full Exam Schedule
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
                  aria-label="Open SSSB Exam Date 2026 notice image in full size"
                >
                  <img
                    src={NOTICE_IMAGE}
                    alt="SSSB Punjab Exam Date 2026 official written exam schedule notice"
                    title="SSSB Exam Date 2026 — Official Written Exam Schedule Notice"
                    loading="eager"
                    width={1205}
                    height={1187}
                    className="mx-auto h-auto w-full object-contain"
                  />
                </button>
                <p className="text-center text-sm text-slate-500">Click to view in full size</p>
                <p className="text-sm leading-6 text-slate-400">
                  Official SSSB, Punjab exam date notice — written exam schedule for Group B, C and D posts.
                </p>
              </div>
            </div>
          </header>

          {/* Quick Summary */}
          <section
            className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
            aria-label="Exam schedule details at a glance"
            id="overview"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                Quick Overview
              </p>
              <h2 className="text-2xl font-semibold text-white">
                SSSB Exam Date 2026 at a Glance
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
                  SSSB Exam Preparation Subjects
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  With exams starting 6 October 2026, prepare now for the major subjects covered across these SSSB written exams.
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
                    Only a few weeks left — want structured, exam-focused preparation?
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
                    Sector-68, SAS Nagar, has released the written examination schedule for various Group B,
                    Group C and Group D posts, published through different advertisements. This is SSSB Exam
                    Date 2026 — a combined schedule of 10 written exams for posts under Advertisement No. 02,
                    03, 04 and 07 of 2026, running from 6 October 2026 to 25 October 2026.
                  </p>
                  <p>
                    The schedule covers Electrician, Refrigeration &amp; Air Conditioner Technician, Fitter,
                    Clerk, Plumber, Wood Work Technician, Junior Engineer (Civil, Mechanical and Electrical),
                    and Group D posts. Several of these correspond to recruitments already covered on this
                    website — including the 531-post Clerk recruitment and the 1,401-post Group D recruitment.
                  </p>
                  <p>
                    This page explains the complete exam date schedule in plain language and tells you where
                    to prepare in the time remaining. Candidates should verify all official exam details from
                    the SSSB Punjab website, www.sssb.punjab.gov.in.
                  </p>
                </div>
              </section>

              {/* CTA #1 */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">Exams start 6 October 2026 — the countdown has begun.</strong>{' '}
                  Get structured, exam-focused preparation now. Call{' '}
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

              {/* Exam Highlights grid */}
              <section
                className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-xl font-semibold text-white sm:text-2xl">Exam Dates at a Glance</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  10 written exams scheduled between 6 October and 25 October 2026.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {examHighlights.map((item) => (
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

              {/* Full Exam Schedule Table */}
              <section
                id="exam-schedule"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Complete SSSB Exam Date 2026 Schedule</h2>
                <p className="mt-3 leading-7 text-slate-400">
                  The table below reproduces the official SSSB, Punjab exam date notice, listing the
                  advertisement number, department, post name, group and scheduled written exam date for
                  each post. Scroll horizontally on smaller screens to view all columns.
                </p>

                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">Sl. No.</th>
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">Advt. No.</th>
                        <th className="border border-slate-700 px-4 py-3 font-semibold">Department</th>
                        <th className="border border-slate-700 px-4 py-3 font-semibold">Post Name</th>
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">Group</th>
                        <th className="whitespace-nowrap border border-slate-700 px-4 py-3 font-semibold">Exam Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {examSchedule.map((row) => (
                        <tr key={row[0]} className="odd:bg-slate-900/50">
                          <td className="border border-slate-800 px-4 py-3 text-slate-300">{row[0]}</td>
                          <td className="border border-slate-800 px-4 py-3 text-slate-300">{row[1]}</td>
                          <td className="border border-slate-800 px-4 py-3 text-slate-300">{row[2]}</td>
                          <td className="border border-slate-800 px-4 py-3 text-slate-300">{row[3]}</td>
                          <td className="border border-slate-800 px-4 py-3 text-center">
                            <span
                              className={`inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${groupBadgeClass[row[4]]}`}
                            >
                              {row[4]}
                            </span>
                          </td>
                          <td className="border border-slate-800 px-4 py-3 font-semibold text-slate-200">{row[5]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  Source: Official SSSB, Punjab exam date notice — Van Bhawan, Sector-68, SAS Nagar.
                </p>
              </section>

              {/* CTA #2 */}
              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">10 exams in October — competition will be intense.</strong>{' '}
                  Practice with{' '}
                  <Link to="/test-series" className="font-semibold text-blue-300 underline hover:text-blue-200">
                    Elite Academy&apos;s mock tests
                  </Link>{' '}
                  to be fully exam-ready before your scheduled date.
                </p>
              </section>

              {/* Clerk Exam */}
              <section
                id="clerk-exam"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Clerk Exam Date – 11 October 2026</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    The written exam for Clerk (Common Cadre) posts under Advertisement No. 02/2026 (Various
                    Departments) is scheduled for <strong className="text-white">11 October 2026</strong>. This
                    recruitment covers 531 vacancies across 29 Punjab Government departments — full details,
                    department-wise vacancies and the official notification are available in our{' '}
                    <Link to="/blog/punjab-clerk-recruitment-2026" className="text-blue-300 underline hover:text-blue-200">
                      Punjab Clerk Recruitment 2026 guide
                    </Link>.
                  </p>
                </div>
              </section>

              {/* Technical Exams */}
              <section
                id="technical-exams"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Technical Education Trade Exam Dates</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    Under Advertisement No. 03/2026 (Technical Education), five trade-based Group B exams are
                    scheduled across October 2026:
                  </p>
                  <ul className="ml-5 list-disc space-y-2 text-slate-300">
                    <li>Electrician (NTC/NAC) — 6 October 2026</li>
                    <li>Refrigeration and Air Conditioner Technician (Degree/Diploma)/(NTC/NAC) — 10 October 2026</li>
                    <li>Fitter (Degree/Diploma)/(NTC/NAC) — 10 October 2026</li>
                    <li>Plumber (Degree/Diploma)/(NTC/NAC) — 12 October 2026</li>
                    <li>Wood Work Technician (Degree/Diploma)/(NTC/NAC) — 13 October 2026</li>
                  </ul>
                  <p className="text-sm text-slate-400">
                    These trade categories match the ones covered in our{' '}
                    <Link to="/blog/psssb-craft-instructor-recruitment-2026" className="text-blue-300 underline hover:text-blue-200">
                      PSSSB Craft Instructor Recruitment 2026 guide
                    </Link>{' '}
                    (681 vacancies). Candidates should verify their exact post and exam date from the official
                    SSSB website.
                  </p>
                </div>
              </section>

              {/* JE Exam */}
              <section
                id="je-exam"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Junior Engineer Exam Date – 18 October 2026</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    Under Advertisement No. 07/2026, all three Junior Engineer exams are scheduled on the same
                    date, <strong className="text-white">18 October 2026</strong>:
                  </p>
                  <ul className="ml-5 list-disc space-y-2 text-slate-300">
                    <li>Junior Engineer (Civil) — Various Departments</li>
                    <li>Junior Engineer (Mechanical) — Water Resource Department</li>
                    <li>Junior Engineer (Electrical) — Various Departments</li>
                  </ul>
                </div>
              </section>

              {/* Group D Exam */}
              <section
                id="group-d-exam"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Group D Exam Date – 25 October 2026</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    The written exam for Group D posts under Advertisement No. 04/2026 (Various Departments) is
                    scheduled for <strong className="text-white">25 October 2026</strong> — the last exam in this
                    schedule. This corresponds to the 1,401 Group D vacancies covered in our{' '}
                    <Link to="/blog/punjab-government-group-d-recruitment-2026" className="text-blue-300 underline hover:text-blue-200">
                      Punjab Government Group D Recruitment 2026 guide
                    </Link>.
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
                      <h3 className="text-lg font-semibold text-amber-300">Only a Written Exam — No Interview</h3>
                      <p className="mt-3 leading-7 text-amber-100/80">
                        As covered in our Group D recruitment guide, selection for Group D posts is made purely
                        through this written examination — there is no interview stage. With the exam date now
                        confirmed, this is your final stretch of preparation time.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Admit Card & Pattern */}
              <section
                id="admit-card"
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">Admit Card &amp; Exam Pattern</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    SSSB has not specified an exact admit card release date in this notice. Admit cards for
                    Punjab Government exams are typically released a few days before the scheduled exam date.
                    Candidates should regularly check the official SSSB Punjab website, www.sssb.punjab.gov.in,
                    and download their admit card as soon as it is released.
                  </p>
                  <p className="text-sm text-slate-400">
                    The detailed exam pattern and syllabus for each post were released as part of the original
                    recruitment advertisement (02, 03, 04 or 07 of 2026). Candidates should refer to the
                    advertisement applicable to their post for full syllabus details.
                  </p>
                </div>
              </section>

              {/* Preparation */}
              <section
                id="preparation"
                className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">How to Prepare in the Remaining Time</h2>
                <div className="mt-3 max-w-2xl space-y-4 leading-8 text-slate-300">
                  <p>
                    With the first exam on 6 October 2026, candidates have only a few weeks left. For Clerk and
                    Group D posts, prioritise reasoning, Punjabi grammar, English, general knowledge, current
                    affairs and numerical ability. For Electrician, Fitter, Plumber, Refrigeration &amp; AC and
                    Wood Work Technician posts, revise trade-specific technical knowledge alongside general
                    awareness topics.
                  </p>
                  <p>
                    Daily timed mock tests in the remaining weeks help build speed and accuracy — far more
                    effective in this window than last-minute, unstructured revision.
                  </p>
                </div>
              </section>

              {/* Batch / Elite Academy CTA */}
              <section
                id="batch"
                className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20"
              >
                <h2 className="text-2xl font-semibold text-white">
                  Prepare for Your SSSB Exam With Elite Academy
                </h2>
                <p className="mt-3 max-w-2xl leading-8 text-slate-300">
                  With 10 SSSB exams scheduled between 6 and 25 October 2026, time is short. Elite Academy
                  helps Punjab Government exam aspirants prepare through:
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
                    If your exam falls between 6 and 25 October 2026, now is the time for focused, exam-oriented
                    preparation. Call{' '}
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
                  Practice for Your SSSB Exam on the Elite Academy App
                </h2>
                <p className="mt-3 leading-8 text-slate-300">
                  Alongside classroom and online batches, the Elite Academy app gives you Punjab government exam
                  mock tests and practice resources on your phone — useful for revising general knowledge,
                  reasoning, current affairs and Punjabi language topics commonly tested across these SSSB exams.
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
                  Your SSSB exam is scheduled. Is your preparation ready?
                </h2>
                <p className="mx-auto mt-3 max-w-2xl leading-8 text-slate-200">
                  Classroom coaching, online batches, mock tests and the Elite Academy app — all available to
                  help you prepare before your exam date between 6 and 25 October 2026.
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
                  the official SSSB, Punjab exam date notice. This page will be updated as further official
                  information — including admit card dates — is released. Candidates should verify all details
                  from the official SSSB Punjab website, www.sssb.punjab.gov.in.
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
                <h2 className="text-lg font-semibold text-white">Exams: 6 – 25 October 2026</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  10 written exams for Group B, C &amp; D posts. Admit cards released before each exam.
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
              alt="SSSB Punjab Exam Date 2026 official written exam schedule notice"
              className="h-auto w-auto object-contain"
              style={{ maxWidth: '95vw', maxHeight: '90vh' }}
            />
            <div className="mt-6 text-center text-sm text-slate-300 sm:mt-8">
              <p className="font-semibold text-white">SSSB Exam Date 2026 Notice</p>
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
