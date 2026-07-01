import {
  DEFAULT_WHY_CHOOSE_US,
  DEFAULT_PROGRAM_FEATURES,
  DEFAULT_RESOURCES,
  DEFAULT_BRANCHES,
  buildDefaultTimeline,
} from './shared';

const sscCoaching = {
  slug: '/ssc-coaching',
  examName: 'SSC Coaching',
  ctaPath: '/online-coaching',

  seo: {
    title: 'SSC Coaching in Chandigarh & Punjab | Elite Academy',
    description:
      'Prepare for SSC CGL, CHSL, GD, CPO and MTS with Elite Academy. Structured online and offline coaching with live classes, mock tests, reasoning, quant, English and GK for Staff Selection Commission exams.',
    keywords:
      'SSC coaching, SSC coaching Chandigarh, SSC CGL coaching, SSC CHSL coaching, SSC GD coaching, SSC CPO coaching, SSC MTS coaching, Staff Selection Commission preparation, Elite Academy SSC',
    breadcrumb: 'SSC Coaching',
    changefreq: 'weekly',
    priority: 0.9,
    schemaType: 'course',
  },

  hero: {
    badge: 'Central Government Exam Coaching',
    title: 'SSC Coaching in Chandigarh & Punjab',
    subtitle:
      'Structured preparation for Staff Selection Commission exams — SSC CGL, CHSL, GD, CPO, and MTS — with live classes, mock tests, and complete study material from Elite Academy.',
    ctaLabel: 'Start Preparation',
  },

  about: {
    title: 'What is SSC?',
    paragraphs: [
      'The Staff Selection Commission (SSC) is India\'s leading central government recruitment body. It conducts examinations for Group B and Group C posts across ministries, departments, and organizations of the Government of India. SSC exams attract lakhs of aspirants every year because they offer stable central government careers with nationwide recognition.',
      'Popular SSC examinations include Combined Graduate Level (CGL) for graduate-level posts, Combined Higher Secondary Level (CHSL) for 12th-pass candidates, General Duty (GD) for constable-level positions, Central Police Organization (CPO) for sub-inspector posts, and Multi Tasking Staff (MTS) for non-technical support roles. Each exam has its own eligibility, syllabus, and selection stages.',
      'SSC exams typically test General Intelligence and Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension — with variations depending on the tier and post. The competition is intense because SSC jobs offer job security, decent salaries, and the prestige of serving the central government.',
      'At Elite Academy, we help SSC aspirants build a structured preparation plan with concept-focused live classes, regular mock tests, previous year question practice, and personal mentorship. Whether you are starting fresh or switching from state-level exams, our program gives you the consistency and exam-oriented practice needed for SSC success.',
    ],
  },

  posts: {
    title: 'SSC Exams We Prepare You For',
    subtitle:
      'Our coaching covers the major Staff Selection Commission examinations for central government posts.',
    items: [
      { name: 'SSC CGL', icon: '🎓' },
      { name: 'SSC CHSL', icon: '📝' },
      { name: 'SSC GD', icon: '🛡️' },
      { name: 'SSC CPO', icon: '👮' },
      { name: 'SSC MTS', icon: '💼' },
      { name: 'SSC Stenographer', icon: '⌨️' },
      { name: 'SSC Selection Post', icon: '📋' },
      { name: 'SSC JE (General Awareness)', icon: '🔧' },
    ],
    footer: 'Structured coaching for major SSC recruitments with exam-pattern focused preparation.',
  },

  whyChooseUs: DEFAULT_WHY_CHOOSE_US,

  program: {
    title: 'Complete SSC Coaching Program',
    subtitle:
      'Everything you need for SSC preparation — reasoning, quant, English, and general awareness — in one structured program designed for central government exam success.',
    features: DEFAULT_PROGRAM_FEATURES,
  },

  timeline: buildDefaultTimeline('SSC', 'Clear Your SSC Exam'),

  resources: DEFAULT_RESOURCES,

  branches: DEFAULT_BRANCHES,

  faq: {
    title: 'SSC Coaching FAQs',
    subtitle: 'Common questions about SSC exam preparation at Elite Academy.',
    items: [
      {
        question: 'Which SSC exams does Elite Academy prepare students for?',
        answer:
          'We prepare students for major SSC examinations including CGL, CHSL, GD, CPO, MTS, and Stenographer. Our coaching covers the common subjects tested across these exams — reasoning, quantitative aptitude, English, and general awareness.',
      },
      {
        question: 'Does Elite Academy provide SSC coaching in Chandigarh?',
        answer:
          'Yes. Elite Academy offers both online and offline SSC coaching. Offline classes are available at our Chandigarh branch (SCO 144, Sector 24-D) and Fatehgarh Sahib branch. Online coaching is available for students across Punjab and India.',
      },
      {
        question: 'What subjects are covered in SSC coaching?',
        answer:
          'Our SSC coaching covers General Intelligence and Reasoning, Quantitative Aptitude, English Comprehension, and General Awareness. Subject emphasis and difficulty level are adjusted based on the specific SSC exam you are targeting.',
      },
      {
        question: 'Do you provide mock tests for SSC preparation?',
        answer: [
          'Yes. Students get access to ',
          { type: 'link', path: '/weekly-test', label: 'weekly tests' },
          ', ',
          { type: 'link', path: '/sectional-test-series', label: 'sectional test series' },
          ', and full-length mock tests. Regular testing helps build speed, accuracy, and the stamina needed for multi-tier SSC exams.',
        ],
      },
      {
        question: 'Is online SSC coaching effective?',
        answer: [
          'Yes. Our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching' },
          ' includes live classes, recorded lectures, a tracker app, mock tests, and complete study material. Many working professionals and college students prefer online coaching for flexible, structured SSC preparation.',
        ],
      },
      {
        question: 'Do you provide PYQs for SSC exams?',
        answer: [
          'Yes. We offer a comprehensive ',
          { type: 'link', path: '/pyqs-book', label: 'PYQs book' },
          ' with 20,000+ previous year questions organized subject-wise and topic-wise. PYQ practice is a core part of our SSC preparation strategy.',
        ],
      },
      {
        question: 'How is SSC preparation different from PSSSB preparation?',
        answer:
          'SSC exams are central government recruitments with a focus on reasoning, quant, English, and general awareness at varying difficulty levels. PSSSB exams are Punjab-specific with additional emphasis on Punjabi and state GK. Our coaching adapts to the exam you are targeting while using the same structured teaching and testing framework.',
      },
      {
        question: 'How long does SSC preparation take?',
        answer:
          'Preparation time depends on your starting level and target exam. Most students benefit from 4–8 months of structured coaching with daily study, weekly tests, and regular revision. Our program adapts to your pace with recorded classes and personal mentorship.',
      },
      {
        question: 'What is the fee for SSC coaching at Elite Academy?',
        answer: [
          'SSC coaching is part of our complete online coaching program. Visit our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching page' },
          ' for current pricing, inclusions, and enrollment details.',
        ],
      },
      {
        question: 'How do I enroll in SSC coaching?',
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
    title: 'Ready to Start Your SSC Preparation?',
    description:
      'Join Elite Academy for structured SSC coaching with live classes, mock tests, PYQs, and personal mentorship. Start your central government exam journey today.',
    ctaLabel: 'Join Online Coaching',
    secondaryText: 'Have questions? Call 7696954686 or',
  },
};

export default sscCoaching;
