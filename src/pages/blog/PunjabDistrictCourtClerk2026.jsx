import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';
import { getFaqSchema, getOrganizationSchema } from '../../config/structuredData';
import { getCanonicalUrl } from '../../config/publicSeo';

const SLUG = 'punjab-district-court-clerk-recruitment-2026';
const NOTICE_IMAGE = '/punjab-district-court-clerk-2026-notice.png';
const AGE_IMAGE = '/punjab-district-court-clerk-2026-age-qualification.png';
const FEE_IMAGE = '/punjab-district-court-clerk-2026-fee.png';
const EXAM_IMAGE = '/punjab-district-court-clerk-2026-exam-pattern.png';
const PDF_URL = '/punjab-district-court-clerk-2026-notification.pdf';

const PHONE_PRIMARY = '7696954686';
const PHONE_SECONDARY = '9988414686';

const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.johnnykhore.eliteacademy&hl=en_IN';
const IOS_APP_URL = 'https://apps.apple.com/in/app/elite-academy-mock-tests/id6746954938';

const post = {
  slug: SLUG,
  title:
    'Punjab District Court Clerk Recruitment 2026: 1,270 Vacancies, Eligibility, Salary, Exam Pattern & Last Date (SSSC Notice)',
  description:
    'Punjab & Haryana High Court (SSSC) Clerk Recruitment 2026: 1,270 Clerk vacancies in Punjab District Courts. Apply online at sssc.gov.in from 7 October to 4 November 2026. Graduate eligibility, salary ₹29,200 (Level-5), fee, CBT exam pattern and typing test.',
  date: '3 October 2026',
  updatedDate: '3 October 2026',
  readingTime: '11 min read',
  author: 'Elite Academy Editorial Team',
  category: 'Punjab Court Recruitment',
  heroBadge: 'New Notice: 1,270 Posts',
  keywords: [
    'Punjab District Court Clerk Recruitment 2026',
    'Punjab High Court Clerk Recruitment 2026',
    'SSSC Clerk Recruitment 2026',
    'Punjab and Haryana High Court Clerk Vacancy 2026',
    'District Court Clerk 1270 Posts Punjab',
    'SSSC Punjab Clerk Notification 2026',
    'sssc.gov.in Clerk Recruitment 2026',
    'Punjab Court Clerk Recruitment 2026 Apply Online',
    'Punjab Court Clerk Salary 29200',
    'Punjab District Court Clerk Exam Pattern 2026',
    'Punjab Court Clerk Typing Test 30 WPM',
    'Punjab Court Clerk Last Date 4 November 2026',
    'Detailed Employment Notice 37C/SSSC/PB/2026',
    'Punjab Court Clerk Eligibility Graduate',
    'Punjab Court Clerk Syllabus 2026',
    'Punjab Court Clerk Notification PDF',
  ],
  tags: [
    'Punjab District Court Clerk 2026',
    'SSSC Clerk Recruitment',
    'Punjab High Court Jobs',
    'Punjab Government Clerk Jobs',
  ],
};

const quickSummaryItems = [
  { label: 'Recruiting Body', value: 'SSSC, High Court of Punjab & Haryana', highlight: false },
  { label: 'Notice No.', value: '37C/SSSC/PB/2026', highlight: false },
  { label: 'Post', value: 'Clerk, District Courts of Punjab', highlight: true },
  { label: 'Total Vacancies', value: '1,270 Posts', highlight: true },
  { label: 'Apply Online From', value: '7 October 2026, 4:00 PM', highlight: true },
  { label: 'Last Date', value: '4 November 2026, 4:00 PM', highlight: true },
  { label: 'Salary', value: '₹29,200 (Level-5)', highlight: false },
  { label: 'Qualification', value: 'Graduate (BA/BSc) + Punjabi + Computer', highlight: false },
];

const vacancyRows = [
  { cat: 'Un-reserved (UR) / General', men: '201', women: '71', aMen: '7', aWomen: '3' },
  { cat: 'Economically Weaker Sections (EWS) of Punjab', men: '96', women: '45', aMen: '1', aWomen: '1' },
  { cat: 'SC of Punjab — Balmikis / Mazhbi Sikhs', men: '99', women: '70', aMen: '0', aWomen: '1' },
  { cat: 'SC of Punjab — Others', men: '83', women: '60', aMen: '4', aWomen: '0' },
  { cat: 'Backward Classes (BC) / OBC of Punjab', men: '69', women: '64', aMen: '4', aWomen: '2' },
  { cat: 'Freedom Fighter of Punjab', men: '11', women: '9', aMen: '-', aWomen: '-' },
  { cat: 'Sportsman of Punjab — General', men: '8', women: '18', aMen: '-', aWomen: '-' },
  { cat: 'Sportsman of Punjab — SC', men: '22', women: '-', aMen: '1', aWomen: '-' },
  { cat: 'PwBD — (a) Low Vision (LV)', men: '14', women: '8', aMen: '-', aWomen: '-' },
  { cat: 'PwBD — (b) Hard of Hearing (HH)', men: '10', women: '8', aMen: '-', aWomen: '2' },
  { cat: 'PwBD — (c) Locomotor / Dwarfism / Acid Attack / Spinal Deformity etc.', men: '8', women: '7', aMen: '-', aWomen: '-' },
  { cat: 'PwBD — (d) SLD, MI & (e) Multiple Disabilities', men: '10', women: '5', aMen: '-', aWomen: '-' },
  { cat: 'Ex-Servicemen of Punjab — General', men: '55', women: '85', aMen: '-', aWomen: '-' },
  { cat: 'Ex-Servicemen — SC (Balmikis / Mazhbi Sikhs)', men: '36', women: '-', aMen: '-', aWomen: '-' },
  { cat: 'Ex-Servicemen — SC (Others)', men: '36', women: '-', aMen: '1', aWomen: '-' },
  { cat: 'Ex-Servicemen — BC / OBC', men: '35', women: '-', aMen: '-', aWomen: '-' },
];

