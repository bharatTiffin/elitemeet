import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';
import { getFaqSchema, getOrganizationSchema } from '../../config/structuredData';
import { getCanonicalUrl } from '../../config/publicSeo';

const SLUG = 'sssb-group-b-recruitment-2026';
const NOTICE_IMAGE = '/sssb-advertisement-13-2026-notice.png';
const QUALIFICATION_IMAGE = '/sssb-advertisement-13-2026-qualification.png';
const FEE_IMAGE = '/sssb-advertisement-13-2026-fee-selection.png';
const PDF_URL = '/sssb-advertisement-13-2026.pdf';

const PHONE_PRIMARY = '7696954686';
const PHONE_SECONDARY = '9988414686';

const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.johnnykhore.eliteacademy&hl=en_IN';
const IOS_APP_URL = 'https://apps.apple.com/in/app/elite-academy-mock-tests/id6746954938';

const post = {
  slug: SLUG,
  title:
    'SSSB Group B Recruitment 2026: Advertisement No. 13/2026 for Accountant, Law Officer, Legal Assistant & Head Draftsman (10 Posts)',
  description:
    'SSSB Punjab Advertisement No. 13/2026: 10 Group B vacancies for Accountant, Law Officer, Legal Assistant and Head Draftsman. Apply online from 1 October to 22 October 2026 at sssb.punjab.gov.in. Eligibility, age limit, salary (Level-6), fee and selection process.',
  date: '30 September 2026',
  updatedDate: '30 September 2026',
  readingTime: '9 min read',
  author: 'Elite Academy Editorial Team',
  category: 'SSSB Recruitment',
  heroBadge: 'Applications Open 1 October',
  keywords: [
    'SSSB Group B Recruitment 2026',
    'PSSSB Advertisement 13/2026',
    'SSSB Advertisement 13 of 2026',
    'PSSSB Recruitment 2026',
    'SSSB Accountant Recruitment 2026',
    'PSSSB Accountant Vacancy 2026',
    'SSSB Law Officer Recruitment 2026',
    'SSSB Legal Assistant Recruitment 2026',
    'SSSB Head Draftsman Recruitment 2026',
    'Punjab Accountant Recruitment 2026 Excise and Taxation',
    'SSSB 10 Posts Recruitment 2026',
    'Punjab Government Group B Jobs 2026',
    'PSSSB Group B Vacancy 2026',
    'sssb.punjab.gov.in Recruitment 2026',
    'PSSSB Group B Notification PDF',
    'PSSSB Group B Last Date 22 October 2026',
  ],
  tags: [
    'SSSB Group B Recruitment 2026',
    'PSSSB Advertisement 13/2026',
    'Punjab Accountant Recruitment',
    'Punjab Legal Assistant Recruitment',
  ],
};

const quickSummaryItems = [
  { label: 'Recruiting Body', value: 'SSSB, Punjab', highlight: false },
  { label: 'Advertisement No.', value: '13 of 2026', highlight: true },
  { label: 'Total Vacancies', value: '10 Posts (Group B)', highlight: true },
  { label: 'Posts', value: 'Accountant, Law Officer, Legal Assistant, Head Draftsman', highlight: false },
  { label: 'Apply Online From', value: '1 October 2026', highlight: true },
  { label: 'Last Date (Apply + Fee)', value: '22 October 2026', highlight: true },
  { label: 'Salary', value: '₹35,400 (Level-6, 7th CPC)', highlight: false },
  { label: 'Application Fee', value: '₹1,500 / ₹750 (SC Punjab)', highlight: false },
];

const vacancyRows = [
  {
    department: 'Directorate of Local Government, Punjab (Field Office)',
    post: 'Head Draftsman',
    general: '1',
    scMb: '—',
    scRo: '1',
    total: '2',
    women: '0',
  },
  {
    department: 'Office of Director, Higher Education, Punjab',
    post: 'Law Officer',
    general: '1',
    scMb: '—',
    scRo: '—',
    total: '1',
    women: '0',
  },
  {
    department: 'Office of Director, Higher Education, Punjab',
    post: 'Legal Assistant',
    general: '1',
    scMb: '—',
    scRo: '—',
    total: '1',
    women: '0',
  },
  {
    department: 'Excise & Taxation Department (Field Office)',
    post: 'Accountant',
    general: '3 (1 women)',
    scMb: '1 (1 women)',
    scRo: '1',
    total: '5',
    women: '2',
  },
  {
    department: 'Directorate of Local Government, Punjab (Punjab Water Supply & Sewerage Board)',
    post: 'Legal Assistant',
    general: '1',
    scMb: '—',
    scRo: '—',
    total: '1',
    women: '0',
  },
];

const importantDates = [
  { event: 'Advertisement Number', date: '13 of 2026' },
  { event: 'Notice Date (signed by Secretary, SSSB)', date: '29 September 2026' },
  { event: 'Online Application Start Date', date: '1 October 2026' },
  { event: 'Last Date to Apply Online & Pay Fee', date: '22 October 2026' },
  { event: 'Age Calculated As On', date: '1 January 2026' },
  { event: 'Written Exam Date', date: 'To be announced on sssb.punjab.gov.in' },
];

