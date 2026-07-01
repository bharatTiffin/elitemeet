import {
  DEFAULT_WHY_CHOOSE_US,
  DEFAULT_PROGRAM_FEATURES,
  DEFAULT_RESOURCES,
  DEFAULT_BRANCHES,
  buildDefaultTimeline,
} from './shared';

const punjabPoliceCoaching = {
  slug: '/punjab-police-coaching',
  examName: 'Punjab Police Coaching',
  ctaPath: '/online-coaching',

  seo: {
    title: 'Punjab Police Coaching in Chandigarh & Punjab | Elite Academy',
    description:
      'Prepare for Punjab Police Constable and Sub Inspector recruitment with Elite Academy. Written exam coaching, mock tests, reasoning, Punjabi, GK, and current affairs — online and offline in Chandigarh & Punjab.',
    keywords:
      'Punjab Police coaching, Punjab Police coaching Chandigarh, Punjab Police constable coaching, Punjab Police SI coaching, Punjab Police preparation, Punjab Police written exam, Elite Academy Punjab Police',
    breadcrumb: 'Punjab Police Coaching',
    changefreq: 'weekly',
    priority: 0.9,
    schemaType: 'course',
  },

  hero: {
    badge: 'Punjab Government Exam Coaching',
    title: 'Punjab Police Coaching in Chandigarh & Punjab',
    subtitle:
      'Structured preparation for Punjab Police Constable and Sub Inspector recruitment — written exam coaching, mock tests, reasoning, Punjabi, general knowledge, and current affairs from Elite Academy.',
    ctaLabel: 'Start Preparation',
  },

  about: {
    title: 'What is Punjab Police Recruitment?',
    paragraphs: [
      'Punjab Police recruitment is one of the most sought-after government job opportunities in the state. The Punjab Subordinate Services Selection Board (PSSSB) and other notified channels conduct recruitment for posts such as Constable and Sub Inspector (SI), attracting thousands of aspirants who want a stable career in law enforcement with the Punjab Government.',
      'The selection process typically includes a written examination covering General Knowledge, Punjabi, English, Mathematics, Reasoning, and Punjab-specific topics. Candidates must also meet physical fitness requirements as part of the overall recruitment process. The written exam demands strong fundamentals, consistent practice, and familiarity with the question patterns used in previous recruitments.',
      'Aspirants choose Punjab Police because it offers job security, a respected position in public service, and the chance to serve the community. Whether you are targeting Constable or Sub Inspector, the competition requires disciplined preparation — not just reading notes, but regular mock tests, current affairs updates, and subject-wise revision.',
      'At Elite Academy, our Punjab Police coaching program covers the written exam syllabus with live classes, recorded lectures, weekly tests, and full-length mock tests. We also guide students on general physical preparation awareness alongside written exam readiness — helping you move from scattered self-study to a focused, exam-oriented plan.',
    ],
  },

  posts: {
    title: 'Punjab Police Posts We Prepare You For',
    subtitle:
      'Our coaching covers the written exam preparation for key Punjab Police recruitment categories.',
    items: [
      { name: 'Constable', icon: '👮' },
      { name: 'Sub Inspector (SI)', icon: '🛡️' },
      { name: 'Head Constable', icon: '⭐' },
      { name: 'Assistant Sub Inspector', icon: '📋' },
      { name: 'Lady Constable', icon: '👩‍✈️' },
      { name: 'Driver Constable', icon: '🚗' },
      { name: 'Wireless Operator', icon: '📡' },
      { name: 'Computer Operator', icon: '💻' },
    ],
    footer: 'Written exam coaching for Punjab Police recruitments conducted through PSSSB and notified channels.',
  },

  whyChooseUs: DEFAULT_WHY_CHOOSE_US,

  program: {
    title: 'Complete Punjab Police Coaching Program',
    subtitle:
      'Everything you need for Punjab Police written exam preparation — from concept building to mock test practice — in one structured program.',
    features: DEFAULT_PROGRAM_FEATURES,
  },

  timeline: buildDefaultTimeline('Punjab Police', 'Clear Punjab Police Written Exam'),

  resources: DEFAULT_RESOURCES,

  branches: DEFAULT_BRANCHES,

  faq: {
    title: 'Punjab Police Coaching FAQs',
    subtitle: 'Common questions about Punjab Police exam preparation at Elite Academy.',
    items: [
      {
        question: 'What posts does Punjab Police recruitment cover?',
        answer:
          'Punjab Police recruitment includes posts such as Constable, Sub Inspector (SI), Head Constable, Assistant Sub Inspector, Lady Constable, and other notified positions. The exact posts vary with each notification issued by PSSSB or the recruiting authority.',
      },
      {
        question: 'Does Elite Academy provide Punjab Police coaching in Chandigarh?',
        answer:
          'Yes. Elite Academy offers both online and offline Punjab Police coaching. Offline classes are available at our Chandigarh branch (SCO 144, Sector 24-D) and Fatehgarh Sahib branch. Online coaching is available for students across Punjab and India.',
      },
      {
        question: 'What subjects are covered in Punjab Police written exam coaching?',
        answer:
          'Our coaching covers General Knowledge, Punjabi, English, Mathematics, Reasoning, and Punjab-specific topics commonly asked in Punjab Police written exams. Subject emphasis may vary depending on the post and notification.',
      },
      {
        question: 'Do you provide mock tests for Punjab Police preparation?',
        answer: [
          'Yes. Students get access to ',
          { type: 'link', path: '/weekly-test', label: 'weekly tests' },
          ', ',
          { type: 'link', path: '/sectional-test-series', label: 'sectional test series' },
          ', and full-length mock tests designed around government exam patterns. Regular testing helps build speed, accuracy, and exam temperament.',
        ],
      },
      {
        question: 'Does Elite Academy cover physical test preparation?',
        answer:
          'Our primary focus is written exam preparation — live classes, mock tests, study material, and mentorship. We provide general guidance on physical fitness awareness as part of the overall recruitment process, but detailed physical training standards are set by the recruiting authority in each notification.',
      },
      {
        question: 'Is online Punjab Police coaching effective?',
        answer: [
          'Yes. Our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching' },
          ' includes live classes, recorded lectures, a tracker app, mock tests, and complete study material. Many students prefer online coaching for flexibility while getting the same structured preparation as offline students.',
        ],
      },
      {
        question: 'Do you provide current affairs for Punjab Police exams?',
        answer: [
          'Yes. Current affairs is a core part of Punjab Police GK preparation. Students can access our ',
          { type: 'link', path: '/current-affairs-book', label: 'current affairs book' },
          ' and ',
          { type: 'link', path: '/monthly-current-affairs', label: 'monthly current affairs magazine' },
          ' for exam-focused updates.',
        ],
      },
      {
        question: 'How long does Punjab Police preparation take?',
        answer:
          'Preparation time depends on your starting level and target post. Most students benefit from 3–6 months of structured coaching with daily study, weekly tests, and regular revision. Our program adapts to your pace with recorded classes and personal mentorship.',
      },
      {
        question: 'What is the fee for Punjab Police coaching at Elite Academy?',
        answer: [
          'Punjab Police coaching is part of our complete online coaching program. Visit our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching page' },
          ' for current pricing, inclusions, and enrollment details.',
        ],
      },
      {
        question: 'How do I enroll in Punjab Police coaching?',
        answer: [
          'You can enroll directly through our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching page' },
          '. For offline coaching at Chandigarh or Fatehgarh Sahib, call ',
          { type: 'phone', number: '+917696954686', label: '7696954686' },
          ' or visit our ',
          { type: 'link', path: '/contact-us', label: 'contact page' },
          '.',
        ],
      },
    ],
  },

  finalCta: {
    title: 'Ready to Start Your Punjab Police Preparation?',
    description:
      'Join Elite Academy for structured Punjab Police coaching with live classes, mock tests, current affairs, and personal mentorship. Begin your Punjab Police recruitment journey today.',
    ctaLabel: 'Join Online Coaching',
    secondaryText: 'Have questions? Call 7696954686 or',
  },
};

export default punjabPoliceCoaching;