const importantDates = [
  { event: 'Detailed Employment Notice No.', date: '37C/SSSC/PB/2026' },
  { event: 'Notice Date', date: '3 October 2026' },
  { event: 'Online Application Opens', date: '7 October 2026, 4:00 PM' },
  { event: 'Online Application Closes (Last Date)', date: '4 November 2026, 4:00 PM' },
  { event: 'Vacancies Counted As On', date: '31 August 2026 (+ anticipated up to 28 February 2027)' },
  { event: 'Age Calculated As On', date: '1 January 2026' },
  { event: 'Exam Date', date: 'To be notified on www.sssc.gov.in' },
];

const ageRows = [
  { cat: 'Unreserved / General', range: '18 – 37 years', relax: '—' },
  { cat: 'Scheduled Caste (SC) of Punjab', range: '18 – 42 years', relax: '5 years' },
  { cat: 'BC / OBC of Punjab', range: '18 – 42 years', relax: '5 years' },
  { cat: 'Persons with Benchmark Disabilities (PwBD) of Punjab', range: '18 – 47 years', relax: '10 years' },
  { cat: 'Ex-Servicemen of Punjab', range: 'Minimum 18 years', relax: 'Years of military service + 3 years' },
  { cat: 'In-service employees (Punjab/Haryana Govt., other State Govt., Govt. of India, High Court, subordinate courts, UT Chandigarh)', range: '18 – 45 years', relax: 'Upper limit 45 years' },
];

const feeRows = [
  { cat: 'SC / BC / OBC / ESM / EWS of Punjab', facilitation: '₹550', exam: '₹160', total: '₹710' },
  { cat: 'Persons with Benchmark Disabilities (PwBD) of Punjab', facilitation: '₹550', exam: '₹325', total: '₹875' },
  { cat: 'All other categories', facilitation: '₹550', exam: '₹650', total: '₹1,200' },
];

const examPattern = [
  { subject: 'General Knowledge', type: 'Objective (MCQ)', detail: '50 questions × 1 mark', marks: '50' },
  { subject: 'English Composition', type: 'Objective (MCQ)', detail: '20 questions × 1 mark', marks: '20' },
  {
    subject: 'English Composition',
    type: 'Subjective (typed on computer)',
    detail: 'Essay (150 words) 10 marks, Letter 5 marks, Précis 5 marks, Translation from Punjabi to English 10 marks',
    marks: '30',
  },
];

const prepSubjects = [
  { icon: '📖', label: 'General Knowledge' },
  { icon: '📰', label: 'Current Affairs' },
  { icon: '🗺️', label: 'Punjab GK' },
  { icon: '🇬🇧', label: 'English Composition' },
  { icon: '✍️', label: 'Essay & Letter Writing' },
  { icon: '📘', label: 'Punjabi to English Translation' },
  { icon: '⌨️', label: 'English Typing (30 WPM)' },
  { icon: '📊', label: 'Spreadsheet (MS Excel)' },
];

const documentsChecklist = [
  'Graduation (BA / BSc or equivalent) degree and marksheets from a recognized university — required on or before the closing date',
  'Matriculation certificate showing Punjabi as one of the subjects',
  'Recent passport-size photograph on a white background (not more than one month old) and scanned signature',
  'A real-time (live webcam) photograph captured while filling the form — your device must have an inbuilt or attached camera',
  'Category certificates issued by the competent authority of Punjab, valid on the closing date (SC, BC/OBC, EWS, Ex-Servicemen, Freedom Fighter, Sportsman, PwBD)',
  'BC candidates: undertaking that there is no change in status and that they do not fall in the creamy layer, as and when required',
  'EWS candidates: latest Income & Assets certificate valid for 2026-27, based on family income for FY 2025-26',
  'Sportsman: valid Gradation Certificate; PwBD: latest disability certificate; Transgender applicants: certificate of identity from District Magistrate',
  'NOC from Head of Office / Department for serving government employees (to be produced when called for)',
  'Valid personal email ID, active mobile number, and online payment facility (net banking, debit card, credit card or UPI)',
];

const applySteps = [
  'Visit the official SSSC website www.sssc.gov.in and open the application for "Clerk, District Courts of Punjab".',
  'Complete the Registration form with a valid personal email ID and active mobile number — all updates and SMS will be sent to these, so do not change them later.',
  'Fill in the Application Form with your category and sub-category carefully. Capture the real-time photograph using your webcam, then upload your scanned passport-size photo (white background, not more than a month old) and signature.',
  'Upload the required documents, check every detail, and pay the fee online (net banking, debit/credit card or UPI). The form is treated as submitted only after fee payment.',
  'Take a print-out of the submitted form and keep five copies of the uploaded photograph for later stages.',
];