const eligibilityRows = [
  {
    post: 'Head Draftsman',
    qualification:
      'Diploma in Civil Engineering, or Certificate in Civil Draftsman (or equivalent) from a State Board of Technical Education Punjab or any other recognized institution — OR a higher qualification in the relevant field from a recognized institution.',
  },
  {
    post: 'Law Officer',
    qualification:
      'Professional degree in Law from a recognized university or institution, plus at least 3 years of experience as an Advocate at the Bar.',
  },
  {
    post: 'Legal Assistant (Director Higher Education Office)',
    qualification:
      'Professional degree in Law from a recognized university or institution, plus a minimum of 2 years of experience at the Bar.',
  },
  {
    post: 'Accountant (Excise & Taxation)',
    qualification:
      '(i) Bachelor of Commerce from a recognized university (or equivalent) who has qualified the competitive test held by the competent authority; and (ii) at least a 120-hour hands-on course in office productivity / IT applications or Desktop Publishing from a Government-recognized, ISO 9001 certified institution — OR a computer/IT qualification equivalent to the DOEACC "C" Level certificate.',
  },
  {
    post: 'Legal Assistant (Punjab Water Supply & Sewerage Board)',
    qualification: 'Degree in Law.',
  },
];

const ageLimits = [
  { category: 'Minimum age (all categories)', limit: '18 years' },
  { category: 'General category — maximum age', limit: '37 years' },
  { category: 'SC candidates of Punjab — maximum age', limit: '42 years' },
  { category: 'State / Central Government employees — maximum age', limit: '45 years' },
  { category: 'Widows, divorcees & certain categories of married women — maximum age', limit: '40 years' },
];

const salaryRows = [
  { post: 'Head Draftsman', pay: '₹35,400 (Level-6)' },
  { post: 'Law Officer', pay: '₹35,400 (Level-6)' },
  { post: 'Legal Assistant (Higher Education)', pay: '₹35,400 (Level-6)' },
  { post: 'Accountant', pay: '₹35,400 (Level-6)' },
  { post: 'Legal Assistant (PWSSB)', pay: '₹35,400 – ₹1,12,400 (Level-6)' },
];

const postsIncluded = [
  { icon: '🧾', label: 'Accountant (5)' },
  { icon: '⚖️', label: 'Law Officer (1)' },
  { icon: '📚', label: 'Legal Assistant (2)' },
  { icon: '📐', label: 'Head Draftsman (2)' },
];

const documentsChecklist = [
  'Matriculation (10th) certificate with Punjabi as a compulsory or elective subject — mandatory under Rule 17 of the Punjab Civil Services (General and Common Conditions of Service) Rules, 1994',
  'Educational / professional qualification certificates for the post (Law degree, B.Com, Civil Engineering diploma, etc.) and experience proof where required',
  'Computer course certificate (120-hour ISO 9001 course or DOEACC "C" Level equivalent) for Accountant',
  'Recent passport-size photograph (or live camera capture) and scanned signature',
  'Punjab domicile / residence certificate — mandatory for every candidate claiming reservation, not older than 5 years',
  'Scheduled Caste certificate in the format prescribed by the Punjab Government (for SC candidates)',
  'NOC from the current department for State / Central Government employees claiming age relaxation (to be shown at counselling)',
  'Valid email ID (this becomes your login User ID) and an active mobile number',
];

const applySteps = [
  'Visit https://sssb.punjab.gov.in and click the "Apply Online" link.',
  'New users click "Registration" and fill in their details. Your registered Email ID becomes your User ID; keep the User ID and password safe.',
  'Log in and fill in personal, educational and required details correctly. Upload a passport-size photo (or capture live) and your scanned signature — applications without photo and signature are rejected.',
  'Click "Save Draft" or "Next", then "Attach Annexure" and upload your 10th certificate, qualification certificates and other required documents in PDF format. Click "Save Documents".',
  'Click "Make Payment" and pay the fee online, then click "Submit". Your complete Application Form will be displayed — take a print-out and keep it safe.',
];

const prepSubjects = [
  { icon: '⚖️', label: 'Law (Legal posts)' },
  { icon: '🧾', label: 'Accountancy & Commerce' },
  { icon: '📐', label: 'Civil Engineering / Drafting' },
  { icon: '🧠', label: 'Reasoning' },
  { icon: '📘', label: 'Punjabi Language' },
  { icon: '🇬🇧', label: 'English Language' },
  { icon: '📰', label: 'Current Affairs' },
  { icon: '🗺️', label: 'Punjab GK' },
];

