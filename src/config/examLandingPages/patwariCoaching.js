import {
  DEFAULT_WHY_CHOOSE_US,
  DEFAULT_PROGRAM_FEATURES,
  DEFAULT_RESOURCES,
  DEFAULT_BRANCHES,
  buildDefaultTimeline,
} from './shared';

const patwariCoaching = {
  slug: '/patwari-coaching',
  examName: 'Patwari Coaching',
  ctaPath: '/online-coaching',

  seo: {
    title: 'Patwari Coaching in Chandigarh & Punjab | Elite Academy',
    description:
      'Prepare for Punjab Patwari recruitment with Elite Academy. Structured coaching for land records and revenue department exams — mock tests, mathematics, Punjabi, reasoning, GK and current affairs in Chandigarh & Punjab.',
    keywords:
      'Patwari coaching, Patwari coaching Chandigarh, Patwari coaching Punjab, Punjab Patwari preparation, Patwari exam coaching, land records exam coaching, revenue department recruitment, Elite Academy Patwari',
    breadcrumb: 'Patwari Coaching',
    changefreq: 'weekly',
    priority: 0.9,
    schemaType: 'course',
  },

  hero: {
    badge: 'Punjab Government Exam Coaching',
    title: 'Patwari Coaching in Chandigarh & Punjab',
    subtitle:
      'Structured preparation for Punjab Patwari recruitment — land records, revenue department exams, mock tests, mathematics, Punjabi, reasoning, and general knowledge from Elite Academy.',
    ctaLabel: 'Start Preparation',
  },

  about: {
    title: 'What is Punjab Patwari Recruitment?',
    paragraphs: [
      'Punjab Patwari recruitment is conducted by the Punjab Subordinate Services Selection Board (PSSSB) for the Revenue Department. Patwaris are responsible for maintaining land records, updating revenue documents, and assisting in land-related administrative work at the village and tehsil level. It is one of the most popular Group C posts in the Punjab Government.',
      'The Patwari written exam typically covers General Knowledge, Punjabi, English, Mathematics, Reasoning, and Punjab-specific topics including basic land records awareness. The competition is intense because Patwari posts offer job security, a respectable government career, and the opportunity to work in the revenue administration of Punjab.',
      'Aspirants prepare for Patwari because it is an accessible entry point into Punjab Government service with clear responsibilities and stable employment. Success requires strong performance in mathematics and reasoning, solid Punjabi language skills, and updated general knowledge with Punjab-focused current affairs.',
      'At Elite Academy, our Patwari coaching program is built around the actual exam pattern with structured syllabus coverage, regular mock tests, previous year question practice, and personal mentorship. We help students move from unstructured self-study to a disciplined preparation plan focused on the subjects that matter most for Patwari selection.',
    ],
  },

  posts: {
    title: 'Revenue & Land Records Posts We Prepare You For',
    subtitle:
      'Our coaching covers Punjab revenue department recruitments including Patwari and related posts.',
    items: [
      { name: 'Patwari', icon: '🌾' },
      { name: 'Kanungo', icon: '📑' },
      { name: 'Naib Tehsildar', icon: '🏛️' },
      { name: 'Revenue Patwari', icon: '📋' },
      { name: 'Land Records Clerk', icon: '📝' },
      { name: 'Field Kanungo', icon: '🗺️' },
    ],
    footer: 'Written exam coaching for Punjab revenue department and land records recruitments through PSSSB.',
  },

  whyChooseUs: DEFAULT_WHY_CHOOSE_US,

  program: {
    title: 'Complete Patwari Coaching Program',
    subtitle:
      'Everything you need for Punjab Patwari preparation — mathematics, Punjabi, reasoning, and GK — in one structured program designed for revenue department exam success.',
    features: DEFAULT_PROGRAM_FEATURES,
  },

  timeline: buildDefaultTimeline('Patwari', 'Clear Punjab Patwari Exam'),

  resources: DEFAULT_RESOURCES,

  branches: DEFAULT_BRANCHES,

  faq: {
    title: 'Patwari Coaching FAQs',
    subtitle: 'Common questions about Punjab Patwari exam preparation at Elite Academy.',
    items: [
      {
        question: 'What is the Punjab Patwari exam?',
        answer:
          'The Punjab Patwari exam is conducted by PSSSB for recruitment to Patwari posts in the Revenue Department. Patwaris maintain land records and assist in revenue-related administrative work at the village and tehsil level in Punjab.',
      },
      {
        question: 'Does Elite Academy provide Patwari coaching in Chandigarh?',
        answer:
          'Yes. Elite Academy offers both online and offline Patwari coaching. Offline classes are available at our Chandigarh branch (SCO 144, Sector 24-D) and Fatehgarh Sahib branch. Online coaching is available for students across Punjab and India.',
      },
      {
        question: 'What subjects are covered in Patwari coaching?',
        answer:
          'Our Patwari coaching covers General Knowledge, Punjabi, English, Mathematics, Reasoning, and Punjab-specific topics. Mathematics and reasoning receive special emphasis because they carry significant weight in Patwari written exams.',
      },
      {
        question: 'Do you provide mock tests for Patwari preparation?',
        answer: [
          'Yes. Students get access to ',
          { type: 'link', path: '/weekly-test', label: 'weekly tests' },
          ', ',
          { type: 'link', path: '/sectional-test-series', label: 'sectional test series' },
          ', and full-length mock tests designed around government exam patterns. Regular testing helps build speed and accuracy.',
        ],
      },
      {
        question: 'Is online Patwari coaching effective?',
        answer: [
          'Yes. Our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching' },
          ' includes live classes, recorded lectures, a tracker app, mock tests, and complete study material. Many students across Punjab prefer online coaching for flexible, structured Patwari preparation.',
        ],
      },
      {
        question: 'Do you provide current affairs for Patwari exams?',
        answer: [
          'Yes. Current affairs and Punjab-specific GK are essential for Patwari preparation. Students can access our ',
          { type: 'link', path: '/current-affairs-book', label: 'current affairs book' },
          ' and ',
          { type: 'link', path: '/monthly-current-affairs', label: 'monthly current affairs magazine' },
          ' for exam-focused updates.',
        ],
      },
      {
        question: 'Do you provide PYQs for Patwari exams?',
        answer: [
          'Yes. We offer a comprehensive ',
          { type: 'link', path: '/pyqs-book', label: 'PYQs book' },
          ' with 20,000+ previous year questions organized subject-wise and topic-wise. PYQ practice helps you understand the question patterns used in Punjab government exams.',
        ],
      },
      {
        question: 'How long does Patwari preparation take?',
        answer:
          'Preparation time depends on your starting level. Most students benefit from 3–6 months of structured coaching with daily study, weekly tests, and regular revision. Our program adapts to your pace with recorded classes and personal mentorship.',
      },
      {
        question: 'What is the fee for Patwari coaching at Elite Academy?',
        answer: [
          'Patwari coaching is part of our complete online coaching program. Visit our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching page' },
          ' for current pricing, inclusions, and enrollment details.',
        ],
      },
      {
        question: 'How do I enroll in Patwari coaching?',
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
    title: 'Ready to Start Your Patwari Preparation?',
    description:
      'Join Elite Academy for structured Patwari coaching with live classes, mock tests, PYQs, and personal mentorship. Start your Punjab revenue department exam journey today.',
    ctaLabel: 'Join Online Coaching',
    secondaryText: 'Have questions? Call 7696954686 or',
  },
};

export default patwariCoaching;