const faqs = [
  {
    question: 'What is the Punjab District Court Clerk Recruitment 2026?',
    answer:
      'The Society for Centralized Recruitment of Staff in Subordinate Courts (SSSC) under the High Court of Punjab and Haryana, on behalf of the District and Sessions Judges in Punjab, has invited online applications for 1,270 posts of Clerk in the District Courts of Punjab through direct recruitment (Detailed Employment Notice No. 37C/SSSC/PB/2026 dated 3 October 2026).',
  },
  {
    question: 'How many vacancies are there for Punjab District Court Clerk 2026?',
    answer:
      'A total of 1,270 Clerk posts: 1,243 vacancies as on 31 August 2026 and 27 anticipated vacancies up to 28 February 2027. The number of vacancies may increase or decrease without notice, and the number of candidates to be recommended is decided by the Hon\'ble High Court.',
  },
  {
    question: 'What is the last date to apply for Punjab District Court Clerk 2026?',
    answer:
      'Online applications open on 7 October 2026 at 4:00 PM and close on 4 November 2026 at 4:00 PM. No relief is given after the cut-off date under any circumstances, so apply well before the deadline.',
  },
  {
    question: 'Where do I apply for the Punjab Court Clerk recruitment?',
    answer:
      'Only online at the official SSSC website, www.sssc.gov.in, under "Clerk, District Courts of Punjab". Applications through any other mode are not accepted.',
  },
  {
    question: 'What is the qualification required for Punjab Court Clerk?',
    answer:
      'A Bachelor of Arts or Bachelor of Science degree (or equivalent) from a recognized university, Matriculation with Punjabi as one of the subjects, and proficiency in operating computers. The qualification must be held on the closing date of the online application (4 November 2026).',
  },
  {
    question: 'What is the age limit for Punjab District Court Clerk 2026?',
    answer:
      'Minimum 18 years and maximum 37 years as on 1 January 2026. The upper limit is relaxed by 5 years for SC and BC/OBC of Punjab (42 years), by 10 years for PwBD of Punjab (47 years), and is 45 years for in-service government employees. Ex-Servicemen get relaxation equal to their military service plus 3 years.',
  },
  {
    question: 'What is the salary of a Punjab District Court Clerk?',
    answer:
      'The pay scale for fresh recruits appointed on or after 17 July 2020 is ₹29,200 (Level-5) for graduates, as per the Punjab Government letter dated 12 September 2024 adopted by the High Court.',
  },
  {
    question: 'What is the application fee for the Punjab Court Clerk exam?',
    answer:
      'SC/BC/OBC/ESM/EWS of Punjab pay ₹710 (₹550 facilitation + ₹160 exam fee). PwBD of Punjab pay ₹875 (₹550 + ₹325). All other categories pay ₹1,200 (₹550 + ₹650). The fee is paid online and is non-refundable.',
  },
  {
    question: 'What is the exam pattern for Punjab District Court Clerk 2026?',
    answer:
      'A 2-hour Computer Based Test of 100 marks: General Knowledge (50 MCQs, 50 marks) and English Composition (20 MCQs for 20 marks plus a 30-mark subjective part with Essay, Letter, Précis and Punjabi-to-English Translation). Candidates need 33% in each subject and 40% in aggregate. Each wrong MCQ answer carries a ¼ mark negative.',
  },
  {
    question: 'Is there a typing test for Punjab District Court Clerk?',
    answer:
      'Yes. Candidates who qualify the written CBT are called for a Computer Proficiency Test (CPT) of qualifying nature: a 10-mark Spreadsheet Test (10 minutes, 40% i.e. 4 marks needed) and an English Computer Typing Test at 30 WPM, calculated as (words typed − mistakes) ÷ 10. CPT marks are not counted in the final merit.',
  },
  {
    question: 'How is the final merit list prepared?',
    answer:
      'The select list is prepared strictly on merit in the online written examination (CBT). In case of a tie, the elder candidate ranks higher, and if date of birth is also the same, candidates are placed alphabetically (A–Z). Qualified candidates then go through original document verification/interaction.',
  },
  {
    question: 'Will the exam be held on one day? Is there normalization?',
    answer:
      'The CBT may be held on different dates for different sets of candidates. If held in multiple shifts, scores of the objective part are normalized using the Standard Deviation method. Test centres can be anywhere in Northern India and the dates will be notified on www.sssc.gov.in only.',
  },
  {
    question: 'Can candidates from other states apply?',
    answer:
      'Reservation, age relaxation and fee concession are available to residents of Punjab only. Applicants from other states must apply under the Un-reserved (UR)/General category. All selected candidates must give an undertaking to work anywhere in Punjab where posted.',
  },
  {
    question: 'How can I contact SSSC for help?',
    answer:
      'For technical queries on the application form, call +91 95948-04606 or 022-61087580 (9:00 AM to 5:00 PM, working days). For queries on the terms and conditions of the advertisement, call 0172-2722012 or +91 91158-98394 (9:30 AM to 5:00 PM, working days).',
  },
  {
    question: 'How can I prepare for the Punjab District Court Clerk exam?',
    answer:
      'Focus on General Knowledge (including Punjab GK and current affairs), English composition (essay, letter, précis and Punjabi-to-English translation) and practise English typing at 30 WPM along with spreadsheet basics. Regular mock tests help with the ¼ negative marking.',
  },
];