const faqs = [
  {
    question: 'What is SSSB Advertisement No. 13/2026?',
    answer:
      'Advertisement No. 13 of 2026 is the recruitment notice issued by the Subordinate Services Selection Board (SSSB), Punjab for 10 Group B posts — Accountant, Law Officer, Legal Assistant and Head Draftsman — in various Punjab Government departments.',
  },
  {
    question: 'How many vacancies are there in SSSB Advertisement 13/2026?',
    answer:
      'There are 10 vacancies in total: Accountant 5, Head Draftsman 2, Legal Assistant 2 (one in the Directorate of Higher Education office and one in the Punjab Water Supply & Sewerage Board) and Law Officer 1. Of these, 2 are reserved for women (both under Accountant).',
  },
  {
    question: 'What is the last date to apply for SSSB Group B Recruitment 2026?',
    answer:
      'Online applications are accepted from 1 October 2026 to 22 October 2026. The fee must also be paid by 22 October 2026. Applications through any other mode are not accepted.',
  },
  {
    question: 'Where do I apply for SSSB Advertisement 13/2026?',
    answer:
      'Only online through the official SSSB Punjab website, https://sssb.punjab.gov.in, using the "Apply Online" link. Applications received in any other way are treated as rejected.',
  },
  {
    question: 'What is the eligibility for SSSB Accountant 2026?',
    answer:
      'Candidates need a B.Com degree (or equivalent) with qualification in the competitive test held by the competent authority, plus either a 120-hour ISO 9001 certified office productivity / IT / DTP course or a computer qualification equivalent to the DOEACC "C" Level certificate. Passing Matriculation with Punjabi is also mandatory.',
  },
  {
    question: 'What is the eligibility for Law Officer and Legal Assistant posts?',
    answer:
      'Law Officer requires a professional Law degree with at least 3 years of experience as an Advocate at the Bar. Legal Assistant in the Higher Education office requires a Law degree with at least 2 years at the Bar, while Legal Assistant in the Punjab Water Supply & Sewerage Board requires a Law degree.',
  },
  {
    question: 'What is the age limit for SSSB Group B posts 2026?',
    answer:
      'Minimum 18 years and maximum 37 years for General category, calculated as on 1 January 2026. The upper limit is 42 years for SC candidates of Punjab, 45 years for State/Central Government employees and 40 years for widows, divorcees and certain categories of married women.',
  },
  {
    question: 'What is the salary for SSSB Accountant, Law Officer and Legal Assistant?',
    answer:
      'The posts carry pay of ₹35,400 (Level-6) as per the 7th Central Pay Commission scale. For Legal Assistant in the Punjab Water Supply & Sewerage Board the scale is ₹35,400–₹1,12,400 (Level-6). Allowances are as per Punjab Finance Department instructions.',
  },
  {
    question: 'What is the application fee for SSSB Advertisement 13/2026?',
    answer:
      'The fee is ₹750 for Scheduled Castes of Punjab only and ₹1,500 for all other categories. The fee is non-refundable in any situation and no fee exemption or concession is given.',
  },
  {
    question: 'What is the selection process for SSSB Group B Recruitment 2026?',
    answer:
      'Selection is through an objective-type (MCQ) written test. The merit list is prepared on the marks in the written test, with each question carrying 1 mark and negative marking of ¼ mark for every wrong answer. Shortlisted candidates are called for counselling and document verification.',
  },
  {
    question: 'Is there negative marking in the SSSB Group B exam?',
    answer:
      'Yes. Each question carries 1 mark and ¼ mark is deducted for every incorrect answer in the written test.',
  },
  {
    question: 'Is Punjabi compulsory for these posts?',
    answer:
      'Yes. Under Rule 17 of the Punjab Civil Services (General and Common Conditions of Service) Rules, 1994, a candidate must have passed Matriculation with Punjabi as a compulsory or elective subject (or an equivalent Punjabi examination).',
  },
  {
    question: 'How can I contact SSSB for help with this recruitment?',
    answer:
      'You can call the Board on 0172-2298000 (Extension 5106 and 5107), 0172-2298083 or the helpline numbers 99885-80229 and 96469-32955 on working days during office hours.',
  },
  {
    question: 'How can I prepare for the SSSB Group B written exam?',
    answer:
      'The syllabus will be released on sssb.punjab.gov.in. Meanwhile, prepare your subject knowledge (Law, Accountancy/Commerce or Civil Drafting as per your post) along with Punjabi, English, reasoning, current affairs and Punjab GK, and practice regular mock tests to handle the negative marking.',
  },
];

const tocItems = [
  { id: 'overview', title: 'SSSB Group B Recruitment 2026 – Overview' },
  { id: 'notice', title: 'Official Notice (Advt. No. 13/2026)' },
  { id: 'vacancies', title: 'Post-wise & Category-wise Vacancies' },
  { id: 'dates', title: 'Important Dates' },
  { id: 'eligibility', title: 'Educational Qualification' },
  { id: 'age-salary', title: 'Age Limit & Salary' },
  { id: 'reservation', title: 'Reservation Rules' },
  { id: 'fee', title: 'Application Fee' },
  { id: 'selection-process', title: 'Selection Process & Marking Scheme' },
  { id: 'how-to-apply', title: 'How to Apply Online' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'disqualification', title: 'Reasons for Rejection' },
  { id: 'preparation', title: 'How to Prepare' },
  { id: 'batch', title: 'Prepare With Elite Academy' },
  { id: 'faq', title: 'Frequently Asked Questions' },
];