const tocItems = [
  { id: 'overview', title: 'Punjab District Court Clerk 2026 – Overview' },
  { id: 'notice', title: 'Official Notice (No. 37C/SSSC/PB/2026)' },
  { id: 'dates', title: 'Important Dates' },
  { id: 'vacancies', title: 'Category-wise Vacancies (1,270 Posts)' },
  { id: 'eligibility', title: 'Eligibility & Qualification' },
  { id: 'age', title: 'Age Limit & Relaxation' },
  { id: 'salary', title: 'Pay Scale & Salary' },
  { id: 'fee', title: 'Application Fee' },
  { id: 'exam-pattern', title: 'Exam Pattern (CBT)' },
  { id: 'cpt', title: 'Computer Proficiency & Typing Test' },
  { id: 'selection-process', title: 'Selection Process & Merit' },
  { id: 'how-to-apply', title: 'How to Apply Online' },
  { id: 'documents', title: 'Documents Required' },
  { id: 'instructions', title: 'Important Instructions' },
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
    title: 'Punjab Clerk Recruitment 2026 (SSSB)',
    path: '/blog/punjab-clerk-recruitment-2026',
    description: 'SSS Board Advertisement 02/2026: 531 Clerk (Common Cadre) vacancies, application dates and official notification PDF.',
  },
  {
    title: 'SSSB Group B Recruitment 2026',
    path: '/blog/sssb-group-b-recruitment-2026',
    description: 'SSSB Advertisement 13/2026: 10 Group B posts — Accountant, Law Officer, Legal Assistant and Head Draftsman. Apply 1–22 October 2026.',
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
    title: 'Punjabi & English Typing Course',
    path: '/punjabi-typing',
    description: 'Typing speed and accuracy training for Clerk posts — build the 30 WPM English typing speed needed for the court clerk typing test.',
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

export default function PunjabDistrictCourtClerk2026() {
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
    datePublished: '2026-10-03',
    dateModified: '2026-10-03',
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
    datePublished: '2026-10-03',
    dateModified: '2026-10-03',
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
        titleOverride="Punjab District Court Clerk Recruitment 2026: 1,270 Vacancies, Eligibility, Salary, Exam Pattern & Last Date"
        descriptionOverride={post.description}
        keywords={post.keywords.join(', ')}
        imageUrl={NOTICE_IMAGE}
        publishedTime="2026-10-03"
        modifiedTime="2026-10-03"
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
              <span className="text-slate-200">Punjab District Court Clerk Recruitment 2026</span>
            </div>
          </nav>

          {/* Header */}
          <header className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_0.8fr] lg:items-start">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200">
                {post.heroBadge}
              </span>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Punjab District Court Clerk Recruitment 2026: 1,270 Vacancies, Eligibility, Salary, Exam Pattern &amp; Last Date
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span>By {post.author}</span>
                <span>•</span>
                <time dateTime="2026-10-03">Published: {post.date}</time>
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
                  onClick={() => openImage(NOTICE_IMAGE, 'Punjab District Court Clerk Recruitment 2026 official notice by SSSC, High Court of Punjab and Haryana')}
                  style={{ cursor: 'zoom-in' }}
                  className="mx-auto flex w-full max-w-[460px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/10 bg-white p-3 shadow-lg shadow-black/20 transition hover:shadow-xl hover:shadow-black/30 sm:max-w-[420px] lg:max-w-[460px]"
                  aria-label="Open Punjab District Court Clerk Recruitment 2026 notice image in full size"
                >
                  <img
                    src={NOTICE_IMAGE}
                    alt="Punjab District Court Clerk Recruitment 2026 notice showing 1270 vacancies, opening and closing dates"
                    title="Punjab District Court Clerk Recruitment 2026 — SSSC Notice 37C/SSSC/PB/2026"
                    loading="eager"
                    width={1281}
                    height={2149}
                    className="mx-auto h-auto w-full object-contain"
                  />
                </button>
                <p className="text-center text-sm text-slate-500">Click to view in full size</p>
                <p className="text-sm leading-6 text-slate-400">
                  Official notice — SSSC, High Court of Punjab &amp; Haryana, No. 37C/SSSC/PB/2026, dated 3 October 2026.
                </p>
              </div>
            </div>
          </header>

          {/* Quick Summary */}
          <section className={cardClass} aria-label="Recruitment details at a glance" id="overview">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Quick Overview</p>
              <h2 className="text-2xl font-semibold text-white">Punjab District Court Clerk Recruitment 2026 at a Glance</h2>
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
                  Punjab District Court Clerk Exam Preparation Subjects
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  A 100-mark computer based test plus a mandatory typing test — start preparing for each stage now.
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
                    Want structured preparation for the Punjab Court Clerk exam?
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
                    The <strong className="text-white">Society for Centralized Recruitment of Staff in Subordinate Courts (SSSC)</strong>{' '}
                    under the High Court of Punjab and Haryana at Chandigarh, acting on behalf of the District and
                    Sessions Judges in Punjab, has released its Detailed Employment Notice No. 37C/SSSC/PB/2026
                    dated 3 October 2026. It invites online applications for{' '}
                    <strong className="text-white">1,270 posts of Clerk</strong> in the District Courts of Punjab
                    through direct recruitment.
                  </p>
                  <p>
                    Applications open on <strong className="text-white">7 October 2026 (4:00 PM)</strong> and close on{' '}
                    <strong className="text-white">4 November 2026 (4:00 PM)</strong> at{' '}
                    <strong className="text-white">www.sssc.gov.in</strong>. Any graduate who has studied Punjabi up
                    to Matriculation and has computer proficiency can apply. The post carries a pay scale of
                    ₹29,200 (Level-5).
                  </p>
                  <p>
                    Selection is through a 100-mark Computer Based Test (General Knowledge and English Composition),
                    followed by a qualifying Computer Proficiency Test (spreadsheet and 30 WPM English typing) and
                    document verification. This is a separate recruitment from the SSSB Clerk exam — it is for
                    court establishments, run by the High Court. Read the full details below, translated and
                    simplified from the official notice.
                  </p>
                </div>
              </section>

              {/* CTA #1 */}
              <section className={ctaCardClass}>
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">1,270 vacancies, one CBT, one typing test.</strong>{' '}
                  Begin your Punjab Court Clerk preparation today. Call{' '}
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
                <h2 className="text-2xl font-semibold text-white">Official Notice: SSSC Detailed Employment Notice 37C/SSSC/PB/2026</h2>
                <p className="mt-4 leading-8 text-slate-300">
                  Below is the first page of the official notice, showing the opening and closing dates and the
                  category-wise vacancy table for 1,270 Clerk posts in the District Courts of Punjab.
                </p>
                <div className="mt-6">
                  <ImageCard
                    src={NOTICE_IMAGE}
                    alt="SSSC Detailed Employment Notice 37C/SSSC/PB/2026 for Clerk posts in District Courts of Punjab"
                    caption="First page of the official SSSC notice"
                    onOpen={openImage}
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
                    href="https://www.sssc.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-5 py-2.5 font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Official Website: sssc.gov.in
                  </a>
                </div>
              </section>

              {/* Dates */}
              <section id="dates" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Punjab District Court Clerk 2026: Important Dates</h2>
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
                    <strong className="text-amber-300">Deadline alert:</strong> the cut-off date is sacrosanct —
                    relief to apply after <strong>4 November 2026, 4:00 PM</strong> will not be granted under any
                    circumstance. Avoid last-day website jams and apply early.
                  </p>
                </div>
              </section>

              {/* Vacancies */}
              <section id="vacancies" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Punjab Court Clerk Vacancy 2026: Category-wise Details</h2>
                <p className="mt-4 leading-8 text-slate-300">
                  The notice lists <strong className="text-white">1,243 vacancies as on 31 August 2026</strong> plus{' '}
                  <strong className="text-white">27 anticipated vacancies up to 28 February 2027</strong> — a total
                  of <strong className="text-white">1,270 Clerk posts</strong>. Posts are divided between men and
                  women across General, EWS, SC, BC/OBC, Freedom Fighter, Sportsman, PwBD and Ex-Servicemen
                  categories (all of Punjab).
                </p>
                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className={thClass} rowSpan={2}>Category</th>
                        <th className={`${thClass} text-center`} colSpan={2}>Posts as on 31.08.2026</th>
                        <th className={`${thClass} text-center`} colSpan={2}>Anticipated up to 28.02.2027</th>
                      </tr>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className={thClass}>Men</th>
                        <th className={thClass}>Women</th>
                        <th className={thClass}>Men</th>
                        <th className={thClass}>Women</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vacancyRows.map((row) => (
                        <tr key={row.cat} className="odd:bg-slate-900/50">
                          <td className={tdClass}>{row.cat}</td>
                          <td className={`${tdClass} font-semibold text-slate-200`}>{row.men}</td>
                          <td className={`${tdClass} font-semibold text-slate-200`}>{row.women}</td>
                          <td className={tdClass}>{row.aMen}</td>
                          <td className={tdClass}>{row.aWomen}</td>
                        </tr>
                      ))}
                      <tr className="bg-blue-600/10">
                        <td className={`${tdClass} font-semibold text-white`}>Total (1,243 + 27 = 1,270)</td>
                        <td className={`${tdClass} font-semibold text-white`}>793</td>
                        <td className={`${tdClass} font-semibold text-white`}>450</td>
                        <td className={`${tdClass} font-semibold text-white`}>18</td>
                        <td className={`${tdClass} font-semibold text-white`}>9</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  PwBD abbreviations: LV = Low Vision, HH = Hard of Hearing, OA/OL/BA/BL/OAL = one arm / one leg /
                  both arms / both legs / one arm and one leg, LC = Leprosy Cured, Dw = Dwarfism, AAV = Acid Attack
                  Victims, SLD = Specific Learning Disability, MI = Mental Illness, SD/SI = Spinal Deformity/Injury.
                </p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-sm leading-7 text-slate-300">
                  <p>
                    <strong className="text-white">Notes from the notice:</strong> (1) Vacancies may increase or
                    decrease without notice; the number of candidates to be recommended is decided by the Hon&apos;ble
                    High Court. (2) If enough candidates are not available in a reserved category, unfilled posts may
                    be filled from the unreserved category as per Rule 7 of The Punjab Subordinate Courts
                    Establishment (Recruitment and General Conditions of Service) Rules, 1997. (3) For Ex-Servicemen,
                    if suitable ex-servicemen are unavailable, the wife or dependent child of an ex-serviceman (and
                    grandchild of a gallantry award winner, in specified cases) can be considered.
                  </p>
                </div>
              </section>

              {/* CTA #2 */}
              <section className={ctaCardClass}>
                <p className="text-base leading-7 text-slate-200">
                  <strong className="text-white">Typing at 30 WPM is mandatory.</strong> Build your speed with
                  Elite Academy&apos;s{' '}
                  <Link to="/punjabi-typing" className="font-semibold text-blue-300 underline hover:text-blue-200">
                    Punjabi &amp; English typing course
                  </Link>{' '}
                  and practise the CBT with our{' '}
                  <Link to="/test-series" className="font-semibold text-blue-300 underline hover:text-blue-200">
                    mock tests
                  </Link>
                  .
                </p>
              </section>

              {/* Eligibility */}
              <section id="eligibility" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Punjab Court Clerk Eligibility 2026: Educational Qualification</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    The applicant must hold a <strong className="text-white">degree of Bachelor of Arts or Bachelor of Science</strong>{' '}
                    (or equivalent) from a recognized university, must have passed{' '}
                    <strong className="text-white">Matriculation with Punjabi as one of the subjects</strong>, and
                    must have <strong className="text-white">proficiency in operating computers</strong>.
                  </p>
                  <p>
                    The qualification must be fulfilled <strong className="text-white">as on the closing date of
                    receipt of the online application form (4 November 2026)</strong>.
                  </p>
                </div>
                <div className="mt-6 rounded-2xl border border-blue-400/40 bg-blue-600/10 p-5">
                  <h3 className="font-semibold text-blue-200">Other eligibility conditions</h3>
                  <ul className="mt-2 ml-5 list-disc space-y-2 leading-7 text-blue-50">
                    <li>Nationality, domicile and character requirements are as per The Punjab Subordinate Courts Establishment (Recruitment and General Conditions of Service) Rules, 1997.</li>
                    <li>Disqualification: a person who has a living spouse and contracts another marriage (or marries a person with a living spouse) is not eligible, unless the High Court exempts the marriage as permissible under the applicable personal law.</li>
                    <li>All applicants must give an undertaking in the form to work anywhere in the State of Punjab where posted.</li>
                    <li>Applicants working in Punjab/Haryana Government, other State Governments, Government of India, High Court, subordinate courts or UT Chandigarh must obtain a No Objection Certificate (NOC) from their Head of Office/Department; if not produced when asked, candidature is cancelled.</li>
                  </ul>
                </div>
              </section>

              {/* Age */}
              <section id="age" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Age Limit &amp; Relaxation</h2>
                <p className="mt-4 leading-8 text-slate-300">
                  Age is calculated as on <strong className="text-white">1 January 2026</strong>. The minimum age is 18 years for all categories.
                </p>
                <div className="mt-4 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className={thClass}>Category</th>
                        <th className={thClass}>Age Range</th>
                        <th className={thClass}>Upper-age Relaxation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ageRows.map((row) => (
                        <tr key={row.cat} className="odd:bg-slate-900/50">
                          <td className={tdClass}>{row.cat}</td>
                          <td className={`${tdClass} font-semibold text-slate-200`}>{row.range}</td>
                          <td className={tdClass}>{row.relax}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-slate-400">
                  Age relaxation, reservation and fee concession are available to residents of Punjab only (except age
                  relaxation to government employees as per the Rules). Applicants of reserved categories from other
                  states must apply under the Un-reserved (UR)/General category.
                </p>
                <div className="mt-6">
                  <ImageCard
                    src={AGE_IMAGE}
                    alt="Punjab District Court Clerk 2026 age limit table and qualification from the SSSC notice"
                    caption="Age limit, qualification and disqualification clauses from the notice"
                    onOpen={openImage}
                  />
                </div>
              </section>

              {/* Salary */}
              <section id="salary" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Punjab District Court Clerk Salary 2026</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    The pay scale for the post of Clerk (fresh recruitment/appointment on or after 17 July 2020) in
                    the District Courts of Punjab is <strong className="text-white">₹29,200 (Level-5) for graduates</strong>,
                    as per the Punjab Government letter No. HOME-JD-10MISC/54/2023-2JUD1 I/926404/2024 dated
                    12 September 2024 on &quot;New Pay Scales of fresh recruitment/appointment in the service of
                    Government of Punjab and its entities&quot;, adopted by the High Court for subordinate court employees.
                  </p>
                </div>
              </section>

              {/* Fee */}
              <section id="fee" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Application Fee (Pay Online, Non-Refundable)</h2>
                <div className="mt-6 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className={thClass}>Category</th>
                        <th className={thClass}>Online Facilitation Charges</th>
                        <th className={thClass}>Examination Fee</th>
                        <th className={thClass}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeRows.map((row) => (
                        <tr key={row.cat} className="odd:bg-slate-900/50">
                          <td className={tdClass}>{row.cat}</td>
                          <td className={tdClass}>{row.facilitation}</td>
                          <td className={tdClass}>{row.exam}</td>
                          <td className={`${tdClass} font-semibold text-slate-200`}>{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="mt-4 ml-5 list-disc space-y-2 text-slate-300">
                  <li>The fee is paid online and is <strong className="text-white">non-refundable</strong>. Re-check all details before paying.</li>
                  <li>Applicants selecting &quot;Others&quot; in the Gender column pay the fee as per their category in the table above.</li>
                  <li>Payment modes: internet banking, debit card, credit card or UPI. The form counts as submitted only after the fee is paid.</li>
                </ul>
                <div className="mt-6">
                  <ImageCard
                    src={FEE_IMAGE}
                    alt="Punjab District Court Clerk 2026 application fee table SSSC notice"
                    caption="Fee table from the official notice"
                    onOpen={openImage}
                  />
                </div>
              </section>

              {/* Exam pattern */}
              <section id="exam-pattern" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Punjab Court Clerk Exam Pattern 2026 (Computer Based Test)</h2>
                <p className="mt-4 leading-8 text-slate-300">
                  The written examination is an online <strong className="text-white">Computer Based Test (CBT)</strong>{' '}
                  of <strong className="text-white">2 hours and 100 marks</strong>:
                </p>
                <div className="mt-4 overflow-x-auto rounded-2xl">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-800/70 text-slate-100">
                        <th className={thClass}>Subject</th>
                        <th className={thClass}>Type</th>
                        <th className={thClass}>Questions / Details</th>
                        <th className={thClass}>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {examPattern.map((row) => (
                        <tr key={`${row.subject}-${row.type}`} className="odd:bg-slate-900/50 align-top">
                          <td className={`${tdClass} font-semibold text-slate-200`}>{row.subject}</td>
                          <td className={tdClass}>{row.type}</td>
                          <td className={tdClass}>{row.detail}</td>
                          <td className={`${tdClass} font-semibold text-slate-200`}>{row.marks}</td>
                        </tr>
                      ))}
                      <tr className="bg-blue-600/10">
                        <td className={`${tdClass} font-semibold text-white`} colSpan={3}>Total</td>
                        <td className={`${tdClass} font-semibold text-white`}>100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="mt-4 ml-5 list-disc space-y-2 text-slate-300">
                  <li><strong className="text-white">Qualifying marks:</strong> 33% in each subject, and no candidate is considered qualified unless they obtain 40% marks in aggregate in the written examination.</li>
                  <li><strong className="text-white">Negative marking:</strong> ¼ mark is deducted for every wrong MCQ answer; unattempted questions get no credit or discredit.</li>
                  <li>The subjective part of English Composition must be typed on the computer within the time limit, and is checked only for candidates who score 33% or more in General Knowledge.</li>
                  <li>&quot;Marks&quot; means normalized marks in the objective portion and actual marks in the subjective portion.</li>
                </ul>
                <div className="mt-6">
                  <ImageCard
                    src={EXAM_IMAGE}
                    alt="Punjab District Court Clerk 2026 exam pattern: General Knowledge and English Composition, 100 marks, 2 hours"
                    caption="Exam scheme table from the official notice"
                    onOpen={openImage}
                  />
                </div>
              </section>

              {/* CPT */}
              <section id="cpt" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Computer Proficiency Test (CPT) &amp; Typing Test</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <p>
                    From the candidates who qualify the CBT, a category-wise number decided by the High Court is
                    called for the mandatory <strong className="text-white">Computer Proficiency Test (CPT)</strong>.
                    CPT is <strong className="text-white">qualifying in nature</strong> — its marks are not counted in
                    the final merit. It has two parts:
                  </p>
                  <ul className="ml-5 list-disc space-y-2">
                    <li><strong className="text-white">Part-I — Spreadsheet Test:</strong> 10 marks, 10 minutes. Candidates must score 40% or more (4 or more marks).</li>
                    <li><strong className="text-white">Part-II — English Computer Typing Test:</strong> speed of 30 W.P.M. Speed is calculated as (Number of words typed − Mistakes) ÷ 10. Part-II is checked only for candidates who secure 4 or more marks in Part-I.</li>
                  </ul>
                  <p>
                    Persons with Benchmark Disabilities can apply for exemption from CPT with the required disability
                    and medical certificates (for example, Locomotor disability with both arms affected can apply with
                    a disability certificate; others need a medical certificate from the Chief Medical Officer/Civil
                    Surgeon/Medical Superintendent stating physical limitation to type at 30 WPM, submitted within 15
                    days of the CBT result). The Competent Authority&apos;s decision is final.
                  </p>
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                  <p className="text-sm font-semibold text-slate-200 sm:text-base">
                    Not yet at 30 WPM? Join our typing course and clear the CPT with confidence.
                  </p>
                  <Link
                    to="/punjabi-typing"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    Explore Typing Course →
                  </Link>
                </div>
              </section>

              {/* Selection */}
              <section id="selection-process" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Selection Process, Merit List &amp; Answer Key</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                  <ol className="ml-5 list-decimal space-y-2">
                    <li><strong className="text-white">Online written exam (CBT)</strong> — 100 marks, 2 hours.</li>
                    <li><strong className="text-white">Computer Proficiency Test</strong> — spreadsheet + 30 WPM English typing (qualifying only).</li>
                    <li><strong className="text-white">Checking of original testimonials / interaction</strong> for category-wise candidates who qualify both tests.</li>
                    <li><strong className="text-white">Select list</strong> prepared strictly on merit in the CBT.</li>
                  </ol>
                  <p>
                    <strong className="text-white">Tie-breaker:</strong> if two or more candidates have the same marks, the elder candidate ranks higher; if date of birth is also the same, they are placed alphabetically (A–Z).
                  </p>
                  <p>
                    <strong className="text-white">Answer key &amp; objections:</strong> a provisional answer key is uploaded on sssc.gov.in. Objections can be raised with a non-refundable fee of ₹25 per objection, supported by reasons and documentary proof; cross-objections against proposed changes are also allowed.
                  </p>
                  <p>
                    <strong className="text-white">Normalization:</strong> if the CBT is held in multiple shifts, objective scores are normalized by the Standard Deviation method (up to 5 decimal places).
                  </p>
                  <p>
                    <strong className="text-white">E-Admit Card &amp; demo test:</strong> E-admit cards are uploaded on the website (not sent by post) and also communicated by email/SMS. A demo/mock test link is uploaded 15 days before the exam. The photograph on the admit card (attested by a Gazetted Officer or self-attested) must match the uploaded photo.
                  </p>
                  <p>
                    <strong className="text-white">Exam centres &amp; dates:</strong> the exam can be held anywhere in Northern India on any suitable date(s); dates will be notified on www.sssc.gov.in only, and no request for change of centre, date or shift is entertained. Re-evaluation is not allowed; only re-checking (₹500 per answer sheet, via Indian Postal Order, within 30 days of the final result).
                  </p>
                </div>
              </section>

              {/* How to Apply */}
              <section id="how-to-apply" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">How to Apply Online for Punjab District Court Clerk 2026</h2>
                <ol className="mt-4 ml-5 list-decimal space-y-3 text-[1rem] leading-8 text-slate-300">
                  {applySteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <h3 className="font-semibold text-white">Keep these ready before you start</h3>
                  <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-300">
                    <li>Personal details, valid email ID and active mobile number (for SMS)</li>
                    <li>Online payment facility — net banking, debit card, credit card or UPI</li>
                    <li>Scanned recent passport-size photograph (not more than one month old) on a white background, and scanned signature</li>
                    <li>A computer/device with an inbuilt or attached webcam for the real-time photograph</li>
                  </ul>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://www.sssc.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-500"
                  >
                    Go to sssc.gov.in
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
                <h2 className="text-2xl font-semibold text-white">Documents Required</h2>
                <ul className="mt-4 ml-5 list-disc space-y-2 text-[1rem] leading-8 text-slate-300">
                  {documentsChecklist.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-400">
                  Original documents must be produced as and when demanded. Candidates must retain five copies of
                  the uploaded photograph for later stages.
                </p>
              </section>

              {/* Important Instructions */}
              <section id="instructions" className={cardClass}>
                <h2 className="text-2xl font-semibold text-white">Important Instructions &amp; Reasons for Rejection</h2>
                <ul className="mt-4 ml-5 list-disc space-y-2 text-[1rem] leading-8 text-slate-300">
                  <li>Only <strong className="text-white">one application</strong> per candidate for a category — if more than one is submitted, only the latest one is considered.</li>
                  <li>Category and sub-category once filled are final and <strong className="text-white">no change is allowed</strong> at any stage; no correction is possible after submission.</li>
                  <li>Incomplete forms, forms without a proper photograph and signature, and forms with missing documents are rejected summarily.</li>
                  <li>Admission at every stage is purely provisional; candidature stands cancelled if eligibility or documents are found lacking at any stage, even after selection.</li>
                  <li>Reservation benefits require a bonafide Punjab resident with latest valid certificates issued by the competent authority, valid on the closing date.</li>
                  <li>Mobile phones, electronic devices, watches, jewellery and baggage are not allowed in the exam centre.</li>
                  <li>Canvassing, concealing facts, giving false information or using unfair means leads to cancellation of candidature and possible legal action.</li>
                  <li>No TA/DA is paid for the exam or document verification. Success in the exam confers no right to appointment.</li>
                  <li>Re-check the photograph rule: the live photo, uploaded photo and admit-card photo must match, or entry to the exam centre can be denied.</li>
                  <li>The official website content prevails over any newspaper advertisement. Beware of fraudulent websites — the form is available only on www.sssc.gov.in.</li>
                </ul>
              </section>

              {/* Preparation */}
              <section id="preparation" className={ctaCardClass}>
                <h2 className="text-2xl font-semibold text-white">How to Prepare for the Punjab District Court Clerk Exam</h2>
                <div className="mt-3 max-w-2xl space-y-4 leading-8 text-slate-300">
                  <p>
                    With 1,270 vacancies and a graduate-level eligibility, competition will be intense. The exam is unusual: half of the marks are GK, and the English
                    Composition paper includes typed subjective answers — essay, letter, précis and Punjabi-to-English
                    translation — so writing practice matters as much as MCQs.
                  </p>
                  <p>
                    Plan your preparation in three tracks: (1) General Knowledge, current affairs and Punjab GK,
                    (2) English composition practised by typing answers on a computer, and (3) English typing speed
                    of 30 WPM with spreadsheet basics for the CPT. Take regular timed mock tests to manage the ¼
                    negative marking.
                  </p>
                </div>
              </section>

              {/* Batch / Elite Academy CTA */}
              <section id="batch" className={ctaCardClass}>
                <h2 className="text-2xl font-semibold text-white">
                  Prepare for Punjab District Court Clerk 2026 With Elite Academy
                </h2>
                <p className="mt-3 max-w-2xl leading-8 text-slate-300">
                  With applications closing on 4 November 2026, start structured preparation now. Elite Academy
                  helps Punjab Government exam aspirants prepare through:
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
                        for the 30 WPM typing test
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-base leading-7 text-slate-200">
                    Applying for the Punjab District Court Clerk post? Don&apos;t wait for the exam date — start
                    structured preparation now. Call{' '}
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
                    to="/punjabi-typing"
                    className="rounded-full border border-white/10 px-5 py-2.5 font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Join Typing Course
                  </Link>
                </div>
              </section>

              {/* App Download CTA */}
              <section className={cardClass}>
                <h2 className="text-xl font-semibold text-white">
                  Practice for the Punjab Court Clerk Exam on the Elite Academy App
                </h2>
                <p className="mt-3 leading-8 text-slate-300">
                  Alongside classroom and online batches, the Elite Academy app gives you Punjab government exam
                  mock tests and practice resources on your phone — useful for revising general knowledge, current
                  affairs, English and Punjab GK topics.
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
                <h2 className="text-xl font-semibold text-white">SSSC Helpline Numbers</h2>
                <ul className="mt-3 ml-5 list-disc space-y-2 leading-8 text-slate-300">
                  <li>Technical queries on the online application form: +91 95948-04606 and 022-61087580, on working days between 9:00 AM and 5:00 PM.</li>
                  <li>Queries on the terms and conditions of the advertisement: 0172-2722012 and +91 91158-98394, on working days between 9:30 AM and 5:00 PM.</li>
                </ul>
                <p className="mt-3 text-sm text-slate-400">
                  Always mention the advertisement number and post name, your Registration ID, roll number (if
                  received), full name in block letters, registered email ID and correspondence address when writing to SSSC.
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
                  Targeting the Punjab District Court Clerk post? Apply by 4 November and start preparing today.
                </h2>
                <p className="mx-auto mt-3 max-w-2xl leading-8 text-slate-200">
                  Classroom coaching, online batches, mock tests, typing training and the Elite Academy app —
                  everything you need to clear the CBT and the typing test.
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
                  <span className="font-semibold text-slate-400">Last updated:</span> 3 October 2026, based on the
                  Detailed Employment Notice No. 37C/SSSC/PB/2026 issued by SSSC, High Court of Punjab and Haryana.
                  Elite Academy is not affiliated with SSSC or the High Court; candidates should verify all details
                  on the official website, www.sssc.gov.in, before applying.
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
                  <Link to="/psssb-coaching" className="block hover:text-blue-300">Punjab Govt. Exam Coaching →</Link>
                  <Link to="/online-coaching" className="block hover:text-blue-300">Online Coaching →</Link>
                  <Link to="/test-series" className="block hover:text-blue-300">Test Series →</Link>
                  <Link to="/punjabi-typing" className="block hover:text-blue-300">Typing Course →</Link>
                  <Link to="/contact-us" className="block hover:text-blue-300">Contact Us →</Link>
                </div>
              </section>

              <section className={ctaCardClass}>
                <h2 className="text-lg font-semibold text-white">Last Date: 4 November 2026</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  1,270 Clerk posts. Apply from 7 October at sssc.gov.in. Graduate eligibility, ₹29,200 pay.
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
              <p className="font-semibold text-white">Punjab District Court Clerk Recruitment 2026 — SSSC Notice 37C/SSSC/PB/2026</p>
              <p className="mt-1 text-slate-400">High Court of Punjab and Haryana, Chandigarh</p>
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