const relatedLinks = [
  {
    title: 'PPSC Senior Assistant Exam Postponed (New Date 17 Jan 2027)',
    path: '/blog/ppsc-senior-assistant-exam-postponed-2026',
    description: 'PPSC re-scheduled the Senior Assistant exam from 15 November 2026 to 17 January 2027. Read the official notice.',
  },
  {
    title: 'Punjab District Court Clerk Recruitment 2026',
    path: '/blog/punjab-district-court-clerk-recruitment-2026',
    description: 'SSSC (High Court) Notice 37C/2026: 1,270 Clerk posts in Punjab District Courts. Apply 7 October – 4 November 2026.',
  },
  {
    title: 'SSSB Group C Recruitment 2026',
    path: '/blog/sssb-group-c-recruitment-2026',
    description: 'SSSB Advertisement No. 12/2026: CET-based Group C recruitment for Clerk, Driver, Translator, Stenographer and Field Artist posts.',
  },
  {
    title: 'SSSB Exam Date 2026',
    path: '/blog/sssb-punjab-exam-date-2026',
    description: 'Complete SSSB written exam schedule for Clerk, Group D, Junior Engineer and technical posts — exams from 6 to 25 October 2026.',
  },
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
    title: 'Online Coaching',
    path: '/online-coaching',
    description: 'Online Punjab government exam coaching — live classes, recorded lectures, mock tests and study material.',
  },
];

const cardClass = 'rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20';
const ctaCardClass =
  'rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20';
const thClass = 'border border-slate-700 px-4 py-3 font-semibold';
const tdClass = 'border border-slate-800 px-4 py-3 text-slate-300';

export default function SSSBGroupBRecruitment2026() {
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
    datePublished: '2026-09-30',
    dateModified: '2026-09-30',
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
    datePublished: '2026-09-30',
    dateModified: '2026-09-30',
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

  const ImageCard = ({ src, alt, caption }) => (
    <figure className="space-y-2">
      <button
        type="button"
        onClick={() => openImage(src, alt)}
        style={{ cursor: 'zoom-in' }}
        className="mx-auto flex w-full max-w-[560px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/10 bg-white p-3 shadow-lg shadow-black/20 transition hover:shadow-xl hover:shadow-black/30"
        aria-label={`Open ${alt} in full size`}
      >
        <img src={src} alt={alt} title={alt} loading="lazy" className="mx-auto h-auto w-full object-contain" />
      </button>
      <figcaption className="text-center text-sm text-slate-500">{caption} — click to view in full size</figcaption>
    </figure>
  );

  return (
    <>
      <PageSeo
        path={`/blog/${SLUG}`}
        titleOverride="SSSB Group B Recruitment 2026: Advt. 13/2026 — Accountant, Law Officer, Legal Assistant & Head Draftsman (10 Posts)"
        descriptionOverride={post.description}
        keywords={post.keywords.join(', ')}
        imageUrl={NOTICE_IMAGE}
        publishedTime="2026-09-30"
        modifiedTime="2026-09-30"
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
              <span className="text-slate-200">SSSB Group B Recruitment 2026</span>
            </div>
          </nav>

          {/* Header */}
          <header className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_0.8fr] lg:items-start">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200">
                {post.heroBadge}
              </span>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                SSSB Group B Recruitment 2026: Advertisement No. 13/2026 for Accountant, Law Officer, Legal Assistant &amp; Head Draftsman (10 Posts)
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span>By {post.author}</span>
                <span>•</span>
                <time dateTime="2026-09-30">Published: {post.date}</time>
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
                  How to Apply
                </a>
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Download Notification PDF
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20">
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => openImage(NOTICE_IMAGE, 'SSSB Punjab Group B Recruitment 2026 Advertisement 13/2026 official notice')}
                  style={{ cursor: 'zoom-in' }}
                  className="mx-auto flex w-full max-w-[460px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/10 bg-white p-3 shadow-lg shadow-black/20 transition hover:shadow-xl hover:shadow-black/30 sm:max-w-[420px] lg:max-w-[460px]"
                  aria-label="Open SSSB Group B Recruitment 2026 notice image in full size"
                >
                  <img
                    src={NOTICE_IMAGE}
                    alt="SSSB Punjab Group B Recruitment 2026 Advertisement 13/2026 important dates and vacancy table"
                    title="SSSB Group B Recruitment 2026 — Advertisement No. 13/2026"
                    loading="eager"
                    width={1323}
                    height={2162}
                    className="mx-auto h-auto w-full object-contain"
                  />
                </button>
                <p className="text-center text-sm text-slate-500">Click to view in full size</p>
                <p className="text-sm leading-6 text-slate-400">
                  Official notice — SSSB, Punjab, Advertisement No. 13 of 2026 (10 Group B posts).
                </p>
              </div>
            </div>
          </header>

          {/* Quick Summary */}
          <section className={cardClass} aria-label="Recruitment details at a glance" id="overview">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Quick Overview</p>
              <h2 className="text-2xl font-semibold text-white">SSSB Group B Recruitment 2026 at a Glance</h2>
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
                  SSSB Group B (Accountant / Legal Assistant / Law Officer) Preparation Subjects
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  Applications open tomorrow and close on 22 October — start preparing now for the MCQ-based written test with negative marking.
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
                    Want structured preparation for the SSSB written test?
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
              <section id="introduction" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Introduction</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    The Subordinate Services Selection Board, Punjab (SSSB), Van Complex, Sector-68, SAS Nagar, has
                    released <strong className="text-white">Advertisement No. 13 of 2026</strong> inviting online
                    applications for <strong className="text-white">10 Group B posts</strong> in Punjab Government
                    departments. The posts are Accountant (5), Head Draftsman (2), Legal Assistant (2) and Law
                    Officer (1).
                  </p>
                  <p>
                    Eligible candidates can apply only online on{' '}
                    <strong className="text-white">https://sssb.punjab.gov.in</strong> from{' '}
                    <strong className="text-white">1 October 2026 to 22 October 2026</strong>. The selection is
                    through an objective-type (MCQ) written test with negative marking, followed by counselling and
                    document verification. All posts carry pay in the 7th CPC Level-6 (₹35,400).
                  </p>
                  <p>
                    Since this recruitment has very few vacancies against a large pool of B.Com, Law and Civil
                    Engineering candidates, competition is expected to be tough. This guide explains the official
                    notice in plain English — vacancies, eligibility, age limit, salary, fee, selection process and
                    how to apply. Please verify every detail on the official SSSB Punjab website before applying.
                  </p>
                </div>
              </section>

              {/* CTA #1 */}
              <section className={ctaCardClass}>
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">Only 10 vacancies — every mark counts.</strong>{' '}
                  Start your SSSB Group B written test preparation today. Call{' '}
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

              {/* Official Notice */}
              <section id="notice" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Official Notice: SSSB Advertisement No. 13/2026</h2>
                <p className="mt-4 leading-8 text-slate-300">
                  Below is the first page of the official notice published by SSSB Punjab, showing the key dates and
                  the department-wise, post-wise and category-wise vacancy table. The notice is in Punjabi; we have
                  translated all the details into English in this article.
                </p>
                <div className="mt-6">
                  <ImageCard
                    src={NOTICE_IMAGE}
                    alt="SSSB Advertisement 13 of 2026 official notice showing dates and 10 Group B vacancies"
                    caption="SSSB Advt. No. 13/2026 — key dates and vacancy table"
                  />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-500"
                  >
                    Download Official Notification PDF
                  </a>
                  <a
                    href="https://sssb.punjab.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-5 py-2.5 font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Official Website: sssb.punjab.gov.in
                  </a>
                </div>
              </section>

              {/* Vacancies */}
              <section id="vacancies" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">SSSB Group B Vacancy 2026: Post-wise &amp; Category-wise Details</h2>
                <p className="mt-4 leading-8 text-slate-300">
                  A total of <strong className="text-white">10 posts</strong> are advertised: 7 for General, 1 for
                  SC (Mazhabi &amp; Balmiki) and 2 for SC (Ramdasia &amp; others). Of the 10, 2 posts are reserved
                  for women — both under the Accountant post.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {postsIncluded.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-3"
                    >
                      <span className="text-xl" aria-hidden="true">{item.icon}</span>
                      <span className="text-sm font-medium text-slate-200">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className={thClass}>Department</th>
                        <th className={thClass}>Post</th>
                        <th className={thClass}>General</th>
                        <th className={thClass}>SC (M&amp;B)</th>
                        <th className={thClass}>SC (R&amp;O)</th>
                        <th className={thClass}>Total</th>
                        <th className={thClass}>Women</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vacancyRows.map((row) => (
                        <tr key={`${row.department}-${row.post}`} className="odd:bg-slate-900/50">
                          <td className={tdClass}>{row.department}</td>
                          <td className={`${tdClass} font-semibold text-slate-200`}>{row.post}</td>
                          <td className={tdClass}>{row.general}</td>
                          <td className={tdClass}>{row.scMb}</td>
                          <td className={tdClass}>{row.scRo}</td>
                          <td className={`${tdClass} font-semibold text-slate-200`}>{row.total}</td>
                          <td className={tdClass}>{row.women}</td>
                        </tr>
                      ))}
                      <tr className="bg-blue-600/10">
                        <td className={`${tdClass} font-semibold text-white`} colSpan={2}>Total</td>
                        <td className={`${tdClass} font-semibold text-white`}>7</td>
                        <td className={`${tdClass} font-semibold text-white`}>1</td>
                        <td className={`${tdClass} font-semibold text-white`}>2</td>
                        <td className={`${tdClass} font-semibold text-white`}>10</td>
                        <td className={`${tdClass} font-semibold text-white`}>2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  SC (M&amp;B) = Scheduled Caste (Mazhabi and Balmiki), category code 103. SC (R&amp;O) = Scheduled
                  Caste (Ramdasia and others), category code 104. General category code is 101.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  <strong className="text-slate-300">Important note by the Board:</strong> the reservation and
                  category-wise classification is based on requisitions received from the departments. If a
                  department reduces, increases or withdraws vacancies at any stage, the Board may amend or withdraw
                  the advertisement, and such action applies to all candidates.
                </p>
              </section>

              {/* Dates */}
              <section id="dates" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">SSSB Advertisement 13/2026: Important Dates</h2>
                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className={thClass}>Event</th>
                        <th className={thClass}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importantDates.map((row) => (
                        <tr key={row.event} className="odd:bg-slate-900/50">
                          <td className={tdClass}>{row.event}</td>
                          <td className={`${tdClass} font-semibold text-slate-200`}>{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-500/5 p-5">
                  <p className="leading-7 text-amber-100/90">
                    <strong className="text-amber-300">Deadline alert:</strong> both the online application and the
                    fee payment must be completed by <strong>22 October 2026</strong>. Do not wait for the last day —
                    portals get slow near the deadline.
                  </p>
                </div>
              </section>

              {/* CTA #2 */}
              <section className={ctaCardClass}>
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">Negative marking of ¼ per wrong answer</strong> makes accuracy
                  as important as speed. Practice with{' '}
                  <Link to="/test-series" className="font-semibold text-blue-300 underline hover:text-blue-200">
                    Elite Academy&apos;s mock tests
                  </Link>{' '}
                  to build both before the exam date is announced.
                </p>
              </section>

              {/* Eligibility */}
              <section id="eligibility" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">SSSB Group B Eligibility 2026: Educational Qualification</h2>
                <p className="mt-4 leading-8 text-slate-300">
                  Qualifications are post-specific. As per Punjab Government notification dated 21 January 2026, the
                  cut-off date for minimum educational and other qualifications is the{' '}
                  <strong className="text-white">last date of submission of application forms (22 October 2026)</strong>.
                  You must possess the required qualification on or before that date.
                </p>
                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className={thClass}>Post</th>
                        <th className={thClass}>Educational / Technical Qualification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eligibilityRows.map((row) => (
                        <tr key={row.post} className="odd:bg-slate-900/50 align-top">
                          <td className={`${tdClass} font-semibold text-slate-200`}>{row.post}</td>
                          <td className={tdClass}>{row.qualification}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 rounded-2xl border border-blue-400/40 bg-blue-600/10 p-5">
                  <h3 className="font-semibold text-blue-200">Punjabi knowledge is mandatory (all posts)</h3>
                  <p className="mt-2 leading-7 text-blue-50">
                    Under Rule 17 of the Punjab Civil Services (General and Common Conditions of Service) Rules, 1994,
                    no person can be appointed by direct recruitment unless they have passed Matriculation with
                    Punjabi as a compulsory or elective subject, or an equivalent Punjabi examination specified by
                    the Government.
                  </p>
                </div>
                <div className="mt-6">
                  <ImageCard
                    src={QUALIFICATION_IMAGE}
                    alt="SSSB Advertisement 13/2026 educational and technical qualification table for Head Draftsman, Law Officer, Legal Assistant and Accountant"
                    caption="Official qualification table from the notice"
                  />
                </div>
              </section>

              {/* Age + Salary */}
              <section id="age-salary" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Age Limit &amp; Salary</h2>
                <p className="mt-4 leading-8 text-slate-300">
                  Age is calculated as on <strong className="text-white">1 January 2026</strong>, as per Punjab
                  Government instructions.
                </p>
                <div className="mt-4 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className={thClass}>Category</th>
                        <th className={thClass}>Age Limit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ageLimits.map((row) => (
                        <tr key={row.category} className="odd:bg-slate-900/50">
                          <td className={tdClass}>{row.category}</td>
                          <td className={`${tdClass} font-semibold text-slate-200`}>{row.limit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-slate-400">
                  State and Central Government employees claiming age relaxation must submit an NOC from their
                  department at the time of counselling.
                </p>

                <h3 className="mt-8 text-xl font-semibold text-white">SSSB Group B Salary 2026 (7th CPC)</h3>
                <div className="mt-4 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className={thClass}>Post</th>
                        <th className={thClass}>Pay Scale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salaryRows.map((row) => (
                        <tr key={row.post} className="odd:bg-slate-900/50">
                          <td className={tdClass}>{row.post}</td>
                          <td className={`${tdClass} font-semibold text-slate-200`}>{row.pay}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-slate-400">
                  Pay and allowances are governed by the Punjab Finance Department (Personnel-1 Branch) letters dated
                  15 January 2015 and 4 October 2016, and any other instructions issued from time to time.
                </p>
              </section>

              {/* Reservation */}
              <section id="reservation" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Reservation Rules You Must Know</h2>
                <ul className="mt-4 ml-5 list-disc space-y-3 text-[1rem] leading-8 text-slate-300">
                  <li>Fill the online form carefully as per your category and category code — the category or code <strong className="text-white">cannot be changed at any stage</strong>.</li>
                  <li>Reservation benefit is available <strong className="text-white">only to residents of Punjab</strong>. Your eligibility is judged on the category and code entered in the form.</li>
                  <li>Every candidate (male or female, of any category) must upload a <strong className="text-white">Punjab domicile / residence certificate</strong>, not older than 5 years at the time of submission.</li>
                  <li>The Scheduled Caste certificate must be as per the Punjab Government&apos;s prevailing instructions.</li>
                  <li>Women candidates get reservation as per The Punjab Civil Services (Reservation of Posts for Women) Rules, 2020 (G.S.R. 87/Const./Art.309 and 15/2020 dated 21.10.2020) and later amendments.</li>
                  <li>Punjab Government instructions issued from time to time apply to candidates of the De-notified Tribes category, and the merit of sportspersons is prepared as per the Sports Department, Punjab notification dated 09.03.2026.</li>
                  <li>Valid category certificates must be produced at counselling and any other stage on the Board&apos;s demand. If not produced, the candidate will not be considered and the next eligible candidate in the merit list will be recommended.</li>
                  <li>Candidates applying for Legal Assistant will be asked for their <strong className="text-white">department preference later</strong>.</li>
                </ul>
              </section>

              {/* Fee */}
              <section id="fee" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">SSSB Advertisement 13/2026: Application Fee</h2>
                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className={thClass}>Category</th>
                        <th className={thClass}>Total Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="odd:bg-slate-900/50">
                        <td className={tdClass}>Scheduled Castes of Punjab State only</td>
                        <td className={`${tdClass} font-semibold text-slate-200`}>₹750</td>
                      </tr>
                      <tr className="odd:bg-slate-900/50">
                        <td className={tdClass}>All other categories</td>
                        <td className={`${tdClass} font-semibold text-slate-200`}>₹1,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="mt-4 ml-5 list-disc space-y-2 text-slate-300">
                  <li>The fee, once paid, is <strong className="text-white">non-refundable in any situation</strong>.</li>
                  <li>No fee waiver or concession is given to any candidate; without fee payment the application is treated as incomplete and rejected.</li>
                  <li>If an online transaction fails, the application is not considered submitted and the amount paid is non-refundable.</li>
                  <li>Fee paid through any mode other than the online portal is invalid.</li>
                </ul>
              </section>

              {/* Selection */}
              <section id="selection-process" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">SSSB Group B Selection Process &amp; Marking Scheme</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <ol className="ml-5 list-decimal space-y-2">
                    <li><strong className="text-white">Written test:</strong> Objective type (Multiple Choice Questions) for candidates who apply successfully.</li>
                    <li><strong className="text-white">Marking:</strong> 1 mark per question; <strong className="text-white">¼ mark deducted</strong> for each wrong answer (negative marking).</li>
                    <li><strong className="text-white">Merit list:</strong> Prepared on the marks obtained in the written test.</li>
                    <li><strong className="text-white">Counselling / document verification:</strong> Candidates are called in merit order as per category-wise vacancies. Successful candidates are recommended to the concerned department.</li>
                  </ol>
                  <p>
                    <strong className="text-white">Tie-breaker rules:</strong> if candidates score equal marks, the older candidate (by date of birth) is ranked higher. If age is also equal, the candidate with the higher percentage in the required qualification is preferred, and if still tied, the candidate with higher Matriculation marks gets the higher rank.
                  </p>
                  <p>
                    Being called for the exam, appearing in the merit list or being called for counselling does not give any right to be recommended. Recommendation is made only after all eligibility conditions are verified, and the Board&apos;s decision is final. Roll numbers, the syllabus and other information will be published on the SSSB website from time to time — <strong className="text-white">no candidate is informed individually</strong>. No TA/DA is paid for the written test or counselling.
                  </p>
                </div>
                <div className="mt-6">
                  <ImageCard
                    src={FEE_IMAGE}
                    alt="SSSB Advertisement 13/2026 application fee, negative marking and selection process details"
                    caption="Official fee and selection process details from the notice"
                  />
                </div>
              </section>

              {/* How to Apply */}
              <section id="how-to-apply" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">How to Apply Online for SSSB Advertisement 13/2026</h2>
                <ol className="mt-4 ml-5 list-decimal space-y-3 text-[1rem] leading-8 text-slate-300">
                  {applySteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <h3 className="font-semibold text-white">Important instructions for applicants</h3>
                  <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-300">
                    <li>A saved draft can be reopened from <em>Menu &gt; View Status of Application &gt; View Incomplete Application</em>, then completed and submitted.</li>
                    <li>Once the form is submitted, <strong className="text-white">no correction is allowed</strong> and no request for changes will be accepted later.</li>
                    <li>Apply personally — do not depend on a cyber café attendant or any other person. Errors in the form are the candidate&apos;s responsibility.</li>
                    <li>Upload certificates in PDF format as specified on the portal.</li>
                    <li>Take a print-out of the submitted application. The application is valid only after successful fee payment.</li>
                  </ul>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://sssb.punjab.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-500"
                  >
                    Go to sssb.punjab.gov.in
                  </a>
                  <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-5 py-2.5 font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Download Notification PDF
                  </a>
                </div>
              </section>

              {/* Documents */}
              <section id="documents" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Documents Required to Apply</h2>
                <ul className="mt-4 ml-5 list-disc space-y-2 text-[1rem] leading-8 text-slate-300">
                  {documentsChecklist.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-400">
                  At counselling, original certificates for qualification, technical qualification and reservation,
                  along with attested copies, must be produced. If a required document is not available, the
                  candidate will not be considered and the next eligible candidate will be recommended.
                </p>
              </section>

              {/* Disqualification */}
              <section id="disqualification" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Reasons Your Application Can Be Rejected</h2>
                <ul className="mt-4 ml-5 list-disc space-y-2 text-[1rem] leading-8 text-slate-300">
                  <li>Full fee not received or not paid in the prescribed manner</li>
                  <li>Incomplete or incorrect information in the application form</li>
                  <li>Online application process not completed</li>
                  <li>Candidate previously debarred by SSSB or any other institution</li>
                  <li>Not fulfilling the educational qualification, age, reservation or other recruitment conditions</li>
                  <li>Applying by any process other than the online process on https://sssb.punjab.gov.in</li>
                  <li>Applying under a category / code for which no vacancy is advertised</li>
                  <li>Application from a candidate working under the Central/State Government not being received through proper channel, as applicable</li>
                </ul>
              </section>

              {/* Preparation */}
              <section id="preparation" className={ctaCardClass}>
                <h2 className="text-2xl font-semibold text-white">How to Prepare for the SSSB Group B Written Test</h2>
                <div className="mt-3 max-w-2xl space-y-4 leading-8 text-slate-300">
                  <p>
                    With only 10 vacancies, the merit cut-off is likely to be high. The syllabus will be published on
                    the SSSB website, but a smart plan can start today: build your core subject knowledge (Law for
                    Legal Assistant and Law Officer, Accountancy and Commerce for Accountant, Civil Engineering and
                    drafting basics for Head Draftsman) alongside Punjabi, English, reasoning, current affairs and
                    Punjab GK.
                  </p>
                  <p>
                    Because every wrong answer costs ¼ mark, practise attempting questions with accuracy — take
                    timed mock tests, analyse your mistakes and revise regularly.
                  </p>
                </div>
              </section>

              {/* Batch / Elite Academy CTA */}
              <section id="batch" className={ctaCardClass}>
                <h2 className="text-2xl font-semibold text-white">
                  Prepare for SSSB Group B Recruitment 2026 With Elite Academy
                </h2>
                <p className="mt-3 max-w-2xl leading-8 text-slate-300">
                  With the application window open only until 22 October 2026, structured preparation can make the
                  difference. Elite Academy helps Punjab Government exam aspirants prepare through:
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
                        <Link to="/crash-course" className="text-blue-300 underline hover:text-blue-200">
                          Crash course
                        </Link>{' '}
                        for fast, focused revision
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-base leading-7 text-slate-200">
                    Applying under Advertisement No. 13/2026? Don&apos;t wait for the exam date — start structured
                    preparation now. Call{' '}
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
              <section className={cardClass}>
                <h2 className="text-xl font-semibold text-white">
                  Practice for SSSB Group B Recruitment on the Elite Academy App
                </h2>
                <p className="mt-3 leading-8 text-slate-300">
                  Alongside classroom and online batches, the Elite Academy app gives you Punjab government exam
                  mock tests and practice resources on your phone — useful for revising general knowledge,
                  reasoning, current affairs and Punjabi language topics commonly tested in SSSB exams.
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

              {/* Help */}
              <section className={cardClass}>
                <h2 className="text-xl font-semibold text-white">SSSB Helpline for Advertisement 13/2026</h2>
                <p className="mt-3 leading-8 text-slate-300">
                  For queries about this recruitment, contact the Board on working days during office hours:
                  0172-2298000 (Extension 5106 and 5107), 0172-2298083, or helpline numbers 99885-80229 and
                  96469-32955.
                </p>
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
                  Applying for SSSB Group B Recruitment 2026? Apply by 22 October and start preparing today.
                </h2>
                <p className="mx-auto mt-3 max-w-2xl leading-8 text-slate-200">
                  Classroom coaching, online batches, mock tests and the Elite Academy app — everything you need to
                  prepare for the SSSB written test.
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
                  <span className="font-semibold text-slate-400">Last updated:</span> 30 September 2026, based on the
                  official SSSB Punjab notice for Advertisement No. 13 of 2026 (signed 29 September 2026). This
                  article is an English summary of the Punjabi notice; candidates should verify all details from the
                  official SSSB Punjab website, https://sssb.punjab.gov.in, before applying.
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
                  <Link to="/psssb-coaching" className="block hover:text-blue-300">PSSSB Coaching →</Link>
                  <Link to="/online-coaching" className="block hover:text-blue-300">Online Coaching →</Link>
                  <Link to="/test-series" className="block hover:text-blue-300">Test Series →</Link>
                  <Link to="/crash-course" className="block hover:text-blue-300">Crash Course →</Link>
                  <Link to="/contact-us" className="block hover:text-blue-300">Contact Us →</Link>
                </div>
              </section>

              <section className={ctaCardClass}>
                <h2 className="text-lg font-semibold text-white">Last Date: 22 October 2026</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  10 Group B posts. Apply online from 1 October. Fee ₹1,500 (₹750 SC Punjab).
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
              <p className="font-semibold text-white">SSSB Group B Recruitment 2026 — Advertisement No. 13/2026</p>
              <p className="mt-1 text-slate-400">Subordinate Services Selection Board, Punjab</p>
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
